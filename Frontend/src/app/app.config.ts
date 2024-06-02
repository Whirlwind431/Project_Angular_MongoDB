import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig = {
    providers: [provideRouter(routes), provideHttpClient()],

    accountOperationsUrl: "http://localhost:4000/api/account-operations/"
};
