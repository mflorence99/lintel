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
      ]
    }).compileComponents();

    let state: any;

    lintelVSCodeAPI = {
      getState: jest.fn(() => state),
      postMessage: jest.fn(message => message),
      setState: jest.fn(st => state = st),
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
    app.editFile('package.json');
    expect(lintelVSCodeAPI.postMessage.mock.calls.length).toBe(1);
    expect(lintelVSCodeAPI.postMessage.mock.calls[0][0]).toEqual({
      command: 'editFile',
      fileName: 'package.json'
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
    expect(scrollTo.mock.calls.length).toBe(1);
    expect(scrollTo.mock.calls[0][0]).toEqual({
      top: 0, 
      left: 0, 
      behavior: 'auto'
    });
  });

});
