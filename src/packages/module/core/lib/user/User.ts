import { IUser } from '@ts-core/angular';
import { User as UserBase } from '@common/platform/user';
import { ObjectUtil } from '@ts-core/common';
import * as _ from 'lodash';

export class User extends UserBase implements IUser<Partial<User>> {
    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public update(data: Partial<User>): void {
        ObjectUtil.copyPartial(data, this, ['companyId', 'created', 'status']);
        if (!_.isNil(data.preferences)) {
            ObjectUtil.copyPartial(data.preferences, this.preferences);
        }
    }
    public destroy(): void { }
}
