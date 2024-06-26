import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LogInExternalProviderComponent as BaseComponent } from '../../../../../../../app/shared/log-in/methods/log-in-external-provider/log-in-external-provider.component';

@Component({
  selector: 'ds-log-in-external-provider',
  // templateUrl: './log-in-external-provider.component.html',
  templateUrl: '../../../../../../../app/shared/log-in/methods/log-in-external-provider/log-in-external-provider.component.html',
  // styleUrls: ['./log-in-external-provider.component.scss'],
  styleUrls: ['../../../../../../../app/shared/log-in/methods/log-in-external-provider/log-in-external-provider.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
  ],
})
export class LogInExternalProviderComponent extends BaseComponent {
}
