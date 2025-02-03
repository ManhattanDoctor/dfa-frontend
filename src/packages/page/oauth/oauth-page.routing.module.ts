import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OAuthPageComponent } from './oauth-page.component';

const routes: Routes = [{ path: '', component: OAuthPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class OAuthPageRoutingModule { }
