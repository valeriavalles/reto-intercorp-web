import { NgModule } from "@angular/core";
import {Routes, RouterModule } from "@angular/router";

import { RegisterClientsComponent } from "./components/register-clients/register-clients.component";
import { ListClientsComponent } from "./components/list-clients/list-clients.component";


const routes: Routes = [
    { path : '', redirectTo: 'registro', pathMatch: 'full'},
    { path : 'registro', component: RegisterClientsComponent },
    { path : 'lista', component: ListClientsComponent },
]


@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})

export class AppRoutingModule {

}