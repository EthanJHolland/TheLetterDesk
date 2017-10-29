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
import { RecievePageComponent } from './containers/recieve.container';
import { SendPageComponent } from './containers/send.container';

//import components
import { PaperComponent } from './components/paper.component';

//import services
import { LetterService } from './services/letter.service';
import { EnvelopeService } from './services/envelope.service';

//routes
import { routes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    ComposePageComponent,
    ViewPageComponent,
    RedirectPageComponent,
    PaperComponent,
    SendPageComponent,
    RecievePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    LetterService,
    EnvelopeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
