import { ICardActions } from "../../types";
import { ensureElement } from "../../utils/utils";
// import { IEvents } from "../base/Events";
import { Card, ICard } from "./Card";

export interface ICardBasket extends ICard {
    index: number;
}

export class CardBasket extends Card implements ICardBasket {
    protected removeFromBasket: HTMLButtonElement
    protected indexElement: HTMLElement

    constructor(
        // protected events: IEvents,
        container: HTMLElement, actions?: ICardActions 
    ) {
        super(container)
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container)
        this.removeFromBasket = ensureElement<HTMLButtonElement>('.card__button', this.container)
        // this.removeFromBasket.addEventListener('click', () => {
        //     this.events.emit('basket:removeItem')
        // })
        if (actions?.onClick) {
            this.removeFromBasket.addEventListener('click', actions.onClick)
        }

        // чтобы иконка удаления не наезжала на прокрутку у длинного списка
        this.removeFromBasket.style.marginInlineEnd = '20px'
    }

    set index(value: number) {
        this.indexElement.textContent = String(value)
    }
}