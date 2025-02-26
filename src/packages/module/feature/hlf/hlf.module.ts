import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TransportLazyModule } from '@ts-core/angular';
import { Transport } from '@ts-core/common';
import { EntityObjectOpenHandler, HlfTransactionOpenHandler } from './transport/handler';
import { EntityObjectOpenCommand, HlfTransactionOpenCommand } from './transport';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const providers = [];
const declarations = [];

@NgModule({
    imports: [
        CommonModule,

        MatButtonModule,
        MatMenuModule,
    ],
    exports: declarations,
    declarations,
    providers
})
export class HlfModule extends TransportLazyModule<HlfModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'HlfModule';
    public static COMMANDS = [HlfTransactionOpenCommand.NAME, EntityObjectOpenCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<HlfModule>, transport: Transport, openTransaction: HlfTransactionOpenHandler) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return HlfModule.ID;
    }

    public get commands(): Array<string> {
        return HlfModule.COMMANDS;
    }
}
