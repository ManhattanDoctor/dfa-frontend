import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { PromiseHandler, LoadableEvent } from '@ts-core/common';
import { PermissionService } from '@core/service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PermissionResolver implements Resolve<void> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(protected service: PermissionService) { }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        if (this.service.isLoaded) {
            return Promise.resolve();
        }

        let promise = PromiseHandler.create<void>();
        let subscription = this.service.events.subscribe(data => {
            if (data.type === LoadableEvent.COMPLETE) {
                promise.resolve();
            } else if (data.type === LoadableEvent.ERROR) {
                promise.reject(data.error.toString());
            } else if (data.type === LoadableEvent.FINISHED) {
                subscription.unsubscribe();
            }
        });
        return promise.promise;
    }
}
