import { Component } from '@angular/core';

import { EditRelationshipListWrapperComponent } from '../../../../../themes/custom/app/item-page/edit-item-page/item-relationships/edit-relationship-list-wrapper/edit-relationship-list-wrapper.component';
import { ThemedComponent } from '../../../../shared/theme-support/themed.component';

/**
 * Themed wrapper for {@link EditRelationshipListWrapperComponent}.
 */
@Component({
  selector: 'ds-themed-edit-relationship-list-wrapper',
  templateUrl: '../../../../../app/shared/theme-support/themed.component.html',
})
export class ThemedEditRelationshipListWrapperComponent extends ThemedComponent<EditRelationshipListWrapperComponent> {

  protected getComponentName(): string {
    return 'EditRelationshipListWrapperComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../../../../themes/${themeName}/app/item-page/edit-item-page/item-relationships/edit-relationship-list-wrapper/edit-relationship-list-wrapper.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import('./edit-relationship-list-wrapper.component');
  }

}
