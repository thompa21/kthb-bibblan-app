"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var rooms_component_1 = require("./rooms/rooms.component");
var home_component_1 = require("./home/home.component");
var search_component_1 = require("./search/search.component");
var scan_component_1 = require("./scan/scan.component");
var tabs_routing_module_1 = require("./tabs-routing.module");
var tabs_component_1 = require("./tabs.component");
//för att ngmodule binding ska fungera
var forms_1 = require("nativescript-angular/forms");
var TabsModule = (function () {
    function TabsModule() {
    }
    TabsModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                tabs_routing_module_1.TabsRoutingModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                tabs_component_1.TabsComponent,
                home_component_1.HomeComponent,
                rooms_component_1.RoomsComponent,
                search_component_1.SearchComponent,
                scan_component_1.ScanComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], TabsModule);
    return TabsModule;
}());
exports.TabsModule = TabsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxnRkFBOEU7QUFFOUUsMkRBQXlEO0FBQ3pELHdEQUFzRDtBQUN0RCw4REFBNEQ7QUFDNUQsd0RBQXNEO0FBQ3RELDZEQUEwRDtBQUMxRCxtREFBaUQ7QUFFakQsc0NBQXNDO0FBQ3RDLG9EQUFxRTtBQW1CckU7SUFBQTtJQUEwQixDQUFDO0lBQWQsVUFBVTtRQWpCdEIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsdUNBQWlCO2dCQUNqQiwrQkFBdUI7YUFDMUI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsOEJBQWE7Z0JBQ2IsOEJBQWE7Z0JBQ2IsZ0NBQWM7Z0JBQ2Qsa0NBQWU7Z0JBQ2YsOEJBQWE7YUFDaEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLFVBQVUsQ0FBSTtJQUFELGlCQUFDO0NBQUEsQUFBM0IsSUFBMkI7QUFBZCxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5cbmltcG9ydCB7IFJvb21zQ29tcG9uZW50IH0gZnJvbSBcIi4vcm9vbXMvcm9vbXMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9ob21lLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2VhcmNoQ29tcG9uZW50IH0gZnJvbSBcIi4vc2VhcmNoL3NlYXJjaC5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNjYW5Db21wb25lbnQgfSBmcm9tIFwiLi9zY2FuL3NjYW4uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBUYWJzUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL3RhYnMtcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7IFRhYnNDb21wb25lbnQgfSBmcm9tIFwiLi90YWJzLmNvbXBvbmVudFwiO1xuXG4vL2bDtnIgYXR0IG5nbW9kdWxlIGJpbmRpbmcgc2thIGZ1bmdlcmFcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIFRhYnNSb3V0aW5nTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFRhYnNDb21wb25lbnQsXG4gICAgICAgIEhvbWVDb21wb25lbnQsXG4gICAgICAgIFJvb21zQ29tcG9uZW50LFxuICAgICAgICBTZWFyY2hDb21wb25lbnQsXG4gICAgICAgIFNjYW5Db21wb25lbnRcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgVGFic01vZHVsZSB7IH1cbiJdfQ==