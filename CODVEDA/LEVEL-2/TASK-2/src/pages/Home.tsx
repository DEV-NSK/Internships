import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { fetchData } from '../services/api';
import useDebouncedSearch from '../hooks/useDebouncedSearch';

const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const debouncedSearchTerm = useDebouncedSearch(searchTerm, 500);

    useEffect(() => {
        const fetchApiData = async () => {
            if (!debouncedSearchTerm) {
                setData([]);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const result = await fetchData(debouncedSearchTerm);
                setData(result);
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchApiData();
    }, [debouncedSearchTerm]);

    return (
        <div>
            <h1>Search Data</h1>
            <SearchBar onSearch={setSearchTerm} />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{JSON.stringify(item)}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;