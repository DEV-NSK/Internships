import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [book, setBook] = useState(location.state?.book || null);
  const [loading, setLoading] = useState(!location.state?.book);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (book) return;

    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // First try to get more details using the works API
        const worksResponse = await fetch(
          `https://openlibrary.org/works/${id}.json`
        );
        
        if (!worksResponse.ok) {
          throw new Error('Failed to fetch book details');
        }
        
        const worksData = await worksResponse.json();
        setBook(worksData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id, book]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md">
            <p>Error: {error || 'Book not found'}</p>
            <button 
              onClick={() => navigate(-1)} 
              className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const coverId = book.covers ? book.covers[0] : book.cover_i;
  const coverUrl = coverId 
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` 
    : '/placeholder-book-cover.png';
  
  const title = book.title || 'Unknown Title';
  const author = book.authors ? book.authors.map(a => a.name).join(', ') : 
                book.author_name ? book.author_name.join(', ') : 'Unknown Author';
  const firstPublishYear = book.first_publish_date || book.first_publish_year || 'N/A';
  const description = typeof book.description === 'string' 
    ? book.description 
    : book.description?.value || 'No description available';
  
  const subjects = book.subjects || book.subject || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Results
        </button>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/3 lg:w-1/4">
              <img 
                src={coverUrl} 
                alt={`Cover of ${title}`}
                className="w-full h-auto object-cover md:max-w-xs mx-auto p-8"
                onError={(e) => {
                  e.target.src = '/placeholder-book-cover.png';
                }}
              />
            </div>
            
            <div className="p-8 md:w-2/3 lg:w-3/4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-xl text-gray-600 mb-6">by {author}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">First Published</h3>
                  <p className="text-lg">{firstPublishYear}</p>
                </div>
                
                {book.number_of_pages && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Pages</h3>
                    <p className="text-lg">{book.number_of_pages}</p>
                  </div>
                )}
                
                {book.publishers && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Publisher</h3>
                    <p className="text-lg">{book.publishers.join(', ')}</p>
                  </div>
                )}
                
                {book.publish_date && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Publish Date</h3>
                    <p className="text-lg">{book.publish_date}</p>
                  </div>
                )}
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <div className="prose max-w-none">
                  {description.length > 500 ? (
                    <>
                      <p>{description.substring(0, 500)}...</p>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Read more
                      </button>
                    </>
                  ) : (
                    <p>{description}</p>
                  )}
                </div>
              </div>
              
              {subjects.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {subjects.slice(0, 10).map((subject, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Additional information section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Additional Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {book.identifiers && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Identifiers</h3>
                <ul className="space-y-1">
                  {Object.entries(book.identifiers).map(([key, values]) => (
                    <li key={key}>
                      <span className="font-medium">{key}:</span> {values.join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {book.links && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">External Links</h3>
                <ul className="space-y-2">
                  {book.links.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 flex items-center"
                      >
                        <span>{link.title}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;