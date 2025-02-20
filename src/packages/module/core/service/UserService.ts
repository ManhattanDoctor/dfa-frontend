import { Injectable } from '@angular/core';
import { UserServiceBase, UserUid } from '@ts-core/angular';
import { LoginService } from './LoginService';
import { IInitDtoResponse } from '@common/platform/api/login';
import { TransformUtil, ExtendedError, Transport } from '@ts-core/common';
import { UserPreferences } from '@common/platform/user';
import { User } from '@core/lib/user';
import { LanguageService, ThemeService } from '@ts-core/frontend';
import { UserSaveCommand } from '@feature/user/transport';
import { SocketService } from './SocketService';
import { getSocketUserRoom } from '@common/platform';
import { UserChangedEvent } from '@common/platform/transport';
import { filter, map, takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class UserService extends UserServiceBase<User, UserServiceEvent, LoginService> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(login: LoginService,
        socket: SocketService,
        private transport: Transport,
        private language: LanguageService,
        private theme: ThemeService) {

        super(login);
        this.initialize();

        this.changed.pipe(
            filter(() => this.has),
            takeUntil(this.destroyed)
        ).subscribe(() => this.checkPreferences());

        socket.getDispatcher<UserChangedEvent>(UserChangedEvent.NAME)
            .pipe(
                map(item => item.data),
                filter(item => this.has && item.id === this.user.id),
                takeUntil(this.destroyed)
            ).subscribe(item => this.update(item));
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected createUser(data: IInitDtoResponse): User {
        return TransformUtil.toClass(User, data.user);
    }

    protected async initializeUser(data: any): Promise<void> {
        await super.initializeUser(data);
        this.checkPreferences();
    }

    private checkPreferences(): void {
        let { theme, language } = this.user.preferences;
        if (this.theme.themes.has(theme)) {
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

    public isEquals(item: Partial<User> | UserUid): boolean {
        return super.isUser(item);
    }

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
        await this.transport.sendListen(new UserSaveCommand({ id: this.id.toString(), preferences: item }));
        return true;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get preferences(): UserPreferences {
        return this.has ? this.user.preferences : null;
    }
}

export enum UserServiceEvent { }
