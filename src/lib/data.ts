export enum Course {
  Course1Hitbulls = "C1001",
  Course1AE = "C1002",
  Course1Level = "C1003",
  Course2Perfect = "C2001",
  Course2V5 = "C2002",
  Course2Place = "C2003",
  Course2N2NCPP = "C2004",
  Course2N2NJAVA = "C2005",
  Course2N2NPYTHON = "C2006",
}

export const CourseIds: Record<string, Course> = {
  practice: Course.Course1AE,
  level: Course.Course1Level,
  n2ncpp: Course.Course2N2NCPP,
  n2njava: Course.Course2N2NJAVA,
  n2npython: Course.Course2N2NPYTHON,
  place: Course.Course2Place,
  v5: Course.Course2V5,
};

export const CourseNames: Record<Course, string> = {
  [Course.Course1Hitbulls]: "Hitbulls Combo",
  [Course.Course1AE]: "AE Practice Tests",
  [Course.Course1Level]: "Level Tests",
  [Course.Course2Perfect]: "Perfectice Combo",
  [Course.Course2V5]: "Cognitive V5",
  [Course.Course2Place]: "PlaceME CSE",
  [Course.Course2N2NCPP]: "N2N CPP MCQ & Coding",
  [Course.Course2N2NJAVA]: "N2N JAVA MCQ & Coding",
  [Course.Course2N2NPYTHON]: "N2N PYTHON MCQ & Coding",
};

export const CoursePrices: Record<Course, number> = {
  [Course.Course1AE]: 18,
  [Course.Course1Level]: 49,
  [Course.Course1Hitbulls]: 49,
  [Course.Course2Perfect]: 49,
  [Course.Course2V5]: 39,
  [Course.Course2Place]: 39,
  [Course.Course2N2NCPP]: 29,
  [Course.Course2N2NJAVA]: 29,
  [Course.Course2N2NPYTHON]: 29,
};
