import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { ItemVersionsDeleteModalComponent } from './item-versions-delete-modal.component';

describe('ItemVersionsDeleteModalComponent', () => {
  let component: ItemVersionsDeleteModalComponent;
  let fixture: ComponentFixture<ItemVersionsDeleteModalComponent>;

  let modalStub: NgbActiveModal;

  beforeEach(async () => {
    modalStub = jasmine.createSpyObj('modalStub', ['close', 'dismiss']);

    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        ItemVersionsDeleteModalComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: NgbActiveModal, useValue: modalStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemVersionsDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should emit false on destroy when no button has been clicked', () => {
    spyOn(component.response, 'emit');

    component.ngOnDestroy();

    expect(component.response.emit).toHaveBeenCalledOnceWith(false);
  });

  describe('onModalClose', () => {
    beforeEach(() => {
      spyOn(component.response, 'emit');
      component.onModalClose();
    });

    it('should call the close method on the active modal', () => {
      expect(modalStub.dismiss).toHaveBeenCalled();
    });

    it('behaviour subject should emit false', () => {
      expect(component.response.emit).toHaveBeenCalledWith(false);
    });

    it('should not emit again on destroy', () => {
      component.ngOnDestroy();

      expect(component.response.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('onModalSubmit', () => {
    beforeEach(() => {
      spyOn(component.response, 'emit');
      component.onModalSubmit();
    });

    it('should call the close method on the active modal', () => {
      expect(modalStub.close).toHaveBeenCalled();
    });

    it('behaviour subject should emit true', () => {
      expect(component.response.emit).toHaveBeenCalledWith(true);
    });

    it('should not emit again on destroy', () => {
      component.ngOnDestroy();

      expect(component.response.emit).toHaveBeenCalledTimes(1);
    });
  });
});
