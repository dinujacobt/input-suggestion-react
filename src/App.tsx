import { useState } from "react";
import "./App.css";
import Autocomplete from "./Autocomplete";
import { SuggestionTypes, Option, QueryProps } from "./types";

function App() {
  const attributeOptions: Option[] = [
    {
      text: "Application",
      value: "application",
    },
    {
      value: "sourceAsn",
      text: "Source ASN",
    },
    {
      value: "destinationAsn",
      text: "Destination ASN",
    },
    {
      text: "QOS",
      value: "qos",
    },
  ];
  const operatorOptions: Option[] = [
    {
      text: "Equals",
      value: "=",
    },
    {
      text: "Greater than",
      value: ">",
    },
    {
      text: "Less than",
      value: "<",
    },
    {
      text: "Not",
      value: "!",
    },
  ];
  const valueOptions = [
    {
      text: "Video",
      value: "video",
    },
    {
      text: "Voice",
      value: "voice",
    },
  ];

  const querProps: QueryProps[] = [
    {
      helperText: SuggestionTypes.attribute,
      helperTextColor: "red",
      enableSuggestions: true,
      suggestionOptions: attributeOptions,
      nextProp: SuggestionTypes.operator,
    },
    {
      helperText: SuggestionTypes.operator,
      helperTextColor: "blue",
      enableSuggestions: true,
      suggestionOptions: operatorOptions,
      nextProp: SuggestionTypes.value,
    },
    {
      helperText: SuggestionTypes.value,
      helperTextColor: "brown",
      enableSuggestions: true,
      suggestionOptions: valueOptions,
    },
  ];

  const [query, setQuery] = useState("");
  const [activeQueryHelperIndex, setActiveQueryHelperIndex] =
    useState<number>(0);

  const handleSuggestionClick = (input: Option) => {
    const newQuery = `${query} ${input.value}`;
    setQuery(newQuery);
    const activeQueryHelper = querProps[activeQueryHelperIndex];
    const nextIndex = querProps.findIndex(
      (prop) => prop.helperText === activeQueryHelper.nextProp
    );
    if (nextIndex !== -1) {
      setActiveQueryHelperIndex(nextIndex);
    } else {
      setActiveQueryHelperIndex(-1);
    }
  };

  const handleQueryDelete = () => {
    setQuery("");
    setActiveQueryHelperIndex(0);
  };

  const handleQueryChange = (query: string) => {
    setQuery(query);
  };

  return (
    <div className="App">
      <Autocomplete
        queryProps={querProps[activeQueryHelperIndex]}
        query={query}
        textAreaHeight={200}
        textAreaWidth={500}
        onSuggestionClick={handleSuggestionClick}
        onDelete={handleQueryDelete}
        onInputChange={handleQueryChange}
      />
    </div>
  );
}

export default App;
