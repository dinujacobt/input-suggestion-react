import React, { FormEvent, useCallback, useState } from "react";
import { Option, QueryProps } from "./types";

type Props = {
  queryProps: QueryProps;
  query: string;
  onSuggestionClick: Function;
  textAreaWidth: number;
  textAreaHeight: number;
  onDelete: Function;
  onInputChange: Function;
};

function Autocomplete(props: Props) {
  const {
    queryProps,
    query,
    onSuggestionClick,
    textAreaWidth,
    textAreaHeight,
    onDelete,
    onInputChange,
  } = props;
  const { enableSuggestions, helperText, suggestionOptions, helperTextColor } =
    queryProps || {};
  const [suggestionStyles, setSuggestionStyles] = useState({ left: 0, top: 0 });
  const [hideSuggestions, setHideSuggestions] = useState(false);

  const handlekeyDown = useCallback(
    (event: KeyboardEvent) => {
      const KeyID = event.keyCode;
      if (event.key === "Escape") {
        setHideSuggestions(true);
      } else if (KeyID === 8 || KeyID === 46) {
        event.preventDefault();
        event.stopPropagation();
        onDelete();
      }
    },
    [onDelete]
  );

  React.useEffect(() => {
    setPlaceHolder();
    document.addEventListener("keydown", handlekeyDown, false);

    return () => {
      document.removeEventListener("keydown", handlekeyDown, false);
    };
  });

  React.useEffect(() => {
    setHideSuggestions(false);
  }, [query]);

  const setPlaceHolder = () => {
    const inputElement: any = document.getElementById("myInput");
    const coloredAttribute =
      enableSuggestions && helperText
        ? `${query ? "&nbsp;" : ""}<span style="color: ${
            helperTextColor || "blue"
          }">${helperText}</span>`
        : "";
    inputElement.innerHTML = query + coloredAttribute;
  };

  const handleSuggestionClick = (value: Option) => {
    onSuggestionClick(value);
  };

  const handleInputChange = (event: FormEvent) => {
    onInputChange(event.currentTarget.textContent);
  };

  React.useEffect(() => {
    const setSuggestionListPosition = (inputValue: string) => {
      let x,
        y = 0;

      var length = inputValue.length || 1;

      x = (length * 10) % textAreaWidth;
      const lines = Math.floor((length * 10) / textAreaWidth);

      y = 36 * (lines + 1) - lines * 15;

      setSuggestionStyles({
        top: y,
        left: x,
      });
    };

    setSuggestionListPosition(query);
  }, [query, textAreaWidth]);

  return (
    <div
      className="autocomplete-wrapper"
      style={{
        width: textAreaWidth,
        height: textAreaHeight,
      }}
    >
      <div
        id="myInput"
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
        contentEditable
        className="content-div"
        onInput={handleInputChange}
      ></div>
      {!hideSuggestions &&
        enableSuggestions &&
        suggestionOptions.length > 0 && (
          <ul
            id="autocomplete-list"
            className="suggestions-list"
            role="listbox"
            style={{
              left: suggestionStyles.left,
              top: suggestionStyles.top,
            }}
          >
            {suggestionOptions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                role="option"
                aria-selected
              >
                {suggestion.text}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}

export default Autocomplete;
