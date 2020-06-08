//angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

//import containers
import { AppComponent } from './containers/app';
import { RedirectPageComponent } from './containers/redirect.container';
import { ComposePageComponent } from './containers/compose.container';
import { ViewPageComponent } from './containers/view.container';

//import components
import { HomeComponent } from './components/home.component';
import { ComposeComponent } from './components/compose.component';
import { ViewComponent } from './components/view.component';

//import services
import { PasswordService } from './services/password.service';
import { DeviceService } from './services/device.service';
import { ReadWriteService } from './services/readwrite.service';

//routes
import { routes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    RedirectPageComponent,
    ComposePageComponent,
    ViewPageComponent,
    HomeComponent,
    ComposeComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    PasswordService,
    DeviceService,
    ReadWriteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
