
import { NgModule } from '@angular/core';
import { CompanyPageRoutingModule } from './company-page.routing.module';
import { CompanyPageComponent } from './company-page.component';
import { CompanyContainerComponent } from '@shared/component';

@NgModule({
    imports: [
        CompanyPageRoutingModule,
        CompanyContainerComponent,
    ],
    declarations: [CompanyPageComponent]
})
export default class CompanyPageModule { }
