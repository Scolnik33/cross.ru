import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import { products, getAllCategories, getAllBrands } from '../data/products';
import { Product, ProductFilter } from '../types/product';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSneakers, selectSneakers } from '../redux/slices/sneaker';
import { AppDispatch } from '../redux/store';

const ProductsPage: React.FC = () => {
  // const [searchParams] = useSearchParams();
  // const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const [filters, setFilters] = useState<ProductFilter>({
  //   category: [],
  //   brand: [],
  //   priceRange: { min: 0, max: 50_000 },
  //   sizes: [],
  //   colors: []
  // });

  // const categories = getAllCategories();
  // const brands = getAllBrands();
  
  // // Get all available sizes and colors
  // const allSizes = Array.from(new Set(products.flatMap(p => p.sizes))).sort();
  // const allColors = Array.from(new Set(products.flatMap(p => p.colors))).sort();
  
  // // Initialize filters from URL params
  // useEffect(() => {
  //   const newFilters: ProductFilter = { ...filters };
    
  //   // Get category from URL
  //   const categoryParam = searchParams.get('category');
  //   if (categoryParam) {
  //     newFilters.category = [categoryParam];
  //   }
    
  //   // Get brand from URL
  //   const brandParam = searchParams.get('brand');
  //   if (brandParam) {
  //     newFilters.brand = [brandParam];
  //   }
    
  //   // Get search query
  //   const searchQuery = searchParams.get('search');
    
  //   setFilters(newFilters);
    
  //   // Apply filters to products
  //   filterProducts(newFilters, searchQuery || '');
  // }, [searchParams]);
  
  // // Apply filters to products
  // const filterProducts = (currentFilters: ProductFilter, searchQuery: string = '') => {
  //   let result = [...products];
    
  //   // Apply search query
  //   if (searchQuery) {
  //     const query = searchQuery.toLowerCase();
  //     result = result.filter(
  //       p => 
  //         p.name.toLowerCase().includes(query) || 
  //         p.description.toLowerCase().includes(query) ||
  //         p.brand.toLowerCase().includes(query) ||
  //         p.category.toLowerCase().includes(query)
  //     );
  //   }
    
  //   // Apply category filter
  //   if (currentFilters.category && currentFilters.category.length > 0) {
  //     result = result.filter(p => currentFilters.category!.includes(p.category));
  //   }
    
  //   // Apply brand filter
  //   if (currentFilters.brand && currentFilters.brand.length > 0) {
  //     result = result.filter(p => currentFilters.brand!.includes(p.brand));
  //   }
    
  //   // Apply price range filter
  //   if (currentFilters.priceRange) {
  //     result = result.filter(
  //       p => p.price >= currentFilters.priceRange!.min && p.price <= currentFilters.priceRange!.max
  //     );
  //   }
    
  //   // Apply sizes filter
  //   if (currentFilters.sizes && currentFilters.sizes.length > 0) {
  //     result = result.filter(p => 
  //       p.sizes.some(size => currentFilters.sizes!.includes(size))
  //     );
  //   }
    
  //   // Apply colors filter
  //   if (currentFilters.colors && currentFilters.colors.length > 0) {
  //     result = result.filter(p => 
  //       p.colors.some(color => currentFilters.colors!.includes(color))
  //     );
  //   }
    
  //   setFilteredProducts(result);
  // };
  
  // // Toggle filter selection
  // const toggleFilter = (type: keyof ProductFilter, value: string) => {
  //   const newFilters = { ...filters };
    
  //   if (type === 'category' || type === 'brand' || type === 'sizes' || type === 'colors') {
  //     if (!newFilters[type]) {
  //       newFilters[type] = [];
  //     }
      
  //     // @ts-ignore - TypeScript doesn't understand that we've initialized the array
  //     if (newFilters[type].includes(value)) {
  //       // @ts-ignore
  //       newFilters[type] = newFilters[type].filter(item => item !== value);
  //     } else {
  //       // @ts-ignore
  //       newFilters[type] = [...newFilters[type], value];
  //     }
  //   }
    
  //   setFilters(newFilters);
  //   filterProducts(newFilters);
  // };
  
  // // Update price range
  // const updatePriceRange = (min: number, max: number) => {
  //   const newFilters = { 
  //     ...filters, 
  //     priceRange: { min, max } 
  //   };
  //   setFilters(newFilters);
  //   filterProducts(newFilters);
  // };
  
  // // Clear all filters
  // const clearFilters = () => {
  //   const newFilters: ProductFilter = {
  //     category: [],
  //     brand: [],
  //     priceRange: { min: 0, max: 50_000 },
  //     sizes: [],
  //     colors: []
  //   };

  //   setFilters(newFilters);
  //   filterProducts(newFilters);
  // };
  
  // // Toggle mobile filter sidebar
  // const toggleFilterSidebar = () => {
  //   setIsFilterOpen(!isFilterOpen);
  // };

  const dispatch = useDispatch<AppDispatch>();
  const { itemsSneakers } = useSelector(selectSneakers);

  console.log(itemsSneakers)

  useEffect(() => {
    dispatch(fetchSneakers());
  }, []);

  return (
    <div className="bg-dark min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Весь ассортимент</h1>
          <p className="text-light-muted mt-2">
            Найдите свою идеальную пару из нашей коллекции
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <p className="text-light-muted">
              {itemsSneakers.length} найдено
            </p>
            <Button
              variant="outline"
              size="sm"
              // onClick={toggleFilterSidebar}
              icon={<SlidersHorizontal size={16} />}
            >
              Фильтры
            </Button>
          </div>
          
          {/* Filter Sidebar */}
          {/* <aside 
            className={`
              w-full lg:w-64 flex-shrink-0 bg-dark-card rounded-lg p-6 
              ${isFilterOpen ? 'fixed inset-0 z-50 overflow-y-auto' : 'hidden lg:block'}
            `} */}
          {/* > */}
            {/* Mobile Filter Header */}
            {/* {isFilterOpen && (
              <div className="flex justify-between items-center mb-4 lg:hidden">
                <h2 className="text-xl font-semibold text-white">Фильтры</h2>
                <button
                  onClick={toggleFilterSidebar}
                  className="text-light-muted hover:text-white p-1"
                  aria-label="Close filters"
                >
                  <X size={24} />
                </button>
              </div> */}
            {/* )} */}
            
            {/* <div className="space-y-6">
              <div className="hidden lg:flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Фильтры</h2>
                <button
                  // onClick={clearFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Очистить все
                </button>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-3">Цена</h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="text-light-muted text-sm">₽{filters.priceRange?.min.toLocaleString('ru-RU')}</span>
                    <span className="text-light-muted text-sm">₽{filters.priceRange?.max.toLocaleString('ru-RU')}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={filters.priceRange?.max}
                    onChange={(e) => updatePriceRange(filters.priceRange?.min || 0, parseInt(e.target.value, 10))}
                    className="w-full accent-primary"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-3">Категории</h3>
                <div className="space-y-2">
                  {itemsSneakers.category.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.category?.includes(category) || false}
                        onChange={() => toggleFilter('category', category)}
                        className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary focus:ring-opacity-25"
                      />
                      <span className="ml-2 text-light-muted">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-3">Бренды</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.brand?.includes(brand) || false}
                        onChange={() => toggleFilter('brand', brand)}
                        className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary focus:ring-opacity-25"
                      />
                      <span className="ml-2 text-light-muted">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-3">Размеры</h3>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      className={`
                        w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium
                        ${filters.sizes?.includes(size) 
                          ? 'bg-primary text-white' 
                          : 'bg-dark-surface text-light-muted hover:bg-dark-border'}
                      `}
                      onClick={() => toggleFilter('sizes', size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-3">Цвета</h3>
                <div className="space-y-2">
                  {allColors.map(color => (
                    <label key={color} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.colors?.includes(color) || false}
                        onChange={() => toggleFilter('colors', color)}
                        className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary focus:ring-opacity-25"
                      />
                      <span className="ml-2 text-light-muted">{color}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {isFilterOpen && (
                <div className="pt-4 mt-6 border-t border-dark-border lg:hidden">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={toggleFilterSidebar}
                  >
                    Применить фильтры
                  </Button>
                </div>
              )}
            </div>
          </aside> */}
          
          <div className="flex-grow">
            <div className="hidden lg:flex justify-between items-center mb-6">
              <p className="text-light-muted">
                {itemsSneakers.length} найдено
              </p>
            </div>
            
            {itemsSneakers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {itemsSneakers.map(product => (
                  <ProductCard key={product._id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Filter size={48} className="mx-auto text-light-muted mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Не найдено</h3>
                <p className="text-light-muted mb-6">
                  Попробуйте настроить фильтры или критерии поиска
                </p>
                {/* <Button variant="outline" onClick={clearFilters}>
                  Удалить все фильтры
                </Button> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;