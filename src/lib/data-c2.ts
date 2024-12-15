import { Course } from "./data";
import { TestItem, TestTypeData } from "./types";

export const testTypes: Array<{ name: Course; path: string }> = [
  { name: Course.Course2N2NCPP, path: "/n2ncpp" },
  { name: Course.Course2N2NJAVA, path: "/n2njava" },
  { name: Course.Course2N2NPYTHON, path: "/n2npython" },
  { name: Course.Course2Place, path: "/place" },
  { name: Course.Course2V5, path: "/v5" },
];

export const testTypeData: Partial<TestTypeData> = {
  [Course.Course2N2NCPP]: {
    mcq: {
      "1": "4c8d267fa9f6430b7e2b235f",
      "2": "2a9e746f9c7346bba9b18910",
      "3": "5b1c5e4d9372452d6032a75a",
    },
    code: {
      "1": "3f9a7f2d6b9832051c67456e",
      "2": "7d9b87e1d4c6241721b0535b",
      "3": "1b3c846f1e563792b4a0183a",
    },
  },
  [Course.Course2N2NJAVA]: {
    mcq: {
      "1": "4e9a2c7836d85abf92b31870",
      "2": "0d2e7f7b423c1b59867183b1",
      "3": "6c1a7d3f6b5f31a42d4732f5",
    },
    code: {
      "1": "6d7f544e2c7341a7a5f6203d",
      "2": "8f6c3b2f3a8e42334b5732c0",
      "3": "9a3f8b736f8641187e295fd8",
    },
  },
  [Course.Course2N2NPYTHON]: {
    mcq: {
      "1": "3f8b1d9f4c6a2d01370f7b5e",
      "2": "7e4c2f5a9b3f45a72984d1d0",
      "3": "9d0f7a4e8b27c391fd635b67",
    },
  },
  [Course.Course2Place]: {
    mcq: {
      "1": "1e6b845c4d325fa6b2f401b2",
      "2": "8c2f1a3b9e6d45b7c0a728d3",
      "3": "2a6c7b9d4e83b190f624cb4d",
      "4": "5e4d2b8f1a6c3f29237c8a0d",
    },
  },
  [Course.Course2V5]: {
    mcq: {
      "1": "9f1c6d7a5e7344b3a7289b52-6d3f5b72e9c452f0b18a3c5d-4c7e2b81d9a6345f7e3c1b0e-3b8f5a9d2e63720c9d74182f-7c5b3a8e6d1f4e2a93b6f0d7",
      "2": "6d3f5b72e9c452f0b18a3c5d",
      "3": "4c7e2b81d9a6345f7e3c1b0e",
      "4": "3b8f5a9d2e63720c9d74182f",
      "5": "7c5b3a8e6d1f4e2a93b6f0d7",
    },
  },
};

