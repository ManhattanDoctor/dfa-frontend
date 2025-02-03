import { Directive, HostListener, Input, booleanAttribute } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { RouterService } from '@core/service';
import * as _ from 'lodash';

@Directive({
    selector: '[button-back]',
    standalone: false
})
export class ButtonBackDirective extends DestroyableContainer {

    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    @Input({ transform: booleanAttribute })
    public isHistoryBack: boolean;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private router: RouterService) {
        super();
    }

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.router = null;
    }

    //--------------------------------------------------------------------------
    //
    //	Event Handlers
    //
    //--------------------------------------------------------------------------

    @HostListener('click')
    protected clickHandler(): void {
        if (this.isHistoryBack) {
            this.router.back();
        }
        else {
            this.router.navigate(RouterService.DEFAULT_URL);
        }
    }
}
