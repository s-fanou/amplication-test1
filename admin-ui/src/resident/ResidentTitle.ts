import { Resident as TResident } from "../api/resident/Resident";

export const RESIDENT_TITLE_FIELD = "firstName";

export const ResidentTitle = (record: TResident): string => {
  return record.firstName || record.id;
};
