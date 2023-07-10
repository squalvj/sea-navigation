import React, { useState, useCallback, useEffect } from "react";
import debounce from "./../../utils/debounce";
import TextField from "./../TextField";
import Spinner from "./../Spinner";
import ErrorComponent from "./../ErrorComponent";
export type Suggestion<T> = {
  label: string;
  value: T;
};

type SearchBoxProps<T> = {
  onSearch: (query: string) => Promise<void>;
  suggestionsOption: Suggestion<T>[] | [];
  handleClickSuggestion: (suggestion: Suggestion<T>) => void;
  loading: boolean;
  error: string;
  placeholder: string;
  q: string;
};

const SearchBox: React.FC<SearchBoxProps<any>> = ({
  onSearch,
  suggestionsOption,
  loading,
  error,
  handleClickSuggestion,
  placeholder,
  q,
}) => {
  const [query, setQuery] = useState(q);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (query !== q) setQuery(q);
  }, [q]);

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
      <div className="wrapper-searchbox relative">
        <TextField
          onFocus={toggle}
          onBlur={toggle}
          onChange={handleChange}
          value={query}
          placeholder={placeholder}
        />
        {query.length >= 3 && isShow && (
          <ul className="bg-white rounded-lg text-black p-2">
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
