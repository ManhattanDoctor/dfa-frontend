import { Component, Input, ViewContainerRef } from '@angular/core';
import { WindowService, IWindowContent, ViewUtil } from '@ts-core/angular';
import { EnvironmentService, PipeService } from '@core/service';
import { User, UserPreferences, UserPreferencesTheme, UserPreferencesLanguage, USER_PREFERENCES_PHONE_MAX_LENGTH, USER_PREFERENCES_EMAIL_MAX_LENGTH } from '@common/platform/user';
import { Transport, ISerializable } from '@ts-core/common';
import { USER_PREFERENCES_NAME_MIN_LENGTH, USER_PREFERENCES_NAME_MAX_LENGTH } from '@common/platform/user';
import { IUserEditDto } from '@feature/user/transport';
import { VIMatModule } from '@ts-core/angular-material';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { UserContainerComponent } from '@shared/component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import * as _ from 'lodash';

@Component({
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatProgressBarModule,

        VIMatModule,
        UserContainerComponent
    ],
    selector: 'user-edit',
    templateUrl: 'user-edit.component.html',
})
export class UserEditComponent extends IWindowContent implements ISerializable<IUserEditDto> {
    //--------------------------------------------------------------------------
    //
    //  Constants
    //
    //--------------------------------------------------------------------------

    public static EVENT_SUBMITTED = 'EVENT_SUBMITTED';

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------


    public fakeUser: User;

    private _user: User;
    private _picture: string;

    public themes: Array<UserPreferencesTheme>;
    public languages: Array<UserPreferencesLanguage>;

    public uid: string;
    public name: string;
    public theme: UserPreferencesTheme;
    public phone: string;
    public email: string;
    public language: UserPreferencesLanguage;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef,
        private windows: WindowService,
        public environment: EnvironmentService
    ) {
        super(container);
        ViewUtil.addClasses(container, 'd-flex flex-column scroll-vertical');

        this.themes = Object.values(UserPreferencesTheme);
        this.languages = Object.values(UserPreferencesLanguage);
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitUserProperties(): void {
        let value = null;

        value = this.user.preferences.name;
        if (value !== this.name) {
            this.name = value;
        }

        value = this.user.preferences.phone;
        if (value !== this.phone) {
            this.phone = value;
        }

        value = this.user.preferences.email;
        if (value !== this.email) {
            this.email = value;
        }

        value = this.user.preferences.language;
        if (value !== this.language) {
            this.language = value;
        }

        value = this.user.preferences.theme;
        if (value !== this.theme) {
            this.theme = value;
        }

        value = this.user.preferences.picture;
        if (value !== this.picture) {
            this.picture = value;
        }
    }

    //--------------------------------------------------------------------------
    //
    //  Private Properties
    //
    //--------------------------------------------------------------------------

    private updateFakeUser(): void {
        let item = this.fakeUser = new User();
        item.preferences = new UserPreferences();
        item.preferences.theme = this.theme;
        item.preferences.picture = this.picture;
    }

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public async submit(): Promise<void> {
        await this.windows.question('general.save.confirmation').yesNotPromise;
        this.emit(UserEditComponent.EVENT_SUBMITTED);
    }

    public async open(): Promise<void> {
        // this.transport.send(new UserOpenCommand({ uid: this.user.id }));
    }


    public serialize(): IUserEditDto {
        let preferences = {} as Partial<UserPreferences>;
        preferences.name = this.name;
        preferences.theme = this.theme;
        preferences.phone = this.phone;
        preferences.email = this.email;
        preferences.picture = this.picture;
        preferences.language = this.language;
        return { id: this.user.id, preferences };
    }

    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------

    public get nameMinLength(): number {
        return USER_PREFERENCES_NAME_MIN_LENGTH;
    }
    public get nameMaxLength(): number {
        return USER_PREFERENCES_NAME_MAX_LENGTH;
    }
    public get phoneMaxLength(): number {
        return USER_PREFERENCES_PHONE_MAX_LENGTH;
    }
    public get emailMaxLength(): number {
        return USER_PREFERENCES_EMAIL_MAX_LENGTH;
    }

    public get picture(): string {
        return this._picture;
    }
    public set picture(value: string) {
        if (value === this._picture) {
            return;
        }
        this._picture = value;
        this.updateFakeUser();
    }

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
}
