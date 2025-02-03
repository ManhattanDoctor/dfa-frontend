import { TransportCommand } from '@ts-core/common';

export class PushAllowCommand extends TransportCommand<void> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'PushAllowCommand';

    // --------------------------------------------------------------------------
    //`
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor() {
        super(PushAllowCommand.NAME);
    }
}