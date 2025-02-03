import { Injectable } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { BottomSheetService, WindowService, WindowServiceEvent } from '@ts-core/angular';
import { DestroyableContainer } from '@ts-core/common';
import { filter, merge } from 'rxjs';
import { RouterService } from './RouterService';
import { NativeWindowService } from '@ts-core/frontend';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class EnvironmentService extends DestroyableContainer {

    //--------------------------------------------------------------------------
    //
    // 	Properties 
    //
    //--------------------------------------------------------------------------

    private _mode: EnvironmentMode;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private nativeWindow: NativeWindowService, private router: RouterService, windows: WindowService, sheet: BottomSheetService,) {
        super();
        this.setMode(this.getMode());
        merge(windows.events, sheet.events).pipe(filter(event => event.type === WindowServiceEvent.OPEN_STARTED)).subscribe(event => ViewUtil.addClass(event.data.container, `mode-${this.mode}`));
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected setMode(value: EnvironmentMode): void {
        if (value === this._mode) {
            return;
        }
        this._mode = value;
    }

    protected getMode(): EnvironmentMode {
        if (this.urlHash.has('tgWebAppData')) {
            return EnvironmentMode.TELEGRAM;
        }
        return EnvironmentMode.SITE;
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Properties
    //
    //--------------------------------------------------------------------------

    public get urlHash(): URLSearchParams {
        return this.router.urlHash;
    }

    public get urlParams(): URLSearchParams {
        return this.router.urlSearch;
    }

    //--------------------------------------------------------------------------
    //
    // 	Static Properties 
    //
    //--------------------------------------------------------------------------

    public get screenLgMinWidth(): number {
        return 992;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get mode(): EnvironmentMode {
        return this._mode;
    }

    public get isCordova(): boolean {
        return this.nativeWindow.window['isCordova'] === true;
    }

    public get isSiteMode(): boolean {
        return this.mode === EnvironmentMode.SITE;
    }

    public get isTelegramMode(): boolean {
        return this.mode === EnvironmentMode.TELEGRAM;
    }
}

export enum EnvironmentMode {
    SITE = 'SITE',
    TELEGRAM = 'TELEGRAM',
}
