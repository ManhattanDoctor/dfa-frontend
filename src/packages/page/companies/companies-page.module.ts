import { NgModule } from '@angular/core';
import { CompaniesPageRoutingModule } from './companies-page.routing.module';
import { CompaniesPageComponent } from './companies-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { PageHeaderComponent } from '@shared/component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VIMatModule } from '@ts-core/angular-material';

@NgModule({
    imports: [
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatButtonModule,
        CompaniesPageRoutingModule,

        VIMatModule,

        PageHeaderComponent
    ],
    declarations: [CompaniesPageComponent]
})
export default class CompaniesPageModule { }

