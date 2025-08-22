import { IProduct } from "../../types"

export class Products {
    private productList: IProduct[]
    selectedProduct?: IProduct 

    constructor(productList: IProduct[] = [],
                selectedProduct?: IProduct) {
        this.productList = productList
        this.selectedProduct = selectedProduct
    }

    setProducts(products: IProduct[]): void {
        this.productList = products
    }

    getProducts(): IProduct[] {
        return [...this.productList]
    }

    getProduct(id: string): IProduct | undefined {
        return this.productList.find(product => product.id === id)
    }

    setSelectedProduct(product: IProduct): void {
        this.selectedProduct = product
    }

    getSelectedProduct(): IProduct | undefined {
        return this.selectedProduct
    }
}