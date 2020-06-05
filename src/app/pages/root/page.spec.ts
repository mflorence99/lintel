import '../../../assets/eslint-files/unit-tests.js';
import '../../../assets/eslint-rules.js';
import '../../../assets/eslint-schema.js';

import { BarrelModule } from '../../barrel';
import { ComponentsModule } from '../components/module';
import { NGXS_DATA_STORAGE_PLUGIN } from '@ngxs-labs/data/storage';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { RootPageComponent } from './page';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { states } from '../../state/app';

describe('RootPageComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RootPageComponent
      ],
      imports: [
        BarrelModule,
        ComponentsModule,
        NgxsModule.forRoot(states),
        NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN]),
      ]
    }).compileComponents();

    window['lintelSearchParams'] = '?freshStart=true';
  }));

  test('App is created', () => {
    const fixture = TestBed.createComponent(RootPageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test('States are initialized', () => {
    const fixture = TestBed.createComponent(RootPageComponent);
    const app = fixture.componentInstance;
    expect(app.configs.snapshot['package.json']).toBeTruthy();
    expect(app.rules.snapshot[app.params.basePluginName]).toBeTruthy();
  });

});
