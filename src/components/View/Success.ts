import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface ISuccess {
    total: number;
}

export class Success extends Component<ISuccess> {
    protected closeButton: HTMLButtonElement
    protected totalPriceElement: HTMLElement

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container)
        this.totalPriceElement = ensureElement<HTMLElement>('.order-success__description', this.container)
        this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container)
        this.closeButton.addEventListener('click', e => {
            e.preventDefault()
            this.events.emit('success:close') // 'success:close'
        })
    }

    set total(value: number) {
        this.totalPriceElement.textContent = `Списано ${value} синапсов`
    }
}