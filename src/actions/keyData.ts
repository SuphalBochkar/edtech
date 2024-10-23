import { data, tempData } from "@/lib/data";

export async function getLevelData(level: string) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return data[level] || null;
}

export async function getTestData(
  level: string,
  type: string,
  testNumber: string
) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return data[level]?.[type.toLowerCase()]?.[testNumber] || null;
}

export async function getPracticeTestsData() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return tempData;
}
