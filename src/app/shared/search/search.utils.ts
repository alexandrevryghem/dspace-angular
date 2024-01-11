import { FacetValue } from './models/facet-value.model';
import { SearchFilterConfig } from './models/search-filter-config.model';
import { isNotEmpty, hasValue } from '../empty.util';
import { FilterType } from './models/filter-type.model';

export const SEARCH_AUTHORITY_VALUE_SEPARATOR = '||';

/**
 * Get a facet's value by matching its parameter in the search href, this will include the operator of the facet value
 * If the {@link FacetValue} doesn't contain a search link, its raw value will be returned as a fallback
 * @param facetValue
 * @param searchFilterConfig
 */
export function getFacetValueForType(facetValue: FacetValue, searchFilterConfig: SearchFilterConfig): string {
  const regex = new RegExp(`[?|&]${escapeRegExp(searchFilterConfig.paramName)}=(${escapeRegExp(facetValue.value)}[^&]*)`, 'g');
  if (isNotEmpty(facetValue._links)) {
    const values = regex.exec(facetValue._links.search.href);
    if (isNotEmpty(values)) {
      return values[1];
    }
  }
  if (facetValue.authorityKey) {
    return addOperatorToFilterValue(facetValue.authorityKey, 'authority', facetValue);
  }

  return addOperatorToFilterValue(facetValue.value, 'equals', facetValue);
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
 * Strips raw value from a filter value when a display value is present and strips its operator
 * Warning: This expects the value to end with an operator, otherwise it might strip unwanted content
 *
 * @param value The filter value to parse
 */
export function getDisplayValueFromFilterValue(value: string): string {
  if (value.lastIndexOf(',') > -1) {
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
 * Add the operator to the value (when not already present) and the display value when it differs from the actual value
 *
 * @param value The value to update
 * @param operator The operator to add
 * @param facetValue Additional facet information used by the authority operator
 */
export function addOperatorToFilterValue(value: string, operator: string, facetValue?: FacetValue): string {
  if (hasValue(facetValue) && operator === FilterType.authority) {
    const displayName: string = isNotEmpty(facetValue.value) ? facetValue.value : facetValue.label;
    value = (isNotEmpty(displayName) && displayName !== value ? displayName + SEARCH_AUTHORITY_VALUE_SEPARATOR : '') + value;
  }
  if (!value.endsWith(`,${operator}`)) {
    return `${value},${operator}`;
  }
  return value;
}
