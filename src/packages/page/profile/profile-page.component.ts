import { Component, ElementRef } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { DestroyableContainer } from '@ts-core/common';
import { filter, takeUntil } from 'rxjs'
import { PipeService, RouterService, UserService } from '@core/service';
import { Transport } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { SeoCommand } from '@core/transport';
import { User } from '@common/platform/user';
import * as _ from 'lodash';

@Component({
    templateUrl: './profile-page.component.html',
    standalone: false
})
export class ProfilePageComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _user: User;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ElementRef,
        service: UserService,
        api: Client,
        protected pipe: PipeService,
        protected transport: Transport,
        public router: RouterService) {
        super();
        ViewUtil.addClasses(container, 'd-block container px-3 px-lg-5 pb-3 pt-5 pb-lg-5');

        this.user = service.user;

        /*
        transport.send(new SeoCommand({ title: 'profile.profile', description: this.pipe.userName.transform(this.user), image: this.user.preferences.picture }));
        service.changed.pipe(
            filter(data => !_.isNil(this.user) && this.user.id === data.id),
            takeUntil(this.destroyed)).subscribe(async () => this.user = await api.userGet(this.user.id));
        */
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected async commitUserProperties(): Promise<void> {

    }

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.user = null;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get user(): User {
        return this._user;
    }
    public set user(value: User) {
        if (value === this._user) {
            return;
        }
        this._user = value;
        if (!_.isNil(value)) {
            this.commitUserProperties();
        }
    }
}