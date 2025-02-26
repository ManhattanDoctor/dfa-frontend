import { TransportCommand } from '@ts-core/common';
import { EntityObjectId } from '../EntityObject';

export class EntityObjectOpenCommand<U = EntityObjectId, V = any> extends TransportCommand<IEntityObjectOpenDto<U>> {
    // --------------------------------------------------------------------------
    //
    //   Constants
    //
    // --------------------------------------------------------------------------

    public static NAME = 'EntityObjectOpenBaseCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(name: string, request: IEntityObjectOpenDto<U, V>) {
        super(name, request);
    }
}

export interface IEntityObjectOpenDto<U = EntityObjectId, V = any> {
    id: U;
    details?: V;
    isBriefly?: boolean;
}
