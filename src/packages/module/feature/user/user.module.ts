
import { NgModule, NgModuleRef } from '@angular/core';
import { TransportLazyModule } from '@ts-core/angular';
import { UserSaveHandler, UserOpenHandler, UserEditHandler } from './transport/handler';
import { UserEditCommand, UserOpenCommand, UserSaveCommand } from './transport';
import { MatMenuModule } from '@angular/material/menu';
import { Transport } from '@ts-core/common';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const providers = [];
const declarations = [
];

@NgModule({
    imports: [MatMenuModule],
    exports: declarations,
    declarations,
    providers
})
export class UserModule extends TransportLazyModule<UserModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'UserModule';
    public static COMMANDS = [UserSaveCommand.NAME, UserOpenCommand.NAME, UserEditCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<UserModule>, transport: Transport, open: UserOpenHandler, save: UserSaveHandler, edit: UserEditHandler) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return UserModule.ID;
    }

    public get commands(): Array<string> {
        return UserModule.COMMANDS;
    }
}
