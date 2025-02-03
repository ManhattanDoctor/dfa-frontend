import { Component, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { RouterBaseService, ViewUtil } from '@ts-core/angular';
import { NativeWindowService } from '@ts-core/frontend';
import { ActivatedRoute } from '@angular/router';
import { OAuthParser } from '@ts-core/oauth';
import * as _ from 'lodash';

@Component({
    templateUrl: 'oauth-page.component.html',
    standalone: false
})
export class OAuthPageComponent extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ElementRef, route: ActivatedRoute, nativeWindow: NativeWindowService, router: RouterBaseService) {
        super();
        ViewUtil.addClasses(element, 'd-flex justify-content-center align-items-center scroll-vertical w-100 h-100');

        let item = OAuthParser.parse(router.getParams(), router.getFragment(route.snapshot));
        if (!_.isNil(item)) {
            nativeWindow.window.opener.postMessage(item, nativeWindow.window.location.toString());
        }
    }
}