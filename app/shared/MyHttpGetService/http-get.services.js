"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var applicationSettingsModule = require("application-settings");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var MyHttpGetService = (function () {
    function MyHttpGetService(http) {
        this.http = http;
        this.webserviceUrl = "https://apps.lib.kth.se/webservices/";
        this.serverUrl = "https://apps.lib.kth.se/webservices/grupprum/";
        this.roomsUrl = 'https://apps.lib.kth.se/webservices/grupprum/v1';
    }
    MyHttpGetService.prototype.getData = function (bookingdate) {
        console.log("MyHttpGetService - getData");
        var headers = this.createRequestHeader();
        //let headers = new Headers();
        var params = new http_1.URLSearchParams();
        params.set("bookingdate", bookingdate);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        //console.log(this.serverUrl + "bookings");
        //console.dir(options);
        return this.http.get(this.serverUrl + "bookings", options)
            .map(function (res) { return res.json(); });
        //.catch(this.handleErrorObservable);
    };
    MyHttpGetService.prototype.handleErrorObservable = function (error) {
        console.log("handleErrorObservable");
        console.error(error.message || error);
        return Observable_1.Observable.throw(error.message || error);
    };
    MyHttpGetService.prototype.getBookingdata = function (bookingid) {
        var headers = this.createRequestHeader();
        var params = new http_1.URLSearchParams();
        params.set("bookingid", bookingid);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(this.serverUrl + "bookingdata", options)
            .map(function (res) { return res.json(); });
    };
    MyHttpGetService.prototype.getRoomBookings = function (roomid, bookingdate) {
        console.log("MyHttpGetService - getRoomBookings");
        var headers = this.createRequestHeader();
        var params = new http_1.URLSearchParams();
        params.set("roomid", roomid);
        params.set("bookingdate", bookingdate);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(this.serverUrl + "bookings", options)
            .map(function (res) { return res.json(); });
        //.catch(this.handleErrorObservable);
    };
    MyHttpGetService.prototype.getRoomsforarea = function (areaid) {
        //gammalt api
        //const url = `${this.roomsUrl}/rooms/${areaid}`;
        //lumen API
        //TODO hämta jwttoken
        var url = this.webserviceUrl + "mrbs/api/v1/rooms/?area_id=" + areaid + "&token=" + applicationSettingsModule.getString('jwttoken');
        console.log("url: " + url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    MyHttpGetService.prototype.getjwttoken = function (username, password) {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        var params = new http_1.URLSearchParams();
        params.set("username", username);
        params.set("password", password);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get("https://apps.lib.kth.se/jwt/jwttokenalma.php", options)
            .map(function (res) { return res.json(); });
    };
    MyHttpGetService.prototype.getAlmaUser = function (primaryid) {
        var url = this.webserviceUrl + "alma/v1/users/" + primaryid;
        var headers = this.createRequestHeader();
        //let headers = new Headers();
        var params = new http_1.URLSearchParams();
        //params.set("primaryid", primaryid);
        console.log("getAlmaUser_url: " + url);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url, options)
            .map(function (res) { return res.json(); });
    };
    MyHttpGetService.prototype.getAlmaUserLoans = function (primaryid) {
        var url = this.webserviceUrl + "alma/v1/users/" + primaryid + "/loans";
        var headers = this.createRequestHeader();
        var params = new http_1.URLSearchParams();
        console.log("getAlmaUserLoans_url: " + url);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url, options)
            .map(function (res) { return res.json(); });
    };
    MyHttpGetService.prototype.getAlmaItem = function (barcode) {
        var url = this.webserviceUrl + "alma/v1/items/" + barcode;
        var headers = this.createRequestHeader();
        var params = new http_1.URLSearchParams();
        console.log("getAlmaUserLoans_url: " + url);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url, options)
            .map(function (res) { return res.json(); });
    };
    MyHttpGetService.prototype.createRequestHeader = function () {
        var headers = new http_1.Headers();
        // set headers here e.g.
        headers.append("Authorization", "Bearer " + applicationSettingsModule.getString('jwttoken'));
        headers.append("Content-Type", "application/json");
        return headers;
    };
    MyHttpGetService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], MyHttpGetService);
    return MyHttpGetService;
}());
exports.MyHttpGetService = MyHttpGetService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1nZXQuc2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodHRwLWdldC5zZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBeUY7QUFDekYsOENBQTZEO0FBQzdELGdFQUFrRTtBQUVsRSxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBQzlCLG1DQUFpQztBQUdqQztJQUlJLDBCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUh0QixrQkFBYSxHQUFHLHNDQUFzQyxDQUFDO1FBQ3ZELGNBQVMsR0FBRywrQ0FBK0MsQ0FBQztRQUk1RCxhQUFRLEdBQUcsaURBQWlELENBQUM7SUFGbkMsQ0FBQztJQUluQyxrQ0FBTyxHQUFQLFVBQVEsV0FBVztRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6Qyw4QkFBOEI7UUFDOUIsSUFBSSxNQUFNLEdBQW9CLElBQUksc0JBQWUsRUFBRSxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdkUsMkNBQTJDO1FBQzNDLHVCQUF1QjtRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLEVBQUUsT0FBTyxDQUFDO2FBQ3JELEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQTtRQUN2QixxQ0FBcUM7SUFDekMsQ0FBQztJQUVHLGdEQUFxQixHQUE3QixVQUErQixLQUFxQjtRQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDckMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyx1QkFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCx5Q0FBYyxHQUFkLFVBQWUsU0FBUztRQUNwQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6QyxJQUFJLE1BQU0sR0FBb0IsSUFBSSxzQkFBZSxFQUFFLENBQUM7UUFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbkMsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLEVBQUUsT0FBTyxDQUFDO2FBQ3hELEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBRUQsMENBQWUsR0FBZixVQUFnQixNQUFNLEVBQUUsV0FBVztRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFekMsSUFBSSxNQUFNLEdBQW9CLElBQUksc0JBQWUsRUFBRSxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdkUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxFQUFFLE9BQU8sQ0FBQzthQUNyRCxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDLENBQUE7UUFDdkIscUNBQXFDO0lBQzdDLENBQUM7SUFFRCwwQ0FBZSxHQUFmLFVBQWdCLE1BQWM7UUFDekIsYUFBYTtRQUNkLGlEQUFpRDtRQUNqRCxXQUFXO1FBQ1gscUJBQXFCO1FBQ3JCLElBQU0sR0FBRyxHQUFNLElBQUksQ0FBQyxhQUFhLG1DQUE4QixNQUFNLGVBQVUseUJBQXlCLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBRyxDQUFDO1FBQ2pJLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7YUFDcEIsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFFRCxzQ0FBVyxHQUFYLFVBQVksUUFBUSxFQUFFLFFBQVE7UUFDMUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ25ELElBQUksTUFBTSxHQUFvQixJQUFJLHNCQUFlLEVBQUUsQ0FBQztRQUNwRCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqQyxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsRUFBRSxPQUFPLENBQUM7YUFDeEUsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFFRCxzQ0FBVyxHQUFYLFVBQVksU0FBaUI7UUFDekIsSUFBSSxHQUFHLEdBQU0sSUFBSSxDQUFDLGFBQWEsc0JBQWlCLFNBQVcsQ0FBQztRQUM1RCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6Qyw4QkFBOEI7UUFDOUIsSUFBSSxNQUFNLEdBQW9CLElBQUksc0JBQWUsRUFBRSxDQUFDO1FBQ3BELHFDQUFxQztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdkUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7YUFDN0IsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFFRCwyQ0FBZ0IsR0FBaEIsVUFBaUIsU0FBaUI7UUFDOUIsSUFBSSxHQUFHLEdBQU0sSUFBSSxDQUFDLGFBQWEsc0JBQWlCLFNBQVMsV0FBUSxDQUFDO1FBQ2xFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3pDLElBQUksTUFBTSxHQUFvQixJQUFJLHNCQUFlLEVBQUUsQ0FBQztRQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdkUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7YUFDN0IsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFFRCxzQ0FBVyxHQUFYLFVBQVksT0FBZTtRQUN2QixJQUFJLEdBQUcsR0FBTSxJQUFJLENBQUMsYUFBYSxzQkFBaUIsT0FBUyxDQUFDO1FBQzFELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3pDLElBQUksTUFBTSxHQUFvQixJQUFJLHNCQUFlLEVBQUUsQ0FBQztRQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdkUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7YUFDN0IsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFFTyw4Q0FBbUIsR0FBM0I7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLHdCQUF3QjtRQUN4QixPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcseUJBQXlCLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDN0YsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUVuRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUEvR1EsZ0JBQWdCO1FBRDVCLGlCQUFVLEVBQUU7eUNBS2lCLFdBQUk7T0FKckIsZ0JBQWdCLENBZ0g1QjtJQUFELHVCQUFDO0NBQUEsQUFoSEQsSUFnSEM7QUFoSFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlLCBSZXF1ZXN0T3B0aW9ucywgVVJMU2VhcmNoUGFyYW1zIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uU2V0dGluZ3NNb2R1bGUgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2hcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE15SHR0cEdldFNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSB3ZWJzZXJ2aWNlVXJsID0gXCJodHRwczovL2FwcHMubGliLmt0aC5zZS93ZWJzZXJ2aWNlcy9cIjtcclxuICAgIHByaXZhdGUgc2VydmVyVXJsID0gXCJodHRwczovL2FwcHMubGliLmt0aC5zZS93ZWJzZXJ2aWNlcy9ncnVwcHJ1bS9cIjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHJvb21zVXJsID0gJ2h0dHBzOi8vYXBwcy5saWIua3RoLnNlL3dlYnNlcnZpY2VzL2dydXBwcnVtL3YxJztcclxuXHJcbiAgICBnZXREYXRhKGJvb2tpbmdkYXRlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNeUh0dHBHZXRTZXJ2aWNlIC0gZ2V0RGF0YVwiKTtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xyXG4gICAgICAgIC8vbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGxldCBwYXJhbXM6IFVSTFNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgICBwYXJhbXMuc2V0KFwiYm9va2luZ2RhdGVcIiwgYm9va2luZ2RhdGUpO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycywgc2VhcmNoOiBwYXJhbXMgfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnNlcnZlclVybCArIFwiYm9va2luZ3NcIik7XHJcbiAgICAgICAgLy9jb25zb2xlLmRpcihvcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZlclVybCArIFwiYm9va2luZ3NcIiwgb3B0aW9ucylcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLy8uY2F0Y2godGhpcy5oYW5kbGVFcnJvck9ic2VydmFibGUpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvck9ic2VydmFibGUgKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGFuZGxlRXJyb3JPYnNlcnZhYmxlXCIpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIFJ4T2JzZXJ2YWJsZS50aHJvdyhlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0Qm9va2luZ2RhdGEoYm9va2luZ2lkKSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuICAgICAgICBsZXQgcGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XHJcbiAgICAgICAgcGFyYW1zLnNldChcImJvb2tpbmdpZFwiLCBib29raW5naWQpO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycywgc2VhcmNoOiBwYXJhbXMgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZXJ2ZXJVcmwgKyBcImJvb2tpbmdkYXRhXCIsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Um9vbUJvb2tpbmdzKHJvb21pZCwgYm9va2luZ2RhdGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk15SHR0cEdldFNlcnZpY2UgLSBnZXRSb29tQm9va2luZ3NcIik7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IHBhcmFtczogVVJMU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG4gICAgICAgIHBhcmFtcy5zZXQoXCJyb29taWRcIiwgcm9vbWlkKTtcclxuICAgICAgICBwYXJhbXMuc2V0KFwiYm9va2luZ2RhdGVcIiwgYm9va2luZ2RhdGUpO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycywgc2VhcmNoOiBwYXJhbXMgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZXJ2ZXJVcmwgKyBcImJvb2tpbmdzXCIsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC8vLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JPYnNlcnZhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSb29tc2ZvcmFyZWEoYXJlYWlkOiBudW1iZXIpOiBSeE9ic2VydmFibGU8YW55W10+IHtcclxuICAgICAgICAgLy9nYW1tYWx0IGFwaVxyXG4gICAgICAgIC8vY29uc3QgdXJsID0gYCR7dGhpcy5yb29tc1VybH0vcm9vbXMvJHthcmVhaWR9YDtcclxuICAgICAgICAvL2x1bWVuIEFQSVxyXG4gICAgICAgIC8vVE9ETyBow6RtdGEgand0dG9rZW5cclxuICAgICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLndlYnNlcnZpY2VVcmx9bXJicy9hcGkvdjEvcm9vbXMvP2FyZWFfaWQ9JHthcmVhaWR9JnRva2VuPSR7YXBwbGljYXRpb25TZXR0aW5nc01vZHVsZS5nZXRTdHJpbmcoJ2p3dHRva2VuJyl9YDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInVybDogXCIgKyB1cmwpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybClcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRqd3R0b2tlbih1c2VybmFtZSwgcGFzc3dvcmQpIHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgIGxldCBwYXJhbXM6IFVSTFNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgICBwYXJhbXMuc2V0KFwidXNlcm5hbWVcIiwgdXNlcm5hbWUpO1xyXG4gICAgICAgIHBhcmFtcy5zZXQoXCJwYXNzd29yZFwiLCBwYXNzd29yZCk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzLCBzZWFyY2g6IHBhcmFtcyB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChcImh0dHBzOi8vYXBwcy5saWIua3RoLnNlL2p3dC9qd3R0b2tlbmFsbWEucGhwXCIsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWxtYVVzZXIocHJpbWFyeWlkOiBzdHJpbmcpe1xyXG4gICAgICAgIHZhciB1cmwgPSBgJHt0aGlzLndlYnNlcnZpY2VVcmx9YWxtYS92MS91c2Vycy8ke3ByaW1hcnlpZH1gO1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XHJcbiAgICAgICAgLy9sZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgbGV0IHBhcmFtczogVVJMU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG4gICAgICAgIC8vcGFyYW1zLnNldChcInByaW1hcnlpZFwiLCBwcmltYXJ5aWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0QWxtYVVzZXJfdXJsOiBcIiArIHVybCk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzLCBzZWFyY2g6IHBhcmFtcyB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWxtYVVzZXJMb2FucyhwcmltYXJ5aWQ6IHN0cmluZyl7XHJcbiAgICAgICAgdmFyIHVybCA9IGAke3RoaXMud2Vic2VydmljZVVybH1hbG1hL3YxL3VzZXJzLyR7cHJpbWFyeWlkfS9sb2Fuc2A7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuICAgICAgICBsZXQgcGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnZXRBbG1hVXNlckxvYW5zX3VybDogXCIgKyB1cmwpO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycywgc2VhcmNoOiBwYXJhbXMgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgfVxyXG5cclxuICAgIGdldEFsbWFJdGVtKGJhcmNvZGU6IHN0cmluZyl7XHJcbiAgICAgICAgdmFyIHVybCA9IGAke3RoaXMud2Vic2VydmljZVVybH1hbG1hL3YxL2l0ZW1zLyR7YmFyY29kZX1gO1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XHJcbiAgICAgICAgbGV0IHBhcmFtczogVVJMU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0QWxtYVVzZXJMb2Fuc191cmw6IFwiICsgdXJsKTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMsIHNlYXJjaDogcGFyYW1zIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgb3B0aW9ucylcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZVJlcXVlc3RIZWFkZXIoKSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIC8vIHNldCBoZWFkZXJzIGhlcmUgZS5nLlxyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIGFwcGxpY2F0aW9uU2V0dGluZ3NNb2R1bGUuZ2V0U3RyaW5nKCdqd3R0b2tlbicpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICBcclxuICAgICAgICByZXR1cm4gaGVhZGVycztcclxuICAgIH1cclxufSJdfQ==