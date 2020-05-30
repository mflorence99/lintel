import { StateOperator } from '@ngxs/store';

/**
 * Common state operators
 *
 * @see https://medium.com/ngxs/ngxs-state-operators-8b339641b220
 */

export function updateItems(items: any[]): StateOperator<Readonly<any[]>> {
  return (state: any[]): Readonly<any[]> => {
    return [...items, ...state.slice(items.length)];
  };
  
}
