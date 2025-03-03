
import { NgModule, NgModuleRef } from '@angular/core';
import { TransportLazyModule } from '@ts-core/angular';
import { CompanyOpenHandler, CompanyEditHandler, CompanyAddWizardHandler, CompanyAddHandler, CompanyVerifyHandler, CompanySubmitHandler, CompanyRejectHandler, CompanyActivateHandler, } from './transport/handler';
import { CompanyEditCommand, CompanyOpenCommand, CompanyAddWizardCommand, CompanyAddCommand, CompanyAddUserCommand, CompanyVerifyCommand, CompanySubmitCommand, CompanyRejectCommand, CompanyActivateCommand } from './transport';
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
export class CompanyModule extends TransportLazyModule<CompanyModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'CompanyModule';
    public static COMMANDS = [CompanyAddWizardCommand.NAME, CompanyOpenCommand.NAME, CompanyEditCommand.NAME, CompanyAddCommand.NAME, CompanyAddUserCommand.NAME, CompanyVerifyCommand.NAME, CompanySubmitCommand.NAME, CompanyRejectCommand.NAME, CompanyActivateCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<CompanyModule>, transport: Transport, open: CompanyOpenHandler, edit: CompanyEditHandler, add: CompanyAddHandler, wizardAdd: CompanyAddWizardHandler, verify: CompanyVerifyHandler, submit: CompanySubmitHandler, reject: CompanyRejectHandler, activate: CompanyActivateHandler) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return CompanyModule.ID;
    }

    public get commands(): Array<string> {
        return CompanyModule.COMMANDS;
    }
}
