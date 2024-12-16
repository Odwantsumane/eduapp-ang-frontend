import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellProductModalComponent } from './sell-product-modal.component';

describe('SellProductModalComponent', () => {
  let component: SellProductModalComponent;
  let fixture: ComponentFixture<SellProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellProductModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
