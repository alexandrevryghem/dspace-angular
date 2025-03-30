import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { OrgUnitComponent as BaseComponent } from '../../../../../../../app/entity-groups/research-entities/item-pages/org-unit/org-unit.component';
import { GenericItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { ItemPageImgFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/img/item-page-img-field.component';
import { ThemedItemPageTitleFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { TabbedRelatedEntitiesSearchComponent } from '../../../../../../../app/item-page/simple/related-entities/tabbed-related-entities-search/tabbed-related-entities-search.component';
import { RelatedItemsComponent } from '../../../../../../../app/item-page/simple/related-items/related-items-component';
import { DsoEditMenuComponent } from '../../../../../../../app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { MetadataFieldWrapperComponent } from '../../../../../../../app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { listableObjectComponent } from '../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ThemedResultsBackButtonComponent } from '../../../../../../../app/shared/results-back-button/themed-results-back-button.component';
import { ThemedThumbnailComponent } from '../../../../../../../app/thumbnail/themed-thumbnail.component';

@listableObjectComponent('OrgUnit', ViewMode.StandalonePage, Context.Any, 'custom')
@Component({
  selector: 'ds-org-unit',
  // styleUrls: ['./org-unit.component.scss'],
  styleUrls: ['../../../../../../../app/entity-groups/research-entities/item-pages/org-unit/org-unit.component.scss'],
  // templateUrl: './org-unit.component.html',
  templateUrl: '../../../../../../../app/entity-groups/research-entities/item-pages/org-unit/org-unit.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    DsoEditMenuComponent,
    GenericItemPageFieldComponent,
    ItemPageImgFieldComponent,
    MetadataFieldWrapperComponent,
    RelatedItemsComponent,
    RouterLink,
    TabbedRelatedEntitiesSearchComponent,
    ThemedItemPageTitleFieldComponent,
    ThemedResultsBackButtonComponent,
    ThemedThumbnailComponent,
    TranslateModule,
  ],
})
export class OrgUnitComponent extends BaseComponent {
}
