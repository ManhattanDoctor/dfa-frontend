import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { EnvironmentService } from '@core/service';

@Directive({
    selector: '[isNotCordovaEnvironment]',
    standalone: false
})
export class IsNotCordovaEnvironmentDirective {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef, environment: EnvironmentService) {
        if (!environment.isCordova) {
            viewContainer.createEmbeddedView(templateRef);
        }
    }
}
