import { ICardActions, IProduct } from "../../types";
import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
// import { IEvents } from "../base/Events";
import { Card } from "./Card";

export interface ICardCatalog extends Omit<IProduct, 'id' | 'description'> {}

export class CardCatalog extends Card implements ICardCatalog  {
    protected imageElement: HTMLImageElement
    protected categoryElement: HTMLElement

    constructor(
        // protected events: IEvents,
        container: HTMLButtonElement, actions?: ICardActions 
    ) {
        super(container)
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container)
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container)
        // this.container.addEventListener('click', () => {
        //     this.events.emit('cardModal:open')  //card:select
        // })
        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick)
        }
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

        // Вариант из видеообзора с перебором ключей
        // for (const key in categoryMap) {
        //     this.categoryElement.classList.toggle(
        //         categoryMap[key as CategoryKey], key === value
        //     )
        // }
    }
}