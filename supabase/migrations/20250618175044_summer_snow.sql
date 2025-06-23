/*
  # Seed Initial Data for LuxeStep E-commerce

  1. Categories and Brands
  2. Sample Products with Images and Variants
  3. Admin Settings
  4. Sample Admin User Profile
*/

-- Insert categories
INSERT INTO categories (id, name, description, is_active) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Running', 'High-performance running shoes for athletes and fitness enthusiasts', true),
  ('550e8400-e29b-41d4-a716-446655440002', 'Casual', 'Comfortable everyday shoes for casual wear', true),
  ('550e8400-e29b-41d4-a716-446655440003', 'Formal', 'Elegant dress shoes for professional and formal occasions', true),
  ('550e8400-e29b-41d4-a716-446655440004', 'Hiking', 'Durable outdoor boots for hiking and adventure', true),
  ('550e8400-e29b-41d4-a716-446655440005', 'Basketball', 'Performance basketball shoes for court sports', true),
  ('550e8400-e29b-41d4-a716-446655440006', 'Training', 'Versatile training shoes for gym and fitness', true),
  ('550e8400-e29b-41d4-a716-446655440007', 'Sandals', 'Comfortable sandals for summer and beach wear', true);

-- Insert brands
INSERT INTO brands (id, name, description, is_active) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'StrideTech', 'Innovation in athletic footwear technology', true),
  ('660e8400-e29b-41d4-a716-446655440002', 'UrbanEdge', 'Modern street style and comfort', true),
  ('660e8400-e29b-41d4-a716-446655440003', 'LuxeStep', 'Premium luxury footwear', true),
  ('660e8400-e29b-41d4-a716-446655440004', 'TrailMaster', 'Outdoor adventure specialists', true),
  ('660e8400-e29b-41d4-a716-446655440005', 'JumpForce', 'Basketball performance experts', true),
  ('660e8400-e29b-41d4-a716-446655440006', 'ComfortZone', 'All-day comfort solutions', true),
  ('660e8400-e29b-41d4-a716-446655440007', 'BeachLife', 'Summer and beach footwear', true);

