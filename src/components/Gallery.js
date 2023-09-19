import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import originalImages from '../data/images';

const DRAGGABLE_IMAGE_TYPE = "IMAGE";

// This is your draggable image
function DraggableImage({ image, index, moveImage }) {
  const [, ref] = useDrag({
    type: DRAGGABLE_IMAGE_TYPE,
    item: { index },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        moveImage(item.index, dropResult.index);
      }
    },
  });

  return (
    <div ref={ref} className="draggable-image">
      <img src={image.src} alt={image.tag} />
      <p>{image.tag}</p>
    </div>
  );
}

function Gallery({ searchTerm = '' }) {
    const [images, setImages] = useState(originalImages);

    const moveImage = (fromIndex, toIndex) => {
        if (fromIndex === toIndex) return;

        const updatedImages = [...images];
        const [movedImage] = updatedImages.splice(fromIndex, 1);
        updatedImages.splice(toIndex, 0, movedImage);

        setImages(updatedImages);
    };

    const [, ref] = useDrop({
        accept: DRAGGABLE_IMAGE_TYPE,
        hover(item, monitor) {
            // Logic to highlight potential drop targets or other hover effects can be added here
        },
        drop(item, monitor) {
            return { name: "Gallery" };
        },
    });

    const filteredImages = images.filter(image => 
        image.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div ref={ref} className="gallery">
            {filteredImages.map((image, index) => (
                <DraggableImage
                  key={image.id}
                  index={index}
                  image={image}
                  moveImage={moveImage}
                />
            ))}
        </div>
    );
}
  
export default Gallery;
