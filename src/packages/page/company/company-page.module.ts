
import { NgModule } from '@angular/core';
import { CompanyPageRoutingModule } from './company-page.routing.module';
import { CompanyPageComponent } from './company-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { PageHeaderComponent, CompanyDetailsComponent, ActionsComponent, CompanyContainerComponent } from '@shared/component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VIMatModule } from '@ts-core/angular-material';
import { CompanyNamePipe } from '@shared/pipe/company';

@NgModule({
    imports: [
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatButtonModule,
        CompanyPageRoutingModule,

        VIMatModule,

        CompanyNamePipe,
        CompanyContainerComponent,
        PageHeaderComponent,
    ],
    declarations: [CompanyPageComponent]
})
export default class CompanyPageModule { }
