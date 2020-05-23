import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConjComponent } from './conj.component';

describe('ConjComponent', () => {
  let component: ConjComponent;
  let fixture: ComponentFixture<ConjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConjComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
