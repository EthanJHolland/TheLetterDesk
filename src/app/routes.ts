import { Routes } from '@angular/router';
import { ComposePageComponent } from './containers/compose.container';
import { ViewPageComponent } from './containers/view.container';
import { RedirectPageComponent } from './containers/redirect.container';
import { RecievePageComponent } from './containers/recieve.container';
import { SendPageComponent } from './containers/send.container';

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
        path: 'send/:id',
        component: SendPageComponent
    },
    {
        path: 'recieve/:id',
        component: RecievePageComponent
    },
    {
        path: '**',
        component: RedirectPageComponent
    }
];
