import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-area/home/home.component';
import { Page404Component } from './components/layout-area/page404/page404.component';
import { AccountOperationsComponent } from './components/account-operations/account-operations.component';
import { AddDataComponent } from './components/add-data/add-data.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "add", component: AddDataComponent },
    { path: "accountOperations", component: AccountOperationsComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "**", component: Page404Component },
];
