import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let debugElement: DebugElement;

  const modalStub = jasmine.createSpyObj('modalStub', ['close']);

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ConfirmationModalComponent],
      providers: [
        { provide: NgbActiveModal, useValue: modalStub }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should emit false on destroy when no button has been clicked', () => {
    spyOn(component.response, 'emit');

    component.ngOnDestroy();

    expect(component.response.emit).toHaveBeenCalledOnceWith(false);
  });

  describe('close', () => {
    beforeEach(() => {
      component.close();
    });
    it('should call the close method on the active modal', () => {
      expect(modalStub.close).toHaveBeenCalled();
    });
  });

  describe('confirmPressed', () => {
    beforeEach(() => {
      spyOn(component.response, 'emit');
      component.confirmPressed();
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

  describe('cancelPressed', () => {
    beforeEach(() => {
      spyOn(component.response, 'emit');
      component.cancelPressed();
    });
    it('should call the close method on the active modal', () => {
      expect(modalStub.close).toHaveBeenCalled();
    });
    it('behaviour subject should emit false', () => {
      expect(component.response.emit).toHaveBeenCalledWith(false);
    });
    it('should not emit again on destroy', () => {
      component.ngOnDestroy();

      expect(component.response.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the click method emits on close button', () => {
    beforeEach(fakeAsync(() => {
      spyOn(component, 'close');
      debugElement.query(By.css('button.close')).triggerEventHandler('click', {
        preventDefault: () => {/**/
        }
      });
      tick();
      fixture.detectChanges();
    }));
    it('should call the close method on the component', () => {
      expect(component.close).toHaveBeenCalled();
    });
  });

  describe('when the click method emits on cancel button', () => {
    beforeEach(fakeAsync(() => {
      spyOn(component, 'close');
      spyOn(component.response, 'emit');
      debugElement.query(By.css('button.cancel')).triggerEventHandler('click', {
        preventDefault: () => {/**/
        }
      });
      tick();
      fixture.detectChanges();
    }));
    it('should call the close method on the component', () => {
      expect(component.close).toHaveBeenCalled();
    });
    it('behaviour subject should emit false', () => {
      expect(component.response.emit).toHaveBeenCalledWith(false);
    });
  });

  describe('when the click method emits on confirm button', () => {
    beforeEach(fakeAsync(() => {
      spyOn(component, 'close');
      spyOn(component.response, 'emit');
      debugElement.query(By.css('button.confirm')).triggerEventHandler('click', {
        preventDefault: () => {/**/
        }
      });
      tick();
      fixture.detectChanges();
    }));
    it('should call the close method on the component', () => {
      expect(component.close).toHaveBeenCalled();
    });
    it('behaviour subject should emit false', () => {
      expect(component.response.emit).toHaveBeenCalledWith(true);
    });
  });

});
