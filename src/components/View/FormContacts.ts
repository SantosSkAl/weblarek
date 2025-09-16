import { IBuyer } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

export interface IFormContacts extends Pick<IBuyer, 'phone' | 'email'> {}

export class FormContacts extends Form<IFormContacts> {
    protected phoneInput: HTMLInputElement
    protected emailInput: HTMLInputElement
    protected payButton: HTMLButtonElement

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container, events)
        this.phoneInput = ensureElement<HTMLInputElement>('.order__field [name="phone"]', this.container)
        this.emailInput = ensureElement<HTMLInputElement>('.order__field [name="email"]', this.container)
        this.payButton = ensureElement<HTMLButtonElement>('.modal__actions [type="submit"]', this.container)
        this.payButton.addEventListener('click', e => {
            e.preventDefault()
            this.events.emit(`success:open`)
        })
    }

    set phone(value: string) {
        this.phoneInput.value = value
    }

    set email(value: string) {
        this.emailInput.value = value
    }
}