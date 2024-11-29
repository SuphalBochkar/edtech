"use client";

import { CodeSnippet } from "@/components/Courses/c2/CodeSnippet";
import React from "react";

export const codeSnippets = [
  {
    title: "Basic I/O and Arithmetic",
    code: `#include <iostream>
using namespace std;

int main() {
  int a;
  cin >> a;
  cout << (200 + 300) << endl;
  cout << (250 / 50) << endl;
  cout << (500 - 100) << endl;
  cout << (a * 50) << endl;
  return 0;
}`,
  },
  {
    title: "Complex Arithmetic Expression",
    code: `#include <iostream>
using namespace std;

int main() {
  int a;
  cin >> a;
  cout << ((((10 + 8) * 2) - 11) / a);
  return 0;
}`,
  },
  {
    title: "Variable Assignment",
    code: `#include <iostream>
using namespace std;

int main() {
  int a;
  cin >> a;
  int first = a;
  int second = first;
  cout << second << endl;
  return 0;
}`,
  },
  {
    title: "Miles Per Gallon Calculation",
    code: `#include <iostream>
using namespace std;

int main() {
  int G;
  cin >> G;
  int miles_driven = 100;
  int MPG = miles_driven / G;
  cout << MPG << endl;
  return 0;
}`,
  },
];

const Page = () => {
  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">C++ Code Snippets</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {codeSnippets.map((snippet, index) => (
          <CodeSnippet
            key={index}
            title={snippet.title}
            code={snippet.code}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
