import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TransportLazyModule } from '@ts-core/angular';
import { Transport } from '@ts-core/common';
import { EntityObjectOpenHandler } from './transport/handler';
import { EntityObjectOpenCommand } from './transport';

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
export class EntityModule extends TransportLazyModule<EntityModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'EntityModule';
    public static COMMANDS = [EntityObjectOpenCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<EntityModule>, transport: Transport, open: EntityObjectOpenHandler) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return EntityModule.ID;
    }

    public get commands(): Array<string> {
        return EntityModule.COMMANDS;
    }
}
