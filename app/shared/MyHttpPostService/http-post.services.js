"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var applicationSettingsModule = require("application-settings");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var MyHttpPostService = (function () {
    function MyHttpPostService(http) {
        this.http = http;
        this.serverUrl = "http://apps.lib.kth.se/webservices/mrbs/bookings/update/index.php";
    }
    MyHttpPostService.prototype.postData = function (data) {
        var options = this.createRequestOptions();
        return this.http.post(this.serverUrl, data, options)
            .map(function (res) { return res.json(); })
            .do(function (data) { return data; }) // debug
            .catch(this.handleErrorObservable);
    };
    MyHttpPostService.prototype.handleErrorObservable = function (error) {
        //console.error(error.message || error);
        return Observable_1.Observable.throw(error.message || error);
    };
    MyHttpPostService.prototype.createRequestOptions = function () {
        var headers = new http_1.Headers();
        headers.append("Authorization", "Bearer " + applicationSettingsModule.getString('jwttoken'));
        headers.append("Content-Type", "application/json");
        var options = new http_1.RequestOptions({ headers: headers });
        return options;
    };
    MyHttpPostService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], MyHttpPostService);
    return MyHttpPostService;
}());
exports.MyHttpPostService = MyHttpPostService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1wb3N0LnNlcnZpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaHR0cC1wb3N0LnNlcnZpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RTtBQUN4RSw4Q0FBNkQ7QUFDN0QsZ0VBQWtFO0FBQ2xFLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFDOUIsbUNBQWlDO0FBQ2pDLHFDQUFtQztBQUduQztJQUdJLDJCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUZ0QixjQUFTLEdBQUcsbUVBQW1FLENBQUM7SUFFdEQsQ0FBQztJQUVuQyxvQ0FBUSxHQUFSLFVBQVMsSUFBUztRQUNkLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFHLElBQUksRUFBRyxPQUFPLENBQUM7YUFDakQsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQzthQUN0QixFQUFFLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDLENBQUUsUUFBUTthQUMxQixLQUFLLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVPLGlEQUFxQixHQUE3QixVQUErQixLQUFxQjtRQUNoRCx3Q0FBd0M7UUFDeEMsTUFBTSxDQUFDLHVCQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVPLGdEQUFvQixHQUE1QjtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUM7UUFDNUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzdGLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbkQsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBeEJRLGlCQUFpQjtRQUQ3QixpQkFBVSxFQUFFO3lDQUlpQixXQUFJO09BSHJCLGlCQUFpQixDQXlCN0I7SUFBRCx3QkFBQztDQUFBLEFBekJELElBeUJDO0FBekJZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0ICogYXMgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2NhdGNoXCI7XHJcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aHJvdyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBNeUh0dHBQb3N0U2VydmljZSB7XHJcbiAgICBwcml2YXRlIHNlcnZlclVybCA9IFwiaHR0cDovL2FwcHMubGliLmt0aC5zZS93ZWJzZXJ2aWNlcy9tcmJzL2Jvb2tpbmdzL3VwZGF0ZS9pbmRleC5waHBcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxyXG5cclxuICAgIHBvc3REYXRhKGRhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5jcmVhdGVSZXF1ZXN0T3B0aW9ucygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLnNlcnZlclVybCwgIGRhdGEgLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuZG8oZGF0YSA9PiBkYXRhKSAgLy8gZGVidWdcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JPYnNlcnZhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yT2JzZXJ2YWJsZSAoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBSeE9ic2VydmFibGUudGhyb3coZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0T3B0aW9ucygpIHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZS5nZXRTdHJpbmcoJ2p3dHRva2VuJykpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgICB9XHJcbn0iXX0=