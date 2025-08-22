import { IApi, IProduct, IOrder, IResponseProducts, IResponseOrder } from "../../types";


// Сергей: Нужно попрактиковаться с композицией. 
// Для этого нужно передать в твой новый класс базовый класс Api,
// чтобы использовать его методы. НО передавать сам класс нельзя,
// это делает классы связанными. нужно использовать инверсию зависимостей.
// Т.е. передаем объект, соответствующий интерфейсу. У тебя это будет
// экземпляр класса Api. Если мы указываем в новом классе параметр с
// типом IApi, то таким образом говорим, что в него будет приходить объект,
// у которого есть методы get и post, но каким именно классом мы этот объект
// создадим, никакой разницы нет. Это и есть слабая связь между классами или
// инверсия зависимости. Единственное место в проекте, где можно ее
// реализовать. Но очень мощный на самом деле инструмент. Нужно
// попробовать и понять его принцип работы.

export class ProductsAPI {
    private readonly api: IApi

    constructor(api: IApi) {
        this.api = api
    }

    getProducts(): Promise<IProduct[]> {
        return this.api.get<IResponseProducts>('/product/')
            .then(data => data.items)
    }

    postOrder(data: IOrder): Promise<IResponseOrder> {
        return this.api.post<IResponseOrder>('/order/', data)
    }
}