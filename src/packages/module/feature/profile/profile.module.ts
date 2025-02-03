import { NgModule, NgModuleRef } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '@shared/shared.module';
import { ProfileInfoComponent } from './component';
import { ProfileEditHandler } from './transport/handler';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TransportLazyModule } from '@ts-core/angular';
import { Transport } from '@ts-core/common';
import { ProfileEditCommand } from './transport';
import { MatCheckboxModule } from '@angular/material/checkbox';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const declarations = [
    ProfileInfoComponent
];

@NgModule({
    imports: [
        FormsModule,
        MatInputModule,
        MatSelectModule,
        MatMenuModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatDatepickerModule,
        SharedModule,
    ],
    exports: declarations,
    declarations
})
export class ProfileModule extends TransportLazyModule<ProfileModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'ProfileModule';
    public static COMMANDS = [ProfileEditCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<ProfileModule>, transport: Transport, edit: ProfileEditHandler) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return ProfileModule.ID;
    }

    public get commands(): Array<string> {
        return ProfileModule.COMMANDS;
    }
}
