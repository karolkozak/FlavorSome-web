import {AuthServiceConfig, FacebookLoginProvider} from '../libs/angular5-social-login/index';
import {environment} from '@env/environment';

export function getAuthServiceConfig() {
  return new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.facebookAppId),
    }
  ]);
}
