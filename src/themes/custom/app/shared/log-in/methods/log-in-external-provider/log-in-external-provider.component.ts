import { Component, } from '@angular/core';

import { AuthMethodType } from '../../../../../../../app/core/auth/models/auth.method-type';
import { renderAuthMethodFor } from '../../../../../../../app/shared/log-in/methods/log-in.methods-decorator';
import { LogInExternalProviderComponent as BaseComponent } from '../../../../../../../app/shared/log-in/methods/log-in-external-provider/log-in-external-provider.component';

@Component({
  selector: 'ds-log-in-external-provider',
  // templateUrl: './log-in-external-provider.component.html',
  templateUrl: '../../../../../../../app/shared/log-in/methods/log-in-external-provider/log-in-external-provider.component.html',
  // styleUrls: ['./log-in-external-provider.component.scss'],
  styleUrls: ['../../../../../../../app/shared/log-in/methods/log-in-external-provider/log-in-external-provider.component.scss'],
})
@renderAuthMethodFor(AuthMethodType.Oidc, 'custom')
@renderAuthMethodFor(AuthMethodType.Shibboleth, 'custom')
@renderAuthMethodFor(AuthMethodType.Orcid, 'custom')
export class LogInExternalProviderComponent extends BaseComponent {
}
