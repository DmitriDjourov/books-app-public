export const oktaConfig = {
  clientId: `${process.env.REACT_APP_clientId}`,
  issuer: `https://${process.env.REACT_APP_issuer}.okta.com/oauth2/default`,
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
}