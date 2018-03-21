import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import * as applicationSettingsModule from "application-settings";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';

@Injectable()
export class MyHttpPostService {
    private serverUrl = "http://apps.lib.kth.se/webservices/mrbs/bookings/update/index.php";

    constructor(private http: Http) { }

    postData(data: any) {
        let options = this.createRequestOptions();
        return this.http.post(this.serverUrl,  data , options)
            .map(res => res.json())
            .do(data => data)  // debug
            .catch(this.handleErrorObservable);
    }

    private handleErrorObservable (error: Response | any) {
        //console.error(error.message || error);
        return RxObservable.throw(error.message || error);
    }

    private createRequestOptions() {
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + applicationSettingsModule.getString('jwttoken'));
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: headers });
        return options;
    }
}