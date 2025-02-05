import { NgModule, NgModuleRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TransportLazyModule, VIModule } from '@ts-core/angular';
import { LoginContainerComponent } from './component/login-container/login-container.component';
import { Transport } from '@ts-core/common';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const providers = [];
const declarations = [LoginContainerComponent];

@NgModule({
    imports: [
        MatButtonModule,
        VIModule
    ],
    exports: declarations,
    declarations,
    providers
})
export class LoginModule extends TransportLazyModule<LoginModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'LoginModule';
    public static COMMANDS = [];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<LoginModule>, transport: Transport) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return LoginModule.ID;
    }

    public get commands(): Array<string> {
        return LoginModule.COMMANDS;
    }
}
