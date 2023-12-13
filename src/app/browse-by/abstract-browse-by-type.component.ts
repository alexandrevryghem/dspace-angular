import { Component, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { BrowseByDataType } from './browse-by-switcher/browse-by-data-type';
import { Context } from '../core/shared/context.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { hasValue } from '../shared/empty.util';

@Component({
  selector: 'ds-abstract-browse-by-type',
  template: '',
})
export abstract class AbstractBrowseByTypeComponent implements OnChanges, OnDestroy {

  /**
   * The optional context
   */
  @Input() context: Context;

  /**
   * The {@link BrowseByDataType} of this Component
   */
  @Input() browseByType: BrowseByDataType;

  /**
   * The ID of the {@link Community} or {@link Collection} of the scope to display
   */
  @Input() scope: string;

  scope$: BehaviorSubject<string> = new BehaviorSubject(undefined);

  /**
   * List of subscriptions
   */
  subs: Subscription[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.scope$.next(this.scope);
  }

  ngOnDestroy(): void {
    this.subs.filter((sub: Subscription) => hasValue(sub)).forEach((sub: Subscription) => sub.unsubscribe());
  }

}
