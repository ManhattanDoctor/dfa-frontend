
import { NgModule, NgModuleRef } from '@angular/core';
import { TransportLazyModule } from '@ts-core/angular';
import { Transport } from '@ts-core/common';
import { OAuthLoginHandler, OAuthProfileHandler } from './transport/handler';
import { OAuthLoginCommand, OAuthProfileCommand } from './transport';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const providers = [];
const declarations = [];

@NgModule({
    exports: declarations,
    declarations,
    providers
})
export class OAuthModule extends TransportLazyModule<OAuthModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'OAuthModule';
    public static COMMANDS = [OAuthLoginCommand.NAME, OAuthProfileCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<OAuthModule>, transport: Transport, login: OAuthLoginHandler, profile: OAuthProfileHandler) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return OAuthModule.ID;
    }

    public get commands(): Array<string> {
        return OAuthModule.COMMANDS;
    }
}