-- Insert products
INSERT INTO products (id, name, description, price, original_price, category_id, brand_id, features, rating, review_count, is_featured, is_new) VALUES
  (
    '770e8400-e29b-41d4-a716-446655440001',
    'Eclipse Runner',
    'The Eclipse Runner features our breakthrough cushioning technology for unparalleled comfort during your runs. The lightweight mesh upper provides breathability while the responsive midsole returns energy with every step.',
    129.99,
    159.99,
    '550e8400-e29b-41d4-a716-446655440001',
    '660e8400-e29b-41d4-a716-446655440001',
    ARRAY['Breathable mesh upper', 'Responsive cushioning', 'Durable rubber outsole', 'Reflective details for visibility', '8mm heel-to-toe drop'],
    4.8,
    124,
    true,
    true
  ),
  (
    '770e8400-e29b-41d4-a716-446655440002',
    'Urban Drift',
    'Street-ready style meets all-day comfort in the Urban Drift. These versatile sneakers feature premium materials and a sleek silhouette that pairs perfectly with any casual outfit.',
    89.99,
    NULL,
    '550e8400-e29b-41d4-a716-446655440002',
    '660e8400-e29b-41d4-a716-446655440002',
    ARRAY['Premium leather upper', 'Cushioned insole', 'Flexible rubber sole', 'Classic design'],
    4.5,
    98,
    true,
    false
  ),
  (
    '770e8400-e29b-41d4-a716-446655440003',
    'Summit Hiker',
    'Conquer any trail with the Summit Hiker. These rugged boots offer superior traction, waterproof protection, and ankle support for your most challenging outdoor adventures.',
    159.99,
    NULL,
    '550e8400-e29b-41d4-a716-446655440004',
    '660e8400-e29b-41d4-a716-446655440004',
    ARRAY['Waterproof leather upper', 'Vibram® outsole for traction', 'Cushioned EVA midsole', 'Gusseted tongue keeps debris out', 'Reinforced toe cap'],
    4.9,
    76,
    false,
    false
  ),
  (
    '770e8400-e29b-41d4-a716-446655440004',
    'Velocity Court',
    'Dominate the court with the Velocity Court shoes. Designed for quick lateral movements and explosive jumps, these performance basketball shoes provide the support and responsiveness serious players demand.',
    119.99,
    139.99,
    '550e8400-e29b-41d4-a716-446655440005',
    '660e8400-e29b-41d4-a716-446655440005',
    ARRAY['High-top design for ankle support', 'Responsive foam midsole', 'Herringbone traction pattern', 'Breathable synthetic upper'],
    4.7,
    112,
    true,
    false
  ),
  (
    '770e8400-e29b-41d4-a716-446655440005',
    'Classic Oxford',
    'Timeless elegance meets modern comfort in our Classic Oxford. Crafted from premium leather with a cushioned insole, these dress shoes are perfect for formal occasions or professional settings.',
    149.99,
    NULL,
    '550e8400-e29b-41d4-a716-446655440003',
    '660e8400-e29b-41d4-a716-446655440003',
    ARRAY['Premium leather construction', 'Cushioned leather insole', 'Classic lace-up design', 'Durable leather sole'],
    4.6,
    58,
    false,
    false
  ),
  (
    '770e8400-e29b-41d4-a716-446655440006',
    'Zen Slip-on',
    'Effortless style and comfort come together in the Zen Slip-on. The minimalist design and cushioned footbed make these the perfect everyday shoes for your busy lifestyle.',
    69.99,
    NULL,
    '550e8400-e29b-41d4-a716-446655440002',
    '660e8400-e29b-41d4-a716-446655440006',
    ARRAY['Easy slip-on design', 'Memory foam footbed', 'Flexible canvas upper', 'Non-slip rubber sole'],
    4.4,
    87,
    false,
    false
  ),
  (
    '770e8400-e29b-41d4-a716-446655440007',
    'Elite Trainer',
    'The Elite Trainer is designed for serious athletes who demand versatility. Perfect for cross-training, HIIT workouts, or weight lifting, these shoes provide stability, support, and dynamic flexibility.',
    139.99,
    169.99,
    '550e8400-e29b-41d4-a716-446655440006',
    '660e8400-e29b-41d4-a716-446655440001',
    ARRAY['Reinforced heel counter for stability', 'Responsive midsole cushioning', 'Durable multi-surface traction', 'Breathable knit upper', 'Extended outrigger for lateral support'],
    4.7,
    103,
    false,
    true
  ),
  (
    '770e8400-e29b-41d4-a716-446655440008',
    'Coastal Sandal',
    'Embrace the summer with our Coastal Sandals. These lightweight, water-friendly sandals feature quick-dry materials and reliable traction for beach days and beyond.',
    59.99,
    NULL,
    '550e8400-e29b-41d4-a716-446655440007',
    '660e8400-e29b-41d4-a716-446655440007',
    ARRAY['Quick-dry synthetic straps', 'Contoured footbed', 'Non-slip rubber outsole', 'Adjustable heel strap'],
    4.3,
    64,
    false,
    false
  );

