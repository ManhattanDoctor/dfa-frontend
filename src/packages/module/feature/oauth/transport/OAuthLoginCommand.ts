
import { LoginResource } from '@common/platform/api/login';
import { TransportCommandAsync } from '@ts-core/common';
import { IOAuthDto } from '@ts-core/oauth';

export class OAuthLoginCommand extends TransportCommandAsync<LoginResource, IOAuthDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'OAuthLoginCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: LoginResource) {
        super(OAuthLoginCommand.NAME, request);
    }
}
