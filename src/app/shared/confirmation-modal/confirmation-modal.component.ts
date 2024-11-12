import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DSpaceObject } from '../../core/shared/dspace-object.model';

@Component({
  selector: 'ds-confirmation-modal',
  templateUrl: 'confirmation-modal.component.html',
})
export class ConfirmationModalComponent implements OnDestroy {
  @Input() headerLabel: string;
  @Input() infoLabel: string;
  @Input() cancelLabel: string;
  @Input() confirmLabel: string;
  @Input() confirmIcon: string;
  /**
   * The brand color of the confirm button
   */
  @Input() brandColor = 'primary';

  @Input() dso: DSpaceObject;

  /**
   * An event fired when the cancel or confirm button is clicked, with respectively false or true
   */
  @Output()
  response = new EventEmitter<boolean>();

  /**
   * Keep track whether one of the buttons was directly pressed. Used to emit the {@link response} when the user clicks
   * outside the modal.
   */
  buttonPressed = false;

  constructor(protected activeModal: NgbActiveModal) {
  }

  ngOnDestroy(): void {
    if (!this.buttonPressed) {
      this.response.emit(false);
    }
  }

  /**
   * Confirm the action that led to the modal
   */
  confirmPressed() {
    this.buttonPressed = true;
    this.response.emit(true);
    this.close();
  }

  /**
   * Cancel the action that led to the modal and close modal
   */
  cancelPressed() {
    this.buttonPressed = true;
    this.response.emit(false);
    this.close();
  }

  /**
   * Close the modal
   */
  close() {
    this.activeModal.close();
  }
}
