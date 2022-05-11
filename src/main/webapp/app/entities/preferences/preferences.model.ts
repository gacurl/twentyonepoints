import { IUser } from 'app/entities/user/user.model';
import { Units } from 'app/entities/enumerations/units.model';

export interface IPreferences {
  id?: number;
  weeklyGoal?: number | null;
  weightUnits?: Units;
  user?: IUser | null;
}

export class Preferences implements IPreferences {
  constructor(public id?: number, public weeklyGoal?: number | null, public weightUnits?: Units, public user?: IUser | null) {}
}

export function getPreferencesIdentifier(preferences: IPreferences): number | undefined {
  return preferences.id;
}
