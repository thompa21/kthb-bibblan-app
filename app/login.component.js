"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var http_get_services_1 = require("./shared/MyHttpGetService/http-get.services");
var applicationSettingsModule = require("application-settings");
var web_view_1 = require("ui/web-view");
var LoginComponent = (function () {
    function LoginComponent(router, myGetService, ngZone) {
        this.router = router;
        this.myGetService = myGetService;
        this.ngZone = ngZone;
        this.webViewSrc = "https://apps.lib.kth.se/jwt/jwttokenkthcas_app.php?returl=https://apps.lib.kth.se/jwt/callback.php";
        this.input = {
            "kthid": "tholind",
            "pin": "8888"
        };
    }
    LoginComponent.prototype.getParameterByName = function (name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };
    LoginComponent.prototype.gotoapplication = function () {
        var _this = this;
        console.log('gotoapplication');
        //Inom ngZone för att vyn ska uppdateras
        this.ngZone.run(function () {
            _this.router.navigate(["home"], { clearHistory: true });
        });
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        //this.router.navigate(["home"],{ clearHistory: true })
        var webview = this.webViewRef.nativeElement;
        var label = this.labelResultRef.nativeElement;
        label.text = "WebView is still loading...";
        var that = this;
        webview.on(web_view_1.WebView.loadFinishedEvent, function (args) {
            var message;
            if (!args.error) {
                message = "WebView finished loading of " + args.url;
            }
            else {
                message = "Error loading " + args.url + ": " + args.error;
            }
            label.text = message;
            //TODO hämta evetuell token från url
            var jwttoken = that.getParameterByName('jwttoken', args.url);
            if (jwttoken != "" && jwttoken != null) {
                console.log("jwttoken erhållen: " + jwttoken);
                applicationSettingsModule.setString('jwttoken', jwttoken);
                //TODO redirect to application
                that.loggedin = true;
                that.gotoapplication();
            }
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        console.log(this.input.kthid);
        if (this.input.kthid && this.input.pin) {
            console.log("login user pw ok");
            this.myGetService.getjwttoken(this.input.kthid + "@kth.se", this.input.pin)
                .subscribe(function (result) {
                applicationSettingsModule.setString('jwttoken', result["jwt"]);
                applicationSettingsModule.setString('alma_primaryid', _this.input.kthid + "@kth.se");
                _this.loggedin = true;
                _this.router.navigate(["/tabs"], { clearHistory: true });
            }, function (error) {
                console.log(error);
            });
        }
    };
    LoginComponent.prototype.ngOnInit = function () {
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
    };
    LoginComponent.prototype.logout = function () {
        applicationSettingsModule.remove('jwttoken');
        this.loggedin = false;
    };
    LoginComponent.prototype.userinfo = function () {
        this.router.navigate(["/userinfo"], { clearHistory: true });
    };
    LoginComponent.prototype.almainfo = function () {
        this.router.navigate(["/almainfo"], { clearHistory: true });
    };
    LoginComponent.prototype.mrbs = function () {
        this.router.navigate(["/mrbs"], { clearHistory: true });
    };
    LoginComponent.prototype.testpage1 = function () {
        this.router.navigate(["/testpage1"], { clearHistory: true });
    };
    LoginComponent.prototype.authcallback = function () {
    };
    __decorate([
        core_1.ViewChild("myWebView"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "webViewRef", void 0);
    __decorate([
        core_1.ViewChild("urlField"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "urlFieldRef", void 0);
    __decorate([
        core_1.ViewChild("labelResult"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "labelResultRef", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: "kthb-login",
            templateUrl: "login.component.html",
            providers: [http_get_services_1.MyHttpGetService]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            http_get_services_1.MyHttpGetService,
            core_1.NgZone])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdHO0FBQ2hHLHNEQUE4RDtBQUU5RCxpRkFBK0U7QUFFL0UsZ0VBQWtFO0FBRWxFLHdDQUFxRDtBQVVyRDtJQVVJLHdCQUFvQixNQUF3QixFQUNoQyxZQUE4QixFQUM5QixNQUFjO1FBRk4sV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDaEMsaUJBQVksR0FBWixZQUFZLENBQWtCO1FBQzlCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFYbkIsZUFBVSxHQUFXLG9HQUFvRyxDQUFDO1FBYTdILElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxPQUFPLEVBQUUsU0FBUztZQUNsQixLQUFLLEVBQUUsTUFBTTtTQUNoQixDQUFBO0lBQ0wsQ0FBQztJQUVNLDJDQUFrQixHQUF6QixVQUEwQixJQUFJLEVBQUUsR0FBRztRQUMvQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzVELElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUUzQixNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRU0sd0NB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QkFBVTswREFBQztJQUo1QyxjQUFjO1FBTDFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUsc0JBQXNCO1lBQ25DLFNBQVMsRUFBRSxDQUFDLG9DQUFnQixDQUFDO1NBQ2hDLENBQUM7eUNBVzhCLHlCQUFnQjtZQUNsQixvQ0FBZ0I7WUFDdEIsYUFBTTtPQVpqQixjQUFjLENBc0gxQjtJQUFELHFCQUFDO0NBQUEsQUF0SEQsSUFzSEM7QUF0SFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IHNldEludGVydmFsLCBzZXRUaW1lb3V0LCBjbGVhckludGVydmFsIH0gZnJvbSBcInRpbWVyXCI7XHJcbmltcG9ydCB7IE15SHR0cEdldFNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvTXlIdHRwR2V0U2VydmljZS9odHRwLWdldC5zZXJ2aWNlc1wiO1xyXG5cclxuaW1wb3J0ICogYXMgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcbmltcG9ydCB7IFdlYlZpZXcsIExvYWRFdmVudERhdGEgfSBmcm9tIFwidWkvd2ViLXZpZXdcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInVpL2xhYmVsXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImt0aGItbG9naW5cIixcclxuICAgIHRlbXBsYXRlVXJsOiBcImxvZ2luLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBwcm92aWRlcnM6IFtNeUh0dHBHZXRTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQge1xyXG4gICAgcHVibGljIHdlYlZpZXdTcmM6IHN0cmluZyA9IFwiaHR0cHM6Ly9hcHBzLmxpYi5rdGguc2Uvand0L2p3dHRva2Vua3RoY2FzX2FwcC5waHA/cmV0dXJsPWh0dHBzOi8vYXBwcy5saWIua3RoLnNlL2p3dC9jYWxsYmFjay5waHBcIjtcclxuICAgIEBWaWV3Q2hpbGQoXCJteVdlYlZpZXdcIikgd2ViVmlld1JlZjogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJ1cmxGaWVsZFwiKSB1cmxGaWVsZFJlZjogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJsYWJlbFJlc3VsdFwiKSBsYWJlbFJlc3VsdFJlZjogRWxlbWVudFJlZjtcclxuXHJcbiAgICAvL3VzZXI6IFVzZXI7XHJcbiAgICBsb2dnZWRpbjogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBpbnB1dDogYW55O1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucywgXHJcbiAgICAgICAgcHJpdmF0ZSBteUdldFNlcnZpY2U6IE15SHR0cEdldFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IHtcclxuICAgICAgICAgICAgXCJrdGhpZFwiOiBcInRob2xpbmRcIixcclxuICAgICAgICAgICAgXCJwaW5cIjogXCI4ODg4XCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBhcmFtZXRlckJ5TmFtZShuYW1lLCB1cmwpIHtcclxuICAgICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXFxdXS9nLCBcIlxcXFwkJlwiKTtcclxuICAgICAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKFwiWz8mXVwiICsgbmFtZSArIFwiKD0oW14mI10qKXwmfCN8JClcIik7XHJcbiAgICAgICAgdmFyIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XHJcbiAgICAgICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBpZiAoIXJlc3VsdHNbMl0pIHJldHVybiAnJztcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvdG9hcHBsaWNhdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ290b2FwcGxpY2F0aW9uJyk7XHJcbiAgICAgICAgLy9Jbm9tIG5nWm9uZSBmw7ZyIGF0dCB2eW4gc2thIHVwcGRhdGVyYXNcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJob21lXCJdLHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiaG9tZVwiXSx7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KVxyXG4gICAgICAgIGxldCB3ZWJ2aWV3OiBXZWJWaWV3ID0gdGhpcy53ZWJWaWV3UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IGxhYmVsOiBMYWJlbCA9IHRoaXMubGFiZWxSZXN1bHRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBsYWJlbC50ZXh0ID0gXCJXZWJWaWV3IGlzIHN0aWxsIGxvYWRpbmcuLi5cIjtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgd2Vidmlldy5vbihXZWJWaWV3LmxvYWRGaW5pc2hlZEV2ZW50LCAgZnVuY3Rpb24gKGFyZ3M6IExvYWRFdmVudERhdGEpIHtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2U7XHJcbiAgICAgICAgICAgIGlmICghYXJncy5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiV2ViVmlldyBmaW5pc2hlZCBsb2FkaW5nIG9mIFwiICsgYXJncy51cmw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJFcnJvciBsb2FkaW5nIFwiICsgYXJncy51cmwgKyBcIjogXCIgKyBhcmdzLmVycm9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxhYmVsLnRleHQgPSBtZXNzYWdlO1xyXG4gICAgICAgICAgICAvL1RPRE8gaMOkbXRhIGV2ZXR1ZWxsIHRva2VuIGZyw6VuIHVybFxyXG4gICAgICAgICAgICB2YXIgand0dG9rZW4gPSB0aGF0LmdldFBhcmFtZXRlckJ5TmFtZSgnand0dG9rZW4nLGFyZ3MudXJsKTtcclxuICAgICAgICAgICAgaWYoand0dG9rZW4hPVwiXCIgJiYgand0dG9rZW4hPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiand0dG9rZW4gZXJow6VsbGVuOiBcIiArIGp3dHRva2VuICk7XHJcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlLnNldFN0cmluZygnand0dG9rZW4nLCBqd3R0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAvL1RPRE8gcmVkaXJlY3QgdG8gYXBwbGljYXRpb25cclxuICAgICAgICAgICAgICAgIHRoYXQubG9nZ2VkaW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5nb3RvYXBwbGljYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ2luKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaW5wdXQua3RoaWQpO1xyXG4gICAgICAgIGlmKHRoaXMuaW5wdXQua3RoaWQgJiYgdGhpcy5pbnB1dC5waW4pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2dpbiB1c2VyIHB3IG9rXCIpO1xyXG4gICAgICAgICAgICB0aGlzLm15R2V0U2VydmljZS5nZXRqd3R0b2tlbih0aGlzLmlucHV0Lmt0aGlkICsgXCJAa3RoLnNlXCIsIHRoaXMuaW5wdXQucGluKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKCdqd3R0b2tlbicsIHJlc3VsdFtcImp3dFwiXSk7XHJcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlLnNldFN0cmluZygnYWxtYV9wcmltYXJ5aWQnLCB0aGlzLmlucHV0Lmt0aGlkICsgXCJAa3RoLnNlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZWRpbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGFic1wiXSx7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KVxyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2dpbl9uZ2luaXRcIik7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlLmdldFN0cmluZygnand0dG9rZW4nKSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImp3dHRva2VuOiBcIiArIGFwcGxpY2F0aW9uU2V0dGluZ3NNb2R1bGUuZ2V0U3RyaW5nKCdqd3R0b2tlbicpKTtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZWRpbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubG9nZ2VkaW4pO1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGFic1wiXSx7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VkaW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgbG9nZ2VkIGluXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAqL1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dvdXQoKSB7XHJcbiAgICAgICAgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZS5yZW1vdmUoJ2p3dHRva2VuJyk7XHJcbiAgICAgICAgdGhpcy5sb2dnZWRpbiA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1c2VyaW5mbygpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdXNlcmluZm9cIl0seyBjbGVhckhpc3Rvcnk6IHRydWUgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWxtYWluZm8oKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2FsbWFpbmZvXCJdLHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1yYnMoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL21yYnNcIl0seyBjbGVhckhpc3Rvcnk6IHRydWUgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdGVzdHBhZ2UxKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90ZXN0cGFnZTFcIl0seyBjbGVhckhpc3Rvcnk6IHRydWUgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXV0aGNhbGxiYWNrKCkge1xyXG4gICAgfVxyXG59XHJcbiJdfQ==