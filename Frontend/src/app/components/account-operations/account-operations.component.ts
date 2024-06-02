import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountOperationModel } from '../../models/AccountOperation.model';

@Component({
  selector: 'app-account-operations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account-operations.component.html',
  styleUrl: './account-operations.component.css'
})
export class AccountOperationsComponent {

  public accountOperations: AccountOperationModel[] = []
  public accountNumber: string
  public displayedAccountNumber: string;

  constructor(private dataService: DataService) { }


  async getOperations() {
    try {
      this.accountOperations = await this.dataService.getAccountOperations(this.accountNumber)
      this.displayedAccountNumber = this.accountNumber
    } catch (error: any) {
      alert(error.message);
      this.clearAccountOperations()
    }
    this.clearFields()
  }

  clearFields() {
    this.accountNumber = null;
  }

  clearAccountOperations() {
    this.accountOperations = null;

  }

  public async deleteMe(_id: string): Promise<void> {
    try {
      const sure = confirm("Are you sure that you want to delete that operation?")
      if (!sure) return
      await this.dataService.deleteAccountOperation(_id)
      this.accountOperations = this.accountOperations.filter(o => o._id !== _id)
    }
    catch (error: any) {
      alert(error.message)
    }
  }
}