export const environment = {
  production: true,
  qa: true,

  flavorSomeMicroserviceUrl: 'https://ghost.kkopec.net:8443/api',
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

  usersPath: '/users',
  current: '/current',
  unrated: '/unrated',
  visit: '/visit',

  ratesPath: '/ratings',

  contact: '/contact',
  mail: '/mail',

  availableLanguages: ['pl', 'en'],
  availableCultureLanguages: ['pl-PL', 'en-GB'],
  defaultLanguage: 'en',

  facebookAppId: '209464289792135',

  googleApiKey: 'AIzaSyC9sBR6fDjfqbKDPJ_AX8y45G9L4E7pFOg',
  googleReCaptchaKey: '6LeOCncUAAAAAJwAYmtVX29quXSiAJJiny4UnHx0',

  googlePlacesUrl: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',

  here: {
    app_id: 'EuCIZXudfRuYx0QRwEI7',
    app_code: 'POTrRUBn4rKdTV2_tpIzEg'
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
