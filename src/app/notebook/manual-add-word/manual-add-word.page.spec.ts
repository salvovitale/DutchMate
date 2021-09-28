import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManualAddWordPage } from './manual-add-word.page';

describe('ManualAddWordPage', () => {
  let component: ManualAddWordPage;
  let fixture: ComponentFixture<ManualAddWordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualAddWordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManualAddWordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
