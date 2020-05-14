import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewNounComponent } from './new-noun.component';

describe('NewWordComponent', () => {
  let component: NewNounComponent;
  let fixture: ComponentFixture<NewNounComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNounComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewNounComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
