export class Customer {
    id: number;
    citizenId: string;
    name: string;
    lastName: string;
    location: Location;
    email: string;
    phone: number;
    accounts: Array<Account>;

    constructor() {
        this.id = undefined;
        this.citizenId = "";
        this.name = "";
        this.lastName = "";
        this.email = "";
        this.phone = undefined;
        this.location = new Location();
        this.accounts = new Array<Account>();
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
    charge: number;
    paymentTerm: PaymentTerm;
    customerId: number;
    payments: Array<Payment>;
    already_pay: boolean;
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
    accountId: number;
    
    constructor() {
        this.ammount = 0;
        this.approved = false;
        this.date = new Date();
    }
}

export class User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
}