import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditNounPage } from './edit-noun.page';

describe('EditNounPage', () => {
  let component: EditNounPage;
  let fixture: ComponentFixture<EditNounPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNounPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditNounPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
