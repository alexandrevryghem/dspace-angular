import { FacetValue } from './models/facet-value.model';
import { SearchFilterConfig } from './models/search-filter-config.model';
import { isNotEmpty } from '../empty.util';

export const SEARCH_AUTHORITY_VALUE_SEPARATOR = '||';

/**
 * Get a facet's value by matching its parameter in the search href, this will include the operator of the facet value
 * If the {@link FacetValue} doesn't contain a search link, its raw value will be returned as a fallback
 * @param facetValue
 * @param searchFilterConfig
 */
export function getFacetValueForType(facetValue: FacetValue, searchFilterConfig: SearchFilterConfig): string {
  const regex = new RegExp(`[?|&]${escapeRegExp(encodeURIComponent(searchFilterConfig.paramName))}=(${escapeRegExp(encodeURIComponent(facetValue.value))}[^&]*)`, 'g');
  if (isNotEmpty(facetValue._links)) {
    const values = regex.exec(facetValue._links.search.href);
    if (isNotEmpty(values)) {
      return decodeURIComponent(values[1]);
    }
  }
  let operator = 'equals';
  let value = facetValue.value;
  if (facetValue.authorityKey) {
    operator = 'authority';
    value = addDisplayValueToFilterValue(facetValue.authorityKey, facetValue.label);
  }

  return addOperatorToFilterValue(value, operator);
}

/**
 * Escape a string to be used in a JS regular expression
 *
 * @param input the string to escape
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/**
 * Strip the operator (equals, query or authority) from a filter value, and it strips the raw value from a filter value
 *
 * @param value The filter value to parse
 */
export function getDisplayValueFromFilterValue(value: string): string {
  if (value.match(new RegExp(`.+,(equals|query|authority)$`))) {
    value = value.substring(0, value.lastIndexOf(','));
  }
  if (value.indexOf(SEARCH_AUTHORITY_VALUE_SEPARATOR) > -1) {
    value = value.substring(0, value.indexOf(SEARCH_AUTHORITY_VALUE_SEPARATOR));
  }
  return value;
}

/**
 * Strips the display value from a filter value
 *
 * @param value The filter value to parse
 */
export function stripDisplayValueFromFilterValue(value: string): string {
  if (value.indexOf(SEARCH_AUTHORITY_VALUE_SEPARATOR) > -1) {
    value = value.substring(value.indexOf(SEARCH_AUTHORITY_VALUE_SEPARATOR) + SEARCH_AUTHORITY_VALUE_SEPARATOR.length);
  }
  return value;
}

/**
 * Add the operator to the value (when not already present)
 *
 * @param value The value to update
 * @param operator The operator to add
 */
export function addOperatorToFilterValue(value: string, operator: string): string {
  if (!value.match(new RegExp(`^.+,(equals|query|authority)$`))) {
    return `${value},${operator}`;
  }
  return value;
}

/**
 * Adds the display value when it differs from the actual value
 *
 * @param value The value to update
 * @param displayValue The fallback display value to add
 */
export function addDisplayValueToFilterValue(value: string, displayValue: string): string {
  if (isNotEmpty(displayValue) && displayValue !== value) {
    return displayValue + SEARCH_AUTHORITY_VALUE_SEPARATOR + value;
  }
  return value;
}
