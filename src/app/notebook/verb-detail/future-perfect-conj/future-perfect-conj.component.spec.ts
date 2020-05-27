import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FuturePerfectConjComponent } from './future-perfect-conj.component';

describe('FuturePerfectConjComponent', () => {
  let component: FuturePerfectConjComponent;
  let fixture: ComponentFixture<FuturePerfectConjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuturePerfectConjComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FuturePerfectConjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
