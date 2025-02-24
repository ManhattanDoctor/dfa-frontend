import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService, ThemeAssetService } from '@ts-core/frontend';
import { PipeBaseService } from '@ts-core/angular';
import { UserDescriptionPipe, UserNamePipe, } from '@shared/pipe';
import { CompanyNamePipe, CompanyDescriptionPipe } from '@shared/pipe/company';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class PipeService extends PipeBaseService {
    //--------------------------------------------------------------------------
    //
    // 	Constants
    //
    //--------------------------------------------------------------------------

    private static USER_NAME: UserNamePipe;
    private static USER_DESCRIPTION: UserDescriptionPipe;

    private static COMPANY_NAME: CompanyNamePipe;
    private static COMPANY_DESCRIPTION: CompanyDescriptionPipe;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(language: LanguageService, sanitizer: DomSanitizer, private themeAsset: ThemeAssetService) {
        super(language, sanitizer);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get userName(): UserNamePipe {
        if (!PipeService.USER_NAME) {
            PipeService.USER_NAME = new UserNamePipe();
        }
        return PipeService.USER_NAME;
    }
    public get userDescription(): UserNamePipe {
        if (!PipeService.USER_DESCRIPTION) {
            PipeService.USER_DESCRIPTION = new UserDescriptionPipe();
        }
        return PipeService.USER_DESCRIPTION;
    }

    public get companyName(): CompanyNamePipe {
        if (!PipeService.COMPANY_NAME) {
            PipeService.COMPANY_NAME = new CompanyNamePipe();
        }
        return PipeService.COMPANY_NAME;
    }
    public get companyDescription(): CompanyDescriptionPipe {
        if (!PipeService.COMPANY_DESCRIPTION) {
            PipeService.COMPANY_DESCRIPTION = new CompanyDescriptionPipe();
        }
        return PipeService.COMPANY_DESCRIPTION;
    }
}
