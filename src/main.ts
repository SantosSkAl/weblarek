import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { Products } from './components/Models/Products';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';
import { ProductsAPI } from './components/Models/ProductsAPI';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';
import { IProduct } from './types';


// проверка классов с мок апи
console.log('<<<< Проверка классов посредством мок апи >>>>')
console.log('')

// товары
console.log('<< Товары >>')
const testProducts = new Products()
testProducts.setProducts(apiProducts.items)
console.log('товары из мок апи:', testProducts.getProducts())
const testProduct = testProducts.getProduct('412bcf81-7e75-4e70-bdb9-d3c73c9803b7')
console.log('запрос товара по id (корректный id)', testProduct)
if (testProduct) testProducts.setSelectedProduct(testProduct)
console.log('установка "выбранного" товара (корректный id) и запрос такового',
            testProducts.getSelectedProduct())
console.log('')

// корзина
console.log('<< Корзина >>')
console.log('(номера товаров соответствуют оригинальному мок списку)')
const testCart = new Cart()
testCart.addToCart(testProducts.getProducts()[1])
testCart.addToCart(testProducts.getProducts()[3])
console.log('корзина, в которую добавили товары 2 и 4:', testCart.getCart())
console.log('товаров в корзине:', testCart.sizeCart(),
            'на сумму:', testCart.totalCart())
console.log('проверка наличия в корзине товара с id последнего товара:',
            testCart.isInCart('412bcf81-7e75-4e70-bdb9-d3c73c9803b7'))
testCart.removeFromCart(testProducts.getProducts()[1])
console.log('корзина, после удаления товара 2:', testCart.getCart())
testCart.clearCart()
console.log('корзина, после применения отчистки:', testCart.getCart())
console.log('')

// покупец
console.log('<< Покупатель >>')
const testBuyer = new Buyer()
testBuyer.setBuyer({payment: 'card', email: 'asd@gmail.com'})
console.log('смотрим покупателя после добавления типа платежа и имейла',
            testBuyer.getBuyer())
console.log('проверяем наличие и корректность полей', testBuyer.validateBuyer())
testBuyer.setBuyer({phone: '12345678', address: 'Megacity'})
console.log('добавляем недостающие телефон и адрес и вновь проверяем поля',
            testBuyer.validateBuyer())
console.log('')
console.log('')


// проверка связи
console.log('<<<< Запрос списка товаров с сервера >>>>')
console.log('')

const apiInstance = new Api(API_URL)
const productsApi = new ProductsAPI(apiInstance)
try {
    const products: IProduct[] = await productsApi.getProducts()
    console.log('список товаров полученных с сервера:', products)
} catch(e) {
    console.log('error:', e)
}



