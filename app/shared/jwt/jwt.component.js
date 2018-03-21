"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("tns-core-modules/http");
var applicationSettingsModule = require("application-settings");
var JwtComponent = (function () {
    function JwtComponent() {
    }
    JwtComponent.prototype.getjwttoken = function () {
        console.log('getjwttoken');
        //erhåll en jwttoken från egen server
        http.getJSON("https://graph.facebook.com/v2.9" + "/me?access_token=" + applicationSettingsModule.getString('fb_token'))
            .then(function (res) {
            //Hämta dessa från databasen?
            applicationSettingsModule.setString('user_key', res["id"]);
            applicationSettingsModule.setString('user', res["name"]);
            //erhåll en jwttoken från egen server
            http.getJSON("https://apps.lib.kth.se/jwt/jwttokensocial.php?fb_id=" + res["id"] + "&fb_token=" + applicationSettingsModule.getString('fb_token'))
                .then(function (res) {
                applicationSettingsModule.setString('jwttoken', res["jwt"]);
            }, function (err) {
                alert("Error getting user info: " + err);
            });
        }, function (err) {
            alert("Error getting user info: " + err);
        });
    };
    return JwtComponent;
}());
exports.JwtComponent = JwtComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImp3dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0Q0FBOEM7QUFDOUMsZ0VBQWtFO0FBRWxFO0lBQUE7SUFvQkEsQ0FBQztJQW5CVSxrQ0FBVyxHQUFsQjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0IscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsaUNBQWlDLEdBQUcsbUJBQW1CLEdBQUcseUJBQXlCLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFFO2FBQ3ZILElBQUksQ0FBQyxVQUFDLEdBQUc7WUFDTiw2QkFBNkI7WUFDN0IseUJBQXlCLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzRCx5QkFBeUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3pELHFDQUFxQztZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLHVEQUF1RCxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLEdBQUcseUJBQXlCLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUNqSixJQUFJLENBQUMsVUFBQyxHQUFHO2dCQUNOLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDaEUsQ0FBQyxFQUFFLFVBQVUsR0FBRztnQkFDWixLQUFLLENBQUMsMkJBQTJCLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLEVBQUUsVUFBVSxHQUFHO1lBQ1osS0FBSyxDQUFDLDJCQUEyQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQXBCWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaHR0cFwiO1xyXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEp3dENvbXBvbmVudCB7XHJcbiAgICBwdWJsaWMgZ2V0and0dG9rZW4oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dldGp3dHRva2VuJyk7XHJcbiAgICAgICAgLy9lcmjDpWxsIGVuIGp3dHRva2VuIGZyw6VuIGVnZW4gc2VydmVyXHJcbiAgICAgICAgaHR0cC5nZXRKU09OKFwiaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vdjIuOVwiICsgXCIvbWU/YWNjZXNzX3Rva2VuPVwiICsgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZS5nZXRTdHJpbmcoJ2ZiX3Rva2VuJykgKVxyXG4gICAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgLy9Iw6RtdGEgZGVzc2EgZnLDpW4gZGF0YWJhc2VuP1xyXG4gICAgICAgICAgICBhcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlLnNldFN0cmluZygndXNlcl9rZXknLCByZXNbXCJpZFwiXSk7XHJcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKCd1c2VyJywgcmVzW1wibmFtZVwiXSk7XHJcbiAgICAgICAgICAgIC8vZXJow6VsbCBlbiBqd3R0b2tlbiBmcsOlbiBlZ2VuIHNlcnZlclxyXG4gICAgICAgICAgICBodHRwLmdldEpTT04oXCJodHRwczovL2FwcHMubGliLmt0aC5zZS9qd3Qvand0dG9rZW5zb2NpYWwucGhwP2ZiX2lkPVwiICsgcmVzW1wiaWRcIl0gKyBcIiZmYl90b2tlbj1cIiArIGFwcGxpY2F0aW9uU2V0dGluZ3NNb2R1bGUuZ2V0U3RyaW5nKCdmYl90b2tlbicpKVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlLnNldFN0cmluZygnand0dG9rZW4nLCByZXNbXCJqd3RcIl0pO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkVycm9yIGdldHRpbmcgdXNlciBpbmZvOiBcIiArIGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvciBnZXR0aW5nIHVzZXIgaW5mbzogXCIgKyBlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19