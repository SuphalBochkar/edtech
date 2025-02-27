import { Course } from "@/lib/data";
import { data, tempData } from "@/lib/data-c1";
import { testTypeData } from "@/lib/data-c2";

// c1

export function getLevelData(level: string) {
  return data[level] || null;
}

export function getTestData(level: string, type: string, testNumber: string) {
  return data[level]?.[type.toLowerCase()]?.[testNumber] || null;
}

export function getPracticeTests(level: string) {
  return tempData[level] || null;
}

export function getPracticeTestsData(practice: string, type: string) {
  return tempData[practice][type] || null;
}

// c2

export function getLevelTypeData(type: Course) {
  return testTypeData[type] || null;
}

export function getTypeTestId(
  testType: Course,
  type: "mcq" | "code",
  level: string
) {
  if (
    testTypeData[testType] &&
    testTypeData[testType][type] &&
    testTypeData[testType][type][level]
  ) {
    return testTypeData[testType][type][level];
  }
  return null;
}
