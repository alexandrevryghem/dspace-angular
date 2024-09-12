import { Component } from '@angular/core';
import { ThemedComponent} from '../../shared/theme-support/themed.component';
import { BitstreamDownloadPageComponent } from './bitstream-download-page.component';

/**
 * Themed wrapper for {@link BitstreamDownloadPageComponent}
 */
@Component({
  selector: 'ds-themed-bitstream-download-page',
  templateUrl: '../../shared/theme-support/themed.component.html',
})
export class ThemedBitstreamDownloadPageComponent extends ThemedComponent<BitstreamDownloadPageComponent> {
  protected getComponentName(): string {
    return 'BitstreamDownloadPageComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../../themes/${themeName}/app/bitstream-page/bitstream-download-page/bitstream-download-page.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import('./bitstream-download-page.component');
  }
}
