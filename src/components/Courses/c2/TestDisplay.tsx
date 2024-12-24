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
import {
  ChevronDown,
  LucideExternalLink,
  Search,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import SecuredContent from "../SecureContent";

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
  let nodeIndex = 0;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    const highlighted = highlightText(node.textContent || "", searchQuery);
    if (highlighted !== node.textContent) {
      const span = document.createElement("span");
      span.setAttribute("key", `highlight-${nodeIndex}`);
      span.innerHTML = highlighted;
      parent?.replaceChild(span, node);
    }
    nodeIndex++;
  }

  return doc.body.innerHTML;
}

const addWatermark = (content: string, userId: string) => {
  return (
    <div className="relative opacity-[0.08]">
      {content}
      <div className="absolute bottom-0 right-0 text-xs text-violet-400/50 select-none">
        <span>Licensed to {userId}</span>
      </div>
    </div>
  );
};

const TestDisplay: React.FC<{ testItem: TestItem; email: string }> = ({
  testItem,
  email,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const input = document.querySelector<HTMLInputElement>(".search-input");
    if (input) input.focus();

    if (searchQuery) {
      const accordionsToOpen = testItem.levelData
        .filter((level) =>
          level.attemptData.some(
            (attempt) =>
              attempt.question
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              attempt.options?.some((option) =>
                option.option.toLowerCase().includes(searchQuery.toLowerCase())
              )
          )
        )
        .map((level) => level.testId);
      setOpenAccordions(accordionsToOpen);
    } else {
      setOpenAccordions([]);
    }
  }, [searchQuery, testItem.levelData]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const trimmedValue = inputValue.replace(/\s+/g, " ");
    setSearchQuery(trimmedValue);
  }

  function handleClear() {
    setSearchQuery("");
    setOpenAccordions([]);
    const input = document.querySelector<HTMLInputElement>(".search-input");
    if (input) {
      input.value = "";
      input.focus();
    }
  }

  const handleAccordionChange = (value: string) => {
    setOpenAccordions((prev) => (prev.includes(value) ? [] : [value]));
  };

  const filteredLevelData = useMemo(() => {
    if (!searchQuery) return testItem.levelData;
    return testItem.levelData
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
  }, [testItem.levelData, searchQuery]);

  const isV5 = testItem.testType === "Congnitive V5";

  return (
    <SecuredContent email={email}>
      <div className="w-full max-w-4xl mx-auto px-1 lg:px-8">
        <CardHeader className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl p-4 rounded-2xl border border-violet-500/20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
              Level {testItem.Level} - {testItem.testType}
            </CardTitle>

            <div className="flex items-center w-full gap-3">
              <div className="flex-grow relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400/50 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search questions or options..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 w-full bg-violet-500/10 border-violet-500/20 text-violet-100 placeholder-violet-400/50 focus:border-violet-500/40 hover:border-violet-500/30 transition-all duration-200"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClear}
                className="px-4 py-2 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 hover:border-violet-500/40 text-violet-300 transition-all duration-200"
              >
                Clear
              </motion.button>
            </div>
          </motion.div>
        </CardHeader>
        <CardContent>
          {filteredLevelData.map((level) => (
            <React.Fragment key={level.testId}>
              {addWatermark("", email)}
              {!isV5 ? (
                <Accordion
                  type="single"
                  collapsible
                  value={
                    openAccordions.includes(level.testId) ? level.testId : ""
                  }
                  onValueChange={handleAccordionChange}
                  className="mb-4"
                >
                  <AccordionItem value={level.testId}>
                    <AccordionTrigger className="px-4 py-3 hover:no-underline group">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="p-2 rounded-lg bg-violet-500/10 text-violet-400"
                          >
                            <div className="flex items-center gap-1">
                              <ChevronDown className="w-4 h-4" />
                              <span className="text-[10px] opacity-70">
                                Click Here
                              </span>
                            </div>
                          </motion.div>
                          <div className="text-left">
                            <h3 className="text-xs md:text-base font-semibold text-violet-200">
                              Test {level.testNumber} : {level.testTitle}
                            </h3>
                            <p className="text-sm text-violet-400/80"></p>
                          </div>
                        </div>
                        <a
                          href={`https://lpu.myperfectice.com/student/instruction/${level.testId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 px-2 py-1.5 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1.5 border border-violet-500/30"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="hidden sm:inline">Start Test</span>
                          <span className="sm:hidden">Test</span>
                          <LucideExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-2 space-y-4">
                      {level.attemptData.map((attempt, index) => (
                        <QuestionCard
                          key={index}
                          attempt={attempt}
                          qno={index + 1}
                          searchQuery={searchQuery}
                        />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <div className="mb-4">
                  <div>
                    <div className="px-4 py-3 hover:no-underline group">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="p-2 rounded-lg bg-violet-500/10 text-violet-400"
                          >
                            <Sparkles className="w-4 h-4" />
                          </motion.div>
                          <div className="text-left">
                            <h3 className="text-base font-semibold text-violet-200">
                              Test {level.testNumber} : {level.testTitle}
                            </h3>
                            <p className="text-sm text-violet-400/80"></p>
                          </div>
                        </div>
                        <a
                          href={`https://lpu.myperfectice.com/student/instruction/${level.testId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 border border-violet-500/30"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Start Test</span>
                          <LucideExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    <div className="px-4 py-2 space-y-4">
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
                </div>
              )}
            </React.Fragment>
          ))}
        </CardContent>
      </div>
    </SecuredContent>
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-violet-500/20 overflow-hidden backdrop-blur-xl"
    >
      <div className="px-4 py-3 bg-violet-500/5 border-b border-violet-500/20">
        <h3 className="text-base font-semibold text-violet-200">
          Question {qno}
        </h3>
      </div>
      <div className="p-4 space-y-4">
        {question && (
          <div
            className="text-violet-100 text-sm leading-relaxed question-block"
            dangerouslySetInnerHTML={{
              __html: highlightHTML(question, searchQuery),
            }}
          />
        )}
        {(questionType === "mcq" || options) && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-violet-300">Options:</h4>
            <div className="space-y-2">
              {options?.map((option, index) => (
                <OptionItem
                  key={option.optionId}
                  letter={index}
                  option={option.option}
                  optionId={option.optionId}
                  correctOptionId={correctOptionId || ""}
                  searchQuery={searchQuery}
                />
              ))}
            </div>
          </div>
        )}
        {questionType === "code" && correctCode && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-violet-300">
              Correct Code:
            </h4>
            <DisplayCode code={correctCode} />
          </div>
        )}
      </div>
    </motion.div>
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
    <div
      className={`p-3 rounded-xl ${
        optionId === correctOptionId
          ? "bg-violet-500/10 border border-violet-500/30"
          : "bg-violet-500/5"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-violet-400 font-medium">
          {String.fromCharCode(65 + letter)}:
        </span>
        <span
          className="text-violet-200 text-sm question-block"
          dangerouslySetInnerHTML={{
            __html: highlightHTML(option, searchQuery),
          }}
        />
      </div>
    </div>
  );
}

export default TestDisplay;
