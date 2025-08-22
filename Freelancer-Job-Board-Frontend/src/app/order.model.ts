export interface Order {
  _id: string;
  gig: string; // Reference to Gig ID
  buyer: string; // Reference to User ID (buyer)
  freelancer: string; // Reference to User ID (freelancer)
  orderDate: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  price: number;
}
