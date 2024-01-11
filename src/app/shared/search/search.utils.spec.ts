import { FacetValue } from './models/facet-value.model';
import { SearchFilterConfig } from './models/search-filter-config.model';
import {
  addOperatorToFilterValue,
  escapeRegExp,
  getDisplayValueFromFilterValue,
  getFacetValueForType,
  SEARCH_AUTHORITY_VALUE_SEPARATOR,
  stripDisplayValueFromFilterValue,
} from './search.utils';
import { FilterType } from './models/filter-type.model';

describe('Search Utils', () => {
  describe('getFacetValueForType', () => {
    let facetValueWithSearchHref: FacetValue;
    let facetValueWithoutSearchHref: FacetValue;
    let searchFilterConfig: SearchFilterConfig;
    let facetValueWithSearchHrefAuthority: FacetValue;
    let facetValueWithSearchHrefAuthorityWithoutValue: FacetValue;

    beforeEach(() => {
      facetValueWithSearchHref = Object.assign(new FacetValue(), {
        value: 'Value with search href',
        _links: {
          search: {
            href: 'rest/api/search?f.otherFacet=Other facet value,operator&f.facetName=Value with search href,operator'
          }
        }
      });
      facetValueWithSearchHrefAuthority = Object.assign(new FacetValue(), {
        label: 'Label with search href',
        value: 'Value with search href',
        authorityKey: 'uuid',
      });
      facetValueWithSearchHrefAuthorityWithoutValue = Object.assign(new FacetValue(), {
        label: 'Label with search href',
        value: '',
        authorityKey: 'uuid',
      });
      facetValueWithoutSearchHref = Object.assign(new FacetValue(), {
        value: 'Value without search href'
      });
      searchFilterConfig = Object.assign(new SearchFilterConfig(), {
        name: 'facetName'
      });
    });

    it('should retrieve the correct value from the search href', () => {
      expect(getFacetValueForType(facetValueWithSearchHref, searchFilterConfig)).toEqual('Value with search href,operator');
    });

    it('should retrieve the value from the Facet when it is defined', () => {
      expect(getFacetValueForType(facetValueWithSearchHrefAuthority, searchFilterConfig)).toEqual('Value with search href||uuid,authority');
    });

    it('should retrieve the label from the Facet when no value is defined', () => {
      expect(getFacetValueForType(facetValueWithSearchHrefAuthorityWithoutValue, searchFilterConfig)).toEqual('Label with search href||uuid,authority');
    });

    it('should return the facet value with an equals operator by default', () => {
      expect(getFacetValueForType(facetValueWithoutSearchHref, searchFilterConfig)).toEqual('Value without search href,equals');
    });
  });

  describe('getDisplayValueFromFilterValue', () => {
    it('should strip the operator from the value', () => {
      expect(getDisplayValueFromFilterValue('value,operator')).toBe('value');
    });

    it('should strip the display value from the value', () => {
      expect(getDisplayValueFromFilterValue(`display${SEARCH_AUTHORITY_VALUE_SEPARATOR}raw`)).toBe('display');
    });
  });

  describe('stripDisplayValueFromFilterValue', () => {
    it('should remove the display value from the value', () => {
      expect(stripDisplayValueFromFilterValue(`display${SEARCH_AUTHORITY_VALUE_SEPARATOR}raw,authority`)).toBe('raw,authority');
    });
  });

  describe('addOperatorToFilterValue', () => {
    it('should add the operator to the value', () => {
      expect(addOperatorToFilterValue('value', 'operator')).toEqual('value,operator');
    });

    it('shouldn\'t add the operator to the value if it already contains the operator', () => {
      expect(addOperatorToFilterValue('value,operator', 'operator')).toEqual('value,operator');
    });

    it('should add the display value to the value for authority facets', () => {
      const facetValue: FacetValue = Object.assign(new FacetValue(), {
        label: 'display value',
        value: 'display value',
        authorityKey: '977e3a5b83a89f0ea6ae8671ae097f6b28bbf403'
      });
      expect(addOperatorToFilterValue('977e3a5b83a89f0ea6ae8671ae097f6b28bbf403', FilterType.authority, facetValue)).toEqual(`display value${SEARCH_AUTHORITY_VALUE_SEPARATOR}977e3a5b83a89f0ea6ae8671ae097f6b28bbf403,${FilterType.authority}`);
    });

    it('should not add the display value to the value if empty for authority facets', () => {
      const facetValue: FacetValue = Object.assign(new FacetValue(), {
        label: '',
        value: '977e3a5b83a89f0ea6ae8671ae097f6b28bbf403',
      });
      expect(addOperatorToFilterValue('977e3a5b83a89f0ea6ae8671ae097f6b28bbf403', FilterType.authority, facetValue)).toEqual(`977e3a5b83a89f0ea6ae8671ae097f6b28bbf403,${FilterType.authority}`);
    });
  });

  describe(`escapeRegExp`, () => {
    it(`should escape all occurrences of '.' in the input string`, () => {
      const input = `a.string.with.a.number.of.'.'s.in.it`;
      const expected = `a\\.string\\.with\\.a\\.number\\.of\\.'\\.'s\\.in\\.it`;
      expect(escapeRegExp(input)).toEqual(expected);
    });
    it(`should escape all occurrences of '*' in the input string`, () => {
      const input = `a*string*with*a*number*of*'*'s*in*it`;
      const expected = `a\\*string\\*with\\*a\\*number\\*of\\*'\\*'s\\*in\\*it`;
      expect(escapeRegExp(input)).toEqual(expected);
    });
    it(`should escape all occurrences of '+' in the input string`, () => {
      const input = `a+string+with+a+number+of+'+'s+in+it`;
      const expected = `a\\+string\\+with\\+a\\+number\\+of\\+'\\+'s\\+in\\+it`;
      expect(escapeRegExp(input)).toEqual(expected);
    });
    it(`should escape all occurrences of '-' in the input string`, () => {
      const input = `a-string-with-a-number-of-'-'s-in-it`;
      const expected = `a\\-string\\-with\\-a\\-number\\-of\\-'\\-'s\\-in\\-it`;
      expect(escapeRegExp(input)).toEqual(expected);
    });
    it(`should escape all occurrences of '?' in the input string`, () => {
      const input = `a?string?with?a?number?of?'?'s?in?it`;
      const expected = `a\\?string\\?with\\?a\\?number\\?of\\?'\\?'s\\?in\\?it`;
      expect(escapeRegExp(input)).toEqual(expected);
    });
    it(`should escape all occurrences of '^' in the input string`, () => {
      const input = `a^string^with^a^number^of^'^'s^in^it`;
      const expected = `a\\^string\\^with\\^a\\^number\\^of\\^'\\^'s\\^in\\^it`;
      expect(escapeRegExp(input)).toEqual(expected);
    });
    it(`should escape all occurrences of '$' in the input string`, () => {
      const input = `a$string$with$a$number$of$'$'s$in$it`;
      const expected = `a\\$string\\$with\\$a\\$number\\$of\\$'\\$'s\\$in\\$it`;
      expect(escapeRegExp(input)).toEqual(expected);
    });
    it(`should escape all occurrences of '{' in the input string`, () => {
      const input = `a{string{with{a{number{of{'{'s{in{it`;
      const expected = `a\\{string\\{with\\{a\\{number\\{of\\{'\\{'s\\{in\\{it`;
      expect(escapeRegExp(input)).toEqual(expected);
    });
    it(`should escape all occurrences of '}' in the input string`, () => {
      const input = `a}string}with}a}number}of}'}'s}in}it`;
      const expected = `a\\}string\\}with\\}a\\}number\\}of\\}'\\}'s\\}in\\}it`;
      expect(escapeRegExp(input)).toEqual(expected);
    });
    it(`should escape all occurrences of '(' in the input string`, () => {
      const input = `a(string(with(a(number(of('('s(in(it`;
      const expected = `a\\(string\\(with\\(a\\(number\\(of\\('\\('s\\(in\\(it`;
      expect(escapeRegExp(input)).toEqual(expected);
    });
    it(`should escape all occurrences of ')' in the input string`, () => {
      const input = `a)string)with)a)number)of)')'s)in)it`;
      const expected = `a\\)string\\)with\\)a\\)number\\)of\\)'\\)'s\\)in\\)it`;
      expect(escapeRegExp(input)).toEqual(expected);
    });
    it(`should escape all occurrences of '|' in the input string`, () => {
      const input = `a|string|with|a|number|of|'|'s|in|it`;
      const expected = `a\\|string\\|with\\|a\\|number\\|of\\|'\\|'s\\|in\\|it`;
      expect(escapeRegExp(input)).toEqual(expected);
    });
    it(`should escape all occurrences of '[' in the input string`, () => {
      const input = `a[string[with[a[number[of['['s[in[it`;
      const expected = `a\\[string\\[with\\[a\\[number\\[of\\['\\['s\\[in\\[it`;
      expect(escapeRegExp(input)).toEqual(expected);
    });
    it(`should escape all occurrences of ']' in the input string`, () => {
      const input = `a]string]with]a]number]of]']'s]in]it`;
      const expected = `a\\]string\\]with\\]a\\]number\\]of\\]'\\]'s\\]in\\]it`;
      expect(escapeRegExp(input)).toEqual(expected);
    });
    it(`should escape all occurrences of '\' in the input string`, () => {
      const input = `a\\string\\with\\a\\number\\of\\'\\'s\\in\\it`;
      const expected = `a\\\\string\\\\with\\\\a\\\\number\\\\of\\\\'\\\\'s\\\\in\\\\it`;
      expect(escapeRegExp(input)).toEqual(expected);
    });
  });
});
