import { Component, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { EnvironmentService, PipeService, RouterService, SettingsService } from '@core/service';
import { ViewUtil } from '@ts-core/angular';

@Component({
    selector: 'shell-about',
    templateUrl: './shell-about.component.html',
    standalone: false
})
export class ShellAboutComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public version: string;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, settings: SettingsService, pipe: PipeService, private router: RouterService, public environment: EnvironmentService,) {
        super();
        ViewUtil.addClasses(element, 'd-block');
        this.version = pipe.language.translate('general.footer', { version: settings.version, versionDate: pipe.momentDate.transform(settings.versionDate, 'LLL'), });
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public about(): void {
        this.router.navigate(RouterService.ABOUT_URL);
    }
}
