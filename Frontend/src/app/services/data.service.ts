import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appConfig } from '../app.config';
import { firstValueFrom } from 'rxjs';
import { AccountOperationModel } from '../models/AccountOperation.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) { }

    // Get account operations by account number
    public async getAccountOperations(accountNumber: string): Promise<AccountOperationModel[]> {
        const observable = this.http.get<AccountOperationModel[]>(appConfig.accountOperationsUrl + accountNumber);
        const accountOperations = await firstValueFrom(observable);
        return accountOperations;
    }

    // Add account operations to choosen account 
    async addAccountOperations(accountOperation: AccountOperationModel): Promise<void> {
        const observable = this.http.post<AccountOperationModel>(appConfig.accountOperationsUrl, accountOperation)
        const addedAccountOperation = await firstValueFrom(observable)
        console.log(addedAccountOperation);
    }

    // Delete account operations from choosen account
    async deleteAccountOperation(_id: string): Promise<void> {
        const observable = this.http.delete<AccountOperationModel>(appConfig.accountOperationsUrl + _id)
        await firstValueFrom(observable)
    }

}
