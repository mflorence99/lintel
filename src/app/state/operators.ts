import { StateOperator } from '@ngxs/store';

import { assign } from '../comment-json';

/**
 * Common state operators
 *
 * @see https://medium.com/ngxs/ngxs-state-operators-8b339641b220
 */

export function updateItems(items: any[]): StateOperator<Readonly<any[]>> {
  return (state: any[]): Readonly<any[]> => {
    const remaining = state ? state.slice(items.length) : [];
    return [...items, ...remaining];
  };
}

export function safeAssign(source: any): StateOperator<Readonly<any>> {
  return (state: any): Readonly<any> => {
    return assign({ ...state }, source);
  };
}
