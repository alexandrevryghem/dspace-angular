import { Component, } from '@angular/core';

import { AuthMethodType } from '../../../../../../../app/core/auth/models/auth.method-type';
import { renderAuthMethodFor } from '../../../../../../../app/shared/log-in/methods/log-in.methods-decorator';
import { LogInOidcComponent as BaseComponent } from '../../../../../../../app/shared/log-in/methods/oidc/log-in-oidc.component';

@Component({
  selector: 'ds-log-in-oidc',
  // templateUrl: './log-in-oidc.component.html',
  templateUrl: '../../../../../../../app/shared/log-in/methods/oidc/log-in-oidc.component.html',
})
@renderAuthMethodFor(AuthMethodType.Oidc, 'custom')
export class LogInOidcComponent extends BaseComponent {
}
