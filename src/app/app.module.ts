import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

// import containers
import { ComposePageComponent } from './containers/compose.container';
import { ViewPageComponent } from './containers/view.container';

@NgModule({
  declarations: [
    ComposePageComponent,
    ViewPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // <-- import the FormsModule before binding with [(ngModel)]
  ],
  bootstrap: [ViewPageComponent]
})
export class AppModule { }