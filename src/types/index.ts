export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export type TPayment = 'card' | 'cash' | ''

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export interface IValidateBuyer {
    payment: string;
    email: string;
    phone: string;
    address: string;
    buyer: boolean;
}

export interface IResponseProducts {
    total: number;
    items: IProduct[];
}

export interface IOrder extends IBuyer {
    total: number;
    items: string[];
}

export interface IResponseOrder {
    id?: string;
    total?: number;
    error?: string;
}

// export type IResponseOrder = { id: string; total: number } | { error: string };

export interface ICardActions {
    onClick: () => void;
}

export type TBuyButtonState = 'buy' | 'remove' | 'unavailable'