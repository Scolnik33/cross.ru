import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/product';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);
  const { isAuthenticated, user } = useAuth();
  
  // Load wishlist from localStorage when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      const key = `wishlist-${user.id}`;
      const savedWishlist = localStorage.getItem(key);
      
      if (savedWishlist) {
        setItems(JSON.parse(savedWishlist));
      } else {
        setItems([]);
      }
    } else {
      setItems([]);
    }
  }, [isAuthenticated, user]);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated && user) {
      const key = `wishlist-${user.id}`;
      localStorage.setItem(key, JSON.stringify(items));
    }
  }, [items, isAuthenticated, user]);
  
  const addToWishlist = (product: Product) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to your wishlist');
      return;
    }
    
    setItems(prevItems => {
      // Check if product already exists in wishlist
      if (prevItems.some(item => item.id === product.id)) {
        return prevItems;
      }
      
      toast.success('Added to wishlist');
      return [...prevItems, product];
    });
  };
  
  const removeFromWishlist = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.success('Removed from wishlist');
  };
  
  const isInWishlist = (productId: string) => {
    return items.some(item => item.id === productId);
  };
  
  const clearWishlist = () => {
    setItems([]);
  };
  
  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};