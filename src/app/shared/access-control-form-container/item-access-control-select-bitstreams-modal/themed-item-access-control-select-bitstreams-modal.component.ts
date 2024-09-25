import { Component, Input } from '@angular/core';
import { ThemedComponent } from '../../theme-support/themed.component';
import { ItemAccessControlSelectBitstreamsModalComponent } from './item-access-control-select-bitstreams-modal.component';
import { Item } from '../../../core/shared/item.model';

/**
 * Themed wrapper for {@link ItemAccessControlSelectBitstreamsModalComponent}
 */
@Component({
  selector: 'ds-themed-item-access-control-select-bitstreams-modal',
  templateUrl: '../../theme-support/themed.component.html',
})
export class ThemedItemAccessControlSelectBitstreamsModalComponent extends ThemedComponent<ItemAccessControlSelectBitstreamsModalComponent> {

  @Input() item: Item;

  @Input() selectedBitstreams: string[];

  protected inAndOutputNames: (keyof ItemAccessControlSelectBitstreamsModalComponent & keyof this)[] = [
    'item',
    'selectedBitstreams'
  ];

  protected getComponentName(): string {
    return 'ItemAccessControlSelectBitstreamsModalComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../../../themes/${themeName}/app/shared/access-control-form-container/item-access-control-select-bitstreams-modal/item-access-control-select-bitstreams-modal.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import('./item-access-control-select-bitstreams-modal.component');
  }
}
