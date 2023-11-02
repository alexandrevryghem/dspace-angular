import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LdnServicesService } from '../ldn-services-data/ldn-services-data.service';
import { notifyPatterns } from '../ldn-services-patterns/ldn-service-coar-patterns';
import { LDN_SERVICE } from '../ldn-services-model/ldn-service.resource-type';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { getFirstCompletedRemoteData } from '../../../core/shared/operators';
import { RemoteData } from '../../../core/data/remote-data';
import { LdnService } from '../ldn-services-model/ldn-services.model';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { PaginatedList } from '../../../core/data/paginated-list.model';
import { Itemfilter } from '../ldn-services-model/ldn-service-itemfilters';
import { Observable } from 'rxjs';
import { FindListOptions } from '../../../core/data/find-list-options.model';
import { PaginationComponentOptions } from '../../../shared/pagination/pagination-component-options.model';
import { LdnItemfiltersService } from '../ldn-services-data/ldn-itemfilters-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'ds-ldn-service-form',
    templateUrl: './ldn-service-form.component.html',
    styleUrls: ['./ldn-service-form.component.scss'],
    animations: [
        trigger('toggleAnimation', [
            state('true', style({})),
            state('false', style({})),
            transition('true <=> false', animate('300ms ease-in')),
        ]),
    ],
})
export class LdnServiceFormComponent implements OnInit {
    formModel: FormGroup;
    @ViewChild('confirmModal', {static: true}) confirmModal: TemplateRef<any>;
    @ViewChild('resetFormModal', {static: true}) resetFormModal: TemplateRef<any>;
    public inboundPatterns: object[] = notifyPatterns;
    public outboundPatterns: object[] = notifyPatterns;
    itemfiltersRD$: Observable<RemoteData<PaginatedList<Itemfilter>>>;
    config: FindListOptions = Object.assign(new FindListOptions(), {
        elementsPerPage: 20
    });
    pageConfig: PaginationComponentOptions = Object.assign(new PaginationComponentOptions(), {
        id: 'po',
        pageSize: 20
    });
    @Input() public name: string;
    @Input() public description: string;
    @Input() public url: string;
    @Input() public score: string;
    @Input() public ldnUrl: string;
    @Input() public inboundPattern: string;
    @Input() public outboundPattern: string;
    @Input() public constraint: string;
    @Input() public automatic: boolean;
    @Input() public headerKey: string;
    @Output() submitForm: EventEmitter<any> = new EventEmitter();
    @Output() cancelForm: EventEmitter<any> = new EventEmitter();
    private modalRef: any;
    hasInboundPattern: boolean;
    hasOutboundPattern: boolean;
    isScoreValid: boolean;

    constructor(
        private ldnServicesService: LdnServicesService,
        private ldnItemfiltersService: LdnItemfiltersService,
        private formBuilder: FormBuilder,
        private router: Router,
        private notificationsService: NotificationsService,
        private translateService: TranslateService,
        private cdRef: ChangeDetectorRef,
        protected modalService: NgbModal,
    ) {

        this.formModel = this.formBuilder.group({
            enabled: true,
            id: [''],
            name: ['', Validators.required],
            description: [''],
            url: ['', Validators.required],
            score: ['', [Validators.required, Validators.pattern('^0*(\.[0-9]+)?$|^1(\.0+)?$')]],
            ldnUrl: ['', Validators.required],
            inboundPattern: [''],
            outboundPattern: [''],
            constraintPattern: [''],
            notifyServiceInboundPatterns: this.formBuilder.array([this.createInboundPatternFormGroup()]),
            notifyServiceOutboundPatterns: this.formBuilder.array([this.createOutboundPatternFormGroup()]),
            type: LDN_SERVICE.value,
        });
    }

    ngOnInit(): void {
        this.setItemfilters();

    }

    setItemfilters() {
        this.itemfiltersRD$ = this.ldnItemfiltersService.findAll().pipe(
            getFirstCompletedRemoteData());
    }

    onSubmit() {
        this.openConfirmModal(this.confirmModal);
    }

    openConfirmModal(content) {
        this.modalRef = this.modalService.open(content);
    }

    openResetFormModal(content) {
        this.modalRef = this.modalService.open(content);
    }

