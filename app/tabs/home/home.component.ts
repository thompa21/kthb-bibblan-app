import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild } from "@angular/core";
import { Observable as RxObservable } from 'rxjs/Observable';

import { ObservableArray, ChangedData, ChangeType } from "tns-core-modules/data/observable-array";

import { MyHttpGetService } from "../../shared/MyHttpGetService/http-get.services";

import * as applicationSettingsModule from "application-settings";

import {User} from "../../user"


@Component({
    selector: 'Home',
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    //changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MyHttpGetService]
})

export class HomeComponent implements OnInit {
    //public myUser: RxObservable<Array<any>>;
    //myUser: Array<Object> = [];
    myUser: ObservableArray<Array<any>>
    rooms: Array<Object> = [];

    public user: User;
    public input: any;
    test;


    constructor(
        private myService: MyHttpGetService,
    ) {
        this.user = new User();
        this.user.email = "my.test.account@nativescript.org";
        this.input = {
            "kthid": "tholind",
            "pin": "8888"
        }
    }

    ngOnInit(): void {
        console.log("HOME oninit");
        this.user.email = "KALLE";
        this.myService.getAlmaUser(applicationSettingsModule.getString('alma_primaryid'))
        .subscribe((result) => {
            this.onGetDataSuccess(result)
        }, (error) => {
            this.onGetDataError(error)
        });
    }

    private setkalla() {
        this.user.email = "KALLE ANKA";
    }

    private onGetDataSuccess(res) {
        this.myUser = res;
        this.user.full_name = res.full_name;
        var emailadress = "";
        var streetaddress = "";
        var postal_code = "";
        var city = "";

        res.contact_info.email.forEach(function(email) {
            if(email.preferred){
                emailadress = email.email_address;
            }
        });
        res.contact_info.address.forEach(function(address) {
            if(address.preferred){
                streetaddress = address.line1;
                postal_code = address.postal_code;
                city = address.city;
            }
        });
        //utanfor foreach för att fungera?
        this.user.email = emailadress;
        this.user.streetaddress = streetaddress;
        this.user.postal_code = postal_code;
        this.user.city = city;
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

    submit() {
        alert("You’re using: " + this.test);
      }
}