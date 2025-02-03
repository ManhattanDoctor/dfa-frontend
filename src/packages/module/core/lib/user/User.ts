import { IUser } from '@ts-core/angular';
import { User as UserBase } from '@common/platform/user';
import * as _ from 'lodash';

export class User extends UserBase implements IUser<Partial<User>> {
    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public update(data: Partial<User>): void {
        /*
        if (!_.isNil(data.account)) {
            ObjectUtil.copyPartial(data.account, this.account);
        }
        if (!_.isNil(data.preferences)) {
            ObjectUtil.copyPartial(data.preferences, this.preferences);
        }
        */
    }

    public destroy(): void { }
}
