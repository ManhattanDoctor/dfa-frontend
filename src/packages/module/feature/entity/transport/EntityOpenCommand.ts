import { TransportCommand } from '@ts-core/common';
import { EntityId, EntityType } from '../Entity';
import * as _ from 'lodash';

export class EntityOpenCommand<U = EntityId, V = any> extends TransportCommand<IEntityOpenDto<U>> {
    // --------------------------------------------------------------------------
    //
    //   Constants
    //
    // --------------------------------------------------------------------------

    public static NAME = 'EntityOpenCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: IEntityOpenDto<U, V>, name?: string) {
        super(EntityOpenCommand.NAME, request);
        if (!_.isNil(name)) {
            this.name = name;
        }
    }
}

export interface IEntityOpenDto<U = EntityId, V = any> {
    id: U;
    type: EntityType;
    details?: V;
    isBriefly?: boolean;
}
