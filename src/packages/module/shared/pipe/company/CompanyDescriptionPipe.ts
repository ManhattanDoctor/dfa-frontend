import { Pipe, PipeTransform } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { Company } from '@common/platform/company';
import { PrettifyPipe } from '@ts-core/angular';
import * as _ from 'lodash';

@Pipe({
    name: 'userDescription'
})
export class CompanyDescriptionPipe extends DestroyableContainer implements PipeTransform {

    // --------------------------------------------------------------------------
    //
    //	Public Methods
    //
    // --------------------------------------------------------------------------

    public transform(item: Company): string {
        let value = item?.preferences.description || item?.id.toString();
        return !_.isEmpty(value) ? value : PrettifyPipe.EMPTY_SYMBOL;
    }
}

