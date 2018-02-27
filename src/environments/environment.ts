// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  unnamedMicroserviceUrl: 'http://127.0.0.3:8080/api/',
  authPath: 'auth/',
  facebookPath: 'facebook/',
  loginPath: 'login',
  logoutPath: 'logout/',
  configPath: 'config/',
  placeTypesPath: 'places/types/',

  facebookAppId: '209464289792135',
  facebookSecret: 'f47826dc3bcbbafa2052b1c5f91b157f',
};
