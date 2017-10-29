import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

//import containers
import { AppComponent } from './containers/app';
import { ComposePageComponent } from './containers/compose.container';
import { ViewPageComponent } from './containers/view.container';
import { RedirectPageComponent } from './containers/redirect.container';

//import components
import { ComposeComponent } from './components/compose.component';

//import services
import { LetterService } from './services/letter.service';

//routes
import { routes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    ComposePageComponent,
    ViewPageComponent,
    RedirectPageComponent,
    ComposeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    LetterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
