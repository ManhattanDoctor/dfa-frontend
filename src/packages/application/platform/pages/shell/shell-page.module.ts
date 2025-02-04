
import { NgModule } from '@angular/core';
import { ShellPageRoutingModule } from './shell-page.routing.module';
import { ShellPageComponent } from './shell-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ShellHeaderComponent, ShellAboutComponent } from './component';
import { ServiceWorkerVersionDirective } from './directive';
import { ShellMenu } from './service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProfileModule } from '@feature/profile';
import { SharedModule } from '@shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';

@NgModule({
    imports: [
        MatSidenavModule,
        MatListModule,
        MatProgressBarModule,

        ScrollingModule,

        SharedModule,
        ProfileModule,
        ShellPageRoutingModule,
    ],
    declarations: [ShellPageComponent, ShellHeaderComponent, ShellAboutComponent, ServiceWorkerVersionDirective],
    providers: [ShellMenu]
})
export default class ShellPageModule { }
