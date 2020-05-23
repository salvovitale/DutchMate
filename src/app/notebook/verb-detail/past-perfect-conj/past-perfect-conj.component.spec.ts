import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PastPerfectConjComponent } from './past-perfect-conj.component';

describe('PastPerfectConjComponent', () => {
  let component: PastPerfectConjComponent;
  let fixture: ComponentFixture<PastPerfectConjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastPerfectConjComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PastPerfectConjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
