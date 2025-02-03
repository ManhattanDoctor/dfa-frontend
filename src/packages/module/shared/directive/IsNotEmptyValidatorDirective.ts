import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';
import * as _ from 'lodash';

@Directive({
    selector: '[isNotEmpty]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: IsNotEmptyValidatorDirective,
        multi: true
    }],
    standalone: false
})
export class IsNotEmptyValidatorDirective implements Validator {

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public validate(control: AbstractControl): { [key: string]: any } | null {
        let item = control.value;
        if (_.isNil(item)) {
            return null;
        }
        item = item.toString();
        if (!_.isEmpty(item) && _.isEmpty(_.trim(item))) {
            return { 'empty': true };
        }
        return null;
    }
}