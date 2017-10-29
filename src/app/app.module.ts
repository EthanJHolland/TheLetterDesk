import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// import containers
import { AppComponent } from './containers/app';
import { ComposePageComponent } from './containers/compose.container';
import { ViewPageComponent } from './containers/view.container';

//routes
import { routes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    ComposePageComponent,
    ViewPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
