const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState(null);

  if (error) {
    return (
      <div className="error-container p-4 bg-red-50 border border-red-200 rounded">
        <h3 className="text-red-800 font-medium">Error Occurred</h3>
        <p className="text-red-600">{error.message}</p>
        <button 
          onClick={() => setError(null)}
          className="mt-2 text-red-700 hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return children;
};

export { ErrorHandler, ErrorBoundary };
