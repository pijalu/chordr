import { TestBed, inject } from '@angular/core/testing';

import { ChordService } from './chord.service';

describe('ChordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChordService]
    });
  });

  it('should be created', inject([ChordService], (service: ChordService) => {
    expect(service).toBeTruthy();
  }));

  function existsIn<X>(iterable: Array<X>, x: X): boolean {
    for (const item of iterable){
      if (item === x) {
        return true;
      }
    }
    return false;
  }

  it('should return C within roots', inject([ChordService], (service: ChordService) => {
    expect(existsIn(service.Roots(), 'C')).toBeTruthy();
  }));

  it('should have major type for C roots', inject([ChordService], (service: ChordService) => {
    expect(existsIn(service.Types('C'), 'maj')).toBeTruthy();
  }));

  it('should have 7 variation for root maj', inject([ChordService], (service: ChordService) => {
    expect(service.VariationsCount('C', 'maj')).toEqual(7);
  }));
});
