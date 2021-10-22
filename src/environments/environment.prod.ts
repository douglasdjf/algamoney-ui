export const environment = {
  production: true,
  apiUrl: 'https://algamoney-api-fullstack.herokuapp.com',
  tokenAllowedDomains: [ /algamoney-api-fullstack.herokuapp.com/ ],
  tokenDisallowedRoutes: [/\/oauth\/token/]
};
