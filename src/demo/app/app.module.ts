import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SimpleBluetooth } from 'simple-bluetooth-ionic-module';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, SimpleBluetooth],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
