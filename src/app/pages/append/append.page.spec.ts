import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppendPage } from './append.page';

describe('AppendPage', () => {
  let component: AppendPage;
  let fixture: ComponentFixture<AppendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppendPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
