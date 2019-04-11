// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  qa: false,

  flavorSomeMicroserviceUrl: '',
  authPath: '/auth',
  facebookPath: '/facebook',
  loginPath: '/login',
  logoutPath: '/logout',
  registration: '/register',
  passwordRecovery: '/password-recovery',
  resetPassword: '/reset-password',
  confirmation: '/confirmation',
  delete: '/delete',
  refresh: '/refresh',

  configPath: '/config',
  placeTypesPath: '/places/types',

  placesPath: '/places',
  menuPath: '/menu',
  ratingsPath: '/ratings',
  search: '/search',

  ratesPath: '/ratings',

  usersPath: '/users',
  current: '/current',
  unrated: '/unrated',
  visit: '/visit',

  contact: '/contact',
  mail: '/mail',

  availableLanguages: ['pl', 'en'],
  availableCultureLanguages: ['pl-PL', 'en-GB'],
  defaultLanguage: 'en',

  facebookAppId: '',

  googleApiKey: '',
  googleReCaptchaKey: '',

  googlePlacesUrl: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',

  here: {
    app_id: '',
    app_code: ''
  },

  mapDefaults: {
    coords: {
      lat: 50.0617446,
      lng: 19.948338
    },
    zoom: 14,
    range: 300,
    rangeBounds: [100, 50000]
  },
};
