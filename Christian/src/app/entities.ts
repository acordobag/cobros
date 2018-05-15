import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/compiler/src/core";

export class Customer {
    id: number;
    citizenId: string;
    name: string;
    lastName: string;
    location: Location;
    email: string;
    phone: number;
    accounts: Array<Account>;
    fullName: String;

    constructor() {
        this.id = undefined;
        this.citizenId = "";
        this.name = "";
        this.lastName = "";
        this.email = "";
        this.phone = undefined;
        this.location = undefined;
        this.accounts = new Array<Account>();
        this.fullName = "";
    }
}

export class Location {
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
        this.account= new Account();
    }
}

export class User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
}