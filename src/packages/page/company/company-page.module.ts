
import { NgModule } from '@angular/core';
import { CompanyPageRoutingModule } from './company-page.routing.module';
import { CompanyPageComponent } from './company-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { PageHeaderComponent, CompanyDetailsComponent } from '@shared/component';

@NgModule({
    imports: [
        MatInputModule,
        MatMenuModule,
        CompanyPageRoutingModule,

        PageHeaderComponent,
        CompanyDetailsComponent
    ],
    declarations: [CompanyPageComponent]
})
export default class CompanyPageModule { }
