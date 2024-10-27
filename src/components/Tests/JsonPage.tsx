"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CustomBreadcrumb from "./CustomBreadcrumb";

interface DataItem {
  question1?: string;
  question2?: string;
  options: { [key: string]: string };
  correctAnswer: string;
}

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

  //   function handleFilterClick(filter: string) {
  //     setSelectedFilter(filter);
  //     setSearchQuery("");
  //   }

  useEffect(() => {
    if (!data) return;

    // let newFilteredData = [];

    // switch (selectedFilter) {
    //   case "All":
    //     newFilteredData = data;
    //     break;
    //   //   case "A":
    //   //     newFilteredData = data.slice(0, 30);
    //   //     break;
    //   //   case "B":
    //   //     newFilteredData = data.slice(30, 60);
    //   //     break;
    //   //   case "C":
    //   //     newFilteredData = data.slice(60, 90);
    //   //     break;
    //   //   case "D":
    //   //     newFilteredData = data.slice(90, 120);
    //   //     break;
    //   //   case "E":
    //   //     newFilteredData = data.slice(120, 150);
    //   //     break;
    //   default:
    //     newFilteredData = data;
    // }

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

  //   function isProgramming() {
  //     return state?.testName?.split(" ")[2] === "Programming";
  //   }

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
      <div className="text-white flex flex-col items-center md:p-4 min-h-screen question-block overflow-clip">
        <h1 className="px-2 text-xl lg:text-4xl font-semibold my-4">
          {testName}
        </h1>
        <div className="w-full md:max-w-4xl p-2 md:p-4 md:rounded-lg bg-purple-800/5">
          {/* {!error && id && ( */}
          <>
            <div className="sticky top-0 z-5 bg-purple-800/5 p-2">
              <div className="flex items-center gap-2 mb-2 md:gap-4 md:mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search question or options..."
                  className="w-full p-2 rounded-md text-[14px] md:text-lg text-white search-input focus:outline-none focus:ring-1 focus:ring-white"
                />
                <button
                  onClick={handleClear}
                  className="px-4 py-2 text-[14px] md:text-lg rounded-md bg-background text-foreground active:bg-purple-900 focus:outline-none"
                >
                  Clear
                </button>
              </div>
            </div>
            {/* {isProgramming() && (
            <div className="flex justify-around mb-4">
              {["All", "A", "B", "C", "D", "E"].map((filter) => (
                <div
                  key={filter}
                  onClick={() => handleFilterClick(filter)}
                  className={`cursor-pointer px-3 py-1 lg:px-4 lg:py-2 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    selectedFilter === filter
                      ? "bg-purple-400 bg-purple-800/5 text-white border-2 border-white"
                      : "bg-purple-700 bg-purple-800/5 text-purple-200/bg-purple-800/5 hover:bg-purple-600/bg-purple-800/5 hover:text-white border-2 border-transparent"
                  }`}
                >
                  {filter}
                </div>
              ))}
            </div>
          )} */}
          </>
          {/* )} */}
          {/* {loading && <JsonLoading />}
        {!loading && error && <ErrorPage text={error} />}
        {!loading && !error && data && id && ( */}
          <div className="space-y-2 md:space-y-4">
            {/* {!loading && */}
            {isFiltered && filteredData && filteredData.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 bg-purple-900/5 rounded-md">
                <div className="text-lg md:text-2xl font-semibold text-purple-300 bg-purple-800/5 mb-4 text-center">
                  No Questions Found 😕
                </div>
                {/* {isProgramming() && (
                  <div className="text-lg md:text-2xl font-semibold text-purple-300 bg-purple-800/5 mb-4 text-center">
                    Click on "All" to display all Questions
                  </div>
                )} */}
                <div className="text-xs sm:text-sm md:text-base text-purple-300 bg-purple-800/5 text-center">
                  Try adjusting your search terms or clearing the search input.
                </div>
                <button
                  onClick={handleClear}
                  className="mt-6 px-4 py-2 rounded-md bg-purple-900/10 text-white hover:bg-purple-900/5 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  Clear Search
                </button>
              </div>
            )}
            {filteredData.map((dataObj: DataItem, index: number) => {
              const questionNo = index + 1;
              const { question1, question2, options, correctAnswer } = dataObj;
              return (
                <div
                  key={index}
                  className="bg-purple-900/10 p-2 md:p-4 rounded-lg border border-gray-400 dark:border-gray-400"
                >
                  <div className="text-lg md:text-2xl text-white mb-2 p-2 rounded-md">
                    Question {questionNo}:
                  </div>
                  {question1 && (
                    <div
                      className="text-xs md:text-base text-white bg-purple-800/5 p-2 rounded-md"
                      dangerouslySetInnerHTML={{
                        __html: highlightHTML(question1, searchQuery),
                      }}
                    />
                  )}
                  {question2 && (
                    <div
                      className="text-xs md:text-base text-white bg-purple-800/5 p-2 rounded-md"
                      dangerouslySetInnerHTML={{
                        __html: highlightHTML(question2, searchQuery),
                      }}
                    />
                  )}
                  <div className="text-xs md:text-lg p-2 rounded-md">
                    Options:
                  </div>
                  <ul className="text-xs md:text-base pl-4 bg-purple-800/5 rounded-md p-3">
                    {Object.entries(options).map(([optionKey, option]) =>
                      option ? (
                        <li
                          key={optionKey}
                          className={`mb-1 ${
                            optionKey.toUpperCase() === correctAnswer
                              ? "border md:border-2 px-2 rounded-md border-gray-400 dark:border-gray-400"
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
                  <h4 className="text-base md:text-lg text-white bg-purple-800/5 p-2 rounded-md my-2">
                    Correct Answer: {correctAnswer}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default JsonPage;

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
