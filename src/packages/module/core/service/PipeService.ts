import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService, ThemeAssetService } from '@ts-core/frontend';
import { PipeBaseService } from '@ts-core/angular';
import { UserDescriptionPipe, UserNamePipe,  } from '@shared/pipe';
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
}
