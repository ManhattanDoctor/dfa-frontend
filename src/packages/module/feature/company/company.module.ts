
import { NgModule, NgModuleRef } from '@angular/core';
import { TransportLazyModule } from '@ts-core/angular';
import { CompanySaveHandler, CompanyOpenHandler, CompanyEditHandler } from './transport/handler';
import { CompanyEditCommand, CompanyOpenCommand, CompanySaveCommand } from './transport';
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
export class CompanyModule extends TransportLazyModule<CompanyModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'CompanyModule';
    public static COMMANDS = [CompanySaveCommand.NAME, CompanyOpenCommand.NAME, CompanyEditCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<CompanyModule>, transport: Transport, open: CompanyOpenHandler, save: CompanySaveHandler, edit: CompanyEditHandler) {
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
