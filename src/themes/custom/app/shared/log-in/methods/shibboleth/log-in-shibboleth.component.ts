import { Component, } from '@angular/core';

import { AuthMethodType } from '../../../../../../../app/core/auth/models/auth.method-type';
import { renderAuthMethodFor } from '../../../../../../../app/shared/log-in/methods/log-in.methods-decorator';
import { LogInShibbolethComponent as BaseComponent } from '../../../../../../../app/shared/log-in/methods/shibboleth/log-in-shibboleth.component';

@Component({
  selector: 'ds-log-in-shibboleth',
  // templateUrl: './log-in-shibboleth.component.html',
  templateUrl: '../../../../../../../app/shared/log-in/methods/shibboleth/log-in-shibboleth.component.html',
  // styleUrls: ['./log-in-shibboleth.component.scss'],
  styleUrls: ['../../../../../../../app/shared/log-in/methods/shibboleth/log-in-shibboleth.component.scss'],
})
@renderAuthMethodFor(AuthMethodType.Shibboleth, 'custom')
export class LogInShibbolethComponent extends BaseComponent {
}
