import { Component, ElementRef } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { Transport, DestroyableContainer } from '@ts-core/common';
import { takeUntil } from 'rxjs'
import { User } from '@common/platform/user';
import { ActivatedRoute } from '@angular/router';
import { SeoCommand } from '@core/transport';
import { PipeService } from '@core/service';
import { UserEditCommand } from '@feature/user/transport';
import { UserMenu } from '@core/lib/user';
import * as _ from 'lodash';

@Component({
    templateUrl: './user-page.component.html',
    standalone: false
})
export class UserPageComponent extends DestroyableContainer {
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

    constructor(container: ElementRef, route: ActivatedRoute, private pipe: PipeService, private transport: Transport, public menu: UserMenu) {
        super();
        ViewUtil.addClasses(container, 'd-flex flex-column h-100');
        route.data.pipe(takeUntil(this.destroyed)).subscribe(data => this.user = data.item);
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected async commitUserProperties(): Promise<void> {
        this.transport.send(new SeoCommand({ title: this.pipe.userName.transform(this.user), description: this.pipe.userDescription.transform(this.user), image: this.user.preferences.picture }));
    }

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public edit(): void {
        this.transport.send(new UserEditCommand(this.user.id));
    }
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