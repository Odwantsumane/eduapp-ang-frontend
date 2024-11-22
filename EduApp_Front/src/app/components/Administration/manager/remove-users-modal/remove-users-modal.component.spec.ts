import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveUsersModalComponent } from './remove-users-modal.component';

describe('RemoveUsersModalComponent', () => {
  let component: RemoveUsersModalComponent;
  let fixture: ComponentFixture<RemoveUsersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveUsersModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveUsersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
