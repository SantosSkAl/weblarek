import './scss/styles.scss';
// import { apiProducts } from './utils/data';
import { Products } from './components/Models/Products';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';
import { ProductsAPI } from './components/Models/ProductsAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { Api } from './components/base/Api';
import { IBuyer, IOrder, IProduct, IResponseOrder, TPayment } from './types';
import { Gallery } from './components/View/Gallery';
import { CardCatalog } from './components/View/CardCatalog';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/Events';
import { CardModal } from './components/View/CardModal';
import { Modal } from './components/View/Modal';
import { CardBasket } from './components/View/CardBasket';
import { Basket } from './components/View/Basket';
import { Success } from './components/View/Success';
import { Header } from './components/View/Header';
import { FormOrder } from './components/View/FormOrder';
import { FormContacts } from './components/View/FormContacts';


// Обработчик событий
const events = new EventEmitter()
events.onAll(({ eventName, data }) => {
    console.log(eventName, data); // все события в консоль
})

// Cлой данных (модели)
const products = new Products(events)
const cart = new Cart(events)
const buyer = new Buyer(events)

// Запрос к серверу
const apiInstance = new Api(API_URL)
const productsApi = new ProductsAPI(apiInstance, CDN_URL)
try {
    const data: IProduct[] = await productsApi.getProducts()
    console.log('список товаров полученных с сервера:', data)
    products.setProducts(data)
} catch(e) {
    console.log('error:', e)
}

// Разметка
const headerElement = ensureElement<HTMLElement>('.header')
const galleryElement = ensureElement<HTMLElement>('.gallery')
const modalElement = ensureElement<HTMLElement>('.modal')

const successTemplate = ensureElement<HTMLTemplateElement>('#success')
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog')
const cardModalTemplate = ensureElement<HTMLTemplateElement>('#card-preview')
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket')
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket')
const formOrderTemplate = ensureElement<HTMLTemplateElement>('#order')
const formContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts')

// Компоненты
const header = new Header(events, headerElement)
const gallery = new Gallery(galleryElement)
const modal = new Modal(events, modalElement)

const cardModal = new CardModal(cloneTemplate(cardModalTemplate), {
    onClick: () => {
        // if (!products.getSelectedProduct()) return
        if (!products.getSelectedProduct()?.price) {
            cardModal.buyButtonState= 'unavailable'
            return
        }
        const selectedProduct = products.getSelectedProduct()
        if (selectedProduct) {
            const inCart = cart.isInCart(selectedProduct.id)
            if (inCart) {
                cart.removeFromCart(selectedProduct)
                cardModal.buyButtonState = 'buy'
            } else {
                cart.addToCart(selectedProduct)
                cardModal.buyButtonState = 'remove'
            }
            events.emit('basket:change')
            events.emit('modal:close')
        }
    }
})

function renderCatalog() {
    const cardCatalog = products.getProducts().map(item => {
        const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:open', item)
        })
        return card.render(item)
    })
    gallery.catalog = cardCatalog
}

renderCatalog()

const basket = new Basket(cloneTemplate(basketTemplate), events)

function renderBasket() {
    let index: number = 1
    const basketList = cart.getCart().map(item => {
        const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
            onClick: () => events.emit('basket:removeItem', item)
        })
        card.index = index++
        return card.render(item)
    })
    basket.total = cart.totalCart()
    basket.basketList = basketList
}

const formOrder = new FormOrder(cloneTemplate(formOrderTemplate), events)

const formContacts = new FormContacts(cloneTemplate(formContactsTemplate), events)

const success = new Success(events, cloneTemplate(successTemplate))

// События
events.on('card:open', (item: IProduct) => {
    products.setSelectedProduct(item)
    const inCart = cart.isInCart(item.id)
    if (inCart) {
        cardModal.buyButtonState = 'remove'
    } else {
        cardModal.buyButtonState = 'buy'
    }
    if (!products.getSelectedProduct()?.price) {
        cardModal.buyButtonState = 'unavailable'
    }
    modal.content = cardModal.render(item)
    modal.show()
    // document.querySelector('.page')!.classList.add('page__wrapper_locked')
    document.body.style.overflow = 'hidden'
    // document.querySelector('.page')!.addEventListener('wheel', e => e.preventDefault(), { passive: false })
})

events.on('modal:close', () => {
    modal.hide()
    // document.querySelector('.page')!.classList.remove('page__wrapper_locked')
    document.body.style.removeProperty('overflow')
    // document.querySelector('.page')!.removeEventListener('wheel', e => e.preventDefault(), { passive: false })
})

events.on('basket:change', () => {
    header.counter = cart.sizeCart()
})

events.on('products:change', () => {
    renderCatalog()
})
// products.setProducts(apiProducts.items)

// events.on('cart:change', () => {
//     renderBasket()
// })

events.on('basket:open', () => {
    renderBasket()
    modal.content = basket.render()
    modal.show()
    document.body.style.overflow = 'hidden'
})

events.on('basket:removeItem', (item: IProduct) => {
    cart.removeFromCart(item)
    renderBasket()
    modal.content = basket.render()
})

events.on('order:open', () => {
    formOrder.errors = ''
    modal.content = formOrder.render()
    modal.show()
    document.body.style.overflow = 'hidden'
})

events.on('contacts:open', () => {
    formContacts.errors = ''
    modal.content = formContacts.render()
    modal.show()
    document.body.style.overflow = 'hidden'
})

events.on(`paymentSelect:card`, () => {
    buyer.setBuyer({ payment: 'card'})
    formOrder.payment = 'card'
})

events.on(`paymentSelect:cash`, () => {
    buyer.setBuyer({ payment: 'cash'})
    formOrder.payment = 'cash'
})

events.on('form:change', (data: { field: keyof IBuyer, value: string | TPayment }) => {
    buyer.setBuyer({ [data.field]: data.value } as Partial<IBuyer>)
})

events.on(`buyer:change`, () => {
    const {payment, address, phone, email} = buyer.validateBuyer() // errors
    if (!payment && !address) {
        formOrder.valid = true
        formOrder.errors = ''
    } else {
        formOrder.valid = false
        formOrder.errors = [payment, address]
    }
    if (!phone && !email) {
        formContacts.valid = true
        formContacts.errors = ''
    } else {
        formContacts.valid = false
        formContacts.errors = [phone, email]
    }
})

// events.on('success:open', async () => {
//     success.total = cart.totalCart()
//     modal.content = success.render()
//     modal.show()
//     document.body.style.overflow = 'hidden'
// })

events.on('success:open', async () => {
    if (buyer.validateBuyer().buyer) {
        const order: IOrder = {
            ...buyer,
            total: cart.totalCart(),
            items: cart.getCart().map(item => item.id)
        }
        let confirmOrder: number | string = ''
        try {
            const response: IResponseOrder = await productsApi.postOrder(order)
            console.log('ответ сервера на POST запрос:', response)
            if (response.total) {
                confirmOrder = response.total
                success.total = confirmOrder
                modal.content = success.render()
                modal.show()
                document.body.style.overflow = 'hidden'
            } else if (response.error) {
                confirmOrder = response.error
                modal.hide()
                document.body.style.removeProperty('overflow')
                alert(confirmOrder)
            }
            console.log('подтверждение заказа:', confirmOrder)
        } catch(e) {
            console.log('error:', e)
            modal.hide()
            document.body.style.removeProperty('overflow')
            alert(e)
        }
    } else {
        console.log('данные пользователя не валидны')
        modal.hide()
        document.body.style.removeProperty('overflow')
        alert('данные пользователя не валидны')
    }
})

events.on('success:close', () => {
    cart.clearCart()
    modal.hide()
    document.body.style.removeProperty('overflow')
})












