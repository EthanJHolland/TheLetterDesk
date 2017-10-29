import { Routes } from '@angular/router';
import { ComposePageComponent } from './containers/compose.container';
import { ViewPageComponent } from './containers/view.container';

export const routes: Routes = [
    {
        path: '',
        component: ComposePageComponent
    },
    {
        path:'compose/:id',
        component: ComposePageComponent
    },
    {
        path: 'view/:id',
        component: ViewPageComponent
    },
    {
        path: '**',
        component: ComposePageComponent
    }
];
