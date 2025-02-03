import { Component, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil, ThemeAssetBackgroundDirective } from '@ts-core/angular';
import * as _ from 'lodash';
import { ThemeAssetService, ThemeService } from '@ts-core/frontend';
import { PipeService, SettingsService } from '@core/service';

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

    constructor(element: ElementRef, pipe: PipeService, settings: SettingsService, theme: ThemeService, themeAsset: ThemeAssetService) {
        super();
        ViewUtil.addClasses(element, 'd-flex flex-column justify-content-center align-items-center scroll-vertical w-100 h-100');

        /*
        let background = this.addDestroyable(new ThemeAssetBackgroundDirective(element, theme, themeAsset));
        background.extension = 'jpg';
        background.name = 'background';
        */
       
        this.version = pipe.language.translate('general.footer', { version: settings.version, versionDate: pipe.momentDate.transform(settings.versionDate, 'LLL'), });
    }
}
