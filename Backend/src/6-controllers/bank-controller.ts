import express, { Request, Response, NextFunction } from "express"
import { bankService } from "../5-services/bank-service"
import { AccountOperationModel } from "../3-models/accountoperation-model"
import { StatusCode } from "../3-models/enums"


const router = express.Router() // Capital R

// GET http://localhost:4000/api/account-operations
router.get("/account-operations/:accountNumber", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const accountNumber = +request.params.accountNumber
        console.log(accountNumber);
        const operations = await bankService.getAccountOperationsByAccountNumber(accountNumber)

        console.log(operations);

        response.json(operations)
    } catch (error: any) {
        next(error)
    }
})



// POST http://localhost:4000/api/accountOperations
router.post("/account-operations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const operation = new AccountOperationModel(request.body);
        const addedoperation = await bankService.addAccountOperation(operation)
        response.json(addedoperation)
        // response.sendStatus(StatusCode.Created)
    } catch (error: any) {
        next(error)
    }
})

// DELETE http://localhost:4000/api/accountOperations
router.delete("/account-operations/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id
        await bankService.deleteAccountOperation(_id)
        response.sendStatus(StatusCode.NoContent)
    } catch (error: any) {
        next(error)
    }
})



export default router












