"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
// import CustomBreadcrumb from "../CustomBreadcrumb";
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
      {/* <div className="flex justify-center md:justify-start md:flex-none md:my-5 md:pl-[15%]">
        <CustomBreadcrumb size={"lg"} />
      </div> */}
      <div className="mx-2 text-white flex flex-col items-center md:p-4 min-h-screen overflow-clip">
        <h1 className="px-2 text-xl lg:text-4xl font-semibold my-4">
          {testName}
        </h1>
        <div className="w-full md:max-w-4xl p-2 md:p-4 md:rounded-lg font-jetbrains">
          <div className="sticky top-0 w-full mx-auto px-2 py-2 pb-3 z-10">
            <div className="relative flex items-center gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search question or options..."
                className="w-full px-4 py-2 text-sm md:text-base rounded-md text-gray-800 dark:text-gray-200 placeholder-gray-500 border border-gray-300 dark:border-gray-700 focus:outline-none transition-all search-input"
              />
              <button
                onClick={handleClear}
                className="px-4 py-2 rounded-md text-foreground bg-background focus:outline-none transition-all border border-gray-400"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="space-y-2 md:space-y-4">
            {isFiltered && filteredData && filteredData.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 px-4 border rounded-lg">
                <Search className="w-12 h-12 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  No Questions Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                  It seems we couldn{"'"}t find what you{"'"}re looking for. Try
                  adjusting your search terms.
                </p>
                <button
                  onClick={handleClear}
                  className="flex items-center px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <X className="mr-2 h-4 w-4" />
                  <span>Clear Search</span>
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
        {/* <div className="mt-3 inline-block dark:bg-green-950/60 dark:text-foreground text-sm font-medium px-2 py-2 rounded border dark:border-gray-500">
          Correct Answer: {correctAnswer}
        </div> */}
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
      className={`flex items-center space-x-2 ${
        isCorrect ? "rounded-md p-1 border dark:border-gray-300" : ""
      }`}
    >
      <span className="font-medium text-purple-700 dark:text-foreground">
        {optionKey.toUpperCase()}:
      </span>
      <span
        className="text-purple-600 dark:text-foreground pl-2"
        dangerouslySetInnerHTML={{ __html: highlightHTML(option, searchQuery) }}
      />
    </li>
  );
}
