
const LoadingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      {/* Main loading container */}
      <div className="flex flex-col items-center space-y-4">
        {/* Spinning circle animation */}
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        
        {/* Loading text */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700">Loading</h2>
          <p className="text-sm text-gray-500">Please wait while we prepare your content...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;