import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerbDetailPage } from './verb-detail.page';

describe('VerbDetailPage', () => {
  let component: VerbDetailPage;
  let fixture: ComponentFixture<VerbDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerbDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
