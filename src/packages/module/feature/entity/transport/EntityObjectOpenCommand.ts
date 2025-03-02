import { TransportCommand } from '@ts-core/common';
import { EntityObjectId, EntityObjectType } from '../EntityObject';
import * as _ from 'lodash';

export class EntityObjectOpenCommand<U = EntityObjectId, V = any> extends TransportCommand<IEntityObjectOpenDto<U>> {
    // --------------------------------------------------------------------------
    //
    //   Constants
    //
    // --------------------------------------------------------------------------

    public static NAME = 'EntityObjectOpenCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: IEntityObjectOpenDto<U, V>, name?: string) {
        super(EntityObjectOpenCommand.NAME, request);
        if (!_.isNil(name)) {
            this.name = name;
        }
    }
}

export interface IEntityObjectOpenDto<U = EntityObjectId, V = any> {
    id: U;
    type?: EntityObjectType;
    details?: V;
    isBriefly?: boolean;
}
