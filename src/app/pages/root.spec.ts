import { RootPageComponent } from './root';

import { prepare } from './page.spec';

import 'jest-extended';

import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

declare let lintelVSCodeAPI;

describe('RootPageComponent', () => {
  let component: RootPageComponent;
  let fixture: ComponentFixture<RootPageComponent>;

  beforeEach(() => {
    prepare();
    fixture = TestBed.createComponent(RootPageComponent);
    component = fixture.componentInstance;
  });

  test('editFile', () => {
    component.editFile('/home/mflorence99/lintel/package.json');
    expect(lintelVSCodeAPI.postMessage).toHaveBeenCalledWith({
      command: 'editFile',
      fileName: '/home/mflorence99/lintel/package.json'
    });
  });
});
