export interface BoundingBox {
  centerX: number;
  centerY: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface PropertyMapSearchQuery {
  minLat: number;
  maxLat: number;
  minLong: number;
  maxLong: number;
  distanceInKilometers: number;
  pointOfInterestLat: number;
  pointOfInterestLong: number;
}

// TODO: check if saan saan gamit tong hayup nato
export type SortMode =
  | 'id'
  | 'newest'
  | 'price-low-to-high'
  | 'price-high-to-low';

export interface PropertyListingSearchQuery {
  propertyType: string;
  listingType: string;
  sortOrder: string;
  priceRangeLow: number;
  priceRangeHigh: number;
  sqmRangeLow: number;
  sqmRangeHigh: number;
}

export interface Property {
  id: number;
  latitude: number;
  longitude: number;
  // TODO: Other properties (temporary)
  primaryImageUrl: string;
  offerType: string;
  title: string;
  price: string;
  formatted_price: string;
  area: string;
  city: string;
  region: string;
  href: string;
}
