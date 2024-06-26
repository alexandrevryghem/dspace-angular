import { AuthMethodType } from '../../../core/auth/models/auth.method-type';
import { DEFAULT_THEME } from '../../object-collection/shared/listable-object/listable-object.decorator';
import { hasNoValue } from '../../empty.util';
import { getMatch } from '../../abstract-component-loader/dynamic-component-loader.utils';

export const DEFAULT_AUTH_METHOD_TYPE = AuthMethodType.Password;

const authMethodsMap = new Map();

export function renderAuthMethodFor(authMethodType: AuthMethodType, theme = DEFAULT_THEME) {
  return function decorator(component: any) {
    if (hasNoValue(authMethodsMap.get(authMethodType))) {
      authMethodsMap.set(authMethodType, new Map());
    }
    authMethodsMap.get(authMethodType).set(theme, component);
  };
}

export function rendersAuthMethodType(authMethodType: AuthMethodType, theme: string) {
  return getMatch(authMethodsMap, [authMethodType, theme], [DEFAULT_AUTH_METHOD_TYPE, DEFAULT_THEME]).match;
}
