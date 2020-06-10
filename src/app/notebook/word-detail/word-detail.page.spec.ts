import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WordDetailPage } from './word-detail.page';

describe('WordDetailPage', () => {
  let component: WordDetailPage;
  let fixture: ComponentFixture<WordDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WordDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
