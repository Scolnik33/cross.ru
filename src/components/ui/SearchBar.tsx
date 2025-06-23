import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchProducts } from '../../data/products';
import { Product } from '../../types/product';

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() !== '') {
        setIsLoading(true);
        const foundResults = searchProducts(searchTerm);
        setResults(foundResults);
        setIsLoading(false);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      if (onClose) onClose();
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
    if (onClose) onClose();
  };

  const formatRuble = (value: number) => value.toLocaleString('ru-RU') + ' ₽';

  return (
      <div className="w-full">
        <form onSubmit={handleSubmit} className="relative">
          <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Поиск обуви..."
              className="w-full bg-dark-card border border-dark-border rounded-md py-3 pl-10 pr-10 text-light-muted placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
          <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          {searchTerm && (
              <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X size={18} />
              </button>
          )}
        </form>

        {searchTerm.trim() !== '' && (
            <div className="mt-2 bg-dark-card border border-dark-border rounded-md shadow-lg max-h-96 overflow-y-auto">
              {isLoading ? (
                  <div className="p-4 text-center text-light-muted">Поиск...</div>
              ) : results.length > 0 ? (
                  <ul>
                    {results.map((product) => (
                        <li key={product.id} className="border-b border-dark-border last:border-none">
                          <button
                              onClick={() => handleProductClick(product.id)}
                              className="flex items-center p-3 w-full text-left hover:bg-dark-border transition-colors"
                          >
                            <div className="w-12 h-12 bg-dark-surface rounded overflow-hidden flex-shrink-0">
                              <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-3">
                              <h4 className="text-white font-medium">{product.name}</h4>
                              <p className="text-sm text-light-muted">{formatRuble(product.price)}</p>
                            </div>
                          </button>
                        </li>
                    ))}
                  </ul>
              ) : (
                  <div className="p-4 text-center text-light-muted">Не найдено</div>
              )}
            </div>
        )}
      </div>
  );
};

export default SearchBar;
