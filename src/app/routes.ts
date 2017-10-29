import { Routes } from '@angular/router';
import { ComposePageComponent } from './containers/compose.container';
import { ViewPageComponent } from './containers/view.container';
import { RedirectPageComponent } from './containers/redirect.container';

export const routes: Routes = [
    {
        path: '',
        component: RedirectPageComponent
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
        component: RedirectPageComponent
    }
];
