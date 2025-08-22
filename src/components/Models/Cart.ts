import { IProduct } from "../../types"

export class Cart {
    private cart: IProduct[]

    constructor(cart: IProduct[] = []) {
        this.cart = cart
    }

    getCart(): IProduct[] {
        return [...this.cart]
    }

    addToCart(product: IProduct): void {
        if (product.price !== null) this.cart.push(product)
    }

    removeFromCart(product: IProduct): void {
        const idx = this.cart.findIndex(item => item.id === product.id);
        if (idx !== -1) this.cart.splice(idx, 1);
    }

    clearCart(): void {
        this.cart = []
    }

    totalCart(): number {
        return this.cart.reduce((acc, product) => acc + (product.price ?? 0), 0)
    }

    sizeCart(): number {
        return this.cart.length
    }

    isInCart(id: string): boolean {
        // return Boolean(this.cart.find(product => product.id === id))
        return this.cart.some(product => product.id === id)
    }
}