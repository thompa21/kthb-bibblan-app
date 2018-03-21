"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_get_services_1 = require("../../shared/MyHttpGetService/http-get.services");
var gestures_1 = require("ui/gestures");
var applicationSettingsModule = require("application-settings");
var page_1 = require("ui/page");
var router_1 = require("nativescript-angular/router");
var RoomsComponent = (function () {
    function RoomsComponent(myService, ngZone, page, router) {
        this.myService = myService;
        this.ngZone = ngZone;
        this.page = page;
        this.router = router;
        this.isItemVisible = false;
        this.isLoaderVisible = false;
        this.roomList = [];
        this.rooms = [];
        /* ***********************************************************
        * Use the constructor to inject services.
        *************************************************************/
    }
    RoomsComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("room_ngoninit");
        var datePicker = this.page.getViewById("datePicker");
        var swiper = this.page.getViewById("pagewrapper");
        swiper.translateX = 0;
        swiper.translateY = 0;
        swiper.scaleX = 1;
        swiper.scaleY = 1;
        swiper.on(gestures_1.GestureTypes.swipe, function (args) {
            var _this = this;
            //swiper.on(GestureTypes.pan, function (args: PanGestureEventData) {
            console.log("gesture");
            this.ngZone.run(function () {
                if (args.direction == 1) {
                    _this.getprevdata();
                }
                if (args.direction == 2) {
                    _this.getnextdata();
                }
                /*
                if (args.state === 1) // down
                {
                    console.log("pan finger down");
                    this.prevDeltaX = 0;
                    this.prevDeltaY = 0;
                }
                else if (args.state === 2) { // currently panning
                    console.log("panning ");
                    swiper.translateX += args.deltaX - this.prevDeltaX;
                    swiper.translateY += args.deltaY - this.prevDeltaY;
                    this.prevDeltaX = args.deltaX;
                    this.prevDeltaY = args.deltaY;
                }
                */
            });
        }, this);
        this.setTodaysDate(datePicker);
        datePicker.on("dateChange", function (args) {
            _this.ngZone.run(function () {
                _this.enterDate();
            });
        });
        var selectedDate = new Date(datePicker.year, datePicker.month - 1, datePicker.day);
        this.bookingDate = selectedDate;
        this.getdata("");
        this.getRoomsforarea(2);
    };
    RoomsComponent.prototype.setTodaysDate = function (datePicker) {
        var selectedDate = new Date();
        datePicker.year = selectedDate.getFullYear();
        datePicker.month = selectedDate.getMonth() + 1;
        datePicker.day = selectedDate.getDate();
    };
    RoomsComponent.prototype.enterDate = function () {
        var datePicker = this.page.getViewById("datePicker");
        var selectedDate = new Date(datePicker.year, datePicker.month - 1, datePicker.day);
        this.bookingDate = selectedDate;
        this.isItemVisible = false;
        var bookingdate = (this.bookingDate.getFullYear() + "-" + ('0' + (this.bookingDate.getMonth() + 1)).slice(-2) + "-" + ('0' + this.bookingDate.getDate()).slice(-2));
        this.getdata("");
    };
    RoomsComponent.prototype.showDatePicker = function () {
        this.isItemVisible = true;
        this.isLoaderVisible = false;
    };
    RoomsComponent.prototype.getdata = function (loadtype) {
        var _this = this;
        this.roomList = [];
        console.log(loadtype);
        //if(loadtype != "background") {
        console.log(loadtype);
        this.isLoaderVisible = true;
        //}
        var bookingdate = (this.bookingDate.getFullYear() + "-" + ('0' + (this.bookingDate.getMonth() + 1)).slice(-2) + "-" + ('0' + this.bookingDate.getDate()).slice(-2));
        this.myService.getData(bookingdate)
            .subscribe(function (result) {
            _this.onGetDataSuccess(result);
        }, function (error) {
            _this.onGetDataError(error);
        });
    };
    RoomsComponent.prototype.getprevdata = function () {
        var tempdate = new Date(this.bookingDate.setDate(this.bookingDate.getDate() - 1));
        var bookingdate = (tempdate.getFullYear() + "-" + ('0' + (tempdate.getMonth() + 1)).slice(-2) + "-" + ('0' + tempdate.getDate()).slice(-2));
        var dater = this.page.getViewById("textFieldBDate");
        dater.text = bookingdate;
        this.getdata("");
    };
    RoomsComponent.prototype.getnextdata = function () {
        var tempdate = new Date(this.bookingDate.setDate(this.bookingDate.getDate() + 1));
        var bookingdate = (tempdate.getFullYear() + "-" + ('0' + (tempdate.getMonth() + 1)).slice(-2) + "-" + ('0' + tempdate.getDate()).slice(-2));
        var dater = this.page.getViewById("textFieldBDate");
        dater.text = bookingdate;
        this.getdata("");
    };
    RoomsComponent.prototype.getRoomsforarea = function (areaid) {
        var _this = this;
        this.myService.getRoomsforarea(areaid)
            .subscribe(function (result) {
            _this.rooms = result;
            console.dir(result);
        }, function (error) {
            console.log(error);
        });
    };
    RoomsComponent.prototype.homepage = function () {
        //this.router.navigate(["/home"], { clearHistory: true })
    };
    RoomsComponent.prototype.onGetDataSuccess = function (res) {
        var bookingList = [];
        var roomList = [];
        res.forEach(function (booking) {
            roomList.push({
                roomnumber: booking.roomnumber,
                roomname: booking.roomname,
                picture: booking.picture,
                hours: booking.bookings,
                hour_08_status: booking.bookings.hour_08.status,
                hour_08_bookingid: booking.bookings.hour_08.bookingid,
                hour_09_status: booking.bookings.hour_09.status,
                hour_09_bookingid: booking.bookings.hour_09.bookingid,
                hour_10_status: booking.bookings.hour_10.status,
                hour_10_bookingid: booking.bookings.hour_10.bookingid,
                hour_11_status: booking.bookings.hour_11.status,
                hour_11_bookingid: booking.bookings.hour_11.bookingid,
                hour_12_status: booking.bookings.hour_12.status,
                hour_12_bookingid: booking.bookings.hour_12.bookingid,
                hour_13_status: booking.bookings.hour_13.status,
                hour_13_bookingid: booking.bookings.hour_13.bookingid,
                hour_14_status: booking.bookings.hour_14.status,
                hour_14_bookingid: booking.bookings.hour_14.bookingid,
                hour_15_status: booking.bookings.hour_15.status,
                hour_15_bookingid: booking.bookings.hour_15.bookingid,
                hour_16_status: booking.bookings.hour_16.status,
                hour_16_bookingid: booking.bookings.hour_16.bookingid,
                hour_17_status: booking.bookings.hour_17.status,
                hour_17_bookingid: booking.bookings.hour_17.bookingid,
                hour_18_status: booking.bookings.hour_18.status,
                hour_18_bookingid: booking.bookings.hour_18.bookingid,
                hour_19_status: booking.bookings.hour_19.status,
                hour_19_bookingid: booking.bookings.hour_19.bookingid,
                hour_20_status: booking.bookings.hour_20.status,
                hour_20_bookingid: booking.bookings.hour_20.bookingid
            });
        });
        this.roomList = roomList;
        this.isLoaderVisible = false;
    };
    RoomsComponent.prototype.onGetDataError = function (error) {
        console.log("onGetDataError: " + error.status);
        if (error.status === 401) {
            //skicka till login
            this.logout();
        }
        if (error.status === 404) {
            //skicka till login
            alert("Tjänsten inte tillgänglig");
        }
    };
    RoomsComponent.prototype.createbooking = function (bookingid) {
        console.log("createbooking");
        //this.router.navigate(["/booking", {bookingid: bookingid}] )
    };
    RoomsComponent.prototype.logout = function () {
        console.log("logout");
        applicationSettingsModule.remove('jwttoken');
        this.router.navigate([""], { clearHistory: true });
    };
    RoomsComponent = __decorate([
        core_1.Component({
            selector: "Rooms",
            moduleId: module.id,
            //template: '',
            templateUrl: "./rooms.component.html",
            providers: [http_get_services_1.MyHttpGetService]
        }),
        __metadata("design:paramtypes", [http_get_services_1.MyHttpGetService,
            core_1.NgZone,
            page_1.Page,
            router_1.RouterExtensions])
    ], RoomsComponent);
    return RoomsComponent;
}());
exports.RoomsComponent = RoomsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm9vbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBEO0FBQzFELHFGQUFtRjtBQUluRix3Q0FBdUY7QUFDdkYsZ0VBQWtFO0FBQ2xFLGdDQUErQjtBQUkvQixzREFBK0Q7QUFTL0Q7SUFTSSx3QkFDWSxTQUEyQixFQUMzQixNQUFjLEVBQ2QsSUFBVSxFQUNWLE1BQXdCO1FBSHhCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFYN0Isa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDL0IsYUFBUSxHQUFrQixFQUFFLENBQUM7UUFHN0IsVUFBSyxHQUFrQixFQUFFLENBQUM7UUFPdEI7O3NFQUU4RDtJQUNsRSxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUFBLGlCQWtEQztRQWpERyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFhLFlBQVksQ0FBQyxDQUFDO1FBQ2pFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFjLGFBQWEsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1FBRWpCLE1BQU0sQ0FBQyxFQUFFLENBQUMsdUJBQVksQ0FBQyxLQUFLLEVBQUUsVUFBVSxJQUEyQjtZQUFyQyxpQkEyQjdC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UUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLGVBQWU7WUFDZixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLG9DQUFnQixDQUFDO1NBQ2hDLENBQUM7eUNBV3lCLG9DQUFnQjtZQUNuQixhQUFNO1lBQ1IsV0FBSTtZQUNGLHlCQUFnQjtPQWIzQixjQUFjLENBNk0xQjtJQUFELHFCQUFDO0NBQUEsQUE3TUQsSUE2TUM7QUE3TVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE15SHR0cEdldFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL015SHR0cEdldFNlcnZpY2UvaHR0cC1nZXQuc2VydmljZXNcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBEYXRlUGlja2VyIH0gZnJvbSBcInVpL2RhdGUtcGlja2VyXCI7XG5pbXBvcnQgeyBHZXN0dXJlVHlwZXMsIFN3aXBlR2VzdHVyZUV2ZW50RGF0YSwgUGFuR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInVpL2xhYmVsXCI7XG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gXCJ1aS9saXN0LXZpZXdcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIlJvb21zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICAvL3RlbXBsYXRlOiAnJyxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3Jvb21zLmNvbXBvbmVudC5odG1sXCIsXG4gICAgcHJvdmlkZXJzOiBbTXlIdHRwR2V0U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUm9vbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyBib29raW5nRGF0ZTtcbiAgICBwdWJsaWMgaXNJdGVtVmlzaWJsZSA9IGZhbHNlO1xuICAgIHB1YmxpYyBpc0xvYWRlclZpc2libGUgPSBmYWxzZTtcbiAgICByb29tTGlzdDogQXJyYXk8T2JqZWN0PiA9IFtdO1xuICAgIHByZXZEZWx0YVg6IG51bWJlcjtcbiAgICBwcmV2RGVsdGFZOiBudW1iZXI7XG4gICAgcm9vbXM6IEFycmF5PE9iamVjdD4gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG15U2VydmljZTogTXlIdHRwR2V0U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucykge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gaW5qZWN0IHNlcnZpY2VzLlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZyhcInJvb21fbmdvbmluaXRcIik7XG4gICAgICAgIGxldCBkYXRlUGlja2VyID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkPERhdGVQaWNrZXI+KFwiZGF0ZVBpY2tlclwiKTtcbiAgICAgICAgbGV0IHN3aXBlciA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZDxTdGFja0xheW91dD4oXCJwYWdld3JhcHBlclwiKTtcbiAgICAgICAgc3dpcGVyLnRyYW5zbGF0ZVggPSAwO1xuICAgICAgICBzd2lwZXIudHJhbnNsYXRlWSA9IDA7XG4gICAgICAgIHN3aXBlci5zY2FsZVggPSAxO1xuICAgICAgICBzd2lwZXIuc2NhbGVZID0gMVxuXG4gICAgICAgIHN3aXBlci5vbihHZXN0dXJlVHlwZXMuc3dpcGUsIGZ1bmN0aW9uIChhcmdzOiBTd2lwZUdlc3R1cmVFdmVudERhdGEpIHtcbiAgICAgICAgLy9zd2lwZXIub24oR2VzdHVyZVR5cGVzLnBhbiwgZnVuY3Rpb24gKGFyZ3M6IFBhbkdlc3R1cmVFdmVudERhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2VzdHVyZVwiKTtcbiAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MuZGlyZWN0aW9uID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRwcmV2ZGF0YSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhcmdzLmRpcmVjdGlvbiA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0bmV4dGRhdGEoKTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3Muc3RhdGUgPT09IDEpIC8vIGRvd25cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFuIGZpbmdlciBkb3duXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZEZWx0YVggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZEZWx0YVkgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhcmdzLnN0YXRlID09PSAyKSB7IC8vIGN1cnJlbnRseSBwYW5uaW5nXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFubmluZyBcIik7XG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci50cmFuc2xhdGVYICs9IGFyZ3MuZGVsdGFYIC0gdGhpcy5wcmV2RGVsdGFYO1xuICAgICAgICAgICAgICAgICAgICBzd2lwZXIudHJhbnNsYXRlWSArPSBhcmdzLmRlbHRhWSAtIHRoaXMucHJldkRlbHRhWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2RGVsdGFYID0gYXJncy5kZWx0YVg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldkRlbHRhWSA9IGFyZ3MuZGVsdGFZO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc2V0VG9kYXlzRGF0ZShkYXRlUGlja2VyKTtcblxuICAgICAgICBkYXRlUGlja2VyLm9uKFwiZGF0ZUNoYW5nZVwiLCAoYXJncykgPT4ge1xuICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGVyRGF0ZSgpO1xuICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgc2VsZWN0ZWREYXRlID0gbmV3IERhdGUoZGF0ZVBpY2tlci55ZWFyLCBkYXRlUGlja2VyLm1vbnRoIC0gMSwgZGF0ZVBpY2tlci5kYXkpO1xuICAgICAgICB0aGlzLmJvb2tpbmdEYXRlID0gc2VsZWN0ZWREYXRlO1xuICAgICAgICB0aGlzLmdldGRhdGEoXCJcIik7IFxuICAgICAgICB0aGlzLmdldFJvb21zZm9yYXJlYSgyKTtcbiAgICB9XG5cbiAgICBzZXRUb2RheXNEYXRlKGRhdGVQaWNrZXIpe1xuICAgICAgICB2YXIgc2VsZWN0ZWREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgZGF0ZVBpY2tlci55ZWFyID0gc2VsZWN0ZWREYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIGRhdGVQaWNrZXIubW9udGggPSBzZWxlY3RlZERhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgIGRhdGVQaWNrZXIuZGF5ID0gc2VsZWN0ZWREYXRlLmdldERhdGUoKTtcbiAgICB9XG5cbiAgICBlbnRlckRhdGUoKSB7XG4gICAgICAgIGxldCBkYXRlUGlja2VyID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkPERhdGVQaWNrZXI+KFwiZGF0ZVBpY2tlclwiKTtcbiAgICAgICAgbGV0IHNlbGVjdGVkRGF0ZSA9IG5ldyBEYXRlKGRhdGVQaWNrZXIueWVhciwgZGF0ZVBpY2tlci5tb250aCAtIDEsIGRhdGVQaWNrZXIuZGF5KTtcbiAgICAgICAgdGhpcy5ib29raW5nRGF0ZSA9IHNlbGVjdGVkRGF0ZTtcbiAgICAgICAgdGhpcy5pc0l0ZW1WaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHZhciBib29raW5nZGF0ZSA9ICh0aGlzLmJvb2tpbmdEYXRlLmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArICgnMCcgKyAodGhpcy5ib29raW5nRGF0ZS5nZXRNb250aCgpICsgMSkpLnNsaWNlKC0yKSArIFwiLVwiICsgKCcwJyArIHRoaXMuYm9va2luZ0RhdGUuZ2V0RGF0ZSgpKS5zbGljZSgtMikpO1xuICAgICAgICB0aGlzLmdldGRhdGEoXCJcIik7XG4gICAgfVxuXG4gICAgc2hvd0RhdGVQaWNrZXIoKSB7XG4gICAgICAgIHRoaXMuaXNJdGVtVmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNMb2FkZXJWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGdldGRhdGEobG9hZHR5cGUpIHtcbiAgICAgICAgdGhpcy5yb29tTGlzdCA9IFtdO1xuICAgICAgICBjb25zb2xlLmxvZyhsb2FkdHlwZSk7XG4gICAgICAgIC8vaWYobG9hZHR5cGUgIT0gXCJiYWNrZ3JvdW5kXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvYWR0eXBlKTtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkZXJWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgLy99XG4gICAgICAgIHZhciBib29raW5nZGF0ZSA9ICh0aGlzLmJvb2tpbmdEYXRlLmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArICgnMCcgKyAodGhpcy5ib29raW5nRGF0ZS5nZXRNb250aCgpICsgMSkpLnNsaWNlKC0yKSArIFwiLVwiICsgKCcwJyArIHRoaXMuYm9va2luZ0RhdGUuZ2V0RGF0ZSgpKS5zbGljZSgtMikpO1xuICAgICAgICB0aGlzLm15U2VydmljZS5nZXREYXRhKGJvb2tpbmdkYXRlKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRwcmV2ZGF0YSgpe1xuICAgICAgICB2YXIgdGVtcGRhdGUgPSBuZXcgRGF0ZSh0aGlzLmJvb2tpbmdEYXRlLnNldERhdGUodGhpcy5ib29raW5nRGF0ZS5nZXREYXRlKCkgLSAxKSk7XG4gICAgICAgIHZhciBib29raW5nZGF0ZSA9ICh0ZW1wZGF0ZS5nZXRGdWxsWWVhcigpICsgXCItXCIgKyAoJzAnICsgKHRlbXBkYXRlLmdldE1vbnRoKCkgKyAxKSkuc2xpY2UoLTIpICsgXCItXCIgKyAoJzAnICsgdGVtcGRhdGUuZ2V0RGF0ZSgpKS5zbGljZSgtMikpO1xuICAgICAgICBsZXQgZGF0ZXIgPSAgdGhpcy5wYWdlLmdldFZpZXdCeUlkPExhYmVsPihcInRleHRGaWVsZEJEYXRlXCIpO1xuICAgICAgICBkYXRlci50ZXh0ID0gYm9va2luZ2RhdGU7XG4gICAgICAgIHRoaXMuZ2V0ZGF0YShcIlwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0bmV4dGRhdGEoKXtcbiAgICAgICAgdmFyIHRlbXBkYXRlID0gbmV3IERhdGUodGhpcy5ib29raW5nRGF0ZS5zZXREYXRlKHRoaXMuYm9va2luZ0RhdGUuZ2V0RGF0ZSgpICsgMSkpO1xuICAgICAgICB2YXIgYm9va2luZ2RhdGUgPSAodGVtcGRhdGUuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgKCcwJyArICh0ZW1wZGF0ZS5nZXRNb250aCgpICsgMSkpLnNsaWNlKC0yKSArIFwiLVwiICsgKCcwJyArIHRlbXBkYXRlLmdldERhdGUoKSkuc2xpY2UoLTIpKTtcbiAgICAgICAgbGV0IGRhdGVyID0gIHRoaXMucGFnZS5nZXRWaWV3QnlJZDxMYWJlbD4oXCJ0ZXh0RmllbGRCRGF0ZVwiKTtcbiAgICAgICAgZGF0ZXIudGV4dCA9IGJvb2tpbmdkYXRlO1xuICAgICAgICB0aGlzLmdldGRhdGEoXCJcIik7XG4gICAgfVxuXG4gICAgZ2V0Um9vbXNmb3JhcmVhKGFyZWFpZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldFJvb21zZm9yYXJlYShhcmVhaWQpXG4gICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJvb21zPSByZXN1bHQ7XG4gICAgICAgICAgICBjb25zb2xlLmRpcihyZXN1bHQpXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICBcbiAgICBwdWJsaWMgaG9tZXBhZ2UoKSB7XG4gICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2hvbWVcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFTdWNjZXNzKHJlcykge1xuICAgICAgICB2YXIgYm9va2luZ0xpc3QgPSBbXTtcbiAgICAgICAgdmFyIHJvb21MaXN0ID0gW107XG4gICAgICAgIHJlcy5mb3JFYWNoKGZ1bmN0aW9uKGJvb2tpbmcpIHtcbiAgICAgICAgICAgIHJvb21MaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgIHJvb21udW1iZXI6IGJvb2tpbmcucm9vbW51bWJlcixcbiAgICAgICAgICAgICAgICByb29tbmFtZTogYm9va2luZy5yb29tbmFtZSxcbiAgICAgICAgICAgICAgICBwaWN0dXJlOiBib29raW5nLnBpY3R1cmUsXG4gICAgICAgICAgICAgICAgaG91cnM6Ym9va2luZy5ib29raW5ncyxcbiAgICAgICAgICAgICAgICBob3VyXzA4X3N0YXR1czogYm9va2luZy5ib29raW5ncy5ob3VyXzA4LnN0YXR1cyxcbiAgICAgICAgICAgICAgICBob3VyXzA4X2Jvb2tpbmdpZDogYm9va2luZy5ib29raW5ncy5ob3VyXzA4LmJvb2tpbmdpZCxcbiAgICAgICAgICAgICAgICBob3VyXzA5X3N0YXR1czogYm9va2luZy5ib29raW5ncy5ob3VyXzA5LnN0YXR1cyxcbiAgICAgICAgICAgICAgICBob3VyXzA5X2Jvb2tpbmdpZDogYm9va2luZy5ib29raW5ncy5ob3VyXzA5LmJvb2tpbmdpZCxcbiAgICAgICAgICAgICAgICBob3VyXzEwX3N0YXR1czogYm9va2luZy5ib29raW5ncy5ob3VyXzEwLnN0YXR1cyxcbiAgICAgICAgICAgICAgICBob3VyXzEwX2Jvb2tpbmdpZDogYm9va2luZy5ib29raW5ncy5ob3VyXzEwLmJvb2tpbmdpZCxcbiAgICAgICAgICAgICAgICBob3VyXzExX3N0YXR1czogYm9va2luZy5ib29raW5ncy5ob3VyXzExLnN0YXR1cyxcbiAgICAgICAgICAgICAgICBob3VyXzExX2Jvb2tpbmdpZDogYm9va2luZy5ib29raW5ncy5ob3VyXzExLmJvb2tpbmdpZCxcbiAgICAgICAgICAgICAgICBob3VyXzEyX3N0YXR1czogYm9va2luZy5ib29raW5ncy5ob3VyXzEyLnN0YXR1cyxcbiAgICAgICAgICAgICAgICBob3VyXzEyX2Jvb2tpbmdpZDogYm9va2luZy5ib29raW5ncy5ob3VyXzEyLmJvb2tpbmdpZCxcbiAgICAgICAgICAgICAgICBob3VyXzEzX3N0YXR1czogYm9va2luZy5ib29raW5ncy5ob3VyXzEzLnN0YXR1cyxcbiAgICAgICAgICAgICAgICBob3VyXzEzX2Jvb2tpbmdpZDogYm9va2luZy5ib29raW5ncy5ob3VyXzEzLmJvb2tpbmdpZCxcbiAgICAgICAgICAgICAgICBob3VyXzE0X3N0YXR1czogYm9va2luZy5ib29raW5ncy5ob3VyXzE0LnN0YXR1cyxcbiAgICAgICAgICAgICAgICBob3VyXzE0X2Jvb2tpbmdpZDogYm9va2luZy5ib29raW5ncy5ob3VyXzE0LmJvb2tpbmdpZCxcbiAgICAgICAgICAgICAgICBob3VyXzE1X3N0YXR1czogYm9va2luZy5ib29raW5ncy5ob3VyXzE1LnN0YXR1cyxcbiAgICAgICAgICAgICAgICBob3VyXzE1X2Jvb2tpbmdpZDogYm9va2luZy5ib29raW5ncy5ob3VyXzE1LmJvb2tpbmdpZCxcbiAgICAgICAgICAgICAgICBob3VyXzE2X3N0YXR1czogYm9va2luZy5ib29raW5ncy5ob3VyXzE2LnN0YXR1cyxcbiAgICAgICAgICAgICAgICBob3VyXzE2X2Jvb2tpbmdpZDogYm9va2luZy5ib29raW5ncy5ob3VyXzE2LmJvb2tpbmdpZCxcbiAgICAgICAgICAgICAgICBob3VyXzE3X3N0YXR1czogYm9va2luZy5ib29raW5ncy5ob3VyXzE3LnN0YXR1cyxcbiAgICAgICAgICAgICAgICBob3VyXzE3X2Jvb2tpbmdpZDogYm9va2luZy5ib29raW5ncy5ob3VyXzE3LmJvb2tpbmdpZCxcbiAgICAgICAgICAgICAgICBob3VyXzE4X3N0YXR1czogYm9va2luZy5ib29raW5ncy5ob3VyXzE4LnN0YXR1cyxcbiAgICAgICAgICAgICAgICBob3VyXzE4X2Jvb2tpbmdpZDogYm9va2luZy5ib29raW5ncy5ob3VyXzE4LmJvb2tpbmdpZCxcbiAgICAgICAgICAgICAgICBob3VyXzE5X3N0YXR1czogYm9va2luZy5ib29raW5ncy5ob3VyXzE5LnN0YXR1cyxcbiAgICAgICAgICAgICAgICBob3VyXzE5X2Jvb2tpbmdpZDogYm9va2luZy5ib29raW5ncy5ob3VyXzE5LmJvb2tpbmdpZCxcbiAgICAgICAgICAgICAgICBob3VyXzIwX3N0YXR1czogYm9va2luZy5ib29raW5ncy5ob3VyXzIwLnN0YXR1cyxcbiAgICAgICAgICAgICAgICBob3VyXzIwX2Jvb2tpbmdpZDogYm9va2luZy5ib29raW5ncy5ob3VyXzIwLmJvb2tpbmdpZFxuXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucm9vbUxpc3QgPSByb29tTGlzdDtcbiAgICAgICAgdGhpcy5pc0xvYWRlclZpc2libGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uR2V0RGF0YUVycm9yOiBcIiArIGVycm9yLnN0YXR1cyk7XG4gICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgICAgLy9za2lja2EgdGlsbCBsb2dpblxuICAgICAgICAgICAgdGhpcy5sb2dvdXQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgIC8vc2tpY2thIHRpbGwgbG9naW5cbiAgICAgICAgICAgIGFsZXJ0KFwiVGrDpG5zdGVuIGludGUgdGlsbGfDpG5nbGlnXCIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVib29raW5nKGJvb2tpbmdpZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWJvb2tpbmdcIik7XG4gICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2Jvb2tpbmdcIiwge2Jvb2tpbmdpZDogYm9va2luZ2lkfV0gKVxuICAgIH1cblxuICAgIHB1YmxpYyBsb2dvdXQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9nb3V0XCIpO1xuICAgICAgICBhcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlLnJlbW92ZSgnand0dG9rZW4nKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiXCJdLHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgIH1cbn1cbiJdfQ==