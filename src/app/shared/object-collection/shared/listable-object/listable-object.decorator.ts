import { ViewMode } from '../../../../core/shared/view-mode.model';
import { Context } from '../../../../core/shared/context.model';
import { hasNoValue, hasValue } from '../../../empty.util';
import { GenericConstructor } from '../../../../core/shared/generic-constructor';
import { ListableObject } from '../listable-object.model';
import { ThemeConfig } from '../../../../../config/theme.model';
import { InjectionToken } from '@angular/core';
import {
  DEFAULT_THEME,
  getMatch,
  getThemeConfigFor,
  MatchRelevancy,
} from '../../../abstract-component-loader/dynamic-component-loader.utils';

export const DEFAULT_VIEW_MODE = ViewMode.ListElement;
export const DEFAULT_CONTEXT = Context.Any;

/**
 * Factory to allow us to inject getThemeConfigFor so we can mock it in tests
 */
export const GET_THEME_CONFIG_FOR_FACTORY = new InjectionToken<(str) => ThemeConfig>('getThemeConfigFor', {
  providedIn: 'root',
  factory: () => getThemeConfigFor
});

const map = new Map();

/**
 * Decorator used for rendering a listable object
 * @param objectType The object type or entity type the component represents
 * @param viewMode The view mode the component represents
 * @param context The optional context the component represents
 * @param theme The optional theme for the component
 */
export function listableObjectComponent(objectType: string | GenericConstructor<ListableObject>, viewMode: ViewMode, context: Context = DEFAULT_CONTEXT, theme = DEFAULT_THEME) {
  return function decorator(component: any) {
    if (hasNoValue(objectType)) {
      return;
    }
    if (hasNoValue(map.get(objectType))) {
      map.set(objectType, new Map());
    }
    if (hasNoValue(map.get(objectType).get(viewMode))) {
      map.get(objectType).set(viewMode, new Map());
    }
    if (hasNoValue(map.get(objectType).get(viewMode).get(context))) {
      map.get(objectType).get(viewMode).set(context, new Map());
    }
    map.get(objectType).get(viewMode).get(context).set(theme, component);
  };
}

/**
 * Getter to retrieve the matching listable object component
 *
 * Looping over the provided types, it'll attempt to find the best match depending on the {@link MatchRelevancy} returned by getMatch()
 * The most relevant match between types is kept and eventually returned
 *
 * @param types The types of which one should match the listable component
 * @param viewMode The view mode that should match the components
 * @param context The context that should match the components
 * @param theme The theme that should match the components
 */
export function getListableObjectComponent(types: (string | GenericConstructor<ListableObject>)[], viewMode: ViewMode, context: Context = DEFAULT_CONTEXT, theme: string = DEFAULT_THEME) {
  let currentBestMatch: MatchRelevancy = null;
  for (const type of types) {
    const typeMap = map.get(type);
    if (hasValue(typeMap)) {
      const match = getMatch(typeMap, [viewMode, context, theme], [DEFAULT_VIEW_MODE, DEFAULT_CONTEXT, DEFAULT_THEME]);
      if (hasNoValue(currentBestMatch) || currentBestMatch.isLessRelevantThan(match)) {
        currentBestMatch = match;
      }
    }
  }
  return hasValue(currentBestMatch) ? currentBestMatch.match : null;
}

