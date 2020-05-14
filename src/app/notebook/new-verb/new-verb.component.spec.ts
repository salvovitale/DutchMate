import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewVerbComponent } from './new-verb.component';

describe('NewVerbComponent', () => {
  let component: NewVerbComponent;
  let fixture: ComponentFixture<NewVerbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVerbComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewVerbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
