import { User } from "./user.model";

export interface Review {
    reviewerName: string;
    reviewerImage: string;
    rating: number;
    comment: string;
}

export interface PricingTier {
    name: 'Basic' | 'Standard' | 'Premium';
    price: number;
    deliveryDays: number;
    description: string;
    features: string[];
}

export interface Gig {
    _id: string;
    creator: User;
    title: string;
    rating: number;
    reviews: number;
    price: number;
    image: string;
    highQuality: boolean;
    twoDayDelivery: boolean;
    topRatedSeller: boolean;
    proVerified: boolean;
    description: string;
    reviewsList: Review[];
    pricingTiers: {
        basic: PricingTier;
        standard: PricingTier;
        premium: PricingTier;
    };
}
