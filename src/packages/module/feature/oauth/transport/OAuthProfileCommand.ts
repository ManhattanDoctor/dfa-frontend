
import { LoginResource } from '@common/platform/api/login';
import { TransportCommandAsync } from '@ts-core/common';
import { OAuthUser } from '@ts-core/oauth';

export class OAuthProfileCommand extends TransportCommandAsync<LoginResource, OAuthUser> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'OAuthProfileCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: LoginResource) {
        super(OAuthProfileCommand.NAME, request);
    }
}
