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
  distanceInMiles: number;
  pointOfInterestLat: number;
  pointOfInterestLong: number;
}

export interface Property {
  id: number;
  latitude: number;
  longitude: number;
  // Other properties
  primaryImageUrl: string;
  title: string;
  price: string;
  area: string;
  city: string;
  region: string;
}
