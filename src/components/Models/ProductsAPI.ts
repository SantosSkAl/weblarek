import { IApi, IProduct, IOrder, IResponseProducts, IResponseOrder } from "../../types";
// import { CDN_URL } from "../../utils/constants";

export class ProductsAPI {
    // private readonly api: IApi
    // readonly cdnURL: string

    // constructor(api: IApi, cdnURL: string = '') {
    //     this.api = api
    //     this.cdnURL = cdnURL
    // }

    constructor(
        private readonly api: IApi,
        readonly cdnURL: string
    ) {}

    // getProducts(): Promise<IProduct[]> {
    //     return this.api.get<IResponseProducts>('/product/')
    //         .then(data => data.items)
    // }

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