import { Component, ViewContainerRef } from '@angular/core';
import { IWindowContent, ViewUtil } from '@ts-core/angular';
import { LoginService } from '@core/service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { VIMatModule } from '@ts-core/angular-material';
import * as _ from 'lodash';

@Component({
    imports: [
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,

        VIMatModule
    ],
    templateUrl: 'socket-reconnect.component.html',
})
export class SocketReconnectComponent extends IWindowContent {
    //--------------------------------------------------------------------------
    //
    //  Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ViewContainerRef,public service: LoginService) {
        super(element);
        ViewUtil.addClasses(element.element, 'd-block');
    }

    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------



}
