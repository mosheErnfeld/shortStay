export type EmptyStateType = {
  title?: string;
  subtitle?: string;
  shoeReset?: boolean;
};

export type User = {
  id: string;
  username: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  hashedPassword: string | null;
  createdAt: Date;
  updatedAt: Date;
  favoriteIds: string[];
};

export type Listing = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  createdAt: Date;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  userId: string;
  price: number;
};

export type Reservation = {
  id: string;
  userId: string;
  listingId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;
  listing: Listing;
};

export interface EnhancedListing extends Listing {
  reservations: Reservation[];
  user: User;
}
