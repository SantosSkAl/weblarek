import { IProduct } from "../../types"
import { IEvents } from "../base/Events"

export class Cart {
    private cart: IProduct[]

    constructor(protected events: IEvents, cart: IProduct[] = []) {
        this.cart = cart
    }

    getCart(): IProduct[] {
        return [...this.cart]
    }

    addToCart(product: IProduct): void {
        if (product.price !== null) {
            this.cart.push(product)
            this.events.emit('cart:change')
        }
    }

    removeFromCart(product: IProduct): void {
        const idx = this.cart.findIndex(item => item.id === product.id)
        if (idx !== -1) this.cart.splice(idx, 1)
        this.events.emit('cart:change')
    }

    clearCart(): void {
        this.cart = []
        this.events.emit('cart:change')
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