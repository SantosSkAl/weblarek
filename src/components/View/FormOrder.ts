import { IBuyer, TPayment } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

export interface IFormOrder extends Pick<IBuyer, 'payment' | 'address'> {}

export class FormOrder extends Form<IFormOrder> {
    protected paymentCardButton: HTMLButtonElement
    protected paymentCashButton: HTMLButtonElement
    protected addressInput: HTMLInputElement
    protected proceedButton: HTMLButtonElement

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container, events)
        this.paymentCardButton = ensureElement<HTMLButtonElement>('.order__buttons [name="card"]', this.container)
        this.paymentCashButton = ensureElement<HTMLButtonElement>('.order__buttons [name="cash"]', this.container)
        this.addressInput = ensureElement<HTMLInputElement>('.order__field [name="address"]', this.container)
        this.proceedButton = ensureElement<HTMLButtonElement>('.modal__actions [type="submit"]', this.container)
        this.paymentCardButton.addEventListener('click', () => {
            this.events.emit(`paymentSelect:card`)
        })
        this.paymentCashButton.addEventListener('click', () => {
            this.events.emit(`paymentSelect:cash`)
        })
        this.proceedButton.addEventListener('click', e => {
            e.preventDefault()
            this.events.emit(`contacts:open`)
        })
    }

    set payment(value: TPayment) { // 'card' | 'cash' | ''
        this.paymentCardButton.classList.toggle('button_alt-active', value === 'card')
        this.paymentCashButton.classList.toggle('button_alt-active', value === 'cash')
    }

    set address(value: string) {
        this.addressInput.value = value
    }
}