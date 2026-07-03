import type { FoodItem } from './types';

export const menuItems: FoodItem[] = [
  {
    id: 'v1',
    name: 'Paneer Tikka Masala',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=60',
    category: 'veg',
    description: 'Grilled paneer in a rich tomato gravy.',
  },
  {
    id: 'v2',
    name: 'Veggie Supreme Pizza',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1604381538336-b5e59c30b283?auto=format&fit=crop&w=500&q=60',
    category: 'veg',
    description: 'Loaded with bell peppers, olives, and mushrooms.',
  },
  {
    id: 'nv1',
    name: 'Chicken Biryani',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=60',
    category: 'non-veg',
    description: 'Aromatic basmati rice cooked with tender chicken and spices.',
  },
  {
    id: 'nv2',
    name: 'Grilled Salmon',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=500&q=60',
    category: 'non-veg',
    description: 'Fresh Atlantic salmon with a lemon butter glaze.',
  },
];