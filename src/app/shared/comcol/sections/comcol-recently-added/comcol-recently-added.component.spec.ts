import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComcolRecentlyAddedComponent } from './comcol-recently-added.component';
import { APP_CONFIG } from '../../../../../config/app-config.interface';
import { environment } from '../../../../../environments/environment.test';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../testing/active-router.stub';
import { PaginationService } from '../../../../core/pagination/pagination.service';
import { PaginationServiceStub } from '../../../testing/pagination-service.stub';
import { SearchServiceStub } from '../../../testing/search-service.stub';
import { SearchService } from '../../../../core/shared/search/search.service';
import { VarDirective } from '../../../utils/var.directive';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ComcolRecentlyAddedComponent', () => {
  let component: ComcolRecentlyAddedComponent;
  let fixture: ComponentFixture<ComcolRecentlyAddedComponent>;

  let activatedRoute: ActivatedRouteStub;
  let paginationService: PaginationServiceStub;
  let searchService: SearchServiceStub;

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteStub();
    paginationService = new PaginationServiceStub();
    searchService = new SearchServiceStub();

    await TestBed.configureTestingModule({
      declarations: [
        ComcolRecentlyAddedComponent,
        VarDirective,
      ],
      imports: [
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: APP_CONFIG, useValue: environment },
        { provide: PaginationService, useValue: paginationService },
        { provide: SearchService, useValue: SearchServiceStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ComcolRecentlyAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
