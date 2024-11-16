export enum Course {
  Course1AE = "C1001",
  Course1Level = "C1002",
  Course2V5 = "C2001",
  Course2Place = "C2002",
  Course2N2NCPP = "C2003",
}

export const CourseIds: Record<string, Course> = {
  practice: Course.Course1AE,
  level: Course.Course1Level,
  n2ncpp: Course.Course2N2NCPP,
  place: Course.Course2Place,
  v5: Course.Course2V5,
};

export const CourseNames: Record<Course, string> = {
  [Course.Course1AE]: "AE Practice Tests",
  [Course.Course1Level]: "Level Tests",
  [Course.Course2V5]: "Cognitive V5",
  [Course.Course2Place]: "PlaceME CSE",
  [Course.Course2N2NCPP]: "N2N CPP",
};

export const CoursePrices: Record<Course, number> = {
  [Course.Course1AE]: 18,
  [Course.Course1Level]: 59,
  [Course.Course2V5]: 49,
  [Course.Course2Place]: 39,
  [Course.Course2N2NCPP]: 39,
};
