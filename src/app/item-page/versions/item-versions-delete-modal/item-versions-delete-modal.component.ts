import {
  Component,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ds-item-versions-delete-modal',
  templateUrl: './item-versions-delete-modal.component.html',
  styleUrls: ['./item-versions-delete-modal.component.scss'],
  standalone: true,
  imports: [TranslateModule],
})
export class ItemVersionsDeleteModalComponent implements OnDestroy {
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

  versionNumber: number;

  constructor(
    protected activeModal: NgbActiveModal,
  ) {
  }

  ngOnDestroy(): void {
    if (!this.buttonPressed) {
      this.response.emit(false);
    }
  }

  onModalClose() {
    this.buttonPressed = true;
    this.response.emit(false);
    this.activeModal.dismiss();
  }

  onModalSubmit() {
    this.buttonPressed = true;
    this.response.emit(true);
    this.activeModal.close();
  }

}
