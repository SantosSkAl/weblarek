import { ICardActions } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Card, ICard } from "./Card";

export interface ICardBasket extends ICard {
    index: number;
}

export class CardBasket extends Card implements ICardBasket {
    protected removeFromBasket: HTMLButtonElement
    protected indexElement: HTMLElement

    constructor(
        container: HTMLElement, actions?: ICardActions 
    ) {
        super(container)
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container)
        this.removeFromBasket = ensureElement<HTMLButtonElement>('.card__button', this.container)
        if (actions?.onClick) {
            this.removeFromBasket.addEventListener('click', actions.onClick)
        }
    }

    set index(value: number) {
        this.indexElement.textContent = String(value)
    }
}