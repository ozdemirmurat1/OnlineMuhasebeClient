import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { importProvidersFrom } from "@angular/core";
import { RouterModule } from "@angular/router";
import { authGuard } from "./app/ui/components/auth/guards/auth.guard";
import {provideHttpClient} from "@angular/common/http";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { StoreModule, provideStore } from '@ngrx/store';
import { loadingReducer } from "./app/common/states/loading/loading-reducer";
import { DatePipe } from "@angular/common";

bootstrapApplication(AppComponent,{
  providers:[
    // HttpClient i implemente ettik
    DatePipe,
    provideHttpClient(),
    importProvidersFrom(
        BrowserModule, 
        SweetAlert2Module.forRoot(), 
        StoreModule.forRoot({loading:loadingReducer}),
        RouterModule.forRoot([
        {
            path: "",
            loadComponent: () => import("./app/ui/components/layouts/layouts.component").then(c => c.LayoutsComponent),
            canActivateChild: [authGuard],
            children: [
                {
                    path: "",
                    loadComponent: () => import("./app/ui/components/blank/blank.component").then(c => c.BlankComponent)
                },
                {
                    path: "ucafs",
                    loadComponent: () => import("./app/ui/components/ucafs/ucafs.component").then(c => c.UcafsComponent)
                },
                {
                    path:"book-entries",
                    loadComponent:()=>import("./app/ui/components/book-entries/book-entries.component").then(c=>c.BookEntriesComponent)
                },
                {
                    path:"reports",
                    loadComponent:()=> import("./app/ui/components/reports/reports.component").then(c=>c.ReportsComponent)
                },
                {
                    path:"logs",
                    loadComponent:()=> import("./app/ui/components/logs/logs.component").then(c=>c.LogsComponent)
                }
            ]
        },
        {
            path: "login",
            loadComponent: () => import("./app/ui/components/auth/login/login.component").then(c => c.LoginComponent)
        }
    ])),
    provideStore()
]
})