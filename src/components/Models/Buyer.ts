import { IBuyer, IValidateBuyer, TPayment } from "../../types";
import { IEvents } from "../base/Events";
// import { BUYER_FIELDS_VALIDATORS as BFV } from "../../utils/constants";

export class Buyer implements IBuyer {
    payment: TPayment = ''
    email: string = ''
    phone: string = ''
    address: string = ''

    constructor(protected events: IEvents) {}

    setBuyer(buyerUpdates: Partial<IBuyer>): void {
        this.payment = buyerUpdates.payment ?? this.payment;
        this.email   = buyerUpdates.email   ?? this.email;
        this.phone   = buyerUpdates.phone   ?? this.phone;
        this.address = buyerUpdates.address ?? this.address;
        this.events.emit('buyer:change')
    }

    getBuyer(): IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address
        }
    }

    resetBuyer(): void {
        this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
        this.events.emit('buyer:change')
    }

    validateBuyer(): IValidateBuyer {
        return {
            payment: this.payment !== '' ? '' : 'Необходимо выбрать вид оплаты',
            email: this.email !== '' ? '' : 'Необходимо указать email',
            phone: this.phone !== '' ? '' : 'Необходимо указать телефон',
            address: this.address !== '' ? '' : 'Необходимо указать адрес',
            buyer: this.payment !== '' && this.email !== ''
                   && this.phone !== '' && this.address !== ''
        }
    }

    // validateBuyer(): boolean {
    //     const paymentIsValid = this.payment !== ''
    //     const emailIsValid = BFV.EMAIL_REGEX.test(this.email.trim())
    //     const phoneDigits = this.phone.trim().replace(/\D/g, '');
    //     const phoneIsValid = 
    //         BFV.PHONE_CHARS_REGEX.test(this.phone.trim()) &&
    //         phoneDigits.length >= BFV.PHONE_MIN_DIGITS &&
    //         phoneDigits.length <= BFV.PHONE_MAX_DIGITS
    //     const addressIsValid = this.address.trim().length > 7
    //     return paymentIsValid && emailIsValid
    //            && phoneIsValid && addressIsValid
    // }
}