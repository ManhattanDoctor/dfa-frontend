import { Component, Input, ViewContainerRef } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { User } from '@common/platform/user';
import { DestroyableContainer } from '@ts-core/common';
import { UserPictureDirective } from '@shared/directive';
import * as _ from 'lodash';

@Component({
    imports: [UserPictureDirective],
    selector: 'user-picture',
    templateUrl: 'user-picture.component.html',
    styleUrl: 'user-picture.component.scss',
})
export class UserPictureComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @Input()
    public user: User;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef) {
        super();
        ViewUtil.addClasses(container, 'd-block position-relative');
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
}
