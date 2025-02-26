import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinsPageComponent } from './coins-page.component';

const routes: Routes = [{ path: '', component: CoinsPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoinsPageRoutingModule {}
