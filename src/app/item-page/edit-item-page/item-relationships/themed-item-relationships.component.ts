import { Component } from '@angular/core';

import { ThemedComponent } from '../../../shared/theme-support/themed.component';
import { ItemRelationshipsComponent } from './item-relationships.component';

/**
 * Themed wrapper for {@link ItemRelationshipsComponent}.
 */
@Component({
  selector: 'ds-themed-item-relationships',
  templateUrl: '../../../../app/shared/theme-support/themed.component.html',
})
export class ThemedItemRelationshipsComponent extends ThemedComponent<ItemRelationshipsComponent> {

  protected getComponentName(): string {
    return 'ItemRelationshipsComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../../../themes/${themeName}/app/item-page/edit-item-page/item-relationships/item-relationships.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import('./item-relationships.component');
  }

}
