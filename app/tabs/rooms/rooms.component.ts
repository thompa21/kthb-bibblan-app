import { Component, OnInit, NgZone } from "@angular/core";
import { MyHttpGetService } from "../../shared/MyHttpGetService/http-get.services";
import { Observable } from "rxjs/observable";
import { ObservableArray } from "data/observable-array";
import { DatePicker } from "ui/date-picker";
import { GestureTypes, SwipeGestureEventData, PanGestureEventData } from "ui/gestures";
import * as applicationSettingsModule from "application-settings";
import { Page } from "ui/page";
import { StackLayout } from "ui/layouts/stack-layout";
import { Label } from "ui/label";
import { ListView } from "ui/list-view";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Rooms",
    moduleId: module.id,
    //template: '',
    templateUrl: "./rooms.component.html",
    providers: [MyHttpGetService]
})
export class RoomsComponent implements OnInit {
    public bookingDate;
    public isItemVisible = false;
    public isLoaderVisible = false;
    roomList: Array<Object> = [];
    prevDeltaX: number;
    prevDeltaY: number;
    rooms: Array<Object> = [];

    constructor(
        private myService: MyHttpGetService,
        private ngZone: NgZone,
        private page: Page,
        private router: RouterExtensions) {
        /* ***********************************************************
        * Use the constructor to inject services.
        *************************************************************/
    }

    ngOnInit(): void {
        console.log("room_ngoninit");
        let datePicker = this.page.getViewById<DatePicker>("datePicker");
        let swiper = this.page.getViewById<StackLayout>("pagewrapper");
        swiper.translateX = 0;
        swiper.translateY = 0;
        swiper.scaleX = 1;
        swiper.scaleY = 1

        swiper.on(GestureTypes.swipe, function (args: SwipeGestureEventData) {
        //swiper.on(GestureTypes.pan, function (args: PanGestureEventData) {
            console.log("gesture");
            this.ngZone.run(() => {
                
                if (args.direction == 1) {
                    this.getprevdata()
                }
                if (args.direction == 2) {
                    this.getnextdata();
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
        },this);

        this.setTodaysDate(datePicker);

        datePicker.on("dateChange", (args) => {
            this.ngZone.run(() => {
                this.enterDate();
             });
        });

        let selectedDate = new Date(datePicker.year, datePicker.month - 1, datePicker.day);
        this.bookingDate = selectedDate;
        this.getdata(""); 
        this.getRoomsforarea(2);
    }

    setTodaysDate(datePicker){
        var selectedDate = new Date();
        datePicker.year = selectedDate.getFullYear();
        datePicker.month = selectedDate.getMonth() + 1;
        datePicker.day = selectedDate.getDate();
    }

    enterDate() {
        let datePicker = this.page.getViewById<DatePicker>("datePicker");
        let selectedDate = new Date(datePicker.year, datePicker.month - 1, datePicker.day);
        this.bookingDate = selectedDate;
        this.isItemVisible = false;
        var bookingdate = (this.bookingDate.getFullYear() + "-" + ('0' + (this.bookingDate.getMonth() + 1)).slice(-2) + "-" + ('0' + this.bookingDate.getDate()).slice(-2));
        this.getdata("");
    }

    showDatePicker() {
        this.isItemVisible = true;
        this.isLoaderVisible = false;
    }

    public getdata(loadtype) {
        this.roomList = [];
        console.log(loadtype);
        //if(loadtype != "background") {
            console.log(loadtype);
            this.isLoaderVisible = true;
        //}
        var bookingdate = (this.bookingDate.getFullYear() + "-" + ('0' + (this.bookingDate.getMonth() + 1)).slice(-2) + "-" + ('0' + this.bookingDate.getDate()).slice(-2));
        this.myService.getData(bookingdate)
            .subscribe(
                (result) => {
                this.onGetDataSuccess(result);
            }, (error) => {
                this.onGetDataError(error);
            });
    }

    public getprevdata(){
        var tempdate = new Date(this.bookingDate.setDate(this.bookingDate.getDate() - 1));
        var bookingdate = (tempdate.getFullYear() + "-" + ('0' + (tempdate.getMonth() + 1)).slice(-2) + "-" + ('0' + tempdate.getDate()).slice(-2));
        let dater =  this.page.getViewById<Label>("textFieldBDate");
        dater.text = bookingdate;
        this.getdata("");
    }

    public getnextdata(){
        var tempdate = new Date(this.bookingDate.setDate(this.bookingDate.getDate() + 1));
        var bookingdate = (tempdate.getFullYear() + "-" + ('0' + (tempdate.getMonth() + 1)).slice(-2) + "-" + ('0' + tempdate.getDate()).slice(-2));
        let dater =  this.page.getViewById<Label>("textFieldBDate");
        dater.text = bookingdate;
        this.getdata("");
    }

    getRoomsforarea(areaid: number): void {
        this.myService.getRoomsforarea(areaid)
        .subscribe(
            (result) => {
            this.rooms= result;
            //console.dir(result)
        }, (error) => {
            console.log(error);
        });
      }
    
    public homepage() {
        //this.router.navigate(["/home"], { clearHistory: true })
    }

    private onGetDataSuccess(res) {
        var bookingList = [];
        var roomList = [];
        res.forEach(function(booking) {
            roomList.push({
                roomnumber: booking.roomnumber,
                roomname: booking.roomname,
                picture: booking.picture,
                hours:booking.bookings,
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
    }

    private onGetDataError(error: Response | any) {
        console.log("onGetDataError: " + error.status);
        if (error.status === 401) {
            //skicka till login
            this.logout();
        }
        if (error.status === 404) {
            //skicka till login
            alert("Tjänsten inte tillgänglig");
        }
        
    }

    public createbooking(bookingid) {
        console.log("createbooking");
        //this.router.navigate(["/booking", {bookingid: bookingid}] )
    }

    public logout() {
        console.log("logout from room");
        applicationSettingsModule.remove('jwttoken');
        this.router.navigate([""],{ clearHistory: true });
    }
}
