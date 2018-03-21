import { Component } from "@angular/core";
import * as http from "tns-core-modules/http";
import * as applicationSettingsModule from "application-settings";

export class JwtComponent {
    public getjwttoken() {
        console.log('getjwttoken');
        //erhåll en jwttoken från egen server
        http.getJSON("https://graph.facebook.com/v2.9" + "/me?access_token=" + applicationSettingsModule.getString('fb_token') )
        .then((res) => {
            //Hämta dessa från databasen?
            applicationSettingsModule.setString('user_key', res["id"]);
            applicationSettingsModule.setString('user', res["name"]);
            //erhåll en jwttoken från egen server
            http.getJSON("https://apps.lib.kth.se/jwt/jwttokensocial.php?fb_id=" + res["id"] + "&fb_token=" + applicationSettingsModule.getString('fb_token'))
            .then((res) => {
                applicationSettingsModule.setString('jwttoken', res["jwt"]);
            }, function (err) {
                alert("Error getting user info: " + err);
            });
        }, function (err) {
            alert("Error getting user info: " + err);
        });
    }
}