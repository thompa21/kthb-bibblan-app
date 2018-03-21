import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA, ValueProvider } from "@angular/core";
//för att ngmodule binding ska fungera
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NSModuleFactoryLoader } from "nativescript-angular/router";
import { NativeScriptHttpModule } from "nativescript-angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { LoginComponent } from "./login.component";


import { BarcodeScanner } from 'nativescript-barcodescanner';

import { Data } from "./shared/providers/data";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        //Login2Component
    ],
    providers: [
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader },
        BarcodeScanner,
        Data
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
