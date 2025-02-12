import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/angular';
import { User } from '@core/lib/user';
import { LanguageService } from '@ts-core/frontend';
import { UserService, LoginService } from '@core/service';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { UserContainerComponent } from '@shared/component';
import { VIMatModule } from '@ts-core/angular-material';
import { merge, takeUntil } from 'rxjs';
import { ProfileMenu } from '@shared/service';
import * as _ from 'lodash';

@Component({
    imports: [
        MatMenuModule,
        VIMatModule,

        UserContainerComponent
    ],
    selector: 'user-info',
    templateUrl: 'user-info.component.html'
})
export class UserInfoComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @ViewChild('container', { static: true })
    public container: UserContainerComponent;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef,
        language: LanguageService,
        public menu: ProfileMenu,
        public login: LoginService,
        public service: UserService,
    ) {
        super();
        ViewUtil.addClasses(container, 'd-flex align-items-center mouse-active');

        this.invalidate();
        merge(service.logined, service.logouted, service.changed, language.completed)
            .pipe(takeUntil(this.destroyed))
            .subscribe(this.invalidate);
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private invalidate = (): void => {
        if (!_.isNil(this.container)) {
            this.container.invalidate();
        }
    }

    //--------------------------------------------------------------------------
    //
    //  Event Handlers
    //
    //--------------------------------------------------------------------------

    public clickHandler(): void {
        this.menu.refresh();
    }
}
