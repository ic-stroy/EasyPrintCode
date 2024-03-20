import React, { useState } from 'react';
import { fabric } from 'fabric';

function YourDesign() {
  const [canvas, setCanvas] = useState(null);
  const [image, setImage] = useState(null);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const imgObj = new Image();
      imgObj.src = e.target.result;
      imgObj.onload = () => {
        // Create fabric image object
        const fabricImage = new fabric.Image(imgObj);
        fabricImage.set({
          left: 10,
          top: 10,
        });
        canvas.add(fabricImage);
        setImage(fabricImage);
      };
    };

    reader.readAsDataURL(file);
  };

  // Function to delete the image
  const deleteImage = () => {
    if (image) {
      canvas.remove(image);
      setImage(null);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={deleteImage}>Delete Image</button>
      <canvas
        id="fabric-canvas"
        ref={(c) => {
          if (c && !canvas) {
            const newCanvas = new fabric.Canvas(c);
            setCanvas(newCanvas);
          }
        }}
        width={800}
        height={600}
      ></canvas>
    </div>
  );
}

export default YourDesign;