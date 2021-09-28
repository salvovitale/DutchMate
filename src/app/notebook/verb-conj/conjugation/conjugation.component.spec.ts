import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConjugationComponent } from './conjugation.component';

describe('ConjugationComponent', () => {
  let component: ConjugationComponent;
  let fixture: ComponentFixture<ConjugationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConjugationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConjugationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
