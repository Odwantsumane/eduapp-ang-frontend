import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUsersModalComponent } from './update-users-modal.component';

describe('UpdateUsersModalComponent', () => {
  let component: UpdateUsersModalComponent;
  let fixture: ComponentFixture<UpdateUsersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUsersModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUsersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
