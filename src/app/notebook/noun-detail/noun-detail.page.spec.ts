import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NounDetailPage } from './noun-detail.page';

describe('NounDetailPage', () => {
  let component: NounDetailPage;
  let fixture: ComponentFixture<NounDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NounDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NounDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
