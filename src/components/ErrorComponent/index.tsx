function ErrorComponent({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex flex-col align-center">
      <p className="text-[#e74c3c] mb-2">Oops something went wrong</p>
      <span onClick={onClick} className="error-cta cursor-pointer">
        Click here to try again
      </span>
    </div>
  );
}

export default ErrorComponent;
