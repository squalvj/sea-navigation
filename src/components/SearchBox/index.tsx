import React, { useState, useCallback } from "react";
import debounce from "./../../utils/debounce";
import TextField from "./../TextField";
import Spinner from "./../Spinner";
import ErrorComponent from "./../ErrorComponent";
export type Suggestion = {
  label: string;
  value: string | Record<string, any>;
};

type SearchBoxProps = {
  onSearch: (query: string) => Promise<void>;
  suggestionsOption: Suggestion[] | [];
  handleClickSuggestion: (suggestion: Suggestion) => void;
  loading: boolean;
  error: string;
  placeholder: string
};

const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  suggestionsOption,
  loading,
  error,
  handleClickSuggestion,
  placeholder
}) => {
  const [query, setQuery] = useState("");
  const [isShow, setIsShow] = useState(false);

  const fetchSuggestions = useCallback(
    debounce(async (value: string) => {
      await onSearch(value);
    }, 300),
    []
  );

  const handleChange = (q: string) => {
    setQuery(q);
    fetchSuggestions(q);
  };

  const toggle = () => {
    setTimeout(() => {
      setIsShow((prev) => !prev);
    }, 100);
  };

  return (
    <div className="search-box w-full">
      <div className="wrapper-searchbox">
        <TextField
          onFocus={toggle}
          onBlur={toggle}
          onChange={handleChange}
          value={query}
          placeholder={placeholder}
        />
        {query.length >= 3 && isShow && (
          <ul className="bg-white rounded-lg text-black p-4">
            {loading && <Spinner />}
            {error && !loading && (
              <ErrorComponent onClick={() => fetchSuggestions(query)} />
            )}

            {!loading && !error && suggestionsOption.length === 0 && (
              <h3>No result</h3>
            )}

            {!loading &&
              !error &&
              suggestionsOption.map((suggestion) => (
                <li key={suggestion.label}>
                  <button onClick={() => handleClickSuggestion(suggestion)}>
                    {suggestion.label}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
