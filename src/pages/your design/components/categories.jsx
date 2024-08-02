import tShirtFrontImage from "../../../layouts/images/frontShirt.png";
import tShirtBackImage from "../../../layouts/images/backShirt.png";
import hoodieBackImage from "../../../layouts/images/hoodieBack.png";
import hoodieFrontImage from "../../../layouts/images/hoodieFront.png";
import sweatshotBackImage from "../../../layouts/images/sweatshotBack.png";
import sweatshotFrontImage from "../../../layouts/images/sweatshotFront.png";
import "./../main.css";
import "./../main2.css";
import { forwardRef } from "react";

const categories = {
  31: { frontImage: tShirtFrontImage, backImage: tShirtBackImage },
  32: { frontImage: sweatshotBackImage, backImage: sweatshotFrontImage },
  33: { frontImage: hoodieBackImage, backImage: hoodieFrontImage },
};

export const Categories = forwardRef((props, ref) => {
  const {
    category,
    isFrontView,
    shirtColor,
    photoInputVisible,
    textInputVisible,
    ref2,
  } = props;

  const selectedImage =
    categories[category][isFrontView ? "frontImage" : "backImage"];

  return (
    <div ref={ref} id="tshirt-div">
      <img
        draggable={false}
        src={selectedImage}
        alt="shirt"
        style={{
          background: shirtColor,
        }}
        className="clothes_image"
      />

      <div
        style={{
          display: textInputVisible || photoInputVisible ? "block" : "none",
        }}
        className="drawing-area"
      >
        <div className="canvas-container">
          <canvas
            ref={ref2}
            width={234}
            height={370}
            style={{ border: "2px solid #BEBFC2" }}
          />
        </div>
      </div>
    </div>
  );
});
