import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const coverId = book.cover_i;
  const coverUrl = coverId 
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` 
    : '/placeholder-book-cover.png';
  
  const title = book.title || 'Unknown Title';
  const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
  const firstPublishYear = book.first_publish_year || 'N/A';
  const isbn = book.isbn ? book.isbn[0] : null;
  
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      <div className="flex-shrink-0">
        <img 
          src={coverUrl} 
          alt={`Cover of ${title}`}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/placeholder-book-cover.png';
          }}
        />
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 mb-2">by {author}</p>
        <p className="text-sm text-gray-500 mb-4">First published: {firstPublishYear}</p>
        
        <div className="mt-auto">
          <Link 
            to={`/book/${book.key.split('/').pop()}`}
            state={{ book }}
            className="btn-primary w-full text-center block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;