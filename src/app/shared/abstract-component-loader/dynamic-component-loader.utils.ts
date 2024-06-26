import { hasNoValue, hasValue, isNotEmpty } from '../empty.util';
import { ThemeConfig } from '../../../config/theme.model';
import { environment } from '../../../environments/environment';

export const DEFAULT_THEME = '*';

/**
 * A class used to compare two matches and their relevancy to determine which of the two gains priority over the other
 *
 * "level" represents the index of the first default value that was used to find the match with:
 * ViewMode being index 0, Context index 1 and theme index 2. Examples:
 * - If a default value was used for context, but not view-mode and theme, the "level" will be 1
 * - If a default value was used for view-mode and context, but not for theme, the "level" will be 0
 * - If no default value was used for any of the fields, the "level" will be 3
 *
 * "relevancy" represents the amount of values that didn't require a default value to fall back on. Examples:
 * - If a default value was used for theme, but not view-mode and context, the "relevancy" will be 2
 * - If a default value was used for view-mode and context, but not for theme, the "relevancy" will be 1
 * - If a default value was used for all fields, the "relevancy" will be 0
 * - If no default value was used for any of the fields, the "relevancy" will be 3
 *
 * To determine which of two MatchRelevancies is the most relevant, we compare "level" and "relevancy" in that order.
 * If any of the two is higher than the other, that match is most relevant. Examples:
 * - { level: 1, relevancy: 1 } is more relevant than { level: 0, relevancy: 2 }
 * - { level: 1, relevancy: 1 } is less relevant than { level: 1, relevancy: 2 }
 * - { level: 1, relevancy: 1 } is more relevant than { level: 1, relevancy: 0 }
 * - { level: 1, relevancy: 1 } is less relevant than { level: 2, relevancy: 0 }
 * - { level: 1, relevancy: 1 } is more relevant than null
 */
export class MatchRelevancy {
  constructor(public match: any,
              public level: number,
              public relevancy: number) {
  }

  isMoreRelevantThan(otherMatch: MatchRelevancy): boolean {
    if (hasNoValue(otherMatch)) {
      return true;
    }
    if (otherMatch.level > this.level) {
      return false;
    }
    return !(otherMatch.level === this.level && otherMatch.relevancy > this.relevancy);
  }

  isLessRelevantThan(otherMatch: MatchRelevancy): boolean {
    return !this.isMoreRelevantThan(otherMatch);
  }
}

/**
 * Find an object within a nested map, matching the provided keys as good as possible, falling back on defaults wherever
 * needed.
 *
 * Starting off with a Map, it loops over the provided keys, going deeper into the map until it finds a value
 * If at some point, no value is found, it'll attempt to use the default value for that index instead
 * If the default value exists, the index is stored in the "level"
 * If no default value exists, 1 is added to "relevancy"
 * See {@link MatchRelevancy} what these represent
 *
 * @param typeMap         a multidimensional map
 * @param keys            the keys of the multidimensional map to loop over. Each key represents a level within the map
 * @param defaults        the default values to use for each level, in case no value is found for the key at that index
 * @returns matchAndLevel a {@link MatchRelevancy} object containing the match and its level of relevancy
 */
export function getMatch(typeMap: Map<any, any>, keys: any[], defaults: any[]): MatchRelevancy {
  let currentMap = typeMap;
  let level = -1;
  let relevancy = 0;
  for (let i = 0; i < keys.length; i++) {
    // If we're currently checking the theme, resolve it first to take extended themes into account
    let currentMatch = defaults[i] === DEFAULT_THEME ? resolveTheme(currentMap, keys[i]) : currentMap.get(keys[i]);
    if (hasNoValue(currentMatch)) {
      currentMatch = currentMap.get(defaults[i]);
      if (level === -1) {
        level = i;
      }
    } else {
      relevancy++;
    }
    if (hasValue(currentMatch)) {
      if (currentMatch instanceof Map) {
        currentMap = currentMatch as Map<any, any>;
      } else {
        return new MatchRelevancy(currentMatch, level > -1 ? level : i + 1, relevancy);
      }
    } else {
      return null;
    }
  }
  return null;
}

/**
 * Searches for a ThemeConfig by its name;
 */
export const getThemeConfigFor = (themeName: string): ThemeConfig => {
  return environment.themes.find((theme: ThemeConfig) => theme.name === themeName);
};

/**
 * Find a match in the given map for the given theme name, taking theme extension into account
 *
 * @param contextMap A map of theme names to components
 * @param themeName The name of the theme to check
 * @param checkedThemeNames The list of theme names that are already checked
 */
export const resolveTheme = (contextMap: Map<any, any>, themeName: string, checkedThemeNames: string[] = []): any => {
  const match = contextMap.get(themeName);
  if (hasValue(match)) {
    return match;
  } else {
    const cfg: ThemeConfig = getThemeConfigFor(themeName);
    if (hasValue(cfg) && isNotEmpty(cfg.extends)) {
      const nextTheme: string = cfg.extends;
      const nextCheckedThemeNames: string[] = [...checkedThemeNames, themeName];
      if (checkedThemeNames.includes(nextTheme)) {
        throw new Error('Theme extension cycle detected: ' + [...nextCheckedThemeNames, nextTheme].join(' -> '));
      } else {
        return resolveTheme(contextMap, nextTheme, nextCheckedThemeNames);
      }
    }
  }
};
