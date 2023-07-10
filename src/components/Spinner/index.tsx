import "./Spinner.css";

const Spinner = ({ color = "#000" }: { color?: string }) => {
  return (
    <div className="spinner-container">
      <div
        className={`spinner`}
        data-testid="spinner"
        style={{ borderTopColor: color }}
      ></div>
    </div>
  );
};

export default Spinner;
