
import { NgModule } from '@angular/core';
import { CompanyPageRoutingModule } from './company-page.routing.module';
import { CompanyPageComponent } from './company-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { PageHeaderComponent, CompanyDetailsComponent } from '@shared/component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VIMatModule } from '@ts-core/angular-material';

@NgModule({
    imports: [
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatButtonModule,
        CompanyPageRoutingModule,

        VIMatModule,

        PageHeaderComponent,
        CompanyDetailsComponent
    ],
    declarations: [CompanyPageComponent]
})
export default class CompanyPageModule { }
