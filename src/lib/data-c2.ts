import { Course } from "./data";

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
    "1": "111111111111111111111111",
    "2": "111111111111111111111111",
    "3": "111111111111111111111111",
    "4": "111111111111111111111111",
    "5": "111111111111111111111111",
  },
  [Course.Course2Place]: {
    "1": "111111111111111111111111",
    "2": "111111111111111111111111",
    "3": "111111111111111111111111",
    "4": "111111111111111111111111",
    "5": "111111111111111111111111",
  },
  [Course.Course2V5]: {
    "1": "111111111111111111111111",
    "2": "111111111111111111111111",
    "3": "111111111111111111111111",
    "4": "111111111111111111111111",
    "5": "111111111111111111111111",
  },
};
