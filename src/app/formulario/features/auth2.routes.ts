import { Routes } from "@angular/router";

export default[
    {
    path: 'ejemplo1',
    loadComponent:()=>import('../../auth2/features/ejemplo1/ejemplo1.component'),
    }
]