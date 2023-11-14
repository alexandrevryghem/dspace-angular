import { Component, Input } from '@angular/core';
import { Item } from '../../../core/shared/item.model';
import { ThemedComponent } from '../../../shared/theme-support/themed.component';
import { ItemVersionsNoticeComponent } from './item-versions-notice.component';

/**
 * Themed wrapper for {@link ItemVersionsNoticeComponent}
 */
@Component({
  selector: 'ds-themed-item-versions-notice',
  styleUrls: [],
  templateUrl: '../../../shared/theme-support/themed.component.html',
})
export class ThemedItemVersionsNoticeComponent extends ThemedComponent<ItemVersionsNoticeComponent> {

  @Input() item: Item;

  protected inAndOutputNames: (keyof ItemVersionsNoticeComponent & keyof this)[] = [
    'item',
  ];

  protected getComponentName(): string {
    return 'ItemVersionsNoticeComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../../../themes/${themeName}/app/item-page/versions/notice/item-versions-notice.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import('./item-versions-notice.component');
  }

}