export const sampleTestData: TestItem = {
  Level: 1,
  testType: "Sample Test of Courses",
  levelData: [
    // MCQ C++
    {
      testNumber: 1,
      testId: "5df20d1880fc97b143b5fdb3",
      testTitle: "MCQ Test C/C++: Object Oriented Programming 2",
      attemptData: [
        {
          questionId: "5df20d1880fc9756c4b5fdc8",
          question:
            "<p>What can be passed as a non-type template parameter during compile time?</p>",
          correctOptionId: "5df20d1880fc97c46cb5fdca",
          options: [
            {
              optionId: "5df20d1880fc974e35b5fdcc",
              option: "<p>int</p>",
            },
            {
              optionId: "5df20d1880fc9723d1b5fdcb",
              option: "<p>float</p>",
            },
            {
              optionId: "5df20d1880fc97c46cb5fdca",
              option: "<p>constant expression</p>",
            },
            {
              optionId: "5df20d1880fc977d90b5fdc9",
              option: "<p>none of the mentioned</p>",
            },
          ],
        },
        {
          questionId: "5df20d1880fc973509b5fdcd",
          question: "<p>From where is the template class derived?</p>",
          correctOptionId: "5df20d1880fc9780d4b5fdcf",
          options: [
            {
              optionId: "5df20d1880fc9737d4b5fdd1",
              option: "<p>Regular non-templated C++ class</p>",
            },
            {
              optionId: "5df20d1880fc97c7b7b5fdd0",
              option: "<p>Templated class</p>",
            },
            {
              optionId: "5df20d1880fc9780d4b5fdcf",
              option:
                "<p>Regular non-templated C++ class or templated class</p>",
            },
            {
              optionId: "5df20d1880fc972c9cb5fdce",
              option: "<p>None of the mentioned</p>",
            },
          ],
        },
        {
          questionId: "5df20d1880fc974cfdb5fdd2",
          question: "<p>Which keyword can be used in template in C++?</p>",
          correctOptionId: "5df20d1880fc9756e0b5fdd4",
          options: [
            {
              optionId: "5df20d1880fc97e32bb5fdd6",
              option: "<p>class</p>",
            },
            {
              optionId: "5df20d1880fc97ea7eb5fdd5",
              option: "<p>typename</p>",
            },
            {
              optionId: "5df20d1880fc9756e0b5fdd4",
              option: "<p>both class &amp; typename</p>",
            },
            {
              optionId: "5df20d1880fc9745edb5fdd3",
              option: "<p>function</p>",
            },
          ],
        },
        {
          questionId: "5df20d1880fc977ad3b5fdc3",
          question: "<p>What is the syntax of friend function in C++?</p>",
          correctOptionId: "5df20d1880fc9748fcb5fdc7",
          options: [
            {
              optionId: "5df20d1880fc9748fcb5fdc7",
              option: "<p>friend datatype function_name ();</p>",
            },
            {
              optionId: "5df20d1880fc971f30b5fdc6",
              option: "<p>friend class()</p>",
            },
            {
              optionId: "5df20d1880fc97fafeb5fdc5",
              option: "<p> friend class1 class2()</p>",
            },
            {
              optionId: "5df20d1880fc9783fab5fdc4",
              option: "<p>none of the mentioned</p>",
            },
          ],
        },
        {
          questionId: "5df20d1880fc975ad7b5fe04",
          question:
            "<p>What is the output of following C++ program?</p>\n<p>#include&lt;iostream&gt;</p>\n<p>using namespace std;</p>\n<p>class Empty {};</p>\n<p>int main()</p>\n<p>{</p>\n<p>cout &lt;&lt; sizeof(Empty);</p>\n<p>return 0;</p>\n<p>}</p>",
          correctOptionId: "5df20d1880fc973f41b5fe08",
          options: [
            {
              optionId: "5df20d1880fc973f41b5fe08",
              option: "<p>A non-zero value</p>",
            },
            { optionId: "5df20d1880fc97c08bb5fe07", option: "<p>0</p>" },
            {
              optionId: "5df20d1880fc97b9e8b5fe06",
              option: "<p>Compiler Error</p>",
            },
            {
              optionId: "5df20d1880fc9721f2b5fe05",
              option: "<p>Runtime Error</p>",
            },
          ],
        },
        {
          questionId: "5df20d1880fc9727d3b5fdbe",
          question: "<p>In C++, runtime polymorphism is achieved by</p>",
          correctOptionId: "5df20d1880fc973b5ab5fdbf",
          options: [
            {
              optionId: "5df20d1880fc97badbb5fdc2",
              option: "<p>Operators</p>",
            },
            {
              optionId: "5df20d1880fc973742b5fdc1",
              option: "<p>Arrays</p>",
            },
            {
              optionId: "5df20d1880fc97bf23b5fdc0",
              option: "<p>Functions</p>",
            },
            {
              optionId: "5df20d1880fc973b5ab5fdbf",
              option: "<p>Virtual function</p>",
            },
          ],
        },
        {
          questionId: "5df20d1880fc974423b5fdeb",
          question:
            '<p>What will be the output of the following C++ program?</p>\n<p>#include&lt;iostream&gt;</p>\n<p>using namespace std;</p>\n<p>class X</p>\n<p>{</p>\n<p>public:</p>\n<p>int x;</p>\n<p>};</p>\n<p>int main()</p>\n<p>{</p>\n<p>X a = {10};</p>\n<p>X b = a;</p>\n<p>cout &lt;&lt; a.x &lt;&lt; " " &lt;&lt; b.x;</p>\n<p>return 0;</p>\n<p>}</p>',
          correctOptionId: "5df20d1880fc9737cdb5fded",
          options: [
            {
              optionId: "5df20d1880fc976ef9b5fdef",
              option: "<p>Compiler Error</p>",
            },
            {
              optionId: "5df20d1880fc9769beb5fdee",
              option: "<p>10 followed by Garbage Value</p>",
            },
            {
              optionId: "5df20d1880fc9737cdb5fded",
              option: "<p>10 10</p>",
            },
            {
              optionId: "5df20d1880fc97e791b5fdec",
              option: "<p>10 0</p>",
            },
          ],
        },
        {
          questionId: "5df20d1880fc973e10b5fe09",
          question:
            "<p>What is the output of this C++ program(If int size is 4 bytes)?</p>\n<p>#include&lt;iostream&gt;</p>\n<p>using namespace std;</p>\n<p>class base {</p>\n<p>int arr[10];</p>\n<p>};</p>\n<p>class b1: public base { };</p>\n<p>class b2: public base { };</p>\n<p>class derived: public b1, public b2 {};</p>\n<p>int main(void)</p>\n<p>{</p>\n<p>cout &lt;&lt; sizeof(derived);</p>\n<p>return 0;</p>\n<p>}</p>",
          correctOptionId: "5df20d1880fc973148b5fe0c",
          options: [
            { optionId: "5df20d1880fc97930bb5fe0d", option: "<p>40</p>" },
            { optionId: "5df20d1880fc973148b5fe0c", option: "<p>80</p>" },
            { optionId: "5df20d1880fc978bd5b5fe0b", option: "<p>0</p>" },
            { optionId: "5df20d1880fc972324b5fe0a", option: "<p>4</p>" },
          ],
        },
        {
          questionId: "5df20d1880fc979393b5fddc",
          question:
            '<p>What is the output of this C++ program?</p>\n<p>#include &lt;iostream&gt;</p>\n<p>using namespace std;</p>\n<p>class rect</p>\n<p>{</p>\n<p>int x, y;</p>\n<p>public:</p>\n<p>void val (int, int);</p>\n<p>int area ()</p>\n<p>{</p>\n<p>return (x * y);</p>\n<p>}</p>\n<p>};</p>\n<p>void rect::val (int a, int b)</p>\n<p>{</p>\n<p>x = a;</p>\n<p>y = b;</p>\n<p>}</p>\n<p>int main ()</p>\n<p>{</p>\n<p>rect rect;</p>\n<p>rect.val (3, 4);</p>\n<p>cout &lt;&lt; "rect area: " &lt;&lt; rect.area();</p>\n<p>return 0;</p>\n<p>}</p>',
          correctOptionId: "5df20d1880fc9783bbb5fddf",
          options: [
            {
              optionId: "5df20d1880fc974f86b5fde0",
              option: "<p>rect area: 7</p>",
            },
            {
              optionId: "5df20d1880fc9783bbb5fddf",
              option: "<p>rect area: 12</p>",
            },
            {
              optionId: "5df20d1880fc97869ab5fdde",
              option: "<p>rect area:24</p>",
            },
            {
              optionId: "5df20d1880fc973a51b5fddd",
              option: "<p>none of the mentioned</p>",
            },
          ],
        },
        {
          questionId: "5df20d1880fc977189b5fe13",
          question:
            "<p>What is the output of this C++ program?</p>\n<p>#include&lt;iostream&gt;</p>\n<p>using namespace std;</p>\n<p>class Base {};</p>\n<p>class Derived: public Base {};</p>\n<p>int main()</p>\n<p>{</p>\n<p>Base *bp = new Derived;</p>\n<p>Derived *dp = new Base;</p>\n<p>}</p>",
          correctOptionId: "5df20d1880fc9725a7b5fe15",
          options: [
            {
              optionId: "5df20d1880fc971c36b5fe17",
              option: "<p>No Compiler Error</p>",
            },
            {
              optionId: "5df20d1880fc9736edb5fe16",
              option: '<p>Compiler Error in line "Base *bp = new Derived;"</p>',
            },
            {
              optionId: "5df20d1880fc9725a7b5fe15",
              option:
                '<p>Compiler Error in line " Derived *dp = new Base;"</p>',
            },
            {
              optionId: "5df20d1880fc976f97b5fe14",
              option: "<p>Runtime Error</p>",
            },
          ],
        },
        {
          questionId: "5df20d1880fc97a7c5b5fdff",
          question:
            '<p>What is the output of this C++ program?</p>\n<p>#include &lt;iostream&gt;</p>\n<p>using namespace std;</p>\n<p>class sample</p>\n<p>{</p>\n<p>private:</p>\n<p>int var;</p>\n<p>public:</p>\n<p>void input()</p>\n<p>{</p>\n<p>cout &lt;&lt; var;</p>\n<p>}</p>\n<p>void output()</p>\n<p>{</p>\n<p>cout &lt;&lt; "Variable entered is ";</p>\n<p>cout &lt;&lt; var &lt;&lt; "\\n";</p>\n<p>}</p>\n<p>};</p>\n<p>int main()</p>\n<p>{</p>\n<p>sample object;</p>\n<p>object.input();</p>\n<p>object.output();</p>\n<p>object.var();</p>\n<p>return 0;</p>\n<p>}</p>',
          correctOptionId: "5df20d1880fc97be25b5fe01",
          options: [
            {
              optionId: "5df20d1880fc976bdab5fe03",
              option:
                '<p>Enter an integer 5</p>\n<p style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:\nnormal">Variable entered is 5</p>',
            },
            {
              optionId: "5df20d1880fc97eca6b5fe02",
              option: "<p>Runtime error</p>",
            },
            {
              optionId: "5df20d1880fc97be25b5fe01",
              option: "<p>Compilation error</p>",
            },
            {
              optionId: "5df20d1880fc970f07b5fe00",
              option: "<p>None of the mentioned</p>",
            },
          ],
        },
        {
          questionId: "5df20d1880fc979f34b5fdf0",
          question:
            '<p>What is the output of this C++ program(if size of int is 4 bytes)?</p>\n<p>#include&lt;iostream&gt;</p>\n<p>using namespace std;</p>\n<p>class Test</p>\n<p>{</p>\n<p>static int x;</p>\n<p>int *ptr;</p>\n<p>int y;</p>\n<p>}; </p>\n<p>int main()</p>\n<p>{</p>\n<p>Test t;</p>\n<p>cout &lt;&lt; sizeof(t) &lt;&lt; " ";</p>\n<p>cout &lt;&lt; sizeof(Test *);</p>\n<p>}</p>',
          correctOptionId: "5df20d1880fc9774b7b5fdf2",
          options: [
            {
              optionId: "5df20d1880fc9705f4b5fdf4",
              option: "<p>12 4</p>",
            },
            {
              optionId: "5df20d1880fc97195cb5fdf3",
              option: "<p>12 12</p>",
            },
            {
              optionId: "5df20d1880fc9774b7b5fdf2",
              option: "<p>8 4</p>",
            },
            { optionId: "5df20d1880fc974e2fb5fdf1", option: "<p>8 8</p>" },
          ],
        },
        {
          questionId: "5df20d1880fc971d78b5fe0e",
          question:
            '<p>What is the output of this C++ program?</p>\n<p>#include&lt;iostream&gt;</p>\n<p>using namespace std;</p>\n<p>class P {</p>\n<p>public:</p>\n<p>void print()  { cout &lt;&lt;"Inside P"; }</p>\n<p>}; </p>\n<p>class Q : public P {</p>\n<p>public:</p>\n<p>void print() { cout &lt;&lt;"Inside Q"; }</p>\n<p>};</p>\n<p>class R: public Q { };</p>\n<p>int main(void)</p>\n<p>{</p>\n<p>R r;</p>\n<p>r.print();</p>\n<p>return 0;</p>\n<p>}</p>',
          correctOptionId: "5df20d1880fc97030bb5fe11",
          options: [
            {
              optionId: "5df20d1880fc97f22db5fe12",
              option: "<p>Inside P</p>",
            },
            {
              optionId: "5df20d1880fc97030bb5fe11",
              option: "<p>Inside Q</p>",
            },
            {
              optionId: "5df20d1880fc9734f4b5fe10",
              option: "<p>Compiler Error: Ambiguous call to print()</p>",
            },
            {
              optionId: "5df20d1880fc97252eb5fe0f",
              option: "<p>No error</p>",
            },
          ],
        },
        {
          questionId: "5df20d1880fc97f4b7b5fdb9",
          question:
            "<p>When the inheritance is private, the private methods in base class are __________ in the derived class (in C++).</p>",
          correctOptionId: "5df20d1880fc979b02b5fdbd",
          options: [
            {
              optionId: "5df20d1880fc979b02b5fdbd",
              option: "<p>inaccessible</p>",
            },
            {
              optionId: "5df20d1880fc9729a7b5fdbc",
              option: "<p>accessible</p>",
            },
            {
              optionId: "5df20d1880fc97ebe1b5fdbb",
              option: "<p>protected</p>",
            },
            {
              optionId: "5df20d1880fc97014db5fdba",
              option: "<p>public</p>",
            },
          ],
        },
        {
          questionId: "5df20d1880fc975d9bb5fde6",
          question:
            "<p>What will be the output of this C++ program?</p>\n<p>#include &lt;iostream&gt;</p>\n<p>using namespace std;</p>\n<p>int i;</p>\n<p>class A</p>\n<p>{</p>\n<p>public:</p>\n<p>~A()</p>\n<p>{</p>\n<p>i=10;</p>\n<p>}</p>\n<p>};</p>\n<p>int foo()</p>\n<p>{</p>\n<p>i=3;</p>\n<p>A ob;</p>\n<p>return i;</p>\n<p>} </p>\n<p>int main()</p>\n<p>{</p>\n<p>cout &lt;&lt; foo() &lt;&lt; endl;</p>\n<p>return 0;</p>\n<p>}</p>",
          correctOptionId: "5df20d1880fc976af4b5fde9",
          options: [
            { optionId: "5df20d1880fc975261b5fdea", option: "<p>0</p>" },
            { optionId: "5df20d1880fc976af4b5fde9", option: "<p>3</p>" },
            { optionId: "5df20d1880fc979b97b5fde8", option: "<p>10</p>" },
            {
              optionId: "5df20d1880fc97b507b5fde7",
              option: "<p>None of the above</p>",
            },
          ],
        },
        {
          questionId: "5df20d1880fc979029b5fdf5",
          question:
            "<p>What is the output of the following C++ program?</p>\n<p>#include &lt;iostream&gt;</p>\n<p>using namespace std;</p>\n<p>class Box</p>\n<p>{</p>\n<p>public :</p>\n<p>double length;</p>\n<p>double breadth;</p>\n<p>double height;</p>\n<p>};</p>\n<p>int main( )</p>\n<p>{</p>\n<p>Box Box1;</p>\n<p>double volume;</p>\n<p>Box1.height = 5;</p>\n<p>Box1.length = 6;</p>\n<p>Box1.breadth = 7.1;</p>\n<p>volume = Box1.height * Box1.length * Box1.breadth;</p>\n<p>cout &lt;&lt;  volume &lt;&lt;endl;</p>\n<p>return 0;</p>\n<p>}</p>",
          correctOptionId: "5df20d1880fc9791bbb5fdf8",
          options: [
            {
              optionId: "5df20d1880fc9773deb5fdf9",
              option: "<p>210</p>",
            },
            {
              optionId: "5df20d1880fc9791bbb5fdf8",
              option: "<p>213</p>",
            },
            {
              optionId: "5df20d1880fc973522b5fdf7",
              option: "<p>215</p>",
            },
            { optionId: "5df20d1880fc974dcab5fdf6", option: "<p>217</p>" },
          ],
        },
        {
          questionId: "5df20d1880fc975080b5fdb4",
          question: "<p>At which time does the static_cast can be applied?</p>",
          correctOptionId: "5df20d1880fc97259cb5fdb8",
          options: [
            {
              optionId: "5df20d1880fc97259cb5fdb8",
              option: "<p>Compile-time construct</p>",
            },
            {
              optionId: "5df20d1880fc97127bb5fdb7",
              option: "<p>Runtime construct</p>",
            },
            {
              optionId: "5df20d1880fc976978b5fdb6",
              option: "<p>Both Compile-time &amp; Runtime construct</p>",
            },
            {
              optionId: "5df20d1880fc9760ddb5fdb5",
              option: "<p>None of the mentioned</p>",
            },
          ],
        },
        {
          questionId: "5df20d1880fc973e87b5fde1",
          question:
            '<p>What is the output of this C++ program?</p>\n<p>#include &lt;iostream&gt;</p>\n<p>using namespace std;</p>\n<p>class CDummy</p>\n<p>{</p>\n<p>public:</p>\n<p>int isitme (CDummy&amp; param);</p>\n<p>};</p>\n<p>int CDummy::isitme (CDummy&amp; param)</p>\n<p>{</p>\n<p>if (&amp;param == this)</p>\n<p>return true;</p>\n<p>else</p>\n<p>return false;</p>\n<p>}</p>\n<p>int main ()</p>\n<p>{</p>\n<p>CDummy a;</p>\n<p>CDummy *b = &amp;a;</p>\n<p>if (b-&gt;isitme(a))</p>\n<p>{</p>\n<p>cout &lt;&lt; "execute";</p>\n<p>}</p>\n<p>else</p>\n<p>{</p>\n<p>cout&lt;&lt;"not execute";</p>\n<p>}</p>\n<p>return 0;</p>\n<p>}</p>',
          correctOptionId: "5df20d1880fc9782bfb5fde5",
          options: [
            {
              optionId: "5df20d1880fc9782bfb5fde5",
              option: "<p>execute</p>",
            },
            {
              optionId: "5df20d1880fc97bfc3b5fde4",
              option: "<p>not execute</p>",
            },
            {
              optionId: "5df20d1880fc97520bb5fde3",
              option: "<p>none of the mentioned</p>",
            },
            {
              optionId: "5df20d1880fc9771ccb5fde2",
              option: "<p>both execute &amp; not execute</p>",
            },
          ],
        },
        {
          questionId: "5df20d1880fc97eb10b5fdfa",
          question:
            '<p>What is the output of this C++ program?</p>\n<p>#include &lt;iostream&gt;</p>\n<p>using namespace std;</p>\n<p>class Rect</p>\n<p>{</p>\n<p>int x, y;</p>\n<p>public:</p>\n<p>void set_values (int,int);</p>\n<p>int area ()</p>\n<p>{</p>\n<p>return (x * y);</p>\n<p>}</p>\n<p>};</p>\n<p>void Rect::set_values (int a, int b)</p>\n<p>{</p>\n<p>x = a;</p>\n<p>y = b;</p>\n<p>}</p>\n<p>int main ()</p>\n<p>{</p>\n<p>Rect recta, rectb;</p>\n<p>recta.set_values (5, 6);</p>\n<p>rectb.set_values (7, 6);</p>\n<p>cout &lt;&lt; "recta area: " &lt;&lt; recta.area();</p>\n<p>cout &lt;&lt; "rectb area: " &lt;&lt; rectb.area();</p>\n<p>return 0;</p>\n<p>}</p>',
          correctOptionId: "5df20d1880fc976cf9b5fdfe",
          options: [
            {
              optionId: "5df20d1880fc976cf9b5fdfe",
              option: "<p>recta area: 30rectb area: 42</p>",
            },
            {
              optionId: "5df20d1880fc975757b5fdfd",
              option: "<p>recta area: 20rectb area: 34</p>",
            },
            {
              optionId: "5df20d1880fc971909b5fdfc",
              option: "<p>recta area: 30rectb area: 21</p>",
            },
            {
              optionId: "5df20d1880fc97e780b5fdfb",
              option: "<p>none of the mentioned</p>",
            },
          ],
        },
        {
          questionId: "5df20d1880fc97d0fbb5fdd7",
          question:
            "<p>What is the output of this C++ program?</p>\n<p>#include &lt;iostream&gt;</p>\n<p>using namespace std;</p>\n<p>namespace Box1</p>\n<p>{</p>\n<p>int a = 4;</p>\n<p>}</p>\n<p>namespace Box2</p>\n<p>{</p>\n<p>int a = 13;</p>\n<p>}</p>\n<p>int main ()</p>\n<p>{</p>\n<p>int a = 16;</p>\n<p>Box1::a;</p>\n<p>Box2::a;</p>\n<p>cout &lt;&lt; a;</p>\n<p>return 0;</p>\n<p>}</p>",
          correctOptionId: "5df20d1880fc97d3beb5fdd9",
          options: [
            { optionId: "5df20d1880fc971ab3b5fddb", option: "<p>4</p>" },
            { optionId: "5df20d1880fc975fd6b5fdda", option: "<p>13</p>" },
            { optionId: "5df20d1880fc97d3beb5fdd9", option: "<p>16</p>" },
            {
              optionId: "5df20d1880fc97be0bb5fdd8",
              option: "<p>compile time error</p>",
            },
          ],
        },
      ],
    },

    // CODE Java
    {
      testNumber: 2,
      testId: "5c175923d105b8cc8f678390",
      testTitle: "Coding JAVA Practice: Conditions (Medium)",
      attemptData: [
        {
          questionType: "code",
          questionId: "5bd73f4c1206374806e9d82b",
          question:
            "<p>Write a program to check if an entered number is a power of 2 or not and print 'Yes' , if entered number is power of 2 otherwise print 'No'.</p>\n",
          correctCode:
            'import java.util.*;\nclass FindPowerofTwo\n{ \n  static boolean checkPowerofTwo(int num) \n  { \n    return (int)(Math.ceil((Math.log(num) / Math.log(2)))) == \n      (int)(Math.floor(((Math.log(num) / Math.log(2))))); \n  } \n  public static void main(String[] args) \n  { \n    Scanner sc= new Scanner(System.in);\n    int num=sc.nextInt();\n    if(checkPowerofTwo(num)) \n      System.out.println("Yes"); \n    else\n      System.out.println("No"); \t\n  } \n}\n',
        },
        {
          questionType: "code",
          questionId: "5bd7408312063776b8e9d83d",
          question:
            "<p>Write a program to count and print the number of set bits in entered number where set of bits are the count of 1's in binary representation of an entered integer?</p>\n<p>For example, input number is 10(=1010 in binary)  and 1010 has two count of 1 so output is 2.</p>\n",
          correctCode:
            "import java.io.*; \nimport java.util.*;\nclass SetBits { \t\n\tpublic static int countSetBits(int num) { \t\t\n\t\tif (num == 0) \n\t\t\treturn 0; \t\n\t\telse\t\n\t\t\treturn (num & 1) + countSetBits(num >> 1); \n\t} \t\n\tpublic static void main(String[] args) { \t\t\n\t    Scanner sc= new Scanner(System.in);\n        int num=sc.nextInt();\t\n\t\tSystem.out.println(countSetBits(num)); \n\t} \n}\n",
        },
        {
          questionType: "code",
          questionId: "5bafb30b52f89bbf3b70ec41",
          question:
            '<p>Write a program to check whether a number N is good number or not. If the number is a good number, print "Yes",  otherwise print "No".</p>\n<p>If the binary representation of a number does not contain any consecutive 1s, then it is called good number. For example: Decimal number 17 is 10001 in binary, so it is a good number.</p>\n',
          correctCode:
            'import java.util.*;\n\nclass GoodNum \n{\t\n  static boolean checkgoodnumber(int num) \n  {\n    int prev_last = 0;\t\t\n    while (num != 0) \n    {\t\t\n      if ((num & 1) != 0 && prev_last != 0)\t\t\t\n        return false;\t\t\n      prev_last = num & 1;\t\t\n      num >>= 1;\n    }\t\n    return true;\n  }\n  public static void main(String[] args)\n  {\n    Scanner scanner = new Scanner(System.in);\n    int num=scanner.nextInt();\n    if (checkgoodnumber(num) == true)\n      System.out.println("Yes");\n    else\n      System.out.println("No");\n  }\n}',
        },
        {
          questionType: "code",
          questionId: "5bafcde552f89b7cb670eca8",
          question:
            "<p>Write a  program to find and print the power of an entered number other than 0.</p>\n",
          correctCode:
            "import java.io.*;\nimport java.util.*;\nclass powerofnum {\n  static int pow(int base, int expo)\n\t{\n    if(expo == 0)\n        return 1;\n    else if(expo > 0)\n        return base * pow(base, expo - 1);\n    else\n        return 1 / pow(base, -expo);\n\t}\n    public static void main(String[] args){\n    int base,expo,power;\n    Scanner in = new Scanner(System.in);\n    base = in.nextInt();\n    expo = in.nextInt();\n    power = pow(base, expo); \n    System.out.println(power);\n    }\n}\n      ",
        },
        {
          questionType: "code",
          questionId: "5bafcfde52f89bab1970ecce",
          question:
            '<p>Write a program to check entered number is odd or even and print "Odd" if the number is odd and "Even" if the number is even.</p>\n',
          correctCode:
            'import java.util.*;\nclass CheckEvenOddNum \n{\n    public static void main(String args[]) \n    {\n       Scanner sc = new Scanner(System.in);\n       int num;\n       num = sc.nextInt();\n       if(num % 2 == 0)\n            System.out.println("Even");\n       else\n            System.out.println("Odd");\n\n    }\n}',
        },
        {
          questionType: "code",
          questionId: "5bafcfde52f89b889970ecd3",
          question:
            '<p><span style="font-size:11pt"><span style="line-height:107%"><span style="font-family:Calibri,sans-serif">Write a program to find and print the largest number among entered three unique numbers?</span></span></span></p>\n',
          correctCode:
            "import java.util.*;\nclass Largestnum {\n    public static void main(String args[]) {\n       Scanner sc = new Scanner(System.in);\n       int n1,n2,n3;\n       n1 = sc.nextInt();\n       n2 = sc.nextInt();\n       n3 = sc.nextInt();\n       int m = Math.max(n1,n2);\n       int res = Math.max(m,n3);\n       System.out.println(res);\n    }\n}",
        },
      ],
    },

    // CODE C++
    {
      testNumber: 3,
      testId: "5c01813cab9c275c04a52768",
      testTitle: "Coding Learn C/C++: Classes and Objects",
      attemptData: [
        {
          questionType: "mcq",
          questionId: "5c01813cab9c274bb5a52769",
          question:
            '<p>In a procedural programming language like C, the entire code is written into one long procedure even though it might contain functions and subroutines. It is not manageable as both data and logic get mixed together. But when we talk about object-oriented programming, the program is split into self-contained objects or several mini-programs.</p>\n<p><meta charset="utf-8"/></p>\n<p dir="ltr">When working on complex programs in particular, objects are a way of organizing code in a program and breaking things down to make it easier to think about complex ideas. Object-oriented programming makes your code more readable, which in turn makes it more maintainable.</p>\n<p>C++ is an object-oriented programming language. One of the most important concepts in object-oriented programming is the distinction between classes and objects, which are defined as follows:</p>\n<p>Class --&gt; A blueprint created by a programmer for an object. This defines a set of properties that will characterize any object. We can think of class as a way to classify objects into groups.</p>\n<p dir="ltr">Object --&gt; An instance of a class. This is the realized version of the class, where the class is manifested in the program.</p>\n<p>For example: let’s think of humans as a class which posses a set of properties like name age etc. then we all are different instances that are objects of the class human with different properties like name and age.</p>\n<p>Question: _____ represents an entity in the real world with its identity and behaviour.</p>\n',
          correctOptionId: "5c01813cab9c2703e6a5276c",
          options: [
            {
              optionId: "5c01813cab9c2727fca5276d",
              option: "<p>A method</p>\n",
            },
            {
              optionId: "5c01813cab9c2703e6a5276c",
              option: '<p dir="ltr">An object</p>\n',
            },
            {
              optionId: "5c01813cab9c2713c4a5276b",
              option: "<p>A class</p>\n",
            },
            {
              optionId: "5c01813cab9c279d27a5276a",
              option: "<p>An operator</p>\n",
            },
          ],
        },
        {
          questionType: "code",
          questionId: "5c01813cab9c27646ca5276f",
          question:
            '<p><u><strong>Methods and Attributes</strong></u></p>\n<p><span style="font-family:Courier New,Courier,monospace;">#include &lt;iostream&gt;</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;">using namespace std;</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;">class Lion{</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;">public:<br/>\n    void walk(){<br/>\n        print("Lion is walking");</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;">}</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;">    void roar(){<br/>\n        print("Lion is roaring");</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;">}</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;">int main()</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;">{</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;">Lion jake;</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;">}</span><br/>\n<span style="font-family:Arial,Helvetica,sans-serif;">In this example, we initialized the object jake as an instance of the class Lion. We have defined access as public so it can be accessed from outside the class.</span></p>\n<p><span style="font-family:Arial,Helvetica,sans-serif;">Let’s use the two methods with the Lion object jake:</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;">Lion jake;<br/>\njake.walk();<br/>\njake.roar();</span><br/>\n<span style="font-family:Arial,Helvetica,sans-serif;">And the output would be like,</span><br/>\n<span style="font-family:Courier New,Courier,monospace;">Lion is walking<br/>\nLion is roaring</span></p>\n<p><span style="font-family:Arial,Helvetica,sans-serif;">The class Lion using the two methods, walk() and roar(). We called these using the dot operator (.) which is used to reference an attribute of the object. In this case, the attribute is a method and it’s called with parentheses.</span></p>\n<p> </p>\n<p><span style="font-family:Arial,Helvetica,sans-serif;"><strong>Question</strong>: Define a class Computer with two methods system_in() and system_out(). The method system_in() should ask for the user\'s first name as input and system_out() should display the string “Thank you ______” (User\'s name in place of blank)<br/>\nCreate an instance of the class and call the methods.</span></p>\n',
          correctCode:
            '#include <iostream>\nusing namespace std;\nclass Computer\n{\n  public:\n  string name;\n  void system_in()\n  {\n    cin>>name;\n  }\n  void system_out()\n  {\n    cout<<"Thank you "<<name;\n  }\n};\nint main()\n{\n  Computer sys1;\n  sys1.system_in();\n  sys1.system_out();\n  return 0;\n}',
        },
        {
          questionType: "code",
          questionId: "5c01813cab9c273c17a52774",
          question:
            '<p><u><strong>Constructor</strong></u></p>\n<p>The constructor is a member function used to initialize data. It is run as soon as an object of a class is  created. It is defined using the same name as of class.</p>\n<p><strong>There is no return type of constructor not even void.</strong></p>\n<p>For example:<br/>\n<span style="font-family:Courier New,Courier,monospace;">class Lion{<br/>\n      Lion(){<br/>\n             cout&lt;&lt;"This is the constructor method."&lt;&lt;endl;</span><br/>\n<span style="font-family:Courier New,Courier,monospace;">          }<br/>\n };</span></p>\n<p>If you added the above constructor to the Lion class in the previous example, the program would execute the print statement inside the constructor method, whenever you create a new object.</p>\n<p> </p>\n<p>Let’s create a constructor that passes parameters to assign variables to object.</p>\n<p><span style="font-family:Courier New,Courier,monospace;">#include &lt;iostream&gt;</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;">using namespace std;</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;">class Student{</span></p>\n<p><br/>\n<span style="font-family:Courier New,Courier,monospace;">public:<br/>\nstring first_name,last_name;<br/>\nint roll_no;</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;">//constructor<br/>\n Student(string first, string last, int roll){<br/>\n first_name = first;<br/>\n last_name = last;<br/>\nroll_no = roll;<br/>\n}</span></p>\n<p><br/>\n<span style="font-family:Courier New,Courier,monospace;">void exam(){<br/>\n cout&lt;&lt;"Exam registration number is: "&lt;&lt;"2018"&lt;&lt;first_name&lt;&lt;last_name&lt;&lt;endl;<br/>\n}</span></p>\n<p><br/>\n<span style="font-family:Courier New,Courier,monospace;">};</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;">int main()<br/>\n{<br/>\nStudent student1("Sophia", "John", 5);<br/>\ncout&lt;&lt;student1.first_name&lt;&lt;endl;<br/>\n student1.exam();</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;"> return 0;<br/>\n}</span><br/>\n </p>\n<p>The output would be,<br/>\n<span style="font-family:Courier New,Courier,monospace;">Sophia<br/>\nExam registration number is: 2018SophiaJohn</span></p>\n<p><br/>\nQuestion: Create a class <strong>Circle </strong>with a data member<strong> radius</strong>. <br/>\nDefine a method to find the area of the circle. <br/>\nDefine a method to find the circumference of the circle.<br/>\nAssume radius= 10 units</p>\n<p>The output should look like:-</p>\n<p>Area: 314</p>\n<p>Circumference: 62.8</p>\n',
          correctCode:
            '#include <iostream>\nusing namespace std;\nclass Circle\n{\n  public:\n  float radius;\n  Circle(float rad)\n  {\n    radius=rad;\n  }\n  void area()\n  {\n    cout<<"Area: "<<(3.14*radius*radius)<<endl;\n  }\n  void circumference()\n  {\n    cout<<"Circumference: "<<(2*3.14*radius)<<endl;\n  }\n};\nint main()\n{\n  Circle circle1(10.0);\n  circle1.area();\n  circle1.circumference();\n  return 0;\n}',
        },
        {
          questionType: "code",
          questionId: "5c01813cab9c27f1f7a52779",
          question:
            '<p><strong><u>Inheritance</u></strong><br/>\nIf a class is a part of another class, then it’s a child of that class, and the other class is its parent. Classes can be both children of and parents to other classes.</p>\n<p><span style="font-family:Courier New,Courier,monospace;">class subclass_name : access_mode base_class_name<br/>\n{<br/>\n  //body of subclass<br/>\n};</span></p>\n<p>Inheritance is when a class uses code constructed within another class. If we think of inheritance in terms of biology, we can think of a child inheriting certain traits from their parent. That is, a child can inherit a parent’s height or blood group. Children also may share the same last name with their parents. <br/>\nClasses called child classes or subclasses inherit methods and variables from parent classes or base classes. We can think of a parent class called Parent that has class variables for last_name, height and blood group that the child class Child will inherit from the Parent. Because the Child subclass is inheriting from the Parent base class, the Child class can reuse the code of Parent allowing the programmer to use fewer lines of code and decrease redundancy.</p>\n<p>For example: </p>\n<p><span style="font-family:Courier New,Courier,monospace;">#include &lt;iostream&gt; <br/>\nusing namespace std; <br/>\n  <br/>\nclass Fruits { <br/>\n  public: <br/>\n    Fruits() <br/>\n    { <br/>\n      cout &lt;&lt; "This is a Fruit" &lt;&lt; endl; <br/>\n    } <br/>\n}; <br/>\n  <br/>\nclass Apple: public Fruits{ <br/>\n  <br/>\n}; <br/>\n  <br/>\n<br/>\nint main() <br/>\n{    <br/>\n    // creating object of sub class will invoke the constructor of base classes <br/>\n    Apple obj; <br/>\n    return 0; <br/>\n}</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;">Output:</span></p>\n<p><span style="font-family:Courier New,Courier,monospace;">This is a Fruit</span></p>\n<p>The private members in the base class cannot be directly accessed in the derived class while protected members can be directly accessed. For example, Classes B, C and D all contain the variables x, y and z in below example. It is just question of access.</p>\n<p><br/>\n<span style="font-family:Courier New,Courier,monospace;">class A  <br/>\n{ <br/>\npublic: <br/>\n    int a; <br/>\nprotected: <br/>\n    int b; <br/>\nprivate: <br/>\n    int c; <br/>\n}; <br/>\n  <br/>\nclass B : public A <br/>\n{ <br/>\n    // a is public <br/>\n    // b is protected <br/>\n    // c is not accessible from B <br/>\n}; <br/>\n  <br/>\nclass C : protected A <br/>\n{ <br/>\n    // a is protected <br/>\n    // b is protected <br/>\n    // c is not accessible from C <br/>\n}; <br/>\n  <br/>\nclass D : private A    // \'private\' is default for classes <br/>\n{ <br/>\n    // a is private <br/>\n    // b is private <br/>\n    // c is not accessible from D <br/>\n};</span></p>\n<p><strong><span style="font-family:Arial,Helvetica,sans-serif;">Types of inheritance in C++</span></strong></p>\n<p><span style="font-family:Arial,Helvetica,sans-serif;">A derived class with only one base class is called</span><strong><span style="font-family:Arial,Helvetica,sans-serif;"> single inheritance.</span></strong></p>\n<p><span style="font-family:Arial,Helvetica,sans-serif;">A derived class with one base class and that base class is a derived class of another is called</span><strong><span style="font-family:Arial,Helvetica,sans-serif;"> multilevel inheritance.</span></strong></p>\n<p><span style="font-family:Arial,Helvetica,sans-serif;">A derived class with multiple base class is called</span><strong><span style="font-family:Arial,Helvetica,sans-serif;"> multiple inheritance.</span></strong></p>\n<p><span style="font-family:Arial,Helvetica,sans-serif;">Multiple derived classes with same base class is called</span><strong><span style="font-family:Arial,Helvetica,sans-serif;"> hierarchical inheritance.</span></strong></p>\n<p><strong>Question</strong>:</p>\n<p>Create a class <strong>Person</strong> with <strong>name </strong>as its data member. It should have a parameterized constructor that assigns a value to name.</p>\n<p>Create another class <strong>Student </strong>which is a child class of Person. It should have <b>roll_no</b> and <strong>gender </strong>as its data members. Define a parameterized constructor that assigns values to name, roll_no and gender. Define a method <strong>display()</strong> to print the name, roll_no and gender respectively in separate lines.</p>\n<p>In main function, create an instance of Student and assign the values (Sam,15,Male) to it using the constructor. Then display the details of the object by calling the display() method.</p>\n',
          correctCode:
            '#include<iostream>\nusing namespace std;\nclass Person\n{\n  public:\n  string name;\n  Person(){}\n  Person(string s)\n  {\n    name = s;\n  }\n};\nclass Student : public Person\n{\n  public:\n  int roll_no;\n  string gender;\n  Student(string s, int roll, string g):Person(s)\n  {\n    roll_no = roll;\n    gender = g;\n  }\n  void display()\n  {\n    cout<<this->name<<endl;\n    cout<<this->roll_no<<endl;\n    cout<<this->gender<<endl;\n  }\n};\nint main()\n{\n  Student obj("Sam", 15, "Male");\n  obj.display();\n}',
        },
        {
          questionType: "mcq",
          questionId: "5c4abcf55be7921ca0d922e0",
          question:
            '<p style="margin:0cm 0cm 10pt"><span style="font-size:11pt"><span style="line-height:normal"><span style="font-family:Calibri,sans-serif"><b><u><span style="font-size:12.0pt"><span style=\'font-family:"Times New Roman","serif"\'>Defining classes and objects</span></span></u></b></span></span></span></p>\n<p>A class is the blueprint from which specific objects are created.</p>\n<p>A class is defined in C++ using keyword <strong>class</strong> followed by the name of class. The body of class is defined inside the curly brackets and terminated by a semicolon at the end.</p>\n<p>class class_name <br/>\n{ <br/>\n    //Access specifiers <br/>\n    //Data Members       <br/>\n    //Member functions<br/>\n};</p>\n<p style="margin:0cm 0cm 10pt"><strong><span style="font-size:11pt"><span style="line-height:normal"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style=\'font-family:"Times New Roman","serif"\'>Accessing Data Members</span></span></span></span></span></strong></p>\n<p>Accessing a data member depends solely on the access control of that data member.<br/>\nThis access control is given by Access modifiers in C++. There are three access modifiers : public, private and protected.</p>\n<p>Public - All the class members declared under public will be available to everyone. The data members and member functions declared public can be accessed by other classes too.</p>\n<p>Protected - Protected access modifier is similar to that of private access modifiers, the difference is that the class member declared as Protected are inaccessible outside the class but they can be accessed by any subclass(derived class) of that class.</p>\n<p>Private - The class members declared as private can be accessed only by the functions inside the class. They are not allowed to be accessed directly by any object or function outside the class</p>\n<p>ClassName ObjectName;</p>\n<p>Now creating a class is incomplete without some functionality. So functionalities can be defined by setting various attributes which acts as a container for data and functions related to those attributes.</p>\n<p>#include &lt;iostream&gt; <br/>\nusing namespace std; <br/>\nclass example<br/>\n{ <br/>\n    public:<br/>\n    void method1() <br/>\n    { <br/>\n       // Print something<br/>\n    } <br/>\n}; <br/>\n  <br/>\nint main() {<br/>\n   example object1;   <br/>\n   object.method1(); <br/>\n    return 0; <br/>\n} </p>\n<p>Here a class named example is defined and a method is defined in class called method1. object1 is an object of class and method1 is called using object of the class.</p>\n<p>Question: A class definition is given below, fill in the blanks with appropriate keywords</p>\n<p>#include &lt;iostream&gt; <br/>\nusing namespace std; <br/>\nclass lpu <br/>\n{ <br/>\n    public:<br/>\n    void printname() <br/>\n    { <br/>\n       cout &lt;&lt;"Inside the Class"&lt;&lt;endl; <br/>\n    } <br/>\n}; <br/>\n  <br/>\nint main() { <br/>\n  <br/>\n    ____ obj1;    // Blank 1<br/>\n    ____.printname();  //Blank 2<br/>\n    return 0; <br/>\n}</p>\n',
          correctOptionId: "5c4abcf55be792bdbbd922e5",
          options: [
            {
              optionId: "5c4abcf55be79262d4d922e7",
              option: "<p>Blank 1: lpu</p>\n<p>Blank 2: lpu</p>\n",
            },
            {
              optionId: "5c4abcf55be7926ef7d922e6",
              option: "<p>Blank 1: int</p>\n<p>Blank 2: obj1</p>\n",
            },
            {
              optionId: "5c4abcf55be792bdbbd922e5",
              option: "<p>Blank 1: lpu</p>\n<p>Blank 2: obj1</p>\n",
            },
            {
              optionId: "5c4abcf55be792e849d922e4",
              option: "<p>Blank 1: string</p>\n<p>Blank 2: lpu</p>\n",
            },
          ],
        },
      ],
    },

    // Code Python
    {
      testNumber: 4,
      testId: "5c175b04d105b853ac6783d8",
      testTitle: "Coding Practice: Input and Output (Medium)",
      attemptData: [
        {
          questionType: "code",
          questionId: "5be71e54aa3af2064a27c734",
          question:
            "<p>Write a program to check an entered number is IMEI number or not and print Yes, if IMEI number otherwise print No.</p>\n<p><strong>Hint: </strong>An IMEI number is a 15 digit number and it is said to be IMEI number , if the sum of the number is exactly divisible by 10. But when we entered the number for alternate digits ( from last ), the digit will be taken as its double.</p>\n<p>For example, for 15 digit input 474154203237518 , output will be Yes because input is split as IMEI number  like 4 + (7*2=14 then add digits (1+4)) + 4 + (1*2=2) + 5 .. and so on.</p>\n",
          correctCode:
            'def sumDig( n ): \n    a = 0\n    while n > 0: \n        a = a + n % 10\n        n = int(n / 10)   \n    return a \ndef isValidEMEI(n): \n    s = str(n) \n    l = len(s) \n    if l != 15: \n        return False\n  \n    d = 0\n    sum = 0\n    for i in range(15, 0, -1): \n        d = (int)(n % 10) \n        if i % 2 == 0: \n            d = 2 * d \n        sum = sum + sumDig(d) \n        n = n / 10\n    return (sum % 10 == 0) \nn = int(input())\nif isValidEMEI(n): \n    print("Yes") \nelse: \n    print("No") ',
        },
        {
          questionType: "code",
          questionId: "5be71e54aa3af242c427c73b",
          question:
            "<p>Write a program to find the longest sequence of 0’s in binary equivalent of an entered number.</p>\n",
          correctCode:
            "def maxConsecutiveZeros(decimal_num): \n  binary_num = bin(decimal_num)\n  print (max(map(len, binary_num[2:].split('1'))))\n  return None\n\ndecimal_num = int(input())\nmaxConsecutiveZeros(decimal_num)",
        },
        {
          questionType: "code",
          questionId: "5bafd01d52f89b1de070ecec",
          question:
            "<p>Write a program to find the nth bit of a binary equivalent of an entered decimal number.</p>\n<p>For example, entered decimal number N= 20(10100 in binary) , if nth bit= 4, output=1 and nth bit=0, output=0.</p>\n<p>Note: Take nth bit of binary number from right to left like in binary number 10, 0= 0th index and 1=1st index.</p>\n",
          correctCode:
            "decimal_num = int(input())\nnth_bit = int(input())\nD2B_num=str(bin(decimal_num))\nbinary_num=D2B_num[2:]\nprint(binary_num[-nth_bit-1])",
        },
        {
          questionType: "code",
          questionId: "5be70f20aa3af23faf27c67a",
          question:
            '<p>Write a program to print a pattern of christmas tree and take entered values of input console as height (as columns) &amp; segment (as rows) for this pattern.</p>\n<p><strong>Note: </strong>In christmas tree pattern, the height of christmas tree means the number of pyramids (may be incomplete) and segment means the length of the pyramid (may be incomplete) in vertical (rows per pyramid).</p>\n<p>For example, if height = 3 means 3 pyramids and segment = 3 means 3 rows per pyramid, the tree would look like this.</p>\n<p><img alt="" src="https://kiit.myperfectice.com/uploads/image/5d71f472ab33394ec6ab045a/4SGPMW/upload-1569405481102.jpg" style="width: 101px; height: 220px;"/></p>\n<p>In above pattern, pyramid 1(may be incomplete, denoted by a star pattern)  has 1 star in the middle then 1+2 star and so on. The process of increasing 2 stars at a time is continued until the count of increment reaches segment value.</p>\n<p>Same for pyramid 2 but pattern is start from 1+2 (i.e start of previous pyramid + 2) star in the middle then 3+2 star and so on.</p>\n<p>Same for pyramid 3 but pattern is start from 3+2 star in the middle then 5+2 star and so on.</p>\n<p><strong>Note: </strong>Last 3 lines of output, which are fixed as-</p>\n<p>1) * in the middle</p>\n<p>2) * in the middle</p>\n<p>3)******* (7 stars)</p>\n<p><strong>Note:</strong> There is one space by default on each line. The last 3 lines should be always printed in the middle of the tree pattern.</p>\n',
          correctCode:
            'k = 0\nrows = int(input())\ncol= int(input())\n\nmaxstars=(2*rows)+(2*col)-3\ns=int(maxstars/2)\n\nfor l in range(1,col+1):\n    for i in range(1, rows+1):\n        for space in range(maxstars-(3+i+l)):\n            print(end=" ")\n        for x in range((2*i)+(2*l)-3):\n            print("*", end="")\n            k = k + 1\n        k = 0\n        print()\n        \nfor i in range(2):\n    for j in range(s):\n        print(" ",end="")\n    print("*")\nprint(" ******* \\n")',
        },
        {
          questionType: "code",
          questionId: "5be70fceaa3af2d60427c683",
          question:
            "<p>Write a program to check the entered number is harshad number or not and print 'Yes' for harshad number or 'No' for non-harshad number .</p>\n<p><strong>Hint:</strong> A number is a harshad number, if the sum of an digit of entered number completely divides the entered number like for input value 18, sum of digit =1+8 = 9 and 18 is divided by 9. so 18 is a harshed number.</p>\n",
          correctCode:
            'def checkHarshadNum( number ) : \n    sum = 0\n    temp = number \n    while temp > 0 : \n        sum = sum + temp % 10\n        temp = int(temp / 10)\n    return number % sum == 0\nnumber=int(input())\nif (checkHarshadNum(number)):\n  print("Yes") \nelse :\n  print ("No") ',
        },
        {
          questionType: "code",
          questionId: "5be71053aa3af2aa9227c68e",
          question:
            "<p>Write a program to check if the entered number is pronic number or not and print 'Yes' for pronic number and 'No'  for non-pronic number.</p>\n<p><strong>Hint: </strong>A number is a pronic number if it is a product of two consecutive numbers like 420 is a product of 20 &amp; 21.</p>\n",
          correctCode:
            'def checkPronic (x) :\n    i = 0\n    while ( i <= int((x**(1/2)))):\n        if ( x == i * (i + 1)) : \n            return "Yes"\n        i = i + 1\n    return "No"\n  \nn = int(input())\nprint(checkPronic(n))',
        },
      ],
    },
  ],
};
