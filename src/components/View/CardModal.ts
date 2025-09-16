import { ICardActions, IProduct, TBuyButtonState } from "../../types";
import { ensureElement } from "../../utils/utils";
import { CardCatalog } from "./CardCatalog";

export interface ICardModal extends Omit<IProduct, 'id'> {
    buyButtonState: TBuyButtonState;
}

export class CardModal extends CardCatalog implements ICardModal {
    protected addRemoveButton: HTMLButtonElement
    protected descriptionElement: HTMLElement

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container as HTMLButtonElement)
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container)
        this.addRemoveButton = ensureElement<HTMLButtonElement>('.card__button', this.container)
        if (actions?.onClick) {
            this.addRemoveButton.addEventListener('click', actions.onClick)
        }
    }

    set description(value: string) {
        this.descriptionElement.textContent = value
    }

    set buyButtonState(value: TBuyButtonState) {
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