import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from "@angular/core";
import {RouterExtensions } from "nativescript-angular/router";
import { setInterval, setTimeout, clearInterval } from "timer";
import { MyHttpGetService } from "./shared/MyHttpGetService/http-get.services";

import * as applicationSettingsModule from "application-settings";

import { WebView, LoadEventData } from "ui/web-view";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { Label } from "ui/label";

import { Data } from "./shared/providers/data";

@Component({
    selector: "kthb-login",
    templateUrl: "login.component.html",
    providers: [MyHttpGetService]
})
export class LoginComponent {
    public webViewSrc: string = "";
    @ViewChild("myWebView") webViewRef: ElementRef;
    @ViewChild("urlField") urlFieldRef: ElementRef;
    @ViewChild("labelResult") labelResultRef: ElementRef;

    //user: User;
    loggedin: boolean;
    public input: any;
    
    constructor(private router: RouterExtensions, 
        private myGetService: MyHttpGetService,
        private ngZone: NgZone,
        private data: Data
    ) {
        this.input = {
            "kthid": "tholind",
            "pin": "8888"
        }
    }

    public getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    public gotoapplication() {
        console.log('gotoapplication');
        //Inom ngZone för att vyn ska uppdateras
        this.ngZone.run(() => {
            this.router.navigate(["home"],{ clearHistory: true })
        });
    }

    ngAfterViewInit() {
        //this.router.navigate(["home"],{ clearHistory: true })
        let webview: WebView = this.webViewRef.nativeElement;
        let label: Label = this.labelResultRef.nativeElement;
        label.text = "WebView is still loading...";
        var that = this;
        webview.on(WebView.loadFinishedEvent,  function (args: LoadEventData) {
            let message;
            if (!args.error) {
                message = "WebView finished loading of " + args.url;
            } else {
                message = "Error loading " + args.url + ": " + args.error;
            }
            label.text = message;
            //TODO hämta evetuell token från url
            var jwttoken = that.getParameterByName('jwttoken',args.url);
            if(jwttoken!="" && jwttoken!= null){
                console.log("jwttoken erhållen: " + jwttoken );
                applicationSettingsModule.setString('jwttoken', jwttoken);
                //TODO redirect to application
                that.loggedin = true;
                that.gotoapplication();
            }
        });
    }

    login() {
        console.log(this.input.kthid);
        if(this.input.kthid && this.input.pin) {
            console.log("login user pw ok");
            this.myGetService.getjwttoken(this.input.kthid + "@kth.se", this.input.pin)
            .subscribe((result) => {
                applicationSettingsModule.setString('jwttoken', result["jwt"]);
                applicationSettingsModule.setString('alma_primaryid', this.input.kthid + "@kth.se");
                this.loggedin = true;
                this.router.navigate(["/tabs"],{ clearHistory: true })
            }, (error) => {
                console.log(error);
            });
        }
    }

    ngOnInit() {
        if (this.data.storage) {
            console.log(this.data.storage.logout);
            this.webViewSrc = "https://apps.lib.kth.se/jwt/jwttokenkthcas_logout.php?returl=https://apps.lib.kth.se/jwt/callback.php"
        } else {
            this.webViewSrc = "https://apps.lib.kth.se/jwt/jwttokenkthcas_app.php?returl=https://apps.lib.kth.se/jwt/callback.php";
        }
        /*
        console.log("login_nginit");
        if (typeof applicationSettingsModule.getString('jwttoken') !== "undefined") {
            console.log("jwttoken: " + applicationSettingsModule.getString('jwttoken'));
            this.loggedin = true;
            console.log(this.loggedin);
            this.router.navigate(["/tabs"],{ clearHistory: true })
        } else {
            this.loggedin = false;
            console.log("not logged in");
        }
        */
    }

    public logout() {
        applicationSettingsModule.remove('jwttoken');
        this.loggedin = false;
    }

    public userinfo() {
        this.router.navigate(["/userinfo"],{ clearHistory: true })
    }

    public almainfo() {
        this.router.navigate(["/almainfo"],{ clearHistory: true })
    }

    public mrbs() {
        this.router.navigate(["/mrbs"],{ clearHistory: true })
    }

    public testpage1() {
        this.router.navigate(["/testpage1"],{ clearHistory: true })
    }

    public authcallback() {
    }
}
