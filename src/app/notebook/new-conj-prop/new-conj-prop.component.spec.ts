import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewConjPropComponent } from './new-conj-prop.component';

describe('NewConjPropComponent', () => {
  let component: NewConjPropComponent;
  let fixture: ComponentFixture<NewConjPropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConjPropComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewConjPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
