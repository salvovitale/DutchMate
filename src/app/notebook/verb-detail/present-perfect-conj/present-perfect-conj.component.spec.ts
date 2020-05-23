import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PresentPerfectConjComponent } from './present-perfect-conj.component';

describe('PresentPerfectConjComponent', () => {
  let component: PresentPerfectConjComponent;
  let fixture: ComponentFixture<PresentPerfectConjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentPerfectConjComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PresentPerfectConjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
