import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerbConjComponent } from './verb-conj.component';

describe('VerbConjComponent', () => {
  let component: VerbConjComponent;
  let fixture: ComponentFixture<VerbConjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbConjComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerbConjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
