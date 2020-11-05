import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTopListComponent } from './category-top-list.component';

describe('CategoryTopListComponent', () => {
  let component: CategoryTopListComponent;
  let fixture: ComponentFixture<CategoryTopListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTopListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