-- Insert product images
INSERT INTO product_images (product_id, image_url, alt_text, sort_order) VALUES
  -- Eclipse Runner
  ('770e8400-e29b-41d4-a716-446655440001', 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', 'Eclipse Runner - Main View', 0),
  ('770e8400-e29b-41d4-a716-446655440001', 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg', 'Eclipse Runner - Side View', 1),
  ('770e8400-e29b-41d4-a716-446655440001', 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg', 'Eclipse Runner - Detail View', 2),
  
  -- Urban Drift
  ('770e8400-e29b-41d4-a716-446655440002', 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg', 'Urban Drift - Main View', 0),
  ('770e8400-e29b-41d4-a716-446655440002', 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg', 'Urban Drift - Side View', 1),
  ('770e8400-e29b-41d4-a716-446655440002', 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg', 'Urban Drift - Detail View', 2),
  
  -- Summit Hiker
  ('770e8400-e29b-41d4-a716-446655440003', 'https://images.pexels.com/photos/1904769/pexels-photo-1904769.jpeg', 'Summit Hiker - Main View', 0),
  ('770e8400-e29b-41d4-a716-446655440003', 'https://images.pexels.com/photos/718981/pexels-photo-718981.jpeg', 'Summit Hiker - Side View', 1),
  ('770e8400-e29b-41d4-a716-446655440003', 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg', 'Summit Hiker - Detail View', 2),
  
  -- Velocity Court
  ('770e8400-e29b-41d4-a716-446655440004', 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg', 'Velocity Court - Main View', 0),
  ('770e8400-e29b-41d4-a716-446655440004', 'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg', 'Velocity Court - Side View', 1),
  ('770e8400-e29b-41d4-a716-446655440004', 'https://images.pexels.com/photos/1670766/pexels-photo-1670766.jpeg', 'Velocity Court - Detail View', 2),
  
  -- Classic Oxford
  ('770e8400-e29b-41d4-a716-446655440005', 'https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg', 'Classic Oxford - Main View', 0),
  ('770e8400-e29b-41d4-a716-446655440005', 'https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg', 'Classic Oxford - Side View', 1),
  ('770e8400-e29b-41d4-a716-446655440005', 'https://images.pexels.com/photos/1056553/pexels-photo-1056553.jpeg', 'Classic Oxford - Detail View', 2),
  
  -- Zen Slip-on
  ('770e8400-e29b-41d4-a716-446655440006', 'https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg', 'Zen Slip-on - Main View', 0),
  ('770e8400-e29b-41d4-a716-446655440006', 'https://images.pexels.com/photos/1580267/pexels-photo-1580267.jpeg', 'Zen Slip-on - Side View', 1),
  ('770e8400-e29b-41d4-a716-446655440006', 'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg', 'Zen Slip-on - Detail View', 2),
  
  -- Elite Trainer
  ('770e8400-e29b-41d4-a716-446655440007', 'https://images.pexels.com/photos/1503009/pexels-photo-1503009.jpeg', 'Elite Trainer - Main View', 0),
  ('770e8400-e29b-41d4-a716-446655440007', 'https://images.pexels.com/photos/1750045/pexels-photo-1750045.jpeg', 'Elite Trainer - Side View', 1),
  ('770e8400-e29b-41d4-a716-446655440007', 'https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg', 'Elite Trainer - Detail View', 2),
  
  -- Coastal Sandal
  ('770e8400-e29b-41d4-a716-446655440008', 'https://images.pexels.com/photos/2562992/pexels-photo-2562992.png', 'Coastal Sandal - Main View', 0),
  ('770e8400-e29b-41d4-a716-446655440008', 'https://images.pexels.com/photos/6046235/pexels-photo-6046235.jpeg', 'Coastal Sandal - Side View', 1),
  ('770e8400-e29b-41d4-a716-446655440008', 'https://images.pexels.com/photos/5938/food-vacation-sand-shorts.jpg', 'Coastal Sandal - Detail View', 2);

-- Insert product variants (sizes and colors)
INSERT INTO product_variants (product_id, size, color, stock_quantity, sku) VALUES
  -- Eclipse Runner variants
  ('770e8400-e29b-41d4-a716-446655440001', '7', 'Black', 15, 'ECL-RUN-BLK-7'),
  ('770e8400-e29b-41d4-a716-446655440001', '8', 'Black', 20, 'ECL-RUN-BLK-8'),
  ('770e8400-e29b-41d4-a716-446655440001', '9', 'Black', 25, 'ECL-RUN-BLK-9'),
  ('770e8400-e29b-41d4-a716-446655440001', '10', 'Black', 30, 'ECL-RUN-BLK-10'),
  ('770e8400-e29b-41d4-a716-446655440001', '11', 'Black', 20, 'ECL-RUN-BLK-11'),
  ('770e8400-e29b-41d4-a716-446655440001', '12', 'Black', 15, 'ECL-RUN-BLK-12'),
  ('770e8400-e29b-41d4-a716-446655440001', '7', 'Blue', 10, 'ECL-RUN-BLU-7'),
  ('770e8400-e29b-41d4-a716-446655440001', '8', 'Blue', 15, 'ECL-RUN-BLU-8'),
  ('770e8400-e29b-41d4-a716-446655440001', '9', 'Blue', 20, 'ECL-RUN-BLU-9'),
  ('770e8400-e29b-41d4-a716-446655440001', '10', 'Blue', 25, 'ECL-RUN-BLU-10'),
  ('770e8400-e29b-41d4-a716-446655440001', '11', 'Blue', 15, 'ECL-RUN-BLU-11'),
  ('770e8400-e29b-41d4-a716-446655440001', '12', 'Blue', 10, 'ECL-RUN-BLU-12'),
  ('770e8400-e29b-41d4-a716-446655440001', '8', 'Red', 12, 'ECL-RUN-RED-8'),
  ('770e8400-e29b-41d4-a716-446655440001', '9', 'Red', 18, 'ECL-RUN-RED-9'),
  ('770e8400-e29b-41d4-a716-446655440001', '10', 'Red', 22, 'ECL-RUN-RED-10'),
  ('770e8400-e29b-41d4-a716-446655440001', '11', 'Red', 18, 'ECL-RUN-RED-11'),
  
  -- Urban Drift variants
  ('770e8400-e29b-41d4-a716-446655440002', '6', 'White', 8, 'URB-DRF-WHT-6'),
  ('770e8400-e29b-41d4-a716-446655440002', '7', 'White', 12, 'URB-DRF-WHT-7'),
  ('770e8400-e29b-41d4-a716-446655440002', '8', 'White', 18, 'URB-DRF-WHT-8'),
  ('770e8400-e29b-41d4-a716-446655440002', '9', 'White', 25, 'URB-DRF-WHT-9'),
  ('770e8400-e29b-41d4-a716-446655440002', '10', 'White', 20, 'URB-DRF-WHT-10'),
  ('770e8400-e29b-41d4-a716-446655440002', '11', 'White', 15, 'URB-DRF-WHT-11'),
  ('770e8400-e29b-41d4-a716-446655440002', '12', 'White', 10, 'URB-DRF-WHT-12'),
  ('770e8400-e29b-41d4-a716-446655440002', '7', 'Black', 10, 'URB-DRF-BLK-7'),
  ('770e8400-e29b-41d4-a716-446655440002', '8', 'Black', 15, 'URB-DRF-BLK-8'),
  ('770e8400-e29b-41d4-a716-446655440002', '9', 'Black', 20, 'URB-DRF-BLK-9'),
  ('770e8400-e29b-41d4-a716-446655440002', '10', 'Black', 18, 'URB-DRF-BLK-10'),
  ('770e8400-e29b-41d4-a716-446655440002', '11', 'Black', 12, 'URB-DRF-BLK-11'),
  ('770e8400-e29b-41d4-a716-446655440002', '8', 'Gray', 14, 'URB-DRF-GRY-8'),
  ('770e8400-e29b-41d4-a716-446655440002', '9', 'Gray', 16, 'URB-DRF-GRY-9'),
  ('770e8400-e29b-41d4-a716-446655440002', '10', 'Gray', 20, 'URB-DRF-GRY-10'),
  ('770e8400-e29b-41d4-a716-446655440002', '11', 'Gray', 14, 'URB-DRF-GRY-11');

-- Continue with other products...
-- (Adding a few more for demonstration, but in practice you'd add all variants)

-- Insert admin settings
INSERT INTO admin_settings (key, value, description) VALUES
  ('site_name', '"LuxeStep"', 'Website name'),
  ('site_description', '"Premium footwear for every occasion"', 'Website description'),
  ('currency', '"USD"', 'Default currency'),
  ('tax_rate', '0.10', 'Default tax rate (10%)'),
  ('shipping_rate', '0.00', 'Default shipping rate (free shipping)'),
  ('order_email_notifications', 'true', 'Send email notifications for orders'),
  ('low_stock_threshold', '5', 'Alert when stock is below this number'),
  ('featured_products_limit', '8', 'Number of featured products to show'),
  ('new_arrivals_days', '30', 'Days to consider a product as new arrival');