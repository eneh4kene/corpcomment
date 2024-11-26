import React, { createContext, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";
import { useFeedbackItems } from "../lib/hooks";

type TFeedbackItemsContext = {
  filteredFeedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  companyList: string[];
  handleAddToList: (text: string) => void;
  handleSelectCompany: (text: string) => void;
};

type FeedbackItemsContextProviderProps = {
    children: React.ReactNode
}
export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(null)

export default function FeedbackItemsContextProvider({children}: FeedbackItemsContextProviderProps) {
    const [selectedCompany, setSelectedCompany] = useState("");
    const { feedbackItems, setFeedbackItems, isLoading, errorMessage } = useFeedbackItems()
    const filteredFeedbackItems = useMemo(
        () =>
            selectedCompany
            ? feedbackItems.filter(
                (feedbackItem) => feedbackItem.company === selectedCompany
                )
            : feedbackItems,
        [feedbackItems, selectedCompany]
        );

    const handleSelectCompany = (companyName: string) => setSelectedCompany(companyName);


    const allCompanyList = feedbackItems.map(
        (feedbackItem) => feedbackItem.company
    );

    // remove duplicates
    const companyList = [...new Set(allCompanyList)];

    const handleAddToList = async (text: string) => {
        const companyName = text
            .split(" ")
            .find((word) => word.includes("#"))!
            .substring(1);
        const newItem: TFeedbackItem = {
            id: new Date().getTime(),
            upvoteCount: 0,
            badgeLetter: companyName.substring(0, 1).toUpperCase(),
            company: companyName,
            text: text,
            daysAgo: 0,
        };

        setFeedbackItems((prevItems) => [...prevItems, newItem]);

        await fetch(
            "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
            {
            method: "post",
            body: JSON.stringify(newItem),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            }
        );
    };

   
  return (
    <FeedbackItemsContext.Provider
      value={{
        filteredFeedbackItems,
        isLoading,
        errorMessage,
        companyList,
        handleAddToList,
        handleSelectCompany
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}

