import { types as t } from 'mobx-state-tree';

export const ListingTypes = ['Buy', 'Rent'] as const;
export const PropertyTypes = [
  'Condominium',
  'House and lot',
  'Warehouse',
  'Land',
] as const;
export const SortTypes = [
  'id',
  'Newest',
  'Price: Low to High',
  'Price: High to Low',
] as const;
export type PropertyType = (typeof PropertyTypes)[number];
export type ListingType = (typeof ListingTypes)[number];
export type SortType = (typeof SortTypes)[number];

export const PropertyListingQueryModel = t
  .model('PropertyListingQueryModel', {
    listingType: t.enumeration('ListingType', ListingTypes),
    propertyType: t.enumeration('PropertyType', PropertyTypes),
    sortType: t.enumeration('SortType', SortTypes),
  })
  .actions((self) => ({
    updatePropertyListingQuery<K extends keyof typeof self>(
      key: K,
      value: (typeof self)[K],
    ) {
      self[key] = value;
    },
  }));
