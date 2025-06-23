import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import { useWishlist } from '../contexts/WishlistContext';

const WishlistPage: React.FC = () => {
  const { items, clearWishlist } = useWishlist();
  const navigate = useNavigate();
  
  return (
    <div className="bg-dark min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Твои желания</h1>
          
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearWishlist}
            >
              Очистить
            </Button>
          )}
        </div>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-dark-card rounded-lg p-12 text-center">
            <Heart size={64} className="mx-auto text-light-muted mb-4" />
            <h2 className="text-2xl font-medium text-white mb-2">Твои желанные пустые</h2>
            <p className="text-light-muted mb-8">
              Сохраните понравившиеся товары в списке желаний, чтобы легко найти их позже.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/products')}
              icon={<ShoppingBag size={18} />}
            >
              Посмотреть товары
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;