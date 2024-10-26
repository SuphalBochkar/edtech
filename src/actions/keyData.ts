import { data, tempData } from "@/lib/data";

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