    createService() {
        this.formModel.get('name').markAsTouched();
        this.formModel.get('score').markAsTouched();
        this.formModel.get('url').markAsTouched();
        this.formModel.get('ldnUrl').markAsTouched();
        this.formModel.get('notifyServiceInboundPatterns').markAsTouched();
        this.formModel.get('notifyServiceOutboundPatterns').markAsTouched();

        const name = this.formModel.get('name').value;
        const url = this.formModel.get('url').value;
        const score = this.formModel.get('score').value;
        const ldnUrl = this.formModel.get('ldnUrl').value;

        const hasInboundPattern = this.checkPatterns(this.formModel.get('notifyServiceInboundPatterns') as FormArray);
        const hasOutboundPattern = this.checkPatterns(this.formModel.get('notifyServiceOutboundPatterns') as FormArray);

        if (!name || !url || !ldnUrl || !score || (!hasInboundPattern && !hasOutboundPattern)) {
            console.log('qualcosa non va');
            this.closeModal();
            return;
        }

        this.formModel.value.notifyServiceInboundPatterns = this.formModel.value.notifyServiceInboundPatterns.filter((pattern: { pattern: string; }) => pattern.pattern !== '');
        this.formModel.value.notifyServiceOutboundPatterns = this.formModel.value.notifyServiceOutboundPatterns.filter((pattern: { pattern: string; }) => pattern.pattern !== '');

        const values = this.formModel.value;

        const ldnServiceData = this.ldnServicesService.create(values);

        ldnServiceData.pipe(
            getFirstCompletedRemoteData()
        ).subscribe((rd: RemoteData<LdnService>) => {
            if (rd.hasSucceeded) {
                this.notificationsService.success(this.translateService.get('ldn-service-notification.created.success.title'),
                this.translateService.get('ldn-service-notification.created.success.body'));
                this.sendBack();
                this.closeModal();
            } else {
                this.notificationsService.error(this.translateService.get('ldn-service-notification.created.failure.title'),
                this.translateService.get('ldn-service-notification.created.failure.body'));
                this.closeModal();
            }
        });
    }

    checkPatterns(formArray: FormArray): boolean {
        for (let i = 0; i < formArray.length; i++) {
            const pattern = formArray.at(i).get('pattern').value;
            if (pattern) {
                return true;
            }
        }
        return false;
    }


    resetFormAndLeave() {
        this.sendBack();
        this.closeModal();
    }

    closeModal() {
        this.modalRef.close();
        this.cdRef.detectChanges();
    }

    addInboundPattern() {
        const notifyServiceInboundPatternsArray = this.formModel.get('notifyServiceInboundPatterns') as FormArray;
        notifyServiceInboundPatternsArray.push(this.createInboundPatternFormGroup());
    }

    removeInboundPattern(index: number) {
        const notifyServiceInboundPatternsArray = this.formModel.get('notifyServiceInboundPatterns') as FormArray;
        notifyServiceInboundPatternsArray.removeAt(index);
    }

    addOutboundPattern() {
        const notifyServiceOutboundPatternsArray = this.formModel.get('notifyServiceOutboundPatterns') as FormArray;
        notifyServiceOutboundPatternsArray.push(this.createOutboundPatternFormGroup());
    }

    removeOutboundPattern(index: number) {
        const notifyServiceOutboundPatternsArray = this.formModel.get('notifyServiceOutboundPatterns') as FormArray;
        notifyServiceOutboundPatternsArray.removeAt(index);
    }

    toggleAutomatic(i: number) {
        const automaticControl = this.formModel.get(`notifyServiceInboundPatterns.${i}.automatic`);
        if (automaticControl) {
            automaticControl.setValue(!automaticControl.value);
        }
    }

    patternSelected(): boolean {
        for (let pattern of this.formModel.get('notifyServiceInboundPatterns').value) {
            if (pattern.pattern !== '') {
                return true;
            }
        }

        for (let pattern of this.formModel.get('notifyServiceOutboundPatterns').value) {
            if (pattern.pattern !== '') {
                return true;
            }
        }

        return false;
    }

    private sendBack() {
        this.router.navigateByUrl('admin/ldn/services');
    }


    private createOutboundPatternFormGroup(): FormGroup {
        return this.formBuilder.group({
            pattern: [''],
            constraint: [''],
        });
    }

    private createInboundPatternFormGroup(): FormGroup {
        return this.formBuilder.group({
            pattern: [''],
            constraint: [''],
            automatic: false
        });
    }


}
