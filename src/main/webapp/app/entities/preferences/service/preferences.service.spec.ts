import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Units } from 'app/entities/enumerations/units.model';
import { IPreferences } from '../preferences.model';

import { PreferencesService } from './preferences.service';

describe('Preferences Service', () => {
  let service: PreferencesService;
  let httpMock: HttpTestingController;
  let elemDefault: IPreferences;
  let expectedResult: IPreferences | IPreferences[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PreferencesService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      weeklyGoal: 0,
      weightUnits: Units.KG,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should return a list of Preferences', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          weeklyGoal: 1,
          weightUnits: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    describe('addPreferencesToCollectionIfMissing', () => {
      it('should add a Preferences to an empty array', () => {
        const preferences: IPreferences = { id: 123 };
        expectedResult = service.addPreferencesToCollectionIfMissing([], preferences);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(preferences);
      });

      it('should not add a Preferences to an array that contains it', () => {
        const preferences: IPreferences = { id: 123 };
        const preferencesCollection: IPreferences[] = [
          {
            ...preferences,
          },
          { id: 456 },
        ];
        expectedResult = service.addPreferencesToCollectionIfMissing(preferencesCollection, preferences);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Preferences to an array that doesn't contain it", () => {
        const preferences: IPreferences = { id: 123 };
        const preferencesCollection: IPreferences[] = [{ id: 456 }];
        expectedResult = service.addPreferencesToCollectionIfMissing(preferencesCollection, preferences);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(preferences);
      });

      it('should add only unique Preferences to an array', () => {
        const preferencesArray: IPreferences[] = [{ id: 123 }, { id: 456 }, { id: 57467 }];
        const preferencesCollection: IPreferences[] = [{ id: 123 }];
        expectedResult = service.addPreferencesToCollectionIfMissing(preferencesCollection, ...preferencesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const preferences: IPreferences = { id: 123 };
        const preferences2: IPreferences = { id: 456 };
        expectedResult = service.addPreferencesToCollectionIfMissing([], preferences, preferences2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(preferences);
        expect(expectedResult).toContain(preferences2);
      });

      it('should accept null and undefined values', () => {
        const preferences: IPreferences = { id: 123 };
        expectedResult = service.addPreferencesToCollectionIfMissing([], null, preferences, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(preferences);
      });

      it('should return initial array if no Preferences is added', () => {
        const preferencesCollection: IPreferences[] = [{ id: 123 }];
        expectedResult = service.addPreferencesToCollectionIfMissing(preferencesCollection, undefined, null);
        expect(expectedResult).toEqual(preferencesCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
