import { Component, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { EnvironmentService, PipeService, RouterService, SettingsService } from '@core/service';
import { ViewUtil } from '@ts-core/angular';
import { takeUntil } from 'rxjs';

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

    public version: object;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, private settings: SettingsService, private pipe: PipeService, private router: RouterService, public environment: EnvironmentService,) {
        super();
        ViewUtil.addClasses(element, 'd-block');

        this.version = { version: this.settings.version, date: this.pipe.momentDate.transform(this.settings.versionDate, 'LLL') };
        // this.pipe.language.completed.pipe(takeUntil(this.destroyed)).subscribe(this.checkVersion);
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
