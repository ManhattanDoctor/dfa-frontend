import { Directive, ElementRef, Input } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { User } from '@common/platform/user';
import { Platform } from '@angular/cdk/platform';
import { ViewUtil } from '@ts-core/angular';
import { ImageUtil } from '@common/platform/util';
import * as _ from 'lodash';

@Directive({
    selector: '[user-picture]',
})
export class UserPictureDirective extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    //	Private
    //
    // --------------------------------------------------------------------------

    private _user: User;
    private _picture: string;

    private element: HTMLDivElement;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(platform: Platform, element: ElementRef<HTMLDivElement>) {
        super();
        this.element = element.nativeElement;
        ViewUtil.addClass(this.element, 'overflow-hidden');
        ViewUtil.setStyle(this.element, 'background-size', 'contain');
        ViewUtil.setStyle(this.element, 'background-position', 'center');
        if (platform.SAFARI) {
            ViewUtil.setStyle(this.element, 'transform', 'translate3d(0,0,0)');
        }
    }

    // --------------------------------------------------------------------------
    //
    //	Private Properties
    //
    // --------------------------------------------------------------------------

    private invalidateMedia(): void {
        if (_.isNil(this.user)) {
            return;
        }
        this.picture = this.getPicture();
    }

    private commitPictureProperties(): void {
        ViewUtil.setBackground(this.element, this.picture, 'no-repeat', ImageUtil.getUser(this.user.id));
    }

    private getPicture(): string {
        return this.user.preferences.picture;
    }

    // --------------------------------------------------------------------------
    //
    //	Public Methods
    //
    // --------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        this.user = null;
    }

    // --------------------------------------------------------------------------
    //
    //	Public Properties
    //
    // --------------------------------------------------------------------------

    public get user(): User {
        return this._user;
    }
    @Input('user-picture')
    public set user(value: User) {
        if (value === this._user) {
            return;
        }
        this._user = value;
        if (!_.isNil(value)) {
            this.invalidateMedia();
        }
    }

    public get picture(): string {
        return this._picture;
    }
    @Input()
    public set picture(value: string) {
        if (value === this._picture) {
            return;
        }
        this._picture = value;
        this.commitPictureProperties();
    }
}
