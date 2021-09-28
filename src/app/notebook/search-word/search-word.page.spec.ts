import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchWordPage } from './search-word.page';

describe('SearchWordPage', () => {
  let component: SearchWordPage;
  let fixture: ComponentFixture<SearchWordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchWordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchWordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
