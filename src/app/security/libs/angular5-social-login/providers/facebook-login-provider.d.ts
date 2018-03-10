import {BaseLoginProvider, LoginProviderClass, SocialUser} from '../entities';

export declare class FacebookLoginProvider extends BaseLoginProvider {
  private clientId;
  loginProviderObj: LoginProviderClass;

  static drawUser(response: any): SocialUser;

  static readonly PROVIDER_ID: string;

  constructor(clientId: string);

  initialize(): Promise<SocialUser>;

  signIn(): Promise<SocialUser>;

  signOut(): Promise<any>;
}
