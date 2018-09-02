import { Routes } from '@angular/router';
import { ComposePageComponent } from './containers/compose.container';
import { ViewPageComponent } from './containers/view.container';
import { RedirectPageComponent } from './containers/redirect.container';
import { HomeComponent } from './components/home.component';

//Automatically redirect to the homepage unless
//1. trying to compose but no id included in which case redirect to a new compose page
//2. compose with id included in which case allow for letter composition
//3. view with id included in which case show letter 
//4. preview with id included in which case show letter preview
export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'compose',
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
        path: 'preview/:id',
        component: ViewPageComponent
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
