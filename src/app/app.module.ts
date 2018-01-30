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
import { EnvelopeComponent } from './components/envelope.component';
import { ReadComponent } from './components/read.component';
import { WriteComponent } from './components/write.component';

//import services
import { LetterService } from './services/letter.service';
import { EnvelopeService } from './services/envelope.service';
import { ReadWriteService } from './services/readwrite.service';

//routes
import { routes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    ComposePageComponent,
    ViewPageComponent,
    RedirectPageComponent,
    PaperComponent,
    EnvelopeComponent,
    SendPageComponent,
    RecievePageComponent,
    ReadComponent,
    WriteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    LetterService,
    EnvelopeService,
    ReadWriteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
