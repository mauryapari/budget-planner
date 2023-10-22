export interface account {
    user_id: string;
    _id: string;
    account_type: string;
    account_name: string;
    balance: number;
}

export interface transaction {
    _id: string;
    transaction: string;
    amount: number;
    transactionType: string;
    transactionDate: Date;
    accountID: string;
    account: string
}

export type formattedTransaction = Omit<transaction, "transactionDate"> & { transactionDate: string }
