import { Component, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/angular';
import { ThemeAssetService, ThemeService } from '@ts-core/frontend';
import { PipeService, SettingsService } from '@core/service';
import * as _ from 'lodash';

@Component({
    templateUrl: 'login-page.component.html',
    standalone: false
})
export class LoginPageComponent extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public version: string;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ElementRef, pipe: PipeService, settings: SettingsService) {
        super();
        ViewUtil.addClasses(element, 'd-flex flex-column justify-content-center align-items-center scroll-vertical w-100 h-100');

        this.version = pipe.language.translate('general.version', { version: settings.version, date: pipe.momentDate.transform(settings.versionDate, 'LLL'), });
    }
}
