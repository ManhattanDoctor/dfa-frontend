import { Component, ViewContainerRef } from '@angular/core';
import { WindowService, IWindowContent, ViewUtil } from '@ts-core/angular';
import { EnvironmentService } from '@core/service';
import { VIMatModule } from '@ts-core/angular-material';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as _ from 'lodash';

@Component({
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatRadioModule,
        MatButtonModule,
        MatProgressBarModule,

        VIMatModule,
    ],
    selector: 'company-wizard',
    templateUrl: 'company-wizard.component.html',
})
export class CompanyAddWizardComponent extends IWindowContent {

    //--------------------------------------------------------------------------
    //
    //  Constants
    //
    //--------------------------------------------------------------------------

    public static EVENT_ADDED = 'EVENT_ADDED';
    public static EVENT_SEARCHED = 'EVENT_SEARCHED';

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public role: Role;
    public roles: Array<Role>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef
    ) {
        super(container);
        ViewUtil.addClasses(container, 'd-flex flex-column scroll-vertical');

        this.role = Role.OWNER;
        this.roles = Object.values(Role);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public submit(): void {
        this.emit(this.role === Role.OWNER ? CompanyAddWizardComponent.EVENT_ADDED : CompanyAddWizardComponent.EVENT_SEARCHED);
    }
}

enum Role {
    OWNER = 'OWNER',
    EMPLOYEE = 'EMPLOYEE',
}
