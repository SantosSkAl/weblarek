import { IApi, IProduct, IOrder, IResponseProducts, IResponseOrder } from "../../types";

export class ProductsAPI {
    constructor(
        private readonly api: IApi,
        readonly cdnURL: string
    ) {}

    getProducts(): Promise<IProduct[]> {
        return this.api.get<IResponseProducts>('/product/')
            .then(data => data.items.map(item => ({
                ...item,
                // image: CDN_URL + item.image
                image: (this.cdnURL + item.image)
                    .replace(/\.svg$/i, '.png')
            })))
    }

    postOrder(data: IOrder): Promise<IResponseOrder> {
        return this.api.post<IResponseOrder>('/order/', data)
    }
}