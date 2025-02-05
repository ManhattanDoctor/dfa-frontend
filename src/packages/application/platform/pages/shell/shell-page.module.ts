
import { NgModule } from '@angular/core';
import { ShellPageRoutingModule } from './shell-page.routing.module';
import { ShellPageComponent } from './shell-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ShellHeaderComponent, ShellAboutComponent } from './component';
import { ServiceWorkerVersionDirective } from './directive';
import { ShellMenu } from './service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { VIMatModule } from '@ts-core/angular-material';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        ScrollingModule,

        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatProgressBarModule,

        VIMatModule,
        ShellPageRoutingModule,
    ],
    declarations: [ShellPageComponent, ShellHeaderComponent, ShellAboutComponent, ServiceWorkerVersionDirective],
    providers: [ShellMenu]
})
export default class ShellPageModule { }
