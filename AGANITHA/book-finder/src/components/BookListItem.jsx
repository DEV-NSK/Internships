import { Link } from 'react-router-dom';

const BookListItem = ({ book }) => {
  const coverId = book.cover_i;
  const coverUrl = coverId 
    ? `https://covers.openlibrary.org/b/id/${coverId}-S.jpg` 
    : '/placeholder-book-cover.png';
  
  const title = book.title || 'Unknown Title';
  const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
  const firstPublishYear = book.first_publish_year || 'N/A';
  
  return (
    <div className="card p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <img 
            src={coverUrl} 
            alt={`Cover of ${title}`}
            className="w-16 h-24 object-cover"
            onError={(e) => {
              e.target.src = '/placeholder-book-cover.png';
            }}
          />
        </div>
        
        <div className="flex-grow">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-gray-600 mb-1">by {author}</p>
          <p className="text-sm text-gray-500 mb-3">First published: {firstPublishYear}</p>
          
          {book.subject && (
            <div className="mb-3">
              <span className="text-sm font-medium">Subjects: </span>
              <span className="text-sm text-gray-600">
                {book.subject.slice(0, 3).join(', ')}
                {book.subject.length > 3 && '...'}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-shrink-0 ml-4">
          <Link 
            to={`/book/${book.key.split('/').pop()}`}
            state={{ book }}
            className="btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookListItem;