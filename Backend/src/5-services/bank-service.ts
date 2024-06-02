import { AccountOperationModel, IAccountOperationModel } from "../3-models/accountoperation-model";
import { AccountNumberNotFoundError, ValidationError } from "../3-models/client-errors";

class DataService {

    public async getAccountOperationsByAccountNumber(accountNumber: number): Promise<IAccountOperationModel[]> {
        const operations = await AccountOperationModel.find({ accountNumber: { $eq: accountNumber } }).exec();
        if (!operations || operations.length === 0) {
            throw new AccountNumberNotFoundError(accountNumber)
        }
        return operations;
    }

    // Add account operation
    public async addAccountOperation(operation: IAccountOperationModel): Promise<IAccountOperationModel> {
        const errors = operation.validateSync();
        if (errors) throw new ValidationError(errors.message);
        return operation.save();
    }

    // Delete account operation
    public async deleteAccountOperation(_id: string): Promise<void> {
        await AccountOperationModel.findByIdAndDelete(_id).exec()
    }


}

export const bankService = new DataService();
