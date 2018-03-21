"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_get_services_1 = require("../../shared/MyHttpGetService/http-get.services");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var nativescript_nfc_1 = require("nativescript-nfc");
var ScanComponent = (function () {
    function ScanComponent(myService, barcodeScanner, ngZone) {
        this.myService = myService;
        this.barcodeScanner = barcodeScanner;
        this.ngZone = ngZone;
        this.nfc = new nativescript_nfc_1.Nfc();
    }
    //almaitem: Array<Object> = [];
    ScanComponent.prototype.ngOnInit = function () {
        this.doStartTagListener();
    };
    ScanComponent.prototype.writetag = function () {
        this.nfc.writeTag({
            textRecords: [
                {
                    id: [1],
                    text: "Hello"
                },
                {
                    id: [3, 7],
                    text: "Goodbye"
                }
            ]
        }).then(function () {
            console.log("Wrote text records 'Hello' and 'Goodbye'");
        }, function (err) {
            alert(err);
        });
    };
    ScanComponent.prototype.scan = function () {
        var _this = this;
        this.barcodeScanner.scan({
            formats: "QR_CODE, EAN_13",
            cancelLabel: "EXIT. Also, try the volume buttons!",
            cancelLabelBackgroundColor: "#333333",
            message: "Use the volume buttons for extra light",
            showFlipCameraButton: true,
            preferFrontCamera: false,
            showTorchButton: true,
            beepOnScan: true,
            torchOn: false,
            closeCallback: function () { console.log("Scanner closed"); },
            resultDisplayDuration: 500,
            orientation: "default",
            openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
        }).then(function (result) {
            // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
            console.dir(result);
            _this.barcodeformat = result.format;
            _this.barcode = result.text;
            _this.myService.getAlmaItem("1231231231")
                .subscribe(function (result) {
                _this.onGetDataSuccess(result);
            }, function (error) {
                _this.onGetDataError(error);
            });
            /*
            //fungerar ej?
            dialogs.prompt({
              title: "Scan result",
              message: "Format: " + result.format + ",\nValue: " + result.text,
              okButtonText: "OK"
            });
            */
        }, function (errorMessage) {
            console.log("No scan. " + errorMessage);
        });
    };
    ScanComponent.prototype.doStartTagListener = function () {
        var _this = this;
        if (this.almaitem) {
            console.dir(this.almaitem);
            //this.almaitem.splice(0,this.almaitem.length);
        }
        this.nfc.setOnTagDiscoveredListener(function (data) {
            //kör i ngzone för att UI ska uppdateras direkt.
            _this.ngZone.run(function () {
                //this.almaitem.length = 0;
                _this.barcode = data.barcode;
                _this.myService.getAlmaItem(data.barcode)
                    .subscribe(function (result) {
                    _this.onGetDataSuccess(result);
                }, function (error) {
                    _this.onGetDataError(error);
                });
                _this.doStopTagListener();
            });
        }).then(function () {
            console.log("OnTagDiscovered Listener set");
        }, function (err) {
            alert(err);
        });
    };
    ScanComponent.prototype.doStopTagListener = function () {
        this.nfc.setOnTagDiscoveredListener(null).then(function () {
            console.log("OnTagDiscovered nulled");
        }, function (err) {
            alert(err);
        });
    };
    ScanComponent.prototype.rfid = function () {
        this.nfc.available().then(function (avail) {
            console.log(avail ? "Yes" : "No");
        });
        this.nfc.enabled().then(function (on) {
            console.log(on ? "Yes" : "No");
        });
        var that = this;
    };
    ScanComponent.prototype.onGetDataSuccess = function (res) {
        this.almaitem = res;
        console.dir(this.almaitem);
    };
    ScanComponent.prototype.onGetDataError = function (error) {
        console.log("onGetDataError: " + error.status);
        if (error.status === 401) {
            //skicka till login
        }
        if (error.status === 404) {
            //skicka till login
            alert("Tjänsten inte tillgänglig");
        }
    };
    ScanComponent = __decorate([
        core_1.Component({
            selector: 'Scan',
            moduleId: module.id,
            templateUrl: "./scan.component.html",
            styleUrls: ["./scan.component.css"],
            //changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [http_get_services_1.MyHttpGetService]
        }),
        __metadata("design:paramtypes", [http_get_services_1.MyHttpGetService,
            nativescript_barcodescanner_1.BarcodeScanner,
            core_1.NgZone])
    ], ScanComponent);
    return ScanComponent;
}());
exports.ScanComponent = ScanComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nhbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY2FuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RztBQUs3RyxxRkFBbUY7QUFJbkYsMkVBQTZEO0FBSTdELHFEQUFnRTtBQVdoRTtJQUlJLHVCQUNZLFNBQTJCLEVBQzNCLGNBQThCLEVBQzlCLE1BQWM7UUFGZCxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUMzQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUV0QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksc0JBQUcsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFHRCwrQkFBK0I7SUFHL0IsZ0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDZCxXQUFXLEVBQUU7Z0JBQ1Q7b0JBQ0UsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNQLElBQUksRUFBRSxPQUFPO2lCQUNkO2dCQUNEO29CQUNFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7b0JBQ1QsSUFBSSxFQUFFLFNBQVM7aUJBQ2hCO2FBQ0o7U0FDSixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1FBQzVELENBQUMsRUFBRSxVQUFTLEdBQUc7WUFDWCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw0QkFBSSxHQUFKO1FBQUEsaUJBc0NDO1FBckNHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO1lBQ3JCLE9BQU8sRUFBQyxpQkFBaUI7WUFDekIsV0FBVyxFQUFFLHFDQUFxQztZQUNsRCww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QUFDO1NBQ2hDLENBQUM7eUNBT3lCLG9DQUFnQjtZQUNYLDRDQUFjO1lBQ3RCLGFBQU07T0FQakIsYUFBYSxDQWtKekI7SUFBRCxvQkFBQztDQUFBLEFBbEpELElBa0pDO0FBbEpZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0NoaWxkLCBJbmplY3QsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSwgQ2hhbmdlZERhdGEsIENoYW5nZVR5cGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcblxuaW1wb3J0IHsgTXlIdHRwR2V0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvTXlIdHRwR2V0U2VydmljZS9odHRwLWdldC5zZXJ2aWNlc1wiO1xuXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuXG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXJcIjtcblxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuXG5pbXBvcnQgeyBOZmMsIE5mY05kZWZEYXRhLCBOZmNUYWdEYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1uZmNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdTY2FuJyxcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2Nhbi5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9zY2FuLmNvbXBvbmVudC5jc3NcIl0sXG4gICAgLy9jaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFtNeUh0dHBHZXRTZXJ2aWNlXVxufSlcblxuZXhwb3J0IGNsYXNzIFNjYW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHJpdmF0ZSBuZmM6IE5mY1xuICAgIHByaXZhdGUgYWxtYWl0ZW06IE9ic2VydmFibGVBcnJheTxBcnJheTxhbnk+PlxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG15U2VydmljZTogTXlIdHRwR2V0U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBiYXJjb2RlU2Nhbm5lcjogQmFyY29kZVNjYW5uZXIsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcbiAgICApIHtcbiAgICAgICAgdGhpcy5uZmMgPSBuZXcgTmZjKCk7ICAgICAgICAgICBcbiAgICB9XG4gICAgYmFyY29kZWZvcm1hdDogc3RyaW5nO1xuICAgIGJhcmNvZGU6IHN0cmluZztcbiAgICAvL2FsbWFpdGVtOiBBcnJheTxPYmplY3Q+ID0gW107XG4gICAgXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kb1N0YXJ0VGFnTGlzdGVuZXIoKTtcbiAgICB9XG4gICAgXG4gICAgd3JpdGV0YWcoKXtcbiAgICAgICAgdGhpcy5uZmMud3JpdGVUYWcoe1xuICAgICAgICAgICAgdGV4dFJlY29yZHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBpZDogWzFdLFxuICAgICAgICAgICAgICAgICAgdGV4dDogXCJIZWxsb1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBpZDogWzMsN10sXG4gICAgICAgICAgICAgICAgICB0ZXh0OiBcIkdvb2RieWVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV3JvdGUgdGV4dCByZWNvcmRzICdIZWxsbycgYW5kICdHb29kYnllJ1wiKTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBhbGVydChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzY2FuKCkge1xuICAgICAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnNjYW4oe1xuICAgICAgICAgICAgZm9ybWF0czpcIlFSX0NPREUsIEVBTl8xM1wiLFxuICAgICAgICAgICAgY2FuY2VsTGFiZWw6IFwiRVhJVC4gQWxzbywgdHJ5IHRoZSB2b2x1bWUgYnV0dG9ucyFcIixcbiAgICAgICAgICAgIGNhbmNlbExhYmVsQmFja2dyb3VuZENvbG9yOiBcIiMzMzMzMzNcIiwgLy8gaU9TIG9ubHksIGRlZmF1bHQgJyMwMDAwMDAnIChibGFjaylcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiVXNlIHRoZSB2b2x1bWUgYnV0dG9ucyBmb3IgZXh0cmEgbGlnaHRcIiwgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IGlzICdQbGFjZSBhIGJhcmNvZGUgaW5zaWRlIHRoZSB2aWV3ZmluZGVyIHJlY3RhbmdsZSB0byBzY2FuIGl0LidcbiAgICAgICAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiB0cnVlLCAgIC8vIGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICAgIHByZWZlckZyb250Q2FtZXJhOiBmYWxzZSwgICAgIC8vIGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICAgIHNob3dUb3JjaEJ1dHRvbjogdHJ1ZSwgICAgICAgIC8vIGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICAgIGJlZXBPblNjYW46IHRydWUsICAgICAgICAgICAgIC8vIFBsYXkgb3IgU3VwcHJlc3MgYmVlcCBvbiBzY2FuIChkZWZhdWx0IHRydWUpXG4gICAgICAgICAgICB0b3JjaE9uOiBmYWxzZSwgICAgICAgICAgICAgICAvLyBsYXVuY2ggd2l0aCB0aGUgZmxhc2hsaWdodCBvbiAoZGVmYXVsdCBmYWxzZSlcbiAgICAgICAgICAgIGNsb3NlQ2FsbGJhY2s6ICgpID0+IHsgY29uc29sZS5sb2coXCJTY2FubmVyIGNsb3NlZFwiKX0sIC8vIGludm9rZWQgd2hlbiB0aGUgc2Nhbm5lciB3YXMgY2xvc2VkIChzdWNjZXNzIG9yIGFib3J0KVxuICAgICAgICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiA1MDAsICAgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IDE1MDAgKG1zKSwgc2V0IHRvIDAgdG8gZGlzYWJsZSBlY2hvaW5nIHRoZSBzY2FubmVkIHRleHRcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiBcImRlZmF1bHRcIiwgICAgIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCB1bmRlZmluZWQgKHNlbnNvci1kcml2ZW4gb3JpZW50YXRpb24pLCBvdGhlciBvcHRpb25zOiBwb3J0cmFpdHxsYW5kc2NhcGVcbiAgICAgICAgICAgIG9wZW5TZXR0aW5nc0lmUGVybWlzc2lvbldhc1ByZXZpb3VzbHlEZW5pZWQ6IHRydWUgLy8gT24gaU9TIHlvdSBjYW4gc2VuZCB0aGUgdXNlciB0byB0aGUgc2V0dGluZ3MgYXBwIGlmIGFjY2VzcyB3YXMgcHJldmlvdXNseSBkZW5pZWRcbiAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgIC8vIE5vdGUgdGhhdCB0aGlzIFByb21pc2UgaXMgbmV2ZXIgaW52b2tlZCB3aGVuIGEgJ2NvbnRpbnVvdXNTY2FuQ2FsbGJhY2snIGZ1bmN0aW9uIGlzIHByb3ZpZGVkXG4gICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHJlc3VsdClcbiAgICAgICAgICAgICAgdGhpcy5iYXJjb2RlZm9ybWF0ID0gIHJlc3VsdC5mb3JtYXQ7XG4gICAgICAgICAgICAgIHRoaXMuYmFyY29kZSA9IHJlc3VsdC50ZXh0O1xuICAgICAgICAgICAgICB0aGlzLm15U2VydmljZS5nZXRBbG1hSXRlbShcIjEyMzEyMzEyMzFcIilcbiAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KVxuICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAvKiBcbiAgICAgICAgICAgICAgLy9mdW5nZXJhciBlaj9cbiAgICAgICAgICAgICAgZGlhbG9ncy5wcm9tcHQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlNjYW4gcmVzdWx0XCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJGb3JtYXQ6IFwiICsgcmVzdWx0LmZvcm1hdCArIFwiLFxcblZhbHVlOiBcIiArIHJlc3VsdC50ZXh0LFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgfSwgKGVycm9yTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHNjYW4uIFwiICsgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgZG9TdGFydFRhZ0xpc3RlbmVyKCkge1xuICAgICAgICBpZih0aGlzLmFsbWFpdGVtKXtcbiAgICAgICAgICAgIGNvbnNvbGUuZGlyKHRoaXMuYWxtYWl0ZW0pO1xuICAgICAgICAgICAgLy90aGlzLmFsbWFpdGVtLnNwbGljZSgwLHRoaXMuYWxtYWl0ZW0ubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5uZmMuc2V0T25UYWdEaXNjb3ZlcmVkTGlzdGVuZXIoKGRhdGE6IE5mY1RhZ0RhdGEpID0+IHtcblxuICAgICAgICAgICAgLy9rw7ZyIGkgbmd6b25lIGbDtnIgYXR0IFVJIHNrYSB1cHBkYXRlcmFzIGRpcmVrdC5cbiAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy90aGlzLmFsbWFpdGVtLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5iYXJjb2RlID0gZGF0YS5iYXJjb2RlO1xuICAgICAgICAgICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldEFsbWFJdGVtKGRhdGEuYmFyY29kZSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdClcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvU3RvcFRhZ0xpc3RlbmVyKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJPblRhZ0Rpc2NvdmVyZWQgTGlzdGVuZXIgc2V0XCIpO1xuICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgYWxlcnQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgXG4gICAgICBwdWJsaWMgZG9TdG9wVGFnTGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMubmZjLnNldE9uVGFnRGlzY292ZXJlZExpc3RlbmVyKG51bGwpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiT25UYWdEaXNjb3ZlcmVkIG51bGxlZFwiKTtcbiAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgIGFsZXJ0KGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG5cbiAgICByZmlkKCkge1xuICAgICAgICB0aGlzLm5mYy5hdmFpbGFibGUoKS50aGVuKChhdmFpbCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYXZhaWwgPyBcIlllc1wiIDogXCJOb1wiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5uZmMuZW5hYmxlZCgpLnRoZW4oKG9uKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhvbiA/IFwiWWVzXCIgOiBcIk5vXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFTdWNjZXNzKHJlcykge1xuICAgICAgICB0aGlzLmFsbWFpdGVtID0gcmVzO1xuICAgICAgICBjb25zb2xlLmRpcih0aGlzLmFsbWFpdGVtKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uR2V0RGF0YUVycm9yOiBcIiArIGVycm9yLnN0YXR1cyk7XG4gICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgICAgLy9za2lja2EgdGlsbCBsb2dpblxuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgICAgLy9za2lja2EgdGlsbCBsb2dpblxuICAgICAgICAgICAgYWxlcnQoXCJUasOkbnN0ZW4gaW50ZSB0aWxsZ8OkbmdsaWdcIik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgXG59Il19