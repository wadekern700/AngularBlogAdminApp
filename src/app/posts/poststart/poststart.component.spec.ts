import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoststartComponent } from './poststart.component';

describe('PoststartComponent', () => {
  let component: PoststartComponent;
  let fixture: ComponentFixture<PoststartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoststartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoststartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
