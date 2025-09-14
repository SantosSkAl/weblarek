import { ICardActions, IProduct, TBuyButtonState } from "../../types";
import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";

// export interface ICardModal {
//     image: string;
//     category: string;
//     description: string;
// }

export interface ICardModal extends Omit<IProduct, 'id'> {
    // validPrice: boolean;
    // inBasket: boolean;
    buyButtonState: TBuyButtonState;
}

export class CardModal extends Card implements ICardModal {
    protected addRemoveButton: HTMLButtonElement
    protected imageElement: HTMLImageElement
    protected categoryElement: HTMLElement
    protected descriptionElement: HTMLElement

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container)
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container)
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container)
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container)
        this.addRemoveButton = ensureElement<HTMLButtonElement>('.card__button', this.container)
        // this.buttonElement.addEventListener('click', () => {
        //     this.events.emit('basket:change')
        // })
        if (actions?.onClick) {
            this.addRemoveButton.addEventListener('click', actions.onClick)
        }

        // децл подогнал под макет костылями, т.к. в стилях все перемешано
        // между компонентами (правишь в одном месте, сьезжает в другом)
        this.container.style.padding = '0'
        this.imageElement.style.margin = '0 48px 0 0'
    }
    
    set image(value: string) {
        this.setImage(this.imageElement, value, this.title)
        // this.imageElement.src = value
    }

    set category(value: string) {
        this.categoryElement.textContent = value
        // ToDo categoryMap
        type CategoryKey = keyof typeof categoryMap;
        this.categoryElement.classList.remove(...Object.values(categoryMap))
        this.categoryElement.classList.add(
            categoryMap[value as CategoryKey] ?? categoryMap['другое']
        ) // фолбек 'card__category_other' #FAD883 (красим в желтый невалидные значения)
    }

    set description(value: string) {
        this.descriptionElement.textContent = value
    }

    // set inBasket(value: boolean) {
    //     this.addRemoveButton.textContent = value ? `Удалить из корзины` : 'Купить'
    // }

    // set price(value: number | null) {
    //     super.price(value)
    //     if (value) {
    //         this.addRemoveButton.textContent = 'Купить'
    //         this.addRemoveButton.disabled = false
    //     } else {
    //         this.addRemoveButton.textContent = 'Недоступно'
    //         this.addRemoveButton.disabled = true
    //     }
    // }

    set buyButtonState(value: TBuyButtonState) {
        // по идее могу цеплять addEventListener прямо здесь к каждому кейсу 
        // отдельно, вместо передачи actions.onClick ? Как правельнее?
        switch (value) {
            case 'buy':
                this.addRemoveButton.textContent = 'Купить'
                this.addRemoveButton.disabled = false
                break
            case 'remove':
                this.addRemoveButton.textContent = 'Удалить из корзины'
                this.addRemoveButton.disabled = false
                break
            case 'unavailable':
                this.addRemoveButton.textContent = 'Недоступно'
                this.addRemoveButton.disabled = true
                break
        }   
    }
}