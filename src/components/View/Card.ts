import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

// export interface ICard {
//     title: string;
//     price: number | null;
// }
export interface ICard extends Pick<IProduct, 'title' | 'price'> {}

export abstract class Card extends Component<ICard> {
    protected titleElement: HTMLElement
    protected priceElement: HTMLElement

    constructor(container: HTMLElement) {
        super(container)
        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container)
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container)
    }
    
    set title(value: string) {
        this.titleElement.textContent = value
    }

    set price(value: number | null) {
        // value 
        //     ? this.priceElement.textContent = `${value} синапсов`
        //     : this.priceElement.textContent = `Бесценно`
        this.priceElement.textContent = value ? `${value} синапсов` : `Бесценно`
    }
}