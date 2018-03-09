export class Customer {
    id: string;
    name: string;
    lastName: string;
    location: Location;
    email: string;
    phone: number;

    constructor() {
        this.id = "";
        this.name = "";
        this.lastName = "";
        this.email = "";
        this.phone = 1;
        this.location = new Location();
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
    name: string;
    initialAmmount: number;
    actualAmmount: number;
    interestRate: number;
    numberOfPayments: number;
    charge: number
    paymentTerm: PaymentMethod;
    customer: Customer;
    payments: Array<Payment>;
    already_pay: boolean;
}
export class PaymentMethod {
    id: number;
    name: string;
}

export class Payment {
    ammount: number;
    approved: boolean;
    date: Date;
    user: User;
}

export class User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
}