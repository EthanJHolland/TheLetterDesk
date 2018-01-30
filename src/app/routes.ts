import { Routes } from '@angular/router';
import { ComposePageComponent } from './containers/compose.container';
import { ViewPageComponent } from './containers/view.container';
import { RedirectPageComponent } from './containers/redirect.container';
import { RecievePageComponent } from './containers/recieve.container';
import { SendPageComponent } from './containers/send.container';
import { ReadComponent } from './components/read.component';
import { WriteComponent } from './components/write.component';

export const routes: Routes = [
    {
        path: '',
        component: RedirectPageComponent
    },
    {
        path: 'read',
        component: ReadComponent
    },
    {
        path: 'write',
        component: WriteComponent
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
