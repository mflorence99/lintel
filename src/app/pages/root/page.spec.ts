import '../../../assets/eslint-extensions.js';
import '../../../assets/eslint-files/unit-tests.js';
import '../../../assets/eslint-rules.js';
import '../../../assets/eslint-schema.js';
import '../../../assets/vscode-scripts.js';
import '../../../assets/vscode-startup.js';

import { BarrelModule } from '../../barrel';
import { ComponentsModule } from '../components/module';
import { DirectivesModule } from '../../directives/module';
import { NGXS_DATA_STORAGE_PLUGIN } from '@ngxs-labs/data/storage';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { PipesModule } from '../../pipes/module';
import { RootPageComponent } from './page';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { states } from '../../state/app';

declare let lintelVSCodeAPI;

describe('RootPageComponent', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        RootPageComponent
      ],
      imports: [
        BarrelModule,
        ComponentsModule,
        DirectivesModule,
        NgxsModule.forRoot(states),
        NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN]),
        PipesModule
      ]
    }).compileComponents();

    lintelVSCodeAPI = {
      getState: jest.fn(),
      postMessage: jest.fn(),
      setState: jest.fn(),
    };

  }));

  test('App is created', () => {
    const fixture = TestBed.createComponent(RootPageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test('editFile', () => {
    const fixture = TestBed.createComponent(RootPageComponent);
    const app = fixture.componentInstance;
    app.editFile('/home/mflorence99/lintel/package.json');
    const calls = lintelVSCodeAPI.postMessage.mock.calls;
    expect(calls.length).toBeGreaterThanOrEqual(1);
    const message = calls[calls.length - 1][0];
    expect(message).toEqual({
      command: 'editFile',
      fileName: '/home/mflorence99/lintel/package.json'
    });
  });

  test('scrollToTop', () => {
    const fixture = TestBed.createComponent(RootPageComponent);
    const app = fixture.componentInstance;
    document.body.innerHTML = '<div id="theScroller"></div>';
    const scrollTo: any = jest.fn(opts => opts);
    document.body.querySelector('#theScroller').scrollTo = scrollTo;
    app['host'] = { nativeElement: document.body };
    app.scrollToTop();
    const calls = scrollTo.mock.calls;
    expect(calls.length).toBeGreaterThanOrEqual(1);
    const options = calls[0][0];
    expect(options).toEqual({
      top: 0, 
      left: 0, 
      behavior: 'auto'
    });
  });

});
