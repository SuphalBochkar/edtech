import { Status, tempTestData, TestData } from "@/lib/types";

export const aeTests = [
  //   { id: 1, name: "Test 1", type: "Aptitude & Verbal", date: "19/04/2024" },
  //   { id: 2, name: "Test 2", type: "Aptitude & Verbal", date: "20/04/2024" },
  //   {
  //     id: 3,
  //     name: "AE Practice Test (2026) 3",
  //     type: "Aptitude & Verbal",
  //     date: "19/04/2024",
  //   },
  {
    id: 4,
    name: "AE Practice Test (2026) 4",
    type: "Aptitude & Verbal",
    date: "26/04/2024",
  },
  //   {
  //     id: 5,
  //     name: "AE Practice Test (2026) 5",
  //     type: "Aptitude & Verbal",
  //     date: "-/-/2024",
  //   },
];

export const tempData: tempTestData = {
  //   "1": {
  //     "AE Analytical Practice Test 1 (2026)": "66d4131ff1bec501c0e348b1",
  //     "AE Verbal Practice Test 1 (2026)": "66d4148bf1bec501c0e348b6",
  //   },
  //   "2": {
  //     "AE Analytical Practice Test 2 (2026)": "66e5618e8f7a84fcbb0c0045",
  //     "AE Verbal Practice Test 2 (2026)": "66e562f242935e17190f2e6a",
  //   },
  //   "3": {
  //     "AE Analytical Practice Test 3 (2026)": "670057f68ed2eabc8a0d3384",
  //     "AE Verbal Practice Test 3 (2026)": "6702c577dde09469b5249c92",
  //   },
  //   "3": {
  //     analytical: "6713b94fbba9ac82bf84be8a",
  //     verbal: "6713bce84e5ee3e89d4dbee4",
  //   },
  "4": {
    analytical: "671dcee7c566b5e58242e99f",
    verbal: "671dd5017b4a2e1b689d30f9",
  },
  //   "5": {
  //     analytical: Status.Updating,
  //     verbal: Status.Updating,
  //   },
};

export const levelTests = [1, 2];

export const data: TestData = {
  "1": {
    aptitude: {
      "1": "66ab84054dd68a6f814b06d7",
      "2": Status.Updating,
      "3": Status.Updating,
      "4": Status.Updating,
      "5": Status.Updating,
    },
    programming: {
      "1": Status.Updating,
      "2": Status.Updating,
      "3": Status.Updating,
      "4": Status.Updating,
      "5": Status.Updating,
    },
  },
  //   "1": {
  //     aptitude: {
  //       "1": "66ab84054dd68a6f814b06d7",
  //       "2": "66ab84a94dd68a6f814b06ea",
  //       "3": "66ab84c44dd68a6f814b06ee",
  //       "4": "66ab85224dd68a6f814b06f4",
  //       "5": "66ab85634dd68a6f814b06f8",
  //     },
  //     programming: {
  //       "1": "66ab85854dd68a6f814b06fa",
  //       "2": "66ab86104dd68a6f814b06fe",
  //       "3": "66ab86554dd68a6f814b0702",
  //       "4": "66ab86f34dd68a6f814b0708",
  //       "5": "66ab87e24dd68a6f814b070c",
  //     },
  //   },
  //   "2": {
  //     aptitude: {
  //       "1": "66ab88334dd68a6f814b0710",
  //       "2": "66ab888d4dd68a6f814b0716",
  //       "3": "66ab891a4dd68a6f814b071c",
  //       "4": "66ab8d60e04467ed7475d137",
  //       "5": "66ab8e1214aaa9794f658041",
  //     },
  //     programming: {
  //       "1": "66ac7e0375f8f0f60e488760-66ddf91b1f4d66c1554135d9",
  //       "2": "66ac802575f8f0f60e488768-66ddfb8b1f4d66c1554135df",
  //       "3": "66ac84ae6bbf127536468a9f-66ddfd1ff50289be26dad64e",
  //       "4": "66ac87fc78ca1cf6044202c3-66ddfd5cf50289be26dad650",
  //       "5": "66ac89859045c37a41e17392-66ddfdd99ea4875622150361",
  //     },
  //   },
  //   "3": {
  //     aptitude: {
  //       "1": "66ac8d3d33ecd006ab359ed7",
  //       "2": "66ac94f5a0564bb445ed9f1b",
  //       "3": "66cce3426beabac6e2f958ca",
  //       "4": "66d31ccddb2801e99cada95c",
  //       "5": "66dd469dcc80a03015d78af5",
  //     },
  //     programming: {
  //       "1": "66bfb0f5c44dc209859b00ec-66df5fea1cf66d1871b06fa9",
  //       "2": "66c04ec09bc4b00bb23e1e66-66df60211cf66d1871b06fab",
  //       "3": "66c050621ea8cc0124018ea1-66df603c1cf66d1871b06fad",
  //       "4": "66c05235ce7f81fd696d4e0a-66df605e1cf66d1871b06faf",
  //       "5": "66c0ece55281c0d2cd1f4c18-66df60811cf66d1871b06fb1",
  //     },
  //   },
  //   "4": {
  //     aptitude: {
  //       "1": "66df62791cf66d1871b06fb8",
  //       "2": "66df629f1cf66d1871b06fbb",
  //       "3": "66df63031cf66d1871b06fbd",
  //       "4": "66df63211cf66d1871b06fbf",
  //       "5": "66e49270bcde801e67620f0d",
  //     },
  //     programming: {
  //       "1": "66d307609239ac8f467b7587",
  //       "2": "66d316e5e35839354bfc3ab3",
  //       "3": "66d31981a9980173a89cdfdb",
  //       "4": "66d31ad1a9980173a89cdfdf",
  //       "5": "66d37373aba63afe7aab0092",
  //     },
  //   },
};

export const unused: Status = Status.Other;
