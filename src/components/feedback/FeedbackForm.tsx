import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";

type FeedbackFormProp = { onAddToList: (text: string) => void };

export default function FeedbackForm({ onAddToList }: FeedbackFormProp) {
  const [text, setText] = useState("");
  const charCount = MAX_CHARACTERS - text.length;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length > MAX_CHARACTERS) {
      return;
    }
    setText(newText);
  };

  const [ showIsValidIndicator, setShowIsValidIndicator] = useState(false)
  const [showIsInvalidIndicator, setShowIsInvalidIndicator] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // basic validation
    if (text.includes("#") && text.length >= 5) {
        setShowIsValidIndicator(true)
        setTimeout(() => {
          setShowIsValidIndicator(false)
        }, 2000);
    } else {
        setShowIsInvalidIndicator(true)
        setTimeout(() => {
          setShowIsInvalidIndicator(false)
        }, 2000);
        return;
    }
    onAddToList(text);
    setText("");
  };
  return (
    <form
      className={`form ${showIsValidIndicator ? "form--valid" : ""}
    ${showIsInvalidIndicator ? "form--invalid" : ""}
    `}
      onSubmit={handleSubmit}
    >
      <textarea
        id="feedback-textarea"
        value={text}
        onChange={handleChange}
        spellCheck={false}
        placeholder=""
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company.
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
