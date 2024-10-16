import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes')
    },
    {
    path: 'auth2',
    loadChildren: () => import('./auth2/features/auth2.routes')
    }
    
];
