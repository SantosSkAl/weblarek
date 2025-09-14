import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IForm {
    valid: boolean;
    errors: string | string[];
}

export abstract class Form<T> extends Component<IForm> {
    protected submitButton: HTMLButtonElement
    protected errorsElement: HTMLElement

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container)
        this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container)
        this.submitButton = ensureElement<HTMLButtonElement>('.modal__actions .button', this.container)
        this.container.addEventListener('input', e => {
            const target = e.target as HTMLInputElement
            const field = target.name as keyof T
            const value = target.value
            // this.events.emit(`${this.container.name}.${String(field)}:change`)
            this.onInputChange(field, value)
        });
        this.container.addEventListener('submit', e => {
            e.preventDefault()
            this.events.emit(`${this.container.name}:submit`)
        });
    }

    protected onInputChange(field: keyof T, value: string) {
        // this.events.emit(`${this.container.name}.${String(field)}:change`, {
        this.events.emit(`form:change`, {
            field,
            value
        });
    }

    set valid(value: boolean) {
        // this.submitButton.toggleAttribute('disabled', !value)
        // this.submitButton.disabled = value ? false : true
        this.submitButton.disabled = !value
    }

    set errors(value: string | string[]) {
        // const errorsText: string = value.join(', ')
        const errorsText: string = Array.isArray(value)
            ? value.join(' ')
            : value
        this.errorsElement.textContent = errorsText
    }

    // разобраться как работало в ОНО
    // render(state: Partial<T> & IForm) {
    //     const {valid, errors, ...inputs} = state;
    //     super.render({valid, errors});
    //     Object.assign(this, inputs);
    //     return this.container;
    // }
}