import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComcolPageContentComponent } from './comcol-page-content/comcol-page-content.component';
import { ComcolPageHandleComponent } from './comcol-page-handle/comcol-page-handle.component';
import { ThemedComcolPageHandleComponent} from './comcol-page-handle/themed-comcol-page-handle.component';

import { ComcolPageHeaderComponent } from './comcol-page-header/comcol-page-header.component';
import { ComcolPageLogoComponent } from './comcol-page-logo/comcol-page-logo.component';
import { ComColFormComponent } from './comcol-forms/comcol-form/comcol-form.component';
import { CreateComColPageComponent } from './comcol-forms/create-comcol-page/create-comcol-page.component';
import { EditComColPageComponent } from './comcol-forms/edit-comcol-page/edit-comcol-page.component';
import { DeleteComColPageComponent } from './comcol-forms/delete-comcol-page/delete-comcol-page.component';
import { ComcolPageBrowseByComponent } from './comcol-page-browse-by/comcol-page-browse-by.component';
import { ThemedComcolPageBrowseByComponent } from './comcol-page-browse-by/themed-comcol-page-browse-by.component';
import { ComcolRoleComponent } from './comcol-forms/edit-comcol-page/comcol-role/comcol-role.component';
import { SharedModule } from '../shared.module';
import { FormModule } from '../form/form.module';
import { UploadModule } from '../upload/upload.module';
import { ComcolBrowseByComponent } from './sections/comcol-browse-by/comcol-browse-by.component';
import { BrowseByModule } from '../../browse-by/browse-by.module';
import { ComcolRecentlyAddedComponent } from './sections/comcol-recently-added/comcol-recently-added.component';
import { SearchModule } from '../search/search.module';

const COMPONENTS = [
  ComcolPageContentComponent,
  ComcolPageHandleComponent,
  ComcolPageHeaderComponent,
  ComcolPageLogoComponent,
  ComColFormComponent,
  CreateComColPageComponent,
  EditComColPageComponent,
  DeleteComColPageComponent,
  ComcolPageBrowseByComponent,
  ThemedComcolPageBrowseByComponent,
  ComcolRoleComponent,
  ThemedComcolPageHandleComponent,
  ComcolBrowseByComponent,
  ComcolRecentlyAddedComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    FormModule,
    SharedModule,
    UploadModule,
    BrowseByModule,
    SearchModule,
  ],
  exports: [
    ...COMPONENTS,
    UploadModule,
  ]
})
export class ComcolModule { }
