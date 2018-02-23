import {environment} from '../../../../environments/environment';
import {AuthServiceConfig, FacebookLoginProvider} from '../../libs/angular5-social-login';

export function getAuthServiceConfig() {
  return new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.facebookAppId),
    }
  ]);
}
