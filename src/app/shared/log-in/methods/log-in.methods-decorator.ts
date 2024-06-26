import { AuthMethodType } from '../../../core/auth/models/auth.method-type';
import {
  DEFAULT_THEME,
  getMatch,
} from '../../abstract-component-loader/dynamic-component-loader.utils';
import { hasNoValue } from '../../empty.util';
import { LogInExternalProviderComponent } from './log-in-external-provider/log-in-external-provider.component';
import { LogInPasswordComponent } from './password/log-in-password.component';

export const DEFAULT_AUTH_METHOD_TYPE = AuthMethodType.Password;

export type AuthMethodTypeComponent =
  typeof LogInPasswordComponent |
  typeof LogInExternalProviderComponent;

export const AUTH_METHOD_FOR_DECORATOR_MAP = new Map<AuthMethodType, Map<string, AuthMethodTypeComponent>>([
  [AuthMethodType.Password, new Map([
    [DEFAULT_THEME, LogInPasswordComponent],
  ])],
  [AuthMethodType.Shibboleth, new Map([
    [DEFAULT_THEME, LogInExternalProviderComponent],
  ])],
  [AuthMethodType.Oidc, new Map([
    [DEFAULT_THEME, LogInExternalProviderComponent],
  ])],
  [AuthMethodType.Orcid, new Map([
    [DEFAULT_THEME, LogInExternalProviderComponent],
  ])],
]);

/**
 * @deprecated
 */
export function renderAuthMethodFor(authMethodType: AuthMethodType, theme = DEFAULT_THEME) {
  return function decorator(component: any) {
    if (hasNoValue(AUTH_METHOD_FOR_DECORATOR_MAP.get(authMethodType))) {
      AUTH_METHOD_FOR_DECORATOR_MAP.set(authMethodType, new Map());
    }
    AUTH_METHOD_FOR_DECORATOR_MAP.get(authMethodType).set(theme, component);
  };
}

export function rendersAuthMethodType(authMethodType: AuthMethodType, theme: string) {
  return getMatch(AUTH_METHOD_FOR_DECORATOR_MAP, [authMethodType, theme], [DEFAULT_AUTH_METHOD_TYPE, DEFAULT_THEME]).match;
}
