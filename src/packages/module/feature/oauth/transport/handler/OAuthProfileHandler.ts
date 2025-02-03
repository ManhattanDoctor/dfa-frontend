import * as _ from 'lodash';
import { Injectable } from "@angular/core";
import { Transport, TransportCommandAsyncHandler } from "@ts-core/common";
import { Logger } from "@ts-core/common";
import { OAuthProfileCommand } from "../OAuthProfileCommand";
import { OAuthService } from "../../service";
import { LoginResource } from '@common/platform/api/login';
import { KeycloakUser, OAuthUser } from '@ts-core/oauth';

@Injectable({ providedIn: 'root' })
export class OAuthProfileHandler extends TransportCommandAsyncHandler<LoginResource, OAuthUser, OAuthProfileCommand> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(logger: Logger, transport: Transport, private service: OAuthService) {
        super(logger, transport, OAuthProfileCommand.NAME);
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected async execute(resource: LoginResource): Promise<OAuthUser> {
        let auth = this.service.getAuth(resource);
        let token = await auth.getToken();

        let item = new KeycloakUser();
        item.parse(await auth.getProfile(token.codeOrToken))
        return item;
    };
}
