import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 text-8xl">📚</div>
        <div className="absolute top-40 right-20 text-6xl">🔍</div>
        <div className="absolute bottom-32 left-24 text-7xl">📖</div>
        <div className="absolute bottom-40 right-16 text-5xl">✨</div>
        <div className="absolute top-1/3 left-1/4 text-6xl">📕</div>
      </div>

      <main className="flex-grow flex flex-col items-center justify-center px-4 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary-800 mb-4 drop-shadow-md">
            Book Finder
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-light">
            Discover millions of books from around the world. Search by title, author, or subject.
          </p>
        </div>
        
        <div className="w-full max-w-2xl">
          <form onSubmit={handleSearch} className="flex flex-col items-center">
            <div className="relative w-full shadow-lg rounded-full">
              <input
                type="text"
                placeholder="Search for books by title, author, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-lg bg-white/90 backdrop-blur-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white p-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
        {/* Popular searches section */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Popular Searches</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Fiction', 'Science', 'History', 'Biography', 'Fantasy', 'Mystery'].map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setSearchQuery(topic);
                  navigate(`/search?q=${encodeURIComponent(topic)}`);
                }}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-700 border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-200"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;