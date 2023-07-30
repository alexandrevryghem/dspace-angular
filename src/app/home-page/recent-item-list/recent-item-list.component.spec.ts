import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SearchService } from 'src/app/core/shared/search/search.service';
import { createSuccessfulRemoteDataObject } from 'src/app/shared/remote-data.utils';
import { SearchServiceStub } from 'src/app/shared/testing/search-service.stub';
import { createPaginatedList } from 'src/app/shared/testing/utils.test';
import { PaginationService } from '../../core/pagination/pagination.service';
import { PaginationServiceStub } from '../../shared/testing/pagination-service.stub';
import { RecentItemListComponent } from './recent-item-list.component';
import { SearchConfigurationService } from '../../core/shared/search/search-configuration.service';
import { PaginatedSearchOptions } from '../../shared/search/models/paginated-search-options.model';
import { PaginationComponentOptions } from '../../shared/pagination/pagination-component-options.model';
import { SortDirection, SortOptions } from '../../core/cache/models/sort-options.model';
import { of as observableOf } from 'rxjs';
import { APP_CONFIG } from '../../../config/app-config.interface';
import { environment } from '../../../environments/environment';
import { PLATFORM_ID } from '@angular/core';
import { VarDirective } from '../../shared/utils/var.directive';

describe('RecentItemListComponent', () => {
  let component: RecentItemListComponent;
  let fixture: ComponentFixture<RecentItemListComponent>;
  const emptyList = createSuccessfulRemoteDataObject(createPaginatedList([]));
  let paginationService;
  let searchService: SearchServiceStub;
  paginationService = new PaginationServiceStub();
  const mockSearchOptions = observableOf(new PaginatedSearchOptions({
    pagination: Object.assign(new PaginationComponentOptions(), {
      id: 'search-page-configuration',
      pageSize: 10,
      currentPage: 1
    }),
    sort: new SortOptions('dc.date.accessioned', SortDirection.DESC),
  }));
  const searchConfigServiceStub = {
    paginatedSearchOptions: mockSearchOptions
  };
  beforeEach(waitForAsync(() => {
    searchService = new SearchServiceStub();
    void TestBed.configureTestingModule({
      declarations: [
        RecentItemListComponent,
        VarDirective,
      ],
      providers: [
        { provide: SearchService, useValue: searchService },
        { provide: PaginationService, useValue: paginationService },
        { provide: SearchConfigurationService, useValue: searchConfigServiceStub },
        { provide: APP_CONFIG, useValue: environment },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentItemListComponent);
    component = fixture.componentInstance;
    spyOn(searchService, 'search').and.returnValue(observableOf(emptyList));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the navigate method on the Router with view mode list parameter as a parameter when setViewMode is called', () => {
    component.onLoadMore();
    expect(paginationService.updateRouteWithUrl).toHaveBeenCalledWith(undefined, ['search'], Object({ sortField: 'dc.date.accessioned', sortDirection: 'DESC', page: 1 }));
  });
});


