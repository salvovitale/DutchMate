import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditVerbPage } from './edit-verb.page';

describe('EditVerbPage', () => {
  let component: EditVerbPage;
  let fixture: ComponentFixture<EditVerbPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVerbPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditVerbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
