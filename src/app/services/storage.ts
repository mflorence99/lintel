import { Injectable } from '@angular/core';

declare const lintelVSCodeAPI;

@Injectable({ providedIn: 'root' })
export class StorageService implements Storage {
  length = 0;

  // @see https://developer.mozilla.org/en-US/docs/Web/API/Storage

  clear(): void {
    lintelVSCodeAPI.setState({});
  }

  getItem(key: string): any {
    const state = lintelVSCodeAPI.getState() ?? {};
    return state[key];
  }

  key(n: number): string {
    const state = lintelVSCodeAPI.getState() ?? {};
    return Object.keys(state)[n];
  }

  removeItem(key: string): void {
    const state = lintelVSCodeAPI.getState() ?? {};
    delete state[key];
    lintelVSCodeAPI.setState(state);
  }

  setItem(key: string, val: any): void {
    const state = lintelVSCodeAPI.getState() ?? {};
    state[key] = val;
    lintelVSCodeAPI.setState(state);
  }
}
