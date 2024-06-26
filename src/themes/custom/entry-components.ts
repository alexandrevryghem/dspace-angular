import { PublicationComponent } from './app/item-page/simple/item-types/publication/publication.component';
import { LogInOidcComponent } from './app/shared/log-in/methods/oidc/log-in-oidc.component';
import { LogInPasswordComponent } from './app/shared/log-in/methods/password/log-in-password.component';
import { LogInShibbolethComponent } from './app/shared/log-in/methods/shibboleth/log-in-shibboleth.component';

export const ENTRY_COMPONENTS = [
  PublicationComponent,
  LogInOidcComponent,
  LogInPasswordComponent,
  LogInShibbolethComponent,
];
