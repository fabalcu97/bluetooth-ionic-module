import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble';
import { Observable } from 'rxjs/Observable';

const READ_SERVICE_UUID = 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb07';
const READ_CHARACTERISTIC_UUID = 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb08';
const WRITE_SERVICE_UUID = 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb09';
const WRITE_CHARACTERISTIC_UUID = 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb10';

@Injectable()
export class BluetoothRequestService {

  // Attributes
    private services: any;
    private deviceId: string;
    private bleService: BLE;

  // Methods
    constructor (bleService: BLE) {
      this.bleService = bleService;
      this.services = {
        read: {
          uuid: READ_SERVICE_UUID,
          characteristics: {
            read: READ_CHARACTERISTIC_UUID
          }
        },
        write: {
          uuid: WRITE_SERVICE_UUID,
          characteristics: {
            write: WRITE_CHARACTERISTIC_UUID
          }
        }
      };
    }

    public request (data: string) {
      return new Observable((observer) => {
        this.sendMessage(data).then( () => {
          this.readMessage().then(resp => {
            observer.next({
              data: resp
            });
            observer.complete();
          }).catch(err => {
            observer.error({error: err});
          });
        });
      });
    }

    public connect (deviceId: string) {
      this.deviceId = deviceId;
      return this.bleService.connect(this.deviceId);
    }

    public disconnect () {
      return this.bleService.disconnect(this.deviceId);
    }

    public reportDeviceConnection () {
      return this.bleService.isConnected(this.deviceId);
    }

    private sendMessage (message: string) {
      let buffer = this.stringToBytes(message);
      return this.bleService.write(this.deviceId, this.services.write.uuid, this.services.write.characteristics.write, buffer);
    }

    private readMessage () {
      return this.bleService.read(this.deviceId, this.services.read.uuid, this.services.read.characteristics.read);
    }

    private stringToBytes(message: string) {
      const array = new Uint8Array(message.length);
      for (let i = 0, l = message.length; i < l; i++) {
        array[i] = message.charCodeAt(i);
      }
      return array.buffer;
    }

    private bytesToString(buffer: any) {
      return String.fromCharCode.apply(null, new Uint8Array(buffer));
    }

}
