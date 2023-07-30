import { Observable } from 'rxjs';
import { RemoteData } from '../../core/data/remote-data';
import { NoContent } from '../../core/shared/NoContent.model';
import { Subscription } from '../subscriptions/models/subscription.model';
import { createSuccessfulRemoteDataObject$ } from '../remote-data.utils';
import { PaginatedList } from '../../core/data/paginated-list.model';

export class SubscriptionsDataServiceStub {

  getSubscriptionsByPersonDSO(_ePerson: string, _uuid: string): Observable<RemoteData<PaginatedList<Subscription>>> {
    return createSuccessfulRemoteDataObject$({} as PaginatedList<Subscription>);
  }

  createSubscription(_subscription: Subscription, _ePerson: string, _uuid: string): Observable<RemoteData<Subscription>> {
    return createSuccessfulRemoteDataObject$({} as Subscription);
  }

  updateSubscription(_subscription: Subscription, _ePerson: string, _uuid: string): Observable<RemoteData<Subscription>> {
    return createSuccessfulRemoteDataObject$({} as Subscription);
  }

  deleteSubscription(_id: string): Observable<RemoteData<NoContent>> {
    return createSuccessfulRemoteDataObject$({});
  }

}
