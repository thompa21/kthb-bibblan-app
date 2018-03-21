"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_get_services_1 = require("../../shared/MyHttpGetService/http-get.services");
var applicationSettingsModule = require("application-settings");
var SearchComponent = (function () {
    function SearchComponent(myService) {
        this.myService = myService;
        this.rooms = [];
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("SEARCH oninit");
        this.myService.getAlmaUserLoans(applicationSettingsModule.getString('alma_primaryid'))
            .subscribe(function (result) {
            _this.onGetDataSuccess(result);
        }, function (error) {
            _this.onGetDataError(error);
        });
    };
    SearchComponent.prototype.onGetDataSuccess = function (res) {
        this.myUserLoans = res;
        //console.dir(this.myUserLoans);
    };
    SearchComponent.prototype.onGetDataError = function (error) {
        console.log("onGetDataError: " + error.status);
        if (error.status === 401) {
            //skicka till login
        }
        if (error.status === 404) {
            //skicka till login
            alert("Tjänsten inte tillgänglig");
        }
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'Search',
            moduleId: module.id,
            templateUrl: "./search.component.html",
            styleUrls: ["./search.component.css"],
            //changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [http_get_services_1.MyHttpGetService]
        }),
        __metadata("design:paramtypes", [http_get_services_1.MyHttpGetService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkY7QUFHN0YscUZBQW1GO0FBQ25GLGdFQUFrRTtBQVdsRTtJQUtJLHlCQUNZLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBRnZDLFVBQUssR0FBa0IsRUFBRSxDQUFDO0lBSTFCLENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBQUEsaUJBUUM7UUFQRyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMseUJBQXlCLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7YUFDckYsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNkLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNqQyxDQUFDLEVBQUUsVUFBQyxLQUFLO1lBQ0wsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTywwQ0FBZ0IsR0FBeEIsVUFBeUIsR0FBRztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUN2QixnQ0FBZ0M7SUFDcEMsQ0FBQztJQUVPLHdDQUFjLEdBQXRCLFVBQXVCLEtBQXFCO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2QixtQkFBbUI7UUFDdkIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2QixtQkFBbUI7WUFDbkIsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDdkMsQ0FBQztJQUVMLENBQUM7SUFuQ1EsZUFBZTtRQVQzQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7WUFDckMsa0RBQWtEO1lBQ2xELFNBQVMsRUFBRSxDQUFDLG9DQUFnQixDQUFDO1NBQ2hDLENBQUM7eUNBUXlCLG9DQUFnQjtPQU45QixlQUFlLENBb0MzQjtJQUFELHNCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7QUFwQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5LCBDaGFuZ2VkRGF0YSwgQ2hhbmdlVHlwZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgTXlIdHRwR2V0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvTXlIdHRwR2V0U2VydmljZS9odHRwLWdldC5zZXJ2aWNlc1wiO1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdTZWFyY2gnLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zZWFyY2guY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vc2VhcmNoLmNvbXBvbmVudC5jc3NcIl0sXG4gICAgLy9jaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFtNeUh0dHBHZXRTZXJ2aWNlXVxufSlcblxuZXhwb3J0IGNsYXNzIFNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLy9wdWJsaWMgbXlVc2VyOiBSeE9ic2VydmFibGU8QXJyYXk8YW55Pj47XG4gICAgLy9teVVzZXI6IEFycmF5PE9iamVjdD4gPSBbXTtcbiAgICBteVVzZXJMb2FuczogT2JzZXJ2YWJsZUFycmF5PEFycmF5PGFueT4+XG4gICAgcm9vbXM6IEFycmF5PE9iamVjdD4gPSBbXTtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBteVNlcnZpY2U6IE15SHR0cEdldFNlcnZpY2UsXG4gICAgKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU0VBUkNIIG9uaW5pdFwiKTtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0QWxtYVVzZXJMb2FucyhhcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlLmdldFN0cmluZygnYWxtYV9wcmltYXJ5aWQnKSlcbiAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KVxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25HZXREYXRhU3VjY2VzcyhyZXMpIHtcbiAgICAgICAgdGhpcy5teVVzZXJMb2FucyA9IHJlcztcbiAgICAgICAgLy9jb25zb2xlLmRpcih0aGlzLm15VXNlckxvYW5zKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uR2V0RGF0YUVycm9yOiBcIiArIGVycm9yLnN0YXR1cyk7XG4gICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgICAgLy9za2lja2EgdGlsbCBsb2dpblxuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgICAgLy9za2lja2EgdGlsbCBsb2dpblxuICAgICAgICAgICAgYWxlcnQoXCJUasOkbnN0ZW4gaW50ZSB0aWxsZ8OkbmdsaWdcIik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufSJdfQ==