// Notice the 'export' keyword here!
export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'veg' | 'non-veg';
  description: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
}