import {AuthServiceConfig, FacebookLoginProvider} from 'angular5-social-login';
import {environment} from '@env/environment';

export function getAuthServiceConfig() {
  return new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.facebookAppId),
    }
  ]);
}
