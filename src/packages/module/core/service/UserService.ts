import { Injectable } from '@angular/core';
import { UserBaseService } from '@ts-core/angular';
import { LoginService } from './LoginService';
import { IInitDtoResponse } from '@common/platform/api/login';
import { TransformUtil, ExtendedError, Transport } from '@ts-core/common';
import { UserPreferences } from '@common/platform/user';
import { User } from '../lib/user';
import { LanguageService, ThemeService } from '@ts-core/frontend';
import { takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class UserService extends UserBaseService<User, UserServiceEvent> {

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(login: LoginService,
        private transport: Transport,
        private language: LanguageService,
        private theme: ThemeService) {
        super(login);
        this.initialize();
        this.changed.pipe(takeUntil(this.destroyed)).subscribe(this.checkPreferences);
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected createUser(data: IInitDtoResponse): User {
        return TransformUtil.toClass(User, data.user);
    }

    protected initializeUser(data: any): void {
        super.initializeUser(data);
        this.commitUserProperties();
        this.checkPreferences();
    }

    protected deinitializeUser(): void {
        super.deinitializeUser();
        this.commitUserProperties();
    }

    protected commitUserProperties(): void {
    }

    private checkPreferences = (): void => {
        if (!this.hasUser) {
            return;
        }
        let { theme, language } = this.user.preferences;
        if (this.theme.themes.has(language)) {
            this.theme.theme = this.theme.themes.get(theme);
        }
        if (this.language.languages.has(language)) {
            this.language.language = this.language.languages.get(language);
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async save(item: Partial<UserPreferences>): Promise<boolean> {
        if (_.isNil(this.preferences)) {
            throw new ExtendedError('Unable to save user preferences: user is not logined');
        }

        for (let key of Object.keys(item)) {
            if (item[key] === this.preferences[key]) {
                delete item[key];
            }
        }

        if (_.isEmpty(item)) {
            return false;
        }

        // await this.transport.sendListen(new UserSaveCommand({ uid: this.user.id, preferences: item }));
        return true;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get preferences(): UserPreferences {
        return this.hasUser ? this.user.preferences : null;
    }
}

export enum UserServiceEvent { }
