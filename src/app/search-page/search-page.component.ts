import { Component } from '@angular/core';

import { ThemedSearchComponent } from '../shared/search/themed-search.component';

@Component({
  selector: 'ds-base-search-page',
  templateUrl: './search-page.component.html',
  standalone: true,
  imports: [ThemedSearchComponent],
})
/**
 * This component represents the whole search page
 * It renders search results depending on the current search options
 */
export class SearchPageComponent {
}
