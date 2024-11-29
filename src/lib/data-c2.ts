import { Course } from "./data";
import { Status } from "./types";

export const testTypes: Array<{ name: Course; path: string }> = [
  { name: Course.Course2N2NCPP, path: "/n2ncpp" },
  { name: Course.Course2N2NJAVA, path: "/n2njava" },
  { name: Course.Course2Place, path: "/place" },
  { name: Course.Course2V5, path: "/v5" },
];

export type TestTypeData = {
  [key in Course]: {
    mcq: { [key: string]: Status };
    code?: { [key: string]: Status };
  };
};

export const testTypeData: Partial<TestTypeData> = {
  [Course.Course2N2NCPP]: {
    mcq: {
      // "1": Status.Updating,
      "2": Status.Updating,
      // "3": Status.Updating,
      // "4": Status.Updating,
      // "5": Status.Updating,
    },
    code: {
      // "1": Status.Updating,
      "2": Status.Updating,
      // "3": Status.Updating,
      // "4": Status.Updating,
      // "5": Status.Updating,
    },
  },
  [Course.Course2N2NJAVA]: {
    mcq: {
      // "1": Status.Updating,
      "2": Status.Updating,
      // "3": Status.Updating,
      // "4": Status.Updating,
      // "5": Status.Updating,
    },
    code: {
      // "1": Status.Updating,
      "2": Status.Updating,
      // "3": Status.Updating,
      // "4": Status.Updating,
      // "5": Status.Updating,
    },
  },
  [Course.Course2Place]: {
    mcq: {
      // "1": Status.Updating,
      "2": Status.Updating,
      // "3": Status.Updating,
      // "4": Status.Updating,
      // "5": Status.Updating,
    },
  },
  [Course.Course2V5]: {
    mcq: {
      // "1": Status.Updating,
      "2": Status.Updating,
      // "3": Status.Updating,
      // "4": Status.Updating,
      // "5": Status.Updating,
    },
  },
};
