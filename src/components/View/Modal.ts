import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IModal {
    content: HTMLElement;
    show(): void;
    hide(): void;
}

export class Modal extends Component<IModal> {
    protected closeButton: HTMLButtonElement
    protected contentElement: HTMLElement

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container)
        this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container)
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container)
        this.closeButton.addEventListener('click', () => this.events.emit('modal:close'))
        this.container.addEventListener(
            'click', (e) => {
                // this.events.emit('modal:close')
                if (e.target === e.currentTarget) {
                    this.events.emit('modal:close');
                }
            }
        )
        // this.contentElement.addEventListener('click', e => e.stopPropagation())
        // this.container.querySelector('.modal__container')?.addEventListener('click', e => e.stopPropagation())
    }

    set content(value: HTMLElement) {
        this.contentElement.replaceChildren(value)
    }

    show() {
        this.container.classList.add('modal_active')
    }

    hide() {
        this.container.classList.remove('modal_active')
        this.contentElement.replaceChildren()
        // this.modalElement.innerHTML = ''
    }
}