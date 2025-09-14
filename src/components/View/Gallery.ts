// import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface IGallery {
    catalog: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
    // protected catalogElement: HTMLElement

    constructor(protected container: HTMLElement) {
        super(container)
        // this.catalogElement = ensureElement<HTMLElement>('.gallery', this.container)
        // this.catalogElement = container
    }

    set catalog(items: HTMLElement[]) {
        // this.catalogElement.replaceChildren(...items)
        this.container.replaceChildren(...items)
        // this.catalogElement.innerHTML = ''
        // items.forEach(el => this.catalogElement.appendChild(el))
    }
}