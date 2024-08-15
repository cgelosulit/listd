import React from 'react';
import { StyleSheet } from 'react-native';
import ImageCarousel from './ImageCarousel';
import { ExternalLink } from '../common/ExternalLink';
import { Property } from '@/interface';
import { Text, View } from '../common/Themed';

interface PropertyItemProps {
  property: Property;
}

const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const PropertyItem: React.FC<PropertyItemProps> = ({ property }) => {
  return (
    <View style={styles.container}>
      <ImageCarousel source={property.primaryImageUrl} />
      <ExternalLink href={property.href}>
        <Text style={styles.title}>{toTitleCase(property.title)}</Text>
      </ExternalLink>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{property.formatted_price}</Text>
        <Text style={styles.offerType}>{property.offerType}</Text>
      </View>
      <View style={styles.locationContainer}>
        <Text>{property.area}</Text>
        <Text>{property.city},</Text>
        <Text>{property.region}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
  },
  offerType: {
    fontSize: 16,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    gap: 2.5,
  },
});

export default PropertyItem;
