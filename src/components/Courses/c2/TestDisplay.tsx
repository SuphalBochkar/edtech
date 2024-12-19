"use client";

import React, { useState, useMemo, useEffect } from "react";
import { CardContent, CardHeader, CardTitle } from "@/ui/shad/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/shad/accordion";
import { Attempt, TestItem } from "@/lib/types";
import { DisplayCode } from "./DisplayCode";
import { Input } from "@/ui/shad/input";
import { LucideExternalLink, Search } from "lucide-react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function highlightText(text: string, searchQuery: string): string {
  if (!searchQuery) return text;
  const escapedQuery = searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  return text.replace(
    regex,
    (match) =>
      `<mark class="bg-yellow-200 dark:bg-yellow-600 px-1 py-0.5 rounded">${match}</mark>`
  );
}

function highlightHTML(html: string, searchQuery: string): string {
  if (!searchQuery) return html;
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

const TestDisplay: React.FC<{ testItem: TestItem }> = ({ testItem }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelData, setLevelData] = useState(
    testItem.levelData.map((level) => ({
      ...level,
      openAccordions: [] as string[],
    }))
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const input = document.querySelector<HTMLInputElement>(".search-input");
    if (input) input.focus();
    if (searchQuery) {
      setLevelData((prevData) =>
        prevData.map((level) => ({
          ...level,
          openAccordions: [level.testId],
        }))
      );
    }
    if (!searchQuery) {
      setLevelData((prevData) =>
        prevData.map((level) => ({
          ...level,
          openAccordions: [],
        }))
      );
    }
  }, [searchQuery]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const trimmedValue = inputValue.replace(/\s+/g, " ");
    setSearchQuery(trimmedValue);
  }

  function handleClear() {
    setSearchQuery("");
    const input = document.querySelector<HTMLInputElement>(".search-input");
    if (input) {
      input.value = "";
      input.focus();
    }
    setLevelData((prevData) =>
      prevData.map((level) => ({ ...level, openAccordions: [] }))
    );
  }

  const filteredLevelData = useMemo(() => {
    if (!searchQuery) return levelData;
    return levelData
      .map((level) => ({
        ...level,
        attemptData: level.attemptData.filter((attempt) => {
          const questionMatch = attempt.question
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const optionsMatch = attempt.options?.some((option) =>
            option.option.toLowerCase().includes(searchQuery.toLowerCase())
          );
          return questionMatch || optionsMatch;
        }),
      }))
      .filter((level) => level.attemptData.length > 0);
  }, [levelData, searchQuery]);

  const isV5 = testItem.testType === "Congnitive V5";

  return (
    <div className="w-full max-w-4xl mx-auto px-1 lg:px-8">
      <CardHeader className="sticky top-0 z-10 bg-background p-2 mb-1 pb-2">
        <CardTitle className="text-lg sm:text-3xl font-bold mb-4">
          Level {testItem.Level} - {testItem.testType}
        </CardTitle>
        <div className="flex items-center w-full gap-3">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder="Search questions or options..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-8 w-full bg-background/95 border border-input/50 hover:border-input/80 focus:border-input transition-colors rounded-md"
            />
          </div>
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm sm:text-base bg-background/95 border border-input/50 hover:border-input/80 hover:bg-accent/50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring/50"
          >
            Clear
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {filteredLevelData.map((level) => (
          <>
            {!isV5 ? (
              <Accordion
                type="multiple"
                value={level.openAccordions}
                onValueChange={(value) => {
                  setLevelData((prevData) =>
                    prevData.map((l) =>
                      l.testId === level.testId
                        ? { ...l, openAccordions: value }
                        : l
                    )
                  );
                }}
                key={level.testId}
              >
                <AccordionItem value={level.testId}>
                  <AccordionTrigger className="w-full px-6 py-4 hover:bg-gray-100/5 rounded-lg transition-all duration-300 !no-underline group border border-gray-800/50">
                    <div className="flex items-center w-full min-w-0">
                      <div className="flex items-center flex-shrink-0 mr-4">
                        {level.openAccordions.includes(level.testId) ? (
                          <FaChevronUp className="text-gray-400 w-4 h-4 transition-transform duration-300 group-hover:text-gray-200" />
                        ) : (
                          <FaChevronDown className="text-gray-400 w-4 h-4 transition-transform duration-300 group-hover:text-gray-200" />
                        )}
                      </div>
                      <div className="flex text-left flex-grow justify-between items-center min-w-0 gap-4">
                        <span className="text-sm sm:text-base font-medium break-words text-gray-200 group-hover:text-white transition-colors duration-300">
                          Test {level.testNumber}: {level.testTitle}
                        </span>
                        <a
                          href={`https://lpu.myperfectice.com/student/instruction/${level.testId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl text-xs sm:text-sm font-semibold hover:from-purple-700 hover:to-purple-900 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 transform active:scale-95 flex items-center gap-3 whitespace-nowrap border border-purple-400/30 backdrop-blur-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="relative">Start Test</span>
                          <LucideExternalLink className="w-4 h-4 animate-bounce" />
                        </a>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {level.attemptData.map((attempt, index) => (
                      <div key={index}>
                        <QuestionCard
                          key={index}
                          attempt={attempt}
                          qno={index + 1}
                          searchQuery={searchQuery}
                        />
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <div key={level.testId} className="border rounded-lg">
                <div className="flex items-center justify-between p-2 md:p-4">
                  <span className="text-sm md:text-base text-left mr-5">
                    Test {level.testNumber}: {level.testTitle}
                  </span>
                  <a
                    href={`https://lpu.myperfectice.com/student/instruction/${level.testId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 md:px-3 md:py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-transform duration-200 ease-in-out hover:scale-105 shadow-md flex items-center space-x-2"
                  >
                    <span>Test Link</span>
                    <LucideExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="p-2 md:p-4 border-t">
                  {level.attemptData.map((attempt, index) => (
                    <QuestionCard
                      key={index}
                      attempt={attempt}
                      qno={index + 1}
                      searchQuery={searchQuery}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        ))}
      </CardContent>
    </div>
  );
};

function QuestionCard({
  attempt,
  qno,
  searchQuery,
}: {
  attempt: Attempt;
  qno: number;
  searchQuery: string;
}) {
  const { question, questionType, correctOptionId, correctCode, options } =
    attempt;

  return (
    <div className="rounded-lg shadow-sm border border-purple-200 dark:border-gray-400 transition-colors duration-200 my-2 question-block">
      <div className="border-b dark:border-gray-500 text-foreground px-4 py-2 text-base sm:text-lg font-semibold">
        Question {qno}
      </div>
      <div className="px-2 space-y-2 sm:space-y-3">
        {question && (
          <div
            className="text-purple-700 dark:text-foreground text-sm sm:text-base !break-words"
            dangerouslySetInnerHTML={{
              __html: highlightHTML(question, searchQuery),
            }}
          />
        )}
        {(questionType === "mcq" || options) && (
          <>
            <div className="text-sm my-2 pb-1 font-medium text-purple-600 dark:text-foreground border-b dark:border-gray-400">
              Options:
            </div>
            <ul className="space-y-2 text-sm">
              {options?.map((option, index) => (
                <OptionItem
                  letter={index}
                  key={option.optionId}
                  option={option.option}
                  optionId={option.optionId}
                  correctOptionId={correctOptionId || ""}
                  searchQuery={searchQuery}
                />
              ))}
            </ul>
          </>
        )}
        {questionType === "code" && correctCode && (
          <div>
            <p className="font-semibold mb-1 pb-2">Correct Code:</p>
            <DisplayCode code={correctCode} />
          </div>
        )}
      </div>
    </div>
  );
}

function OptionItem({
  optionId,
  option,
  correctOptionId,
  letter,
  searchQuery,
}: {
  optionId: string;
  option: string;
  correctOptionId: string;
  letter: number;
  searchQuery: string;
}) {
  return (
    <li
      className={`flex items-center justify-start ${
        optionId === correctOptionId
          ? "rounded-md p-1 border dark:border-gray-300"
          : ""
      }`}
    >
      <span className="font-medium items-center text-purple-700 !p-1 dark:text-foreground">
        {String.fromCharCode(65 + letter)}:
      </span>
      <span
        className="text-purple-600 dark:text-foreground pl-2"
        dangerouslySetInnerHTML={{ __html: highlightHTML(option, searchQuery) }}
      />
    </li>
  );
}

export default TestDisplay;
