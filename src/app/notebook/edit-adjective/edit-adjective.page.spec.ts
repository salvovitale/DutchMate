import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditAdjectivePage } from './edit-adjective.page';

describe('EditAdjectivePage', () => {
  let component: EditAdjectivePage;
  let fixture: ComponentFixture<EditAdjectivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdjectivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAdjectivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
