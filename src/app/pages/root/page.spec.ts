import '../../../assets/eslint-schema.js';
import '../../../assets/eslintrc-files.js';

import { BarrelModule } from '../../barrel';
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
        NgxsModule.forRoot(states),
        NgxsDataPluginModule.forRoot(),
      ]
    }).compileComponents();
  }));

  test('App is created', () => {
    const fixture = TestBed.createComponent(RootPageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test('Config and Schema states are initialized', () => {
    const fixture = TestBed.createComponent(RootPageComponent);
    const app = fixture.componentInstance;
    expect(app.configs.snapshot['package.json']).toBeTruthy();
    expect(app.schemas.snapshot['eslint']).toBeTruthy();
  });

  test('Filename can be selected', () => {
    const fixture = TestBed.createComponent(RootPageComponent);
    const app = fixture.componentInstance;
    app.select('x');
    expect(app.selection.fileName).toEqual('x');
  });

});
