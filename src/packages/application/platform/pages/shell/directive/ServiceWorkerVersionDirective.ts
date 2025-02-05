import { Directive, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { WindowService, ViewUtil, ServiceWorkerService } from '@ts-core/angular';
import { LanguageService, NativeWindowService } from '@ts-core/frontend';
import { EnvironmentService } from '@core/service';
import { takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Directive({
    selector: '[service-worker-version]',
    standalone: false
})
export class ServiceWorkerVersionDirective extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    //	Private
    //
    // --------------------------------------------------------------------------

    private element: HTMLSpanElement;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ElementRef<HTMLSpanElement>,
        private nativeWindow: NativeWindowService,
        private windows: WindowService,
        private language: LanguageService,
        private environment: EnvironmentService,
        private service: ServiceWorkerService) {
        super();
        this.element = element.nativeElement;
        ViewUtil.addClasses(this.element, 'fas');

        service.statusChanged.pipe(takeUntil(this.destroyed)).subscribe(this.check);
        this.check();
    }

    // --------------------------------------------------------------------------
    //
    //	Private Methods
    //
    // --------------------------------------------------------------------------

    private check = (): void => {
        ViewUtil.toggleClass(this.element, 'd-none', this.service.isNotLoaded);
        if (this.service.isNotLoaded) {
            return;
        }

        let isFinished = this.service.isLoaded || this.service.isError;
        ViewUtil.toggleClasses(this.element, 'fa-cog fa-spin', this.service.isLoading);
        ViewUtil.toggleClasses(this.element, 'fa-bounce mouse-active', isFinished);
        ViewUtil.toggleClasses(this.element, 'fa-check-circle color-success', this.service.isLoaded);
        ViewUtil.toggleClasses(this.element, 'fa-exclamation-triangle text-danger', this.service.isError);

        if (isFinished) {
            this.showInfo();
            this.element.addEventListener('click', this.clickHandler);
            ViewUtil.setAttribute(this.element, 'title', this.language.translate(`serviceWorker.update.${this.service.isLoaded ? 'loaded' : 'error'}`));
        }
        else {
            this.element.removeEventListener('click', this.clickHandler);
            ViewUtil.setAttribute(this.element, 'title', this.language.translate('serviceWorker.update.loading'));
        }
    }

    private showInfo(): void {
        if (this.service.isError) {
            this.windows.info(`serviceWorker.update.error`);
            return;
        }
        this.windows.question('serviceWorker.update.loaded').yesNotPromise.then(this.reload);
    };

    private reload = (): void => this.nativeWindow.document.location.reload();

    // --------------------------------------------------------------------------
    //
    //	Event Handlers
    //
    // --------------------------------------------------------------------------

    private clickHandler = (): void => this.showInfo();

    // --------------------------------------------------------------------------
    //
    //	Public Methods
    //
    // --------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        if (!_.isNil(this.element)) {
            this.element.removeEventListener('click', this.clickHandler);
            this.element = null;
        }
    }
}
