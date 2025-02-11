import { Pipe, PipeTransform } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { User } from '@common/platform/user';
import { PrettifyPipe } from '@ts-core/angular';
import * as _ from 'lodash';

@Pipe({
    name: 'userName'
})
export class UserNamePipe extends DestroyableContainer implements PipeTransform {

    // --------------------------------------------------------------------------
    //
    //	Public Methods
    //
    // --------------------------------------------------------------------------

    public transform(item: User): string {
        let value = item?.preferences?.name || item?.preferences?.email || item?.login;
        return !_.isEmpty(value) ? value : PrettifyPipe.EMPTY_SYMBOL;
    }
}

