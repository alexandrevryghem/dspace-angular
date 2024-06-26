import {
  AsyncPipe,
  NgIf,
} from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { fadeOut } from '../../../../../../../app/shared/animations/fade';
import { LogInPasswordComponent as BaseComponent } from '../../../../../../../app/shared/log-in/methods/password/log-in-password.component';
import { BrowserOnlyPipe } from '../../../../../../../app/shared/utils/browser-only.pipe';

@Component({
  selector: 'ds-log-in-password',
  // templateUrl: './log-in-password.component.html',
  templateUrl: '../../../../../../../app/shared/log-in/methods/password/log-in-password.component.html',
  // styleUrls: ['./log-in-password.component.scss'],
  styleUrls: ['../../../../../../../app/shared/log-in/methods/password/log-in-password.component.scss'],
  animations: [fadeOut],
  standalone: true,
  imports: [
    AsyncPipe,
    BrowserOnlyPipe,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    TranslateModule,
  ],
})
export class LogInPasswordComponent extends BaseComponent {
}
