import { Component } from '@angular/core';

import { AuthMethodType } from '../../../../../../../app/core/auth/models/auth.method-type';
import { fadeOut } from '../../../../../../../app/shared/animations/fade';
import { renderAuthMethodFor } from '../../../../../../../app/shared/log-in/methods/log-in.methods-decorator';
import { LogInPasswordComponent as BaseComponent } from '../../../../../../../app/shared/log-in/methods/password/log-in-password.component';

@Component({
  selector: 'ds-log-in-password',
  // templateUrl: './log-in-password.component.html',
  templateUrl: '../../../../../../../app/shared/log-in/methods/password/log-in-password.component.html',
  // styleUrls: ['./log-in-password.component.scss'],
  styleUrls: ['../../../../../../../app/shared/log-in/methods/password/log-in-password.component.scss'],
  animations: [fadeOut],
})
@renderAuthMethodFor(AuthMethodType.Password, 'custom')
export class LogInPasswordComponent extends BaseComponent {
}
