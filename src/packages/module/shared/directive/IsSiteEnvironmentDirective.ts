import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { EnvironmentService } from '@core/service';

@Directive({
    selector: '[isSiteEnvironment]',
    standalone: false
})
export class IsSiteEnvironmentDirective {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef, environment: EnvironmentService,) {
        if (environment.isSiteMode) {
            viewContainer.createEmbeddedView(templateRef);
        }
    }
}
