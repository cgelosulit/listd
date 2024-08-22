import React, { useEffect, useState, useCallback } from 'react';
import { ImageTile } from './ImageTile';
import { SortableList } from './SortableList';
import { ImageStyle, StyleProp } from 'react-native';
import { SortableGalleryProvider } from '@/context/SortableGalleryProvider';

type Image = {
  id: string;
  file_url: string;
  order: number;
};

type Cols = number;

type Margin = number;

/**
 * id: key of item
 * value: order of item
 */
type Positions = {
  [id: string]: number;
};

type SortableGalleryProps = {
  items: Image[];
  isEditing: boolean;
  onDragEnd?: (item: Image) => void;
  onReorder?: (reorderedItems: Image[]) => void;
  cols?: Cols;
  margin?: Margin;
  imageTileStyles?: StyleProp<ImageStyle>;
};

export const SortableGallery = React.memo(function SortableGallery({
  items,
  isEditing,
  onDragEnd,
  onReorder,
  cols = 3,
  margin = 0,
  imageTileStyles = {},
}: SortableGalleryProps) {
  const [reorderedItems, setReorderedItems] = useState(() =>
    [...items].sort((a, b) => a.order - b.order),
  );

  useEffect(() => {
    setReorderedItems([...items].sort((a, b) => a.order - b.order));
  }, [items]);

  useEffect(() => {
    if (onReorder) {
      onReorder(reorderedItems);
    }
  }, [reorderedItems, onReorder]);

  const handleDragEnd = useCallback(
    (positions: Positions, itemBeingEdited: string, newOrder: number) => {
      const updatedItems = reorderedItems.map((image) => {
        if (image.id === itemBeingEdited) {
          return { ...image, order: newOrder + 1 };
        }
        const currentPosition = positions[image.id];
        return { ...image, order: currentPosition + 1 };
      });

      const sortedItems = updatedItems.sort((a, b) => a.order - b.order);

      setReorderedItems(sortedItems);

      if (onDragEnd) {
        const draggedItem = sortedItems.find(
          (item) => item.id === itemBeingEdited,
        );
        if (draggedItem) {
          onDragEnd(draggedItem);
        }
      }
    },
    [reorderedItems, onDragEnd],
  );

  return (
    <SortableGalleryProvider cols={cols} margin={margin}>
      <SortableList editing={isEditing} onDragEnd={handleDragEnd}>
        {reorderedItems.map((image) => (
          <ImageTile key={image.id} item={image} imageStyle={imageTileStyles} />
        ))}
      </SortableList>
    </SortableGalleryProvider>
  );
});
