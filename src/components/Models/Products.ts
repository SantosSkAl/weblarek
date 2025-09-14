import { IProduct } from "../../types"
import { IEvents } from "../base/Events"

export class Products {
    private productList: IProduct[]
    selectedProduct?: IProduct 

    constructor(
        protected events: IEvents,
        productList: IProduct[] = [],
        selectedProduct?: IProduct
    ) {
        this.productList = productList
        this.selectedProduct = selectedProduct
    }

    setProducts(products: IProduct[]): void {
        this.productList = products
        this.events.emit('products:change')
    }

    getProducts(): IProduct[] {
        return [...this.productList]
    }

    getProduct(id: string): IProduct | undefined {
        return this.productList.find(product => product.id === id)
    }

    setSelectedProduct(product: IProduct): void {
        this.selectedProduct = product
        this.events.emit('products:changeSelected')
    }

    getSelectedProduct(): IProduct | undefined {
        return this.selectedProduct
    }
}