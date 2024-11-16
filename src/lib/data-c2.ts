import { Course } from "./data";
import { Status } from "./types";

export const testTypes: Array<{ name: Course; path: string }> = [
  { name: Course.Course2N2NCPP, path: "/n2ncpp" },
  { name: Course.Course2Place, path: "/place" },
  { name: Course.Course2V5, path: "/v5" },
];

export type TestTypeData = {
  [key in Course]: { [key: string]: string };
};

export const testTypeData: Partial<TestTypeData> = {
  [Course.Course2N2NCPP]: {
    "1": Status.Updating,
    "2": Status.Updating,
    "3": Status.Updating,
    "4": Status.Updating,
    "5": Status.Updating,
  },
  [Course.Course2Place]: {
    "1": Status.Updating,
    "2": Status.Updating,
    "3": Status.Updating,
    "4": Status.Updating,
    "5": Status.Updating,
  },
  [Course.Course2V5]: {
    "1": Status.Updating,
    "2": Status.Updating,
    "3": Status.Updating,
    "4": Status.Updating,
    "5": Status.Updating,
  },
};
