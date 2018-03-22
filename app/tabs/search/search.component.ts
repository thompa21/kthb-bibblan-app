import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild } from "@angular/core";
import { Observable as RxObservable } from 'rxjs/Observable';
import { ObservableArray, ChangedData, ChangeType } from "tns-core-modules/data/observable-array";
import { MyHttpGetService } from "../../shared/MyHttpGetService/http-get.services";
import * as applicationSettingsModule from "application-settings";

@Component({
    selector: 'Search',
    moduleId: module.id,
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"],
    //changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MyHttpGetService]
})

export class SearchComponent implements OnInit {
    //public myUser: RxObservable<Array<any>>;
    //myUser: Array<Object> = [];
    myUserLoans: ObservableArray<Array<any>>
    rooms: Array<Object> = [];
    constructor(
        private myService: MyHttpGetService,
    ) {
    }

    ngOnInit(): void {
        console.log("SEARCH oninit");
        //Hämta information från token
        this.myService.getuser()
            .subscribe(
                (result) => {
                    console.dir(result);
                    applicationSettingsModule.setString('alma_primaryid', result.data.userId)
                    this.myService.getAlmaUserLoans(applicationSettingsModule.getString('alma_primaryid'))
                        .subscribe((result) => {
                            this.onGetDataSuccess(result)
                        }, (error) => {
                            this.onGetDataError(error)
                        });
                }, 
                (error) => {
                    console.log(error);
                });
    }

    private onGetDataSuccess(res) {
        this.myUserLoans = res;
        //console.dir(this.myUserLoans);
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
}