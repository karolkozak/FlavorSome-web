export const environment = {
  production: true,

  unnamedMicroserviceUrl: 'http://127.0.0.3:8080/api',
  authPath: '/auth',
  facebookPath: '/facebook',
  loginPath: '/login',
  logoutPath: '/logout',
  registration: '/register',
  confirmation: '/confirmation',

  configPath: '/config',
  placeTypesPath: '/places/types',

  placesPath: '/places',
  menuPath: '/menu',
  ratingsPath: '/ratings',

  usersPath: '/users',
  current: '/current',
  unrated: '/unrated',
  visit: '/visit',

  about: '/about',
  mail: '/mail',

  availableLanguages: ['pl', 'en'],
  availableCultureLanguages: ['pl-PL', 'en-GB'],
  defaultLanguage: 'en',

  facebookAppId: '209464289792135',
  facebookSecret: 'f47826dc3bcbbafa2052b1c5f91b157f',

  googleApiKey: 'AIzaSyC9sBR6fDjfqbKDPJ_AX8y45G9L4E7pFOg',
  googleReCaptchaKey: '6LfaQlAUAAAAAC2husiZGVe0gCLEGiNyt71svf4Y',

  googlePlacesUrl: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',

  mapDefaults: {
    coords: {
      lat: 50.0617446,
      lng: 19.948338
    },
    zoom: 14
  },
};
