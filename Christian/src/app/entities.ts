import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/compiler/src/core";

export class Customer {
    id: number;
    citizenId: string;
    name: string;
    lastName: string;
    zone: Zone;
    email: string;
    phone: number;
    accounts: Array<Account>;
    fullName: String;
    addresses: Array<Address>;

    constructor() {
        this.id = undefined;
        this.citizenId = "";
        this.name = "";
        this.lastName = "";
        this.email = "";
        this.phone = undefined;
        this.zone = undefined;
        this.accounts = new Array<Account>();
        this.fullName = "";
    }
}

export class Zone {
    id: number;
    name: string;
    customers: Array<Customer>;
    constructor() {
        this.id = 0;
        this.name = "";
        this.customers = new Array<Customer>();
    }
}

export class Account {
    id: number;
    name: string;
    initialAmmount: number;
    actualAmmount: number;
    interestRate: number;
    numberOfPayments: number;
    charge: number;
    paymentTerm: PaymentTerm;
    customer: Customer;
    payments: Array<Payment>;
    already_pay: boolean;

    constructor() {
        this.customer = new Customer();
    }
}

export class Address {
    id: number;
    street: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
    detail: string;
    isPreferred: number;
    customer: Customer;

    constructor() {
        this.customer = new Customer();
        this.country = 'CR'
    }
}
export class PaymentTerm {
    id: number;
    name: string;
}

export class Payment {
    ammount: number;
    approved: boolean;
    date: Date;
    user: User;
    account: Account;
    constructor() {
        this.ammount = 0;
        this.approved = false;
        this.date = new Date();
        this.account = new Account();
    }
}

export class User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export class Btn {
    text: string;
    color: string;
    icon: string;

    constructor(text: string) {
        this.text = text;
        this.color = 'btn-primary';
    }
}