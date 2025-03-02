
import { NgModule, NgModuleRef } from '@angular/core';
import { TransportLazyModule } from '@ts-core/angular';
import { CoinSaveHandler, CoinOpenHandler, CoinEditHandler, CoinAddHandler, CoinVerifyHandler, CoinSubmitHandler, CoinRejectHandler, CoinActivateHandler, } from './transport/handler';
import { CoinEditCommand, CoinOpenCommand, CoinSaveCommand, CoinAddCommand, CoinVerifyCommand, CoinSubmitCommand, CoinRejectCommand, CoinActivateCommand } from './transport';
import { MatMenuModule } from '@angular/material/menu';
import { Transport } from '@ts-core/common';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const providers = [];
const declarations = [];

@NgModule({
    imports: [MatMenuModule],
    exports: declarations,
    declarations,
    providers
})
export class CoinModule extends TransportLazyModule<CoinModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'CoinModule';
    public static COMMANDS = [CoinSaveCommand.NAME, CoinOpenCommand.NAME, CoinEditCommand.NAME, CoinAddCommand.NAME, CoinVerifyCommand.NAME, CoinSubmitCommand.NAME, CoinRejectCommand.NAME, CoinActivateCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<CoinModule>, transport: Transport, open: CoinOpenHandler, save: CoinSaveHandler, edit: CoinEditHandler, add: CoinAddHandler, verify: CoinVerifyHandler, submit: CoinSubmitHandler, reject: CoinRejectHandler, activate: CoinActivateHandler) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return CoinModule.ID;
    }

    public get commands(): Array<string> {
        return CoinModule.COMMANDS;
    }
}
