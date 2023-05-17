import { KeycloakService } from "keycloak-angular";


export function initializeKeycloak(keycloak: KeycloakService) :()=>Promise<boolean> {
    return () =>
      keycloak.init({
        config: {
          url: 'http://localhost:8080/auth',
          realm: 'angular-dtsm',
          clientId: 'client-dtsm',

        },
        initOptions:{
            checkLoginIframe:true,
            checkLoginIframeInterval:25,
            onLoad: 'login-required'
        },
        loadUserProfileAtStartUp:true
      });
  }