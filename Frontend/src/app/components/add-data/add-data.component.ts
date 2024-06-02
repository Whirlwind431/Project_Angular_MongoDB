import { Component } from '@angular/core';
import { AccountOperationModel } from '../../models/AccountOperation.model';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],

  styleUrls: ['./add-data.component.css']
})

export class AddDataComponent {
  accountNumber: number
  selectedType: string
  sum: number
  payments: number
  interest: number

  operationTypes = ["deposit", "withdrawal", "loan"]

  constructor(private accountOperationService: DataService, private router: Router) { }

  validateFields(): boolean {

    if (!this.accountNumber) {
      alert('Account Number is required.')
      return false
    }
    if (!this.selectedType) {
      alert('Operation Type is required.')
      return false
    }
    if (!this.sum) {
      alert('Sum is required.')
      return false
    }

    if (this.selectedType === 'loan') {
      if (!this.payments) {
        alert('Payments are required for loans.')
        return false
      }
      if (!this.interest) {
        alert('Interest is required for loans.')
        return false
      }
    }
    return true
  }


  saveOperation() {
    if (!this.validateFields()) {
      return;
    }
    const accountOperation: AccountOperationModel = {
      accountNumber: this.accountNumber,
      type: this.selectedType,
      sum: this.sum,
      date: new Date(),
      interest: this.interest,
      payments: this.payments
    };

    this.accountOperationService.addAccountOperations(accountOperation)
      .then(() => {
        console.log("Account operation added successfully.")
        this.clearFields()
        this.router.navigate(['/home'])

      })
      .catch(error => {
        console.log("Error occurred while adding account operation:", error)
      })
  }

  clearFields() {
    this.accountNumber = null
    this.selectedType = null
    this.sum = null
    this.payments = null
    this.interest = null
  }

}