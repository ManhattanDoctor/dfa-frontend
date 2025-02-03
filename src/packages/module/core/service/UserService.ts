import { Injectable } from '@angular/core';
import { UserBaseService } from '@ts-core/angular';
import { LoginService } from './LoginService';
import { IInitDtoResponse } from '@common/platform/api/login';
import { TransformUtil, ExtendedError, Transport } from '@ts-core/common';
import { UserAttributes } from '@common/platform/user';
// import { UserSaveCommand } from '@feature/user/transport';
import { User } from '../lib/user';
import { LanguageService } from '@ts-core/frontend';
import { takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class UserService extends UserBaseService<User, UserServiceEvent> {

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _isAdministrator: boolean;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(login: LoginService, private transport: Transport, private language: LanguageService) {
        super(login);
        this.initialize();
        this.changed.pipe(takeUntil(this.destroyed)).subscribe(this.checkLanguage);
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
        this.checkLanguage();
    }

    protected deinitializeUser(): void {
        super.deinitializeUser();
        this.commitUserProperties();
    }

    protected commitUserProperties(): void {

    }

    private checkLanguage = (): void => {
        if (!this.hasUser) {
            return;
        }
        let { locale } = this.user.attributes;
        if (this.language.languages.has(locale)) {
            this.language.language = this.language.languages.get(locale);
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async save(item: Partial<UserAttributes>): Promise<boolean> {
        if (_.isNil(this.attributes)) {
            throw new ExtendedError('Unable to save user preferences: user is not logined');
        }

        for (let key of Object.keys(item)) {
            if (item[key] === this.attributes[key]) {
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

    public get attributes(): UserAttributes {
        return this.hasUser ? this.user.attributes : null;
    }

    public get isAdministrator(): boolean {
        return this._isAdministrator;
    }
}

export enum UserServiceEvent { }
