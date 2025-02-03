import { TransportEvent } from '@ts-core/common';

export class MenuToggleEvent extends TransportEvent<void> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'MenuToggleEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor() {
        super(MenuToggleEvent.NAME);
    }
}