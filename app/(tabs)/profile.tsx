import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/common/Themed';
import { SortableGallery } from '@/components/test_components/image_sortable_list/SortableGallery';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <SortableGallery
        isEditing={true}
        items={[
          {
            id: '1',
            order: 1,
            file_url: 'https://via.placeholder.com/150',
          },
          {
            id: '2',
            order: 2,
            file_url: 'https://via.placeholder.com/150',
          },
          {
            id: '3',
            order: 3,
            file_url: 'https://via.placeholder.com/150',
          },
          {
            id: '4',
            order: 4,
            file_url: 'https://via.placeholder.com/150',
          },
          {
            id: '5',
            order: 5,
            file_url: 'https://via.placeholder.com/150',
          },
          {
            id: '6',
            order: 6,
            file_url: 'https://via.placeholder.com/150',
          },
        ]}
        onDragEnd={(items) => console.log(items)}
        onReorder={(x) => console.log(x)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
