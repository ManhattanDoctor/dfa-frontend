import { Component, Input, ViewContainerRef } from '@angular/core';
import { WindowService, IWindowContent, ViewUtil } from '@ts-core/angular';
import { EnvironmentService } from '@core/service';
import { Company, CompanyPreferences, COMPANY_PREFERENCES_PHONE_MAX_LENGTH, COMPANY_PREFERENCES_EMAIL_MAX_LENGTH, COMPANY_PREFERENCES_ADDRESS_MAX_LENGTH, COMPANY_PREFERENCES_DESCRIPTION_MAX_LENGTH, COMPANY_PREFERENCES_WEBSITE_MAX_LENGTH } from '@common/platform/company';
import { ISerializable } from '@ts-core/common';
import { COMPANY_PREFERENCES_NAME_MIN_LENGTH, COMPANY_PREFERENCES_NAME_MAX_LENGTH } from '@common/platform/company';
import { ICompanySaveDto } from '@feature/company/transport';
import { VIMatModule } from '@ts-core/angular-material';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CompanyContainerComponent } from '@shared/component';
import * as _ from 'lodash';

@Component({
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressBarModule,

        VIMatModule
    ],
    selector: 'company-edit',
    templateUrl: 'company-edit.component.html',
})
export class CompanyEditComponent extends IWindowContent implements ISerializable<ICompanySaveDto> {
    //--------------------------------------------------------------------------
    //
    //  Constants
    //
    //--------------------------------------------------------------------------

    public static EVENT_SUBMITTED = 'EVENT_SUBMITTED';

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _company: Company;

    public uid: string;
    public name: string;
    public phone: string;
    public email: string;
    public website: string;
    public address: string;
    public description: string;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef,
        private windows: WindowService
    ) {
        super(container);
        ViewUtil.addClasses(container, 'd-flex flex-column scroll-vertical');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitCompanyProperties(): void {
        let value = null;

        value = this.company.preferences.name;
        if (value !== this.name) {
            this.name = value;
        }

        value = this.company.preferences.phone;
        if (value !== this.phone) {
            this.phone = value;
        }

        value = this.company.preferences.email;
        if (value !== this.email) {
            this.email = value;
        }

        value = this.company.preferences.website;
        if (value !== this.website) {
            this.website = value;
        }

        value = this.company.preferences.address;
        if (value !== this.address) {
            this.address = value;
        }

        value = this.company.preferences.description;
        if (value !== this.description) {
            this.description = value;
        }
    }

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public async submit(): Promise<void> {
        await this.windows.question('general.save.confirmation').yesNotPromise;
        this.emit(CompanyEditComponent.EVENT_SUBMITTED);
    }

    public serialize(): ICompanySaveDto {
        let preferences = {} as Partial<CompanyPreferences>;
        preferences.name = this.name;
        preferences.phone = this.phone;
        preferences.email = this.email;
        preferences.website = this.website;
        preferences.address = this.address;
        preferences.description = this.description;
        return { id: this.company.id, preferences };
    }

    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------

    public get nameMinLength(): number {
        return COMPANY_PREFERENCES_NAME_MIN_LENGTH;
    }
    public get nameMaxLength(): number {
        return COMPANY_PREFERENCES_NAME_MAX_LENGTH;
    }
    public get phoneMaxLength(): number {
        return COMPANY_PREFERENCES_PHONE_MAX_LENGTH;
    }
    public get emailMaxLength(): number {
        return COMPANY_PREFERENCES_EMAIL_MAX_LENGTH;
    }
    public get websiteMaxLength(): number {
        return COMPANY_PREFERENCES_WEBSITE_MAX_LENGTH;
    }
    public get addressMaxLength(): number {
        return COMPANY_PREFERENCES_ADDRESS_MAX_LENGTH;
    }
    public get descriptionMaxLength(): number {
        return COMPANY_PREFERENCES_DESCRIPTION_MAX_LENGTH;
    }


    public get company(): Company {
        return this._company;
    }
    @Input()
    public set company(value: Company) {
        if (value === this._company) {
            return;
        }
        this._company = value;
        if (!_.isNil(value)) {
            this.commitCompanyProperties();
        }
    }
}
