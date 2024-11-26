// implement custom hooks to consume the feedbackItemcontext

import { useContext, useEffect, useState } from "react";
import { FeedbackItemsContext } from "../contexts/FeedbackItemsContextProvider";
import { TFeedbackItem } from "./types";

export function useFeedbackItemsContext() {
    const context = useContext(FeedbackItemsContext)

    if (!context) {
        throw new Error(
          "useFeedbackItemsContext must be used within FeedbackItemsContextProvider"
        );
    }

    return context
}

export function useFeedbackItems() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);


    useEffect(() => {
    const fetchFeedbackItems = async () => {
        setIsLoading(true);
        try {
        const response = await fetch(
            "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );

        if (!response.ok) {
            throw new Error();
        }
        const data = await response.json();
        setFeedbackItems(data.feedbacks);
        setIsLoading(false);
        } catch (error) {
        setIsLoading(false);
        setErrorMessage("Something went wrong. Please try again later");
        }
        setIsLoading(false);
    };

    fetchFeedbackItems();
    }, []);

    return {
        feedbackItems,
        setFeedbackItems,
        isLoading,
        errorMessage
    }

}