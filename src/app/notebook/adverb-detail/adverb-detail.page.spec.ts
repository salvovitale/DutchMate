import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdverbDetailPage } from './adverb-detail.page';

describe('AdverbDetailPage', () => {
  let component: AdverbDetailPage;
  let fixture: ComponentFixture<AdverbDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdverbDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdverbDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
