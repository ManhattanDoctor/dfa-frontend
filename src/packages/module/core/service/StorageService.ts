import { Injectable } from '@angular/core';
import { DateUtil, Destroyable, PromiseHandler, Transport } from '@ts-core/common';
import { CookieService, LocalStorageService, DateValueStorage, BooleanValueStorage } from '@ts-core/angular';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class StorageService extends Destroyable {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _isHideHelp: BooleanValueStorage;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(storage: LocalStorageService, cookie: CookieService, private transport: Transport) {
        super();
        this._isHideHelp = new BooleanValueStorage('isHideHelp', storage, cookie);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async checkHelp(): Promise<void> {
        await PromiseHandler.delay(1.5 * DateUtil.MILLISECONDS_SECOND);
        if (this.isHideHelp.get(false)) {
            return;
        }
        this.isHideHelp.set(true);
        // this.transport.send(new HelpCommand());
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get isHideHelp(): BooleanValueStorage {
        return this._isHideHelp;
    }
}