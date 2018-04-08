import { NgModule } from '@angular/core';
import { BLE } from '@ionic-native/ble';

import { BluetoothRequestService } from './services/BluetoohRequest';

@NgModule({
  declarations: [],
  providers: [
    BLE,
    BluetoothRequestService
  ],
  exports: []
})
export class SimpleBluetoothModule { }
