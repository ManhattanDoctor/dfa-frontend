import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/angular';
import { User } from '@core/lib/user';
import { UserService, LoginService, PipeService } from '@core/service';
import { MatMenuModule } from '@angular/material/menu';
import { MenuTriggerForDirective, VIMatModule } from '@ts-core/angular-material';
import { merge, takeUntil } from 'rxjs';
import { ProfileMenu } from '@shared/service';
import { UserPictureComponent } from '@shared/component';
import * as _ from 'lodash';

@Component({
    imports: [
        MatMenuModule,
        VIMatModule,

        UserPictureComponent
    ],
    selector: 'user-profile-info',
    styleUrl: 'user-profile-info.component.scss',
    templateUrl: 'user-profile-info.component.html'
})
export class UserProfileInfoComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @ViewChild(MenuTriggerForDirective, { static: true })
    public trigger: MenuTriggerForDirective;

    public title: string;
    public description: string;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef,
        private pipe: PipeService,
        public menu: ProfileMenu,
        public login: LoginService,
        public service: UserService,
    ) {
        super();
        ViewUtil.addClasses(container, 'd-flex align-items-center mouse-active');

        this.invalidate();
        merge(service.changed, pipe.language.completed)
            .pipe(takeUntil(this.destroyed))
            .subscribe(this.invalidate);
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitUserProperties(): void {
        var value = null;

        value = this.pipe.userName.transform(this.user);
        if (value !== this.title) {
            this.title = value;
        }

        value = this.pipe.userDescription.transform(this.user);
        if (value !== this.description) {
            this.description = value;
        }
    }

    private invalidate = (): void => this.commitUserProperties();

    //--------------------------------------------------------------------------
    //
    //  Event Handlers
    //
    //--------------------------------------------------------------------------

    public async menuOpen(event: MouseEvent): Promise<void> {
        this.menu.refresh(this.user);
        this.trigger.openMenuOn(event.target);
    }
    
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------

    public get user(): User {
        return this.service.user;
    }
}
