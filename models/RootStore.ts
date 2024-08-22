import { t, Instance } from 'mobx-state-tree';
import { PropertyListingQueryModel } from './PropertyListingQueryModel';

export const RootStore = t.model('RootStore', {
  propertyListingQuery: PropertyListingQueryModel,
});

export type RootStoreType = Instance<typeof RootStore>;

let store: RootStoreType | undefined;

export function useStore() {
  if (!store) {
    store = RootStore.create({
      propertyListingQuery: {
        listingType: 'Buy',
        propertyType: 'Condominium',
        sortType: 'id',
      },
    });
  }
  return store;
}
