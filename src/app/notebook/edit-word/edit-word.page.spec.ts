import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditWordPage } from './edit-word.page';

describe('EditWordPage', () => {
  let component: EditWordPage;
  let fixture: ComponentFixture<EditWordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditWordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
