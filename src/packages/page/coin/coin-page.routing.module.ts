import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinPageComponent } from './coin-page.component';

const routes: Routes = [{ path: '', component: CoinPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoinPageRoutingModule {}
