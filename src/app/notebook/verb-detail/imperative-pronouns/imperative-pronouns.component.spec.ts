import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImperativePronounsComponent } from './imperative-pronouns.component';

describe('ImperativePronounsComponent', () => {
  let component: ImperativePronounsComponent;
  let fixture: ComponentFixture<ImperativePronounsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImperativePronounsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImperativePronounsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
