"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CustomBreadcrumb from "./CustomBreadcrumb";
import { DataItem } from "@/lib/types";
import { Search, X } from "lucide-react";

const JsonPage = ({ data }: { data: DataItem[] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const input = document.querySelector<HTMLInputElement>(".search-input");
    if (input) input.focus();
    setSelectedFilter("All");
  }, []);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const trimmedValue = inputValue.replace(/\s+/g, " ");
    setSearchQuery(trimmedValue);
  }

  function handleClear() {
    setSearchQuery("");
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>(".search-input");
      if (input) input.focus();
    }, 250);
  }

  function highlightText(text: string, searchQuery: string): string {
    if (!searchQuery) return text;
    const escapedQuery = searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi");
    return text.replace(regex, (match) => `<mark>${match}</mark>`);
  }

  function highlightHTML(html: string, searchQuery: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const walker = document.createTreeWalker(
      doc.body,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      const highlighted = highlightText(node.textContent || "", searchQuery);
      if (highlighted !== node.textContent) {
        const span = document.createElement("span");
        span.innerHTML = highlighted;
        parent?.replaceChild(span, node);
      }
    }

    return doc.body.innerHTML;
  }

  useEffect(() => {
    if (!data) return;

    const filteredResults = data?.filter((dataObj: DataItem) => {
      const questionText = `${dataObj.question1 || ""} ${
        dataObj.question2 || ""
      }`.toLowerCase();
      const optionText = Object.values(dataObj.options || {})
        .join(" ")
        .toLowerCase();
      return (
        questionText.includes(searchQuery.toLowerCase()) ||
        optionText.includes(searchQuery.toLowerCase())
      );
    });
    setFilteredData(filteredResults);
    setIsFiltered(true);
  }, [data, selectedFilter, searchQuery]);

  function cap(word: string) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  const pathname = usePathname().split("/");
  const testName = `${cap(pathname[2])} ${cap(pathname[3])}: ${cap(
    pathname[4]
  )} Test ${cap(pathname[5])}`;

  return (
    <>
      <div className="flex justify-center md:justify-start md:flex-none md:my-5 md:pl-[15%]">
        <CustomBreadcrumb size={"lg"} />
      </div>
      <div className="mx-2 text-white flex flex-col items-center md:p-4 min-h-screen overflow-clip">
        <h1 className="px-2 text-xl lg:text-4xl font-semibold my-4">
          {testName}
        </h1>
        <div className="w-full md:max-w-4xl p-2 md:p-4 md:rounded-lg bg-purple-800/5 font-jetbrains">
          <div className="sticky top-0 z-5 bg-purple-800/5 mb-2 md:mb-4">
            <div className="flex items-center gap-2 md:gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search question or options..."
                className="w-full p-2 rounded-md text-[14px] md:text-lg text-white search-input focus:outline-none focus:ring-1 focus:ring-white border border-gray-700 dark:border-gray-400"
              />
              <button
                onClick={handleClear}
                className="px-4 py-2 text-[14px] md:text-lg rounded-md bg-background text-foreground active:bg-purple-900 focus:outline-none border border-gray-700 dark:border-gray-400"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="space-y-2 md:space-y-4">
            {isFiltered && filteredData && filteredData.length === 0 && (
              <div className="flex flex-col items-center justify-center py-6 sm:py-8 px-4 sm:px-6 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950 dark:to-gray-950 rounded-md shadow-lg border border-purple-100 dark:border-purple-800 transition-colors duration-300">
                <div className="mb-4 p-2 sm:p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                  <Search className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 dark:text-purple-300" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-800 dark:text-purple-200 mb-2 sm:mb-4 text-center">
                  No Questions Found
                </h2>
                <div className="text-sm sm:text-base md:text-lg text-purple-600 dark:text-purple-300 text-center max-w-md mb-4 sm:mb-6">
                  It seems we couldn{"'"}t find what you{"'"}re looking for. Try
                  adjusting your search terms.
                </div>
                <button
                  onClick={handleClear}
                  className="group flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-800 dark:hover:text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-700 transition-all duration-300 text-sm sm:text-base"
                >
                  <X className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:rotate-90 transition-transform duration-300" />
                  <div>Clear Search</div>
                </button>
              </div>
            )}

            {/* {filteredData.map((dataObj: DataItem, index: number) => {
              const questionNo = index + 1;
              const { question1, question2, options, correctAnswer } = dataObj;
              return (
                <div
                  key={index}
                  className="p-2 md:p-4 rounded-lg border border-gray-700 dark:border-gray-400"
                >
                  <div className="!text-lg md:!text-2xl text-white mb-2 p-2 rounded-md">
                    Question {questionNo}:
                  </div>
                  {question1 && (
                    <div
                      className="text-xs md:text-base text-white p-2 rounded-md"
                      dangerouslySetInnerHTML={{
                        __html: highlightHTML(question1, searchQuery),
                      }}
                    />
                  )}
                  {question2 && (
                    <div
                      className="text-xs md:text-base text-white p-2 rounded-md"
                      dangerouslySetInnerHTML={{
                        __html: highlightHTML(question2, searchQuery),
                      }}
                    />
                  )}
                  <div className="text-xs md:text-lg p-2 rounded-md">
                    Options:
                  </div>
                  <ul className="text-xs md:text-base pl-4 rounded-md p-3">
                    {Object.entries(options).map(([optionKey, option]) =>
                      option ? (
                        <li
                          key={optionKey}
                          className={`mb-1 ${
                            optionKey.toUpperCase() === correctAnswer
                              ? "border-2 px-2 rounded-md border-gray-400 dark:border-gray-400"
                              : ""
                          }`}
                        >
                          {optionKey.toUpperCase()}:{" "}
                          <span
                            className="ml-3 inline-block"
                            dangerouslySetInnerHTML={{
                              __html: highlightHTML(option, searchQuery),
                            }}
                          />
                        </li>
                      ) : null
                    )}
                  </ul>
                  <h4 className="text-base md:text-lg text-white p-2 rounded-md my-2 border-[1.5px] px-2">
                    Correct Answer: {correctAnswer}
                  </h4>
                </div>
              );
            })} */}

            {filteredData.map((dataObj, index) => (
              <QuestionCard
                key={index}
                questionNo={index + 1}
                data={dataObj}
                searchQuery={searchQuery}
                highlightHTML={highlightHTML}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default JsonPage;

interface QuestionCardProps {
  questionNo: number;
  data: DataItem;
  searchQuery: string;
  highlightHTML: (text: string, query: string) => string;
}

function QuestionCard({
  questionNo,
  data,
  searchQuery,
  highlightHTML,
}: QuestionCardProps) {
  const { question1, question2, options, correctAnswer } = data;

  return (
    <div className="rounded-lg shadow-sm border border-purple-200 dark:border-gray-400 overflow-hidden transition-colors duration-200 question-block">
      <div className="border-b dark:border-gray-500 text-foreground px-4 py-2 !text-lg font-semibold">
        Question {questionNo}
      </div>
      <div className="p-4 space-y-3">
        {question1 && (
          <QuestionText
            text={question1}
            searchQuery={searchQuery}
            highlightHTML={highlightHTML}
          />
        )}
        {question2 && (
          <QuestionText
            text={question2}
            searchQuery={searchQuery}
            highlightHTML={highlightHTML}
          />
        )}
        <div className="text-sm my-2 pb-1 font-medium text-purple-600 dark:text-foreground border-b dark:border-gray-400">
          Options:
        </div>
        <ul className="space-y-2 text-sm ">
          {Object.entries(options).map(
            ([optionKey, option]) =>
              option && (
                <OptionItem
                  key={optionKey}
                  optionKey={optionKey}
                  option={option}
                  isCorrect={optionKey.toUpperCase() === correctAnswer}
                  searchQuery={searchQuery}
                  highlightHTML={highlightHTML}
                />
              )
          )}
        </ul>
        <div className="mt-3 inline-block dark:bg-green-900 dark:text-foreground text-sm font-medium px-2 py-1 rounded border dark:border-gray-500">
          Correct Answer: {correctAnswer}
        </div>
      </div>
    </div>
  );
}

function QuestionText({
  text,
  searchQuery,
  highlightHTML,
}: {
  text: string;
  searchQuery: string;
  highlightHTML: (text: string, query: string) => string;
}) {
  return (
    <div
      className="text-purple-700 dark:text-foreground"
      dangerouslySetInnerHTML={{ __html: highlightHTML(text, searchQuery) }}
    />
  );
}

function OptionItem({
  optionKey,
  option,
  isCorrect,
  searchQuery,
  highlightHTML,
}: {
  optionKey: string;
  option: string;
  isCorrect: boolean;
  searchQuery: string;
  highlightHTML: (text: string, query: string) => string;
}) {
  return (
    <li
      className={`flex items-start space-x-2 ${
        isCorrect ? "rounded-md p-1 dark:bg-gray-800/60" : ""
      }`}
    >
      <span className="font-medium text-purple-700 dark:text-foreground">
        {optionKey.toUpperCase()}:
      </span>
      <span
        className="text-purple-600 dark:text-foreground"
        dangerouslySetInnerHTML={{ __html: highlightHTML(option, searchQuery) }}
      />
    </li>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";

// interface DataItem {
//   question1?: string;
//   question2?: string;
//   options: { [key: string]: string };
//   correctAnswer: string;
// }

// export default function Component({ data }: { data: DataItem[] }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredData, setFilteredData] = useState<DataItem[]>([]);
//   const [isFiltered, setIsFiltered] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const input = document.querySelector<HTMLInputElement>(".search-input");
//     if (input) input.focus();
//   }, []);

//   function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const inputValue = e.target.value;
//     const trimmedValue = inputValue.replace(/\s+/g, " ");
//     setSearchQuery(trimmedValue);
//   }

//   function handleClear() {
//     setSearchQuery("");
//     setTimeout(() => {
//       const input = document.querySelector<HTMLInputElement>(".search-input");
//       if (input) input.focus();
//     }, 250);
//   }

//   function highlightText(text: string, searchQuery: string): string {
//     if (!searchQuery) return text;
//     const escapedQuery = searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
//     const regex = new RegExp(`(${escapedQuery})`, "gi");
//     return text.replace(regex, (match) => `<mark>${match}</mark>`);
//   }

//   function highlightHTML(html: string, searchQuery: string): string {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, "text/html");
//     const walker = document.createTreeWalker(
//       doc.body,
//       NodeFilter.SHOW_TEXT,
//       null
//     );

//     let node;
//     while ((node = walker.nextNode())) {
//       const parent = node.parentElement;
//       const highlighted = highlightText(node.textContent || "", searchQuery);
//       if (highlighted !== node.textContent) {
//         const span = document.createElement("span");
//         span.innerHTML = highlighted;
//         parent?.replaceChild(span, node);
//       }
//     }

//     return doc.body.innerHTML;
//   }

//   useEffect(() => {
//     if (!data) return;

//     const filteredResults = data?.filter((dataObj: DataItem) => {
//       const questionText = `${dataObj.question1 || ""} ${
//         dataObj.question2 || ""
//       }`.toLowerCase();
//       const optionText = Object.values(dataObj.options || {})
//         .join(" ")
//         .toLowerCase();
//       return (
//         questionText.includes(searchQuery.toLowerCase()) ||
//         optionText.includes(searchQuery.toLowerCase())
//       );
//     });
//     setFilteredData(filteredResults);
//     setIsFiltered(true);
//   }, [data, searchQuery]);

//   function cap(word: string) {
//     if (!word) return "";
//     return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
//   }

//   const pathname = usePathname().split("/");
//   const testName = `${cap(pathname[2])} ${cap(pathname[3])}: ${cap(
//     pathname[4]
//   )} Test ${cap(pathname[5])}`;

//   return (
//     <div className="flex flex-col items-center md:p-4 min-h-screen question-block overflow-clip bg-gray-950">
//       <h1 className="text-base px-2 sm:text-xl lg:text-4xl font-semibold my-4 text-primary">
//         {testName}
//       </h1>
//       <div className="w-full md:max-w-4xl p-2 md:p-4 md:rounded-lg ">
//         <div className="sticky top-0 z-5 p-2 rounded-lg">
//           <div className="flex items-center gap-2 mb-2 md:gap-4 md:mb-4">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               placeholder="Search question or options..."
//               className="w-full p-2 rounded-md bg-input text-[14px] md:text-lg text-foreground search-input focus:outline-none focus:ring-1 focus:ring-primary border border-border"
//             />
//             <button
//               onClick={handleClear}
//               className="px-4 py-2 text-[14px] md:text-lg rounded-md bg-secondary text-secondary-foreground active:bg-secondary/80 focus:outline-none border border-border bg-gray-950"
//             >
//               Clear
//             </button>
//           </div>
//         </div>
//         <div className="space-y-2 md:space-y-4">
//           {isFiltered && filteredData && filteredData.length === 0 && (
//             <div className="flex flex-col items-center justify-center py-10 rounded-md border border-border">
//               <div className="text-lg md:text-2xl font-semibold text-muted-foreground mb-4 text-center">
//                 No Questions Found 😕
//               </div>
//               <div className="text-xs sm:text-sm md:text-base text-foreground text-center">
//                 Try adjusting your search terms or clearing the search input.
//               </div>
//               <button
//                 onClick={handleClear}
//                 className="mt-6 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-primary border border-border"
//               >
//                 Clear Search
//               </button>
//             </div>
//           )}
//           {filteredData.map((dataObj: DataItem, index: number) => {
//             const questionNo = index + 1;
//             const { question1, question2, options, correctAnswer } = dataObj;
//             return (
//               <div
//                 key={index}
//                 className="p-2 md:p-4 rounded-md border border-border"
//               >
//                 <div className="text-lg md:text-2xl text-card-foreground mb-2 p-2 rounded-md">
//                   Question {questionNo}:
//                 </div>
//                 {question1 && (
//                   <div
//                     className="text-xs md:text-base text-card-foreground p-2 rounded-md"
//                     dangerouslySetInnerHTML={{
//                       __html: highlightHTML(question1, searchQuery),
//                     }}
//                   />
//                 )}
//                 {question2 && (
//                   <div
//                     className="text-xs md:text-base text-card-foreground p-2 rounded-md mt-2"
//                     dangerouslySetInnerHTML={{
//                       __html: highlightHTML(question2, searchQuery),
//                     }}
//                   />
//                 )}
//                 <div className="text-xs md:text-lg text-card-foreground p-2 rounded-md">
//                   Options:
//                 </div>
//                 <ul className="text-xs md:text-base text-card-foreground pl-4 rounded-md p-3">
//                   {Object.entries(options).map(([optionKey, option]) =>
//                     option ? (
//                       <li
//                         key={optionKey}
//                         className={`mb-1 ${
//                           optionKey.toUpperCase() === correctAnswer
//                             ? "border md:border-2 border-primary px-2 rounded-md"
//                             : ""
//                         }`}
//                       >
//                         {optionKey.toUpperCase()}:{" "}
//                         <span
//                           className="ml-3 inline-block"
//                           dangerouslySetInnerHTML={{
//                             __html: highlightHTML(option, searchQuery),
//                           }}
//                         />
//                       </li>
//                     ) : null
//                   )}
//                 </ul>
//                 <div className="text-base md:text-lg text-card-foreground p-2 rounded-md my-2 border border-border">
//                   Correct Answer: {correctAnswer}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
