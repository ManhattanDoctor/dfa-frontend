import { Component, ViewContainerRef } from '@angular/core';
import { WindowService, IWindowContent, ViewUtil } from '@ts-core/angular';
import { CompanyPreferences, COMPANY_PREFERENCES_PHONE_MAX_LENGTH, COMPANY_PREFERENCES_EMAIL_MAX_LENGTH, COMPANY_PREFERENCES_ADDRESS_MAX_LENGTH, COMPANY_PREFERENCES_DESCRIPTION_MAX_LENGTH, COMPANY_PREFERENCES_WEBSITE_MAX_LENGTH, CompanyTaxDetails, COMPANY_DETAILS_INN_MIN_LENGTH, COMPANY_DETAILS_INN_MAX_LENGTH } from '@common/platform/company';
import { ISerializable } from '@ts-core/common';
import { COMPANY_PREFERENCES_NAME_MIN_LENGTH, COMPANY_PREFERENCES_NAME_MAX_LENGTH } from '@common/platform/company';
import { VIMatModule } from '@ts-core/angular-material';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ICompanyAddDto } from '@common/platform/api/company';
import { Client } from '@common/platform/api';
import { CompanyDetailsTaxComponent } from '@shared/component';
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

        VIMatModule,
        CompanyDetailsTaxComponent,
    ],
    selector: 'company-add',
    templateUrl: 'company-add.component.html',
})
export class CompanyAddComponent extends IWindowContent implements ISerializable<ICompanyAddDto> {
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

    public name: string;
    public phone: string;
    public email: string;
    public website: string;
    public address: string;
    public description: string;

    public inn: string = '165121964803';
    public details: CompanyTaxDetails;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef,
        private windows: WindowService,
        private api: Client,
    ) {
        super(container);
        ViewUtil.addClasses(container, 'd-flex flex-column scroll-vertical');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public async submit(): Promise<void> {
        await this.windows.question('general.save.confirmation').yesNotPromise;
        this.emit(CompanyAddComponent.EVENT_SUBMITTED);
    }

    public async detailsGet(): Promise<void> {
        this.isDisabled = true;
        try {
            this.details = await this.api.taxCompanyGet(this.inn);
            this.name = this.details.name;
            this.address = this.details.address;
        }
        catch (error) {
            this.details = null;
        }
        finally {
            this.isDisabled = false;
        }
    }

    public serialize(): ICompanyAddDto {
        let preferences = {} as CompanyPreferences;
        preferences.name = this.name;
        preferences.phone = this.phone;
        preferences.email = this.email;
        preferences.website = this.website;
        preferences.address = this.address;
        preferences.description = this.description;
        return { preferences, details: this.details };
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

    public get innMinLength(): number {
        return COMPANY_DETAILS_INN_MIN_LENGTH;
    }
    public get innMaxLength(): number {
        return COMPANY_DETAILS_INN_MAX_LENGTH;
    }
}
