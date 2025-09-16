import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IBasket {
    basketList: HTMLElement[];
    total: number;
}

export class Basket extends Component<IBasket> {
    protected basketListElement: HTMLElement
    protected placeOrderButton: HTMLButtonElement
    protected totalPriceElement: HTMLElement

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container)
        this.basketListElement = ensureElement<HTMLElement>('.basket__list', this.container)
        this.totalPriceElement = ensureElement<HTMLElement>('.basket__price', this.container)
        this.placeOrderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container)
        this.placeOrderButton.addEventListener('click', e => {
            e.preventDefault()
            this.events.emit('order:open')
        })
    }

    set basketList(items: HTMLElement[]) {
        if (items.length !== 0) {
            this.basketListElement.replaceChildren(...items)
            this.placeOrderButton.disabled = false
        } else {
            this.basketListElement.textContent = 'Корзина пуста'
            this.basketListElement.style.color = 'gray'
            this.placeOrderButton.disabled = true
        }
    }

    set total(value: number) {
        this.totalPriceElement.textContent = `${String(value)} синапсов`
    }
}