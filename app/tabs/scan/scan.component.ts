import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, Inject, NgZone } from "@angular/core";
import { Observable as RxObservable } from 'rxjs/Observable';

import { ObservableArray, ChangedData, ChangeType } from "tns-core-modules/data/observable-array";

import { MyHttpGetService } from "../../shared/MyHttpGetService/http-get.services";

import * as applicationSettingsModule from "application-settings";

import { BarcodeScanner } from "nativescript-barcodescanner";

import * as dialogs from "ui/dialogs";

import { Nfc, NfcNdefData, NfcTagData } from "nativescript-nfc";

@Component({
    selector: 'Scan',
    moduleId: module.id,
    templateUrl: "./scan.component.html",
    styleUrls: ["./scan.component.css"],
    //changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MyHttpGetService]
})

export class ScanComponent implements OnInit {

    private nfc: Nfc
    private almaitem: ObservableArray<Array<any>>
    constructor(
        private myService: MyHttpGetService,
        private barcodeScanner: BarcodeScanner,
        private ngZone: NgZone
    ) {
        this.nfc = new Nfc();           
    }
    barcodeformat: string;
    barcode: string;
    //almaitem: Array<Object> = [];
    

    ngOnInit(): void {
        this.doStartTagListener();
    }
    
    writetag(){
        this.nfc.writeTag({
            textRecords: [
                {
                  id: [1],
                  text: "Hello"
                },
                {
                  id: [3,7],
                  text: "Goodbye"
                }
            ]
        }).then(function() {
            console.log("Wrote text records 'Hello' and 'Goodbye'");
        }, function(err) {
            alert(err);
        });
    }

    scan() {
        this.barcodeScanner.scan({
            formats:"QR_CODE, EAN_13",
            cancelLabel: "EXIT. Also, try the volume buttons!",
            cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
            message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
            showFlipCameraButton: true,   // default false
            preferFrontCamera: false,     // default false
            showTorchButton: true,        // default false
            beepOnScan: true,             // Play or Suppress beep on scan (default true)
            torchOn: false,               // launch with the flashlight on (default false)
            closeCallback: () => { console.log("Scanner closed")}, // invoked when the scanner was closed (success or abort)
            resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
            orientation: "default",     // Android only, default undefined (sensor-driven orientation), other options: portrait|landscape
            openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
        }).then((result) => {
              // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
              console.dir(result)
              this.barcodeformat =  result.format;
              this.barcode = result.text;
              this.myService.getAlmaItem("1231231231")
              .subscribe((result) => {
                  this.onGetDataSuccess(result)
              }, (error) => {
                  this.onGetDataError(error)
              });
              /* 
              //fungerar ej?
              dialogs.prompt({
                title: "Scan result",
                message: "Format: " + result.format + ",\nValue: " + result.text,
                okButtonText: "OK"
              });
              */
            }, (errorMessage) => {
              console.log("No scan. " + errorMessage);
            }
          );
    }
    
    public doStartTagListener() {
        if(this.almaitem){
            console.dir(this.almaitem);
            //this.almaitem.splice(0,this.almaitem.length);
        }
        
        this.nfc.setOnTagDiscoveredListener((data: NfcTagData) => {

            //kör i ngzone för att UI ska uppdateras direkt.
            this.ngZone.run(() => {
                //this.almaitem.length = 0;
                this.barcode = data.barcode;
                this.myService.getAlmaItem(data.barcode)
                .subscribe((result) => {
                    this.onGetDataSuccess(result)
                }, (error) => {
                    this.onGetDataError(error)
                });
                this.doStopTagListener()
            });
            
            
        }).then(() => {
          console.log("OnTagDiscovered Listener set");
        }, (err) => {
          alert(err);
        });
      }
    
      public doStopTagListener() {
        this.nfc.setOnTagDiscoveredListener(null).then(() => {
          console.log("OnTagDiscovered nulled");
        }, (err) => {
          alert(err);
        });
      }


    rfid() {
        this.nfc.available().then((avail) => {
            console.log(avail ? "Yes" : "No");
        });

        this.nfc.enabled().then((on) => {
            console.log(on ? "Yes" : "No");
        });
        const that = this;
    }

    private onGetDataSuccess(res) {
        this.almaitem = res;
        console.dir(this.almaitem);
    }

    private onGetDataError(error: Response | any) {
        console.log("onGetDataError: " + error.status);
        if (error.status === 401) {
            //skicka till login
        }
        if (error.status === 404) {
            //skicka till login
            alert("Tjänsten inte tillgänglig");
        }
        
    }

    
}