import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImperativeConjComponent } from './imperative-conj.component';

describe('ImperativeConjComponent', () => {
  let component: ImperativeConjComponent;
  let fixture: ComponentFixture<ImperativeConjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImperativeConjComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImperativeConjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
