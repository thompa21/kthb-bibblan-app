"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_get_services_1 = require("../../shared/MyHttpGetService/http-get.services");
var applicationSettingsModule = require("application-settings");
var user_1 = require("../../user");
var HomeComponent = (function () {
    function HomeComponent(myService) {
        this.myService = myService;
        this.rooms = [];
        this.user = new user_1.User();
        this.user.email = "my.test.account@nativescript.org";
        this.input = {
            "kthid": "tholind",
            "pin": "8888"
        };
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("HOME oninit");
        this.user.email = "KALLE";
        this.myService.getAlmaUser(applicationSettingsModule.getString('alma_primaryid'))
            .subscribe(function (result) {
            _this.onGetDataSuccess(result);
        }, function (error) {
            _this.onGetDataError(error);
        });
    };
    HomeComponent.prototype.setkalla = function () {
        this.user.email = "KALLE ANKA";
    };
    HomeComponent.prototype.onGetDataSuccess = function (res) {
        this.myUser = res;
        this.user.full_name = res.full_name;
        var emailadress = "";
        var streetaddress = "";
        var postal_code = "";
        var city = "";
        res.contact_info.email.forEach(function (email) {
            if (email.preferred) {
                emailadress = email.email_address;
            }
        });
        res.contact_info.address.forEach(function (address) {
            if (address.preferred) {
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
    };
    HomeComponent.prototype.onGetDataError = function (error) {
        console.log("onGetDataError: " + error.status);
        if (error.status === 401) {
            //skicka till login
        }
        if (error.status === 404) {
            //skicka till login
            alert("Tjänsten inte tillgänglig");
        }
    };
    HomeComponent.prototype.submit = function () {
        alert("You’re using: " + this.test);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'Home',
            moduleId: module.id,
            templateUrl: "./home.component.html",
            styleUrls: ["./home.component.css"],
            //changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [http_get_services_1.MyHttpGetService]
        }),
        __metadata("design:paramtypes", [http_get_services_1.MyHttpGetService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RjtBQUs3RixxRkFBbUY7QUFFbkYsZ0VBQWtFO0FBRWxFLG1DQUErQjtBQVkvQjtJQVdJLHVCQUNZLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBUnZDLFVBQUssR0FBa0IsRUFBRSxDQUFDO1FBVXRCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxrQ0FBa0MsQ0FBQztRQUNyRCxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLE1BQU07U0FDaEIsQ0FBQTtJQUNMLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQUEsaUJBU0M7UUFSRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUNoRixTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ2QsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ2pDLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDTCxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGdDQUFRLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7SUFFTyx3Q0FBZ0IsR0FBeEIsVUFBeUIsR0FBRztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ3BDLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVkLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFTLEtBQUs7WUFDekMsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUM7Z0JBQ2hCLFdBQVcsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO1lBQ3RDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFTLE9BQU87WUFDN0MsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUM7Z0JBQ2xCLGFBQWEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUM5QixXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztnQkFDbEMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDeEIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRU8sc0NBQWMsR0FBdEIsVUFBdUIsS0FBcUI7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLG1CQUFtQjtRQUN2QixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLG1CQUFtQjtZQUNuQixLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUN2QyxDQUFDO0lBRUwsQ0FBQztJQUVELDhCQUFNLEdBQU47UUFDSSxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUE5RU0sYUFBYTtRQVR6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDbkMsa0RBQWtEO1lBQ2xELFNBQVMsRUFBRSxDQUFDLG9DQUFnQixDQUFDO1NBQ2hDLENBQUM7eUNBY3lCLG9DQUFnQjtPQVo5QixhQUFhLENBK0V6QjtJQUFELG9CQUFDO0NBQUEsQUEvRUQsSUErRUM7QUEvRVksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXksIENoYW5nZWREYXRhLCBDaGFuZ2VUeXBlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5cbmltcG9ydCB7IE15SHR0cEdldFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL015SHR0cEdldFNlcnZpY2UvaHR0cC1nZXQuc2VydmljZXNcIjtcblxuaW1wb3J0ICogYXMgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcblxuaW1wb3J0IHtVc2VyfSBmcm9tIFwiLi4vLi4vdXNlclwiXG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdIb21lJyxcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9ob21lLmNvbXBvbmVudC5jc3NcIl0sXG4gICAgLy9jaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFtNeUh0dHBHZXRTZXJ2aWNlXVxufSlcblxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8vcHVibGljIG15VXNlcjogUnhPYnNlcnZhYmxlPEFycmF5PGFueT4+O1xuICAgIC8vbXlVc2VyOiBBcnJheTxPYmplY3Q+ID0gW107XG4gICAgbXlVc2VyOiBPYnNlcnZhYmxlQXJyYXk8QXJyYXk8YW55Pj5cbiAgICByb29tczogQXJyYXk8T2JqZWN0PiA9IFtdO1xuXG4gICAgcHVibGljIHVzZXI6IFVzZXI7XG4gICAgcHVibGljIGlucHV0OiBhbnk7XG4gICAgdGVzdDtcblxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgbXlTZXJ2aWNlOiBNeUh0dHBHZXRTZXJ2aWNlLFxuICAgICkge1xuICAgICAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xuICAgICAgICB0aGlzLnVzZXIuZW1haWwgPSBcIm15LnRlc3QuYWNjb3VudEBuYXRpdmVzY3JpcHQub3JnXCI7XG4gICAgICAgIHRoaXMuaW5wdXQgPSB7XG4gICAgICAgICAgICBcImt0aGlkXCI6IFwidGhvbGluZFwiLFxuICAgICAgICAgICAgXCJwaW5cIjogXCI4ODg4XCJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkhPTUUgb25pbml0XCIpO1xuICAgICAgICB0aGlzLnVzZXIuZW1haWwgPSBcIktBTExFXCI7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldEFsbWFVc2VyKGFwcGxpY2F0aW9uU2V0dGluZ3NNb2R1bGUuZ2V0U3RyaW5nKCdhbG1hX3ByaW1hcnlpZCcpKVxuICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcilcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRrYWxsYSgpIHtcbiAgICAgICAgdGhpcy51c2VyLmVtYWlsID0gXCJLQUxMRSBBTktBXCI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFTdWNjZXNzKHJlcykge1xuICAgICAgICB0aGlzLm15VXNlciA9IHJlcztcbiAgICAgICAgdGhpcy51c2VyLmZ1bGxfbmFtZSA9IHJlcy5mdWxsX25hbWU7XG4gICAgICAgIHZhciBlbWFpbGFkcmVzcyA9IFwiXCI7XG4gICAgICAgIHZhciBzdHJlZXRhZGRyZXNzID0gXCJcIjtcbiAgICAgICAgdmFyIHBvc3RhbF9jb2RlID0gXCJcIjtcbiAgICAgICAgdmFyIGNpdHkgPSBcIlwiO1xuXG4gICAgICAgIHJlcy5jb250YWN0X2luZm8uZW1haWwuZm9yRWFjaChmdW5jdGlvbihlbWFpbCkge1xuICAgICAgICAgICAgaWYoZW1haWwucHJlZmVycmVkKXtcbiAgICAgICAgICAgICAgICBlbWFpbGFkcmVzcyA9IGVtYWlsLmVtYWlsX2FkZHJlc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXMuY29udGFjdF9pbmZvLmFkZHJlc3MuZm9yRWFjaChmdW5jdGlvbihhZGRyZXNzKSB7XG4gICAgICAgICAgICBpZihhZGRyZXNzLnByZWZlcnJlZCl7XG4gICAgICAgICAgICAgICAgc3RyZWV0YWRkcmVzcyA9IGFkZHJlc3MubGluZTE7XG4gICAgICAgICAgICAgICAgcG9zdGFsX2NvZGUgPSBhZGRyZXNzLnBvc3RhbF9jb2RlO1xuICAgICAgICAgICAgICAgIGNpdHkgPSBhZGRyZXNzLmNpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvL3V0YW5mb3IgZm9yZWFjaCBmw7ZyIGF0dCBmdW5nZXJhP1xuICAgICAgICB0aGlzLnVzZXIuZW1haWwgPSBlbWFpbGFkcmVzcztcbiAgICAgICAgdGhpcy51c2VyLnN0cmVldGFkZHJlc3MgPSBzdHJlZXRhZGRyZXNzO1xuICAgICAgICB0aGlzLnVzZXIucG9zdGFsX2NvZGUgPSBwb3N0YWxfY29kZTtcbiAgICAgICAgdGhpcy51c2VyLmNpdHkgPSBjaXR5O1xuICAgIH1cblxuICAgIHByaXZhdGUgb25HZXREYXRhRXJyb3IoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25HZXREYXRhRXJyb3I6IFwiICsgZXJyb3Iuc3RhdHVzKTtcbiAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgICAvL3NraWNrYSB0aWxsIGxvZ2luXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICAvL3NraWNrYSB0aWxsIGxvZ2luXG4gICAgICAgICAgICBhbGVydChcIlRqw6Ruc3RlbiBpbnRlIHRpbGxnw6RuZ2xpZ1wiKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBzdWJtaXQoKSB7XG4gICAgICAgIGFsZXJ0KFwiWW914oCZcmUgdXNpbmc6IFwiICsgdGhpcy50ZXN0KTtcbiAgICAgIH1cbn0iXX0=