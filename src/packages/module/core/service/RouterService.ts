import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterBaseService } from '@ts-core/angular';
import { LanguageService, NativeWindowService } from '@ts-core/frontend';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class RouterService extends RouterBaseService {
    //--------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    //--------------------------------------------------------------------------

    public static LOGIN_URL = 'login';
    public static ABOUT_URL = 'about';
    public static OAUTH_URL = 'oauth';

    public static USER_URL = 'user';
    public static USERS_URL = 'users';

    public static COMPANY_URL = 'company';
    public static COMPANIES_URL = 'companies';

    public static DEFAULT_URL;

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _urlHash: URLSearchParams;
    private _urlSearch: URLSearchParams;

    private _urlOrigin: string;
    private _urlLocationHash: string;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(router: Router, route: ActivatedRoute, nativeWindow: NativeWindowService, private location: Location, private language: LanguageService) {
        super(router, route, nativeWindow);
        RouterService.DEFAULT_URL = '';

        this._urlHash = new URLSearchParams(nativeWindow.window.location.hash.substring(1));
        this._urlOrigin = nativeWindow.window.location.origin;
        this._urlSearch = new URLSearchParams(nativeWindow.window.location.search);
        this._urlLocationHash = nativeWindow.window.location.hash;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public navigateToLanguageLink(key: string): void {
        this.navigateToExternalUrl(this.language.translate(key));
    }

    public back(): void {
        this.location.back();
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get urlHash(): URLSearchParams {
        return this._urlHash;
    }

    public get urlOrigin(): string {
        return this._urlOrigin;
    }

    public get urlSearch(): URLSearchParams {
        return this._urlSearch;
    }

    public get urlLocationHash(): string {
        return this._urlLocationHash;
    }
}

export interface IRouterUrl {
    hash: URLSearchParams;
    origin: string;
    search: URLSearchParams;
    locationHash: string;
}
