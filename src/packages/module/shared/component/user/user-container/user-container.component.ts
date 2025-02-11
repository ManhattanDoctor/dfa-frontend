import { Component, Input, ViewChild, ViewContainerRef, booleanAttribute } from '@angular/core';
import { ViewUtil, IWindowContent, PrettifyPipe } from '@ts-core/angular';
import { User } from '@common/platform/user';
import { PipeService } from '@core/service';
import { UserPictureComponent } from '../user-picture/user-picture.component';
import { CommonModule } from '@angular/common';
import * as _ from 'lodash';

@Component({
    imports: [CommonModule, UserPictureComponent],
    selector: 'user-container',
    templateUrl: 'user-container.component.html',
    styleUrl: 'user-container.component.scss',
})
export class UserContainerComponent extends IWindowContent {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _user: User;
    private _title: string;
    private _description: string;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private pipe: PipeService) {
        super(container);
        ViewUtil.addClasses(container, 'd-flex flex-grow-1 align-items-center justify-content-center scroll-no');
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

    private commitTitleProperties(): void {
        let value = null;

        value = this.title;
        if (value !== this.title) {
            this.title = value;
        }
    }

    private commitDescriptionProperties(): void {
        let value = null;

        value = this.description;
        if (value !== this.description) {
            this.description = value;
        }
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
    //  Public Properties
    //
    //--------------------------------------------------------------------------

    public get user(): User {
        return this._user;
    }
    @Input()
    public set user(value: User) {
        if (value === this._user) {
            return;
        }
        this._user = value;
        if (!_.isNil(value)) {
            this.commitUserProperties();
        }
    }

    public get title(): string {
        return this._title;
    }
    @Input()
    public set title(value: string) {
        if (value === this._title) {
            return;
        }
        this._title = value;
        if (!_.isNil(value)) {
            this.commitTitleProperties();
        }
    }

    public get description(): string {
        return this._description;
    }
    @Input()
    public set description(value: string) {
        if (value === this._description) {
            return;
        }
        this._description = value;
        if (!_.isNil(value)) {
            this.commitDescriptionProperties();
        }
    }
}
