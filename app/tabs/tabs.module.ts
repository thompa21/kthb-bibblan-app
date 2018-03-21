import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { RoomsComponent } from "./rooms/rooms.component";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { ScanComponent } from "./scan/scan.component";
import { TabsRoutingModule } from "./tabs-routing.module";
import { TabsComponent } from "./tabs.component";

//för att ngmodule binding ska fungera
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    imports: [
        NativeScriptModule,
        TabsRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        TabsComponent,
        HomeComponent,
        RoomsComponent,
        SearchComponent,
        ScanComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TabsModule { }
