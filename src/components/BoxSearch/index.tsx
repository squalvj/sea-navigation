import { usePortQuery } from "../../hooks/usePortQuery";
import SearchBox, { Suggestion } from "../SearchBox";
import { TCoordinates } from "../../types/coordinates";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width="20px"
    height="20px"
    fill="#FFFFFF"
  >
    <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" />
  </svg>
);

type TProps = {
  query: string;
  placeholder: string;
  handleClickSuggestion: (param: Suggestion<TCoordinates>) => void;
  handleDelete: () => void;
};

const BoxSearch = ({
  query,
  handleClickSuggestion,
  placeholder,
  handleDelete,
}: TProps) => {
  const { loading, error, getPort, suggestions } = usePortQuery(query);
  return (
    <div className="relative">
      <SearchBox
        q={query}
        placeholder={placeholder}
        error={error}
        loading={loading}
        onSearch={getPort}
        handleClickSuggestion={(e) => handleClickSuggestion(e)}
        suggestionsOption={suggestions}
      />
      {query && (
        <button
          onClick={handleDelete}
          className="absolute right-0 top-0 h-full"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default BoxSearch;
