import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

// Import modules
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { SubscriptionViewComponent } from './subscription-view.component';

// Import mocks
import { TranslateLoaderMock } from '../../mocks/translate-loader.mock';
import { subscriptionMock } from '../../testing/subscriptions-data.mock';

// Import utils
import { NotificationsService } from '../../notifications/notifications.service';
import { NotificationsServiceStub } from '../../testing/notifications-service.stub';
import { SubscriptionsDataService } from '../subscriptions-data.service';
import { Subscription } from '../models/subscription.model';

import { Item } from '../../../core/shared/item.model';
import { ITEM } from '../../../core/shared/item.resource-type';
import { SubscriptionsDataServiceStub } from '../../testing/subscriptions-data.service.stub';
import { AuthService } from '../../../core/auth/auth.service';
import { AuthServiceStub } from '../../testing/auth-service.stub';
import { SubscriptionModalComponent } from '../subscription-modal/subscription-modal.component';

describe('SubscriptionViewComponent', () => {
  let component: SubscriptionViewComponent;
  let fixture: ComponentFixture<SubscriptionViewComponent>;
  let de: DebugElement;
  let modalService: NgbModal;

  const mockItem = Object.assign(new Item(), {
    id: 'fake-id',
    uuid: 'fake-id',
    handle: 'fake/handle',
    lastModified: '2018',
    type: ITEM,
    _links: {
      self: {
        href: 'https://localhost:8000/items/fake-id'
      }
    }
  });

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [
        NgbModule,
        ReactiveFormsModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateLoaderMock
          }
        }),
      ],
      declarations: [
        SubscriptionViewComponent,
        SubscriptionModalComponent,
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: NotificationsService, useValue: NotificationsServiceStub },
        { provide: SubscriptionsDataService, useClass: SubscriptionsDataServiceStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    modalService = TestBed.inject(NgbModal);
    fixture = TestBed.createComponent(SubscriptionViewComponent);
    component = fixture.componentInstance;
    component.eperson = 'testid123';
    component.dso = mockItem;
    component.subscription = Object.assign(new Subscription(), subscriptionMock);
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have dso object info', () => {
    expect(de.query(By.css('.dso-info > ds-themed-type-badge'))).toBeTruthy();
    expect(de.query(By.css('.dso-info > p > a'))).toBeTruthy();
  });

  it('should have subscription type info', () => {
    expect(de.query(By.css('.subscription-type'))).toBeTruthy();
  });

  it('should have subscription paramenter info', () => {
    expect(de.query(By.css('.subscription-parameters > span'))).toBeTruthy();
  });

  it('should have subscription action info', () => {
    expect(de.query(By.css('.btn-outline-primary'))).toBeTruthy();
    expect(de.query(By.css('.btn-outline-danger'))).toBeTruthy();
  });

  it('should open modal when clicked edit button', () => {
    spyOn(modalService, 'open').and.callThrough();

    const editBtn = de.query(By.css('.btn-outline-primary')).nativeElement;
    editBtn.click();

    expect(modalService.open).toHaveBeenCalled();
  });

  it('should call delete function when clicked delete button', () => {
    spyOn(component, 'deleteSubscriptionPopup').and.callThrough();

    const deleteBtn = de.query(By.css('.btn-outline-danger')).nativeElement;
    deleteBtn.click();

    expect(component.deleteSubscriptionPopup).toHaveBeenCalled();
  });

});
