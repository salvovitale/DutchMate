import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PresentConjComponent } from './present-conj.component';

describe('PresentConjComponent', () => {
  let component: PresentConjComponent;
  let fixture: ComponentFixture<PresentConjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentConjComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PresentConjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
