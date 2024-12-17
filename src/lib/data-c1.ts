import { Status, tempTestData, TestData } from "@/lib/types";

export const aeTests = [
  //   { id: 1, name: "Test 1", type: "Aptitude & Verbal", date: "19/04/2024" },
  //   { id: 2, name: "Test 2", type: "Aptitude & Verbal", date: "20/04/2024" },
  {
    id: 1,
    name: "AE Practice Test (2026) 1",
    type: "Aptitude & Verbal",
    date: "31/08/2024",
  },
  {
    id: 2,
    name: "AE Practice Test (2026) 2",
    type: "Aptitude & Verbal",
    date: "14/09/2024",
  },
  {
    id: 3,
    name: "AE Practice Test (2026) 3",
    type: "Aptitude & Verbal",
    date: "19/10/2024",
  },
  {
    id: 4,
    name: "AE Practice Test (2026) 4",
    type: "Aptitude & Verbal",
    date: "26/10/2024",
  },
  {
    id: 5,
    name: "AE Practice Test (2026) 5",
    type: "Aptitude & Verbal",
    date: "16/11/2024",
  },
  {
    id: 6,
    name: "AE Practice Test (2026) 6",
    type: "Aptitude & Verbal",
    date: "23/11/2024",
  },
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
  "1": {
    analytical: "66d4131ff1bec501c0e348b1",
    verbal: "66d4148bf1bec501c0e348b6",
  },
  "2": {
    analytical: "66e5618e8f7a84fcbb0c0045",
    verbal: "66e562f242935e17190f2e6a",
  },
  "3": {
    analytical: "6713b94fbba9ac82bf84be8a",
    verbal: "6713bce84e5ee3e89d4dbee4",
  },
  "4": {
    analytical: "671dcee7c566b5e58242e99f",
    verbal: "671dd5017b4a2e1b689d30f9",
  },
  "5": {
    analytical: "5f6d2b9a2c7bfe8d1bfc5123",
    verbal: "645b7a2d4b55f87d7a19e3c1",
  },
  "6": {
    analytical: "63a1c15b9b0b5198d7d70db9",
    verbal: "63a1c1609b0b5198d7d70dba",
  },
};

export const levelTests = [1, 2];

export const data: TestData = {
  "1": {
    // aptitude: {
    //   "1": "66ab84054dd68a6f814b06d7",
    //   "2": "66ab84a94dd68a6f814b06ea",
    //   "3": "66ab84c44dd68a6f814b06ee",
    //   "4": "66ab85224dd68a6f814b06f4",
    //   "5": "66ab85634dd68a6f814b06f8",
    // },
    aptitude: {
      "1": "67378c04cb7cdd0298e25c59",
      "2": "67378cdbcb7cdd0298e25c5b",
      "3": "67378d01cb7cdd0298e25c5d",
      "4": "67378d20cb7cdd0298e25c5f",
      "5": "67378d44cb7cdd0298e25c61",
    },
    programming: {
      "1": "673096190a3479d85832d7e7-672a5b0ac06e0c4f2e315cd4-66ab85854dd68a6f814b06fa-672e47941e19b9bbd9cfceb3-672a7747c06e0c4f2e315cde",
      "2": "673096890a3479d85832d7e9-672a5dc0c06e0c4f2e315cd6-66ab86104dd68a6f814b06fe-672e47ad1e19b9bbd9cfceb5-672a78b0c06e0c4f2e315ce0",
      "3": "673096a00a3479d85832d7eb-672a6b44c06e0c4f2e315cd8-66ab86554dd68a6f814b0702-672e47da1e19b9bbd9cfceb7-672a7effc06e0c4f2e315ce2",
      "4": "673096b40a3479d85832d7ed-672a6f5dc06e0c4f2e315cda-66ab86f34dd68a6f814b0708-672e481c1e19b9bbd9cfceb9-672a806fc06e0c4f2e315ce4",
      "5": "673096c50a3479d85832d7ef-672a71cbc06e0c4f2e315cdc-66ab87e24dd68a6f814b070c-672e4ce41e19b9bbd9cfcebb-672a8a6bc06e0c4f2e315ce6",
    },
  },
  "2": {
    aptitude: {
      //   "1": "66ab88334dd68a6f814b0710",
      //   "2": Status.Updating,
      //   "3": Status.Updating,
      //   "4": Status.Updating,
      //   "5": Status.Updating,
      "1": "66ab88334dd68a6f814b0710",
      "2": "66ab888d4dd68a6f814b0716",
      "3": "66ab891a4dd68a6f814b071c",
      "4": "66ab8d60e04467ed7475d137",
      "5": "66ab8e1214aaa9794f658041",
    },
    programming: {
      //   "1": "66ddf91b1f4d66c1554135d9",
      //   "2": "66ddfb8b1f4d66c1554135df",
      //   "3": Status.Updating,
      //   "4": Status.Updating,
      //   "5": Status.Updating,
      "1": "6761327423a49e46d0dd8b16-66ac7e0375f8f0f60e488760-67615ace23a49e46d0dd8b20-66ddf91b1f4d66c1554135d9-6761bf6b23a49e46d0dd8b2a",
      "2": "6761332b23a49e46d0dd8b18-66ac802575f8f0f60e488768-6761b62723a49e46d0dd8b22-66ddfb8b1f4d66c1554135df-6761bfad23a49e46d0dd8b2c",
      "3": "6761334023a49e46d0dd8b1a-66ac84ae6bbf127536468a9f-6761b65823a49e46d0dd8b24-66ddfd1ff50289be26dad64e-6761bfb523a49e46d0dd8b2e",
      "4": "6761336723a49e46d0dd8b1c-66ac87fc78ca1cf6044202c3-6761b66023a49e46d0dd8b26-66ddfd5cf50289be26dad650-6761bfbf23a49e46d0dd8b30",
      "5": "6761338723a49e46d0dd8b1e-66ac89859045c37a41e17392-6761b66e23a49e46d0dd8b28-66ddfdd99ea4875622150361-6761bfcb23a49e46d0dd8b32",
    },
  },
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
