import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';

import { ThemedSearchComponent } from '../../shared/search/themed-search.component';
import { AdminWorkflowPageComponent } from './admin-workflow-page.component';

describe('AdminSearchPageComponent', () => {
  let component: AdminWorkflowPageComponent;
  let fixture: ComponentFixture<AdminWorkflowPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AdminWorkflowPageComponent],
    })
      .overrideComponent(AdminWorkflowPageComponent, {
        remove: {
          imports: [
            ThemedSearchComponent,
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWorkflowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
