import React, { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import HeaderMainCopy from "../../components/header copy";
import "./main.css";
import "./main2.css";
import addToBasketImage from "../../layouts/icons/add_to_basket.svg";
import frontImage from "../../layouts/images/frontShirt.png";
import backImage from "../../layouts/images/backShirt.png";
import hoodie_back_black from "../../layouts/images/hoodieBack.png";
import hoodie_front_black from "../../layouts/images/hoodieFront.png";
import sweatshot_back_black from "../../layouts/images/sweatshotBack.png";
import sweatshot_front_black from "../../layouts/images/sweatshotFront.png";
import hoodie_back_white from "../../layouts/images/hoodieBack.png";
import hoodie_front_white from "../../layouts/images/hoodieFront.png";
import sweatshot_back_white from "../../layouts/images/sweatshotBack.png";
import sweatshot_front_white from "../../layouts/images/sweatshotFront.png";
import backImageBlack from "../../layouts/images/back_black.png";
import frontImageBlack from "../../layouts/images/black_front.png";
import modal_image1 from "../../layouts/images/design_modal/first.svg";
import modal_image2 from "../../layouts/images/design_modal/second.svg";
import modal_image3 from "../../layouts/images/design_modal/third.svg";
import modal_image_size1 from "../../layouts/images/design_modal/first_size.svg";
import register_image from "../../layouts/images/43.svg";
import verifed from "../../layouts/images/green_verifed.svg";
import { Slider } from "@mui/material";
import Reveal from "../../animation";
import { SketchPicker } from "react-color";
import { fabric } from "fabric";
import { useScreenshot } from "use-react-screenshot";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ToastComponent from "../../components/toast";
import { Categories } from "./components/categories";
import LeftArrovSVG from "../../layouts/icons/left-arrow";
import RightArrovSVG from "../../layouts/icons/right-arrow";
import { Layers } from "./components/layers";
import DownArrowSVG from "../../layouts/icons/down-arrow";
import RefreshSVG from "../../layouts/icons/refresh";
import ImageSVG from "../../layouts/icons/image";
import PlusSVG from "../../layouts/icons/plus";
import LayerTSVG from "../../layouts/icons/layer-t";
import MagicStickSVG from "../../layouts/icons/magic-stick";
import UpArrowSVG from "../../layouts/icons/up-arrow";
import { v4 as uuid } from "uuid";
import CodeVerificationInputLaptop from "../../components/code verifed";

const YourDesign = () => {
  // const [color, setColor] = useState("#fff");
  // const pickerRef = useRef(null);
  // const [pickerColor, setPickerColor] = useState(color);

  // const [trashCardData, setTrashCardData] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [printImage, setPrintImage] = useState([]);
  const [categorySize, setCategorySize] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [size, setSize] = useState("xxs");
  // const [category, setCategory] = useState("Футболка");
  const [shirtColor, setShirtColor] = useState("#FFFFFF");
  const [isFrontView, setIsFrontView] = useState(true);
  const [isColorChange, setIsColorChange] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [isCategoryChange, setIsCategoryChange] = useState(false);
  const [textInputVisible, setTextInputVisible] = useState(false);
  const [photoInputVisible, setPhotoInputVisible] = useState(false);

  // const [shirtTypePrice, setShirtTypePrice] = useState();
  // const [shirtTypeName, setShirtTypeName] = useState(
  //   localStorage.getItem("selectedLanguage") === "ru" ? "стандарт" : "standart",
  // );
  // const [shirtTypeId, setShirtTypeId] = useState(0);
  const [shirtTypeId0, setShirtTypeId0] = useState(false);
  const [shirtTypeId1, setShirtTypeId1] = useState(false);
  const [shirtTypeId2, setShirtTypeId2] = useState(false);
  // const [visible] = useState(false);
  const [isPhoneNumberEntered, setIsPhoneNumberEntered] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCodeEntered, setIsCodeEntered] = useState(false);
  const [isSuccesEntered, setIsSuccesEntered] = useState(false);
  const [isRegisterEntered, setIsRegisterEntered] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: "",
    password: "",
    passwordConfirmation: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isLoginEntered, setIsLoginEntered] = useState(false);
  const [isFirstEntered, setIsFirstEntered] = useState(true);

  const [textInputValue] = useState("");
  const [imeyg, setImeyg] = useState("");
  const [categoryChange, setCategoryChange] = useState(31);
  const [showPicker] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [radius, setRadius] = useState(0);
  const token = localStorage.getItem("token");
  const [scale, setScale] = useState(new Map([["imageScale", new Map()]]));
  const [TextParams, setTextParams] = useState(
    new Map([
      ["color", new Map()],
      ["fontSize", new Map()],
      ["fontFamily", new Map()],
      ["text", new Map()],
    ]),
  );
  const [headText, setHeadText] = useState([]);
  const [textUniqueKey, setTextUniqueKey] = useState("");
  const ref = useRef(null);
  const refBack = useRef(null);
  const canvasRef = useRef(null);
  const [isCodeEntered2, setIsCodeEntered2] = useState(false);
  const [isForgetPasswordEntered, setIsForgetPasswordEntered] = useState(false);
  const [isForgetPasswordEntered2, setIsForgetPasswordEntered2] = useState(false);
  const [shirtTypeId, setShirtTypeId] = useState(0);
  const [shirtTypePrice, setShirtTypePrice] = useState();
  const [shirtTypeName, setShirtTypeName] = useState(localStorage.getItem('selectedLanguage') === 'ru' ? 'Тип: стандарт' : 'Turi: standart');
  const [countHeader, setCountHeader] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [visible, setVisible] = useState(false) 
  let [image, takeScreenshot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
    width: "600px",
    height: "560px",
  });
  let [imageBack, takeScreenshotBack] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
    width: "600px",
    height: "560px",
  });

  // const [countHeader, setCountHeader] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      setCanvas(canvas);

      return () => {
        canvas.dispose();
      };
    }
  }, []);

  const TextParamsChanger = ({ type, value, uniqueKey, del }) => {
    setTextParams((prev) => {
      const newMap = new Map(prev);
      if (del) {
        newMap.get(type).delete(uniqueKey);
      } else newMap.get(type).set(uniqueKey ?? textUniqueKey, value);
      return newMap;
    });
  };

  const ImageParamsChanger = ({ type, value, uniqueKey }) => {
    setScale((prev) => {
      const newMap = new Map(prev);
      newMap.get(type).set(uniqueKey ?? textUniqueKey, value);
      return newMap;
    });
  };

  const deleteElement = (uniqueKey) => {
    const objectToSelect = canvas
      .getObjects()
      .find((obj) => obj.uniqueKey === uniqueKey);

    if (objectToSelect) {
      canvas.remove(objectToSelect);
      setHeadText(canvas.getObjects());

      if (objectToSelect.type === "text") {
        TextParamsTypes.forEach(({ label }) =>
          TextParamsChanger({ type: label, uniqueKey, del: true }),
        );
      }
    }
    canvas.renderAll();
  };

  const dublicateElement = (uniqueKey) => {
    const objectToSelect = canvas
      .getObjects()
      .find((obj) => obj.uniqueKey === uniqueKey);

    const uniqueId = uuid();

    if (!textUniqueKey) {
      setTextUniqueKey(uniqueKey);
    }

    if (objectToSelect.type === "image") {
      const imgElement = new Image();
      imgElement.src = objectToSelect.getSrc();

      imgElement.onload = function () {
        const newElement = new fabric.Image(imgElement);

        const scaleFactor = 234 / newElement.width;
        newElement.scale(scaleFactor);
        newElement.uniqueKey = uniqueId;

        ImageParamsChanger({
          type: "imageScale",
          value: 0,
          uniqueKey: uniqueId,
        });

        ControlVisible.forEach((item) => {
          newElement.setControlVisible(item.corner, item.value);
        });

        newElement.set(ControlOptions);
        canvas.add(newElement);
        canvas.renderAll();
        setHeadText((prev) => [...prev, newElement]);
      };
      setPhotoInputVisible(true);
    }

    if (objectToSelect.type === "text") {
      const newElement = new fabric.Text(objectToSelect.text, {
        fill: objectToSelect.fill,
        fontFamily: objectToSelect.fontFamily,
        fontSize: objectToSelect.fontSize,
        uniqueKey: uniqueId,
      });

      setHeadText((prev) => [
        ...(canvas.getObjects().length ? prev : []),
        newElement,
      ]);

      TextParamsTypes.forEach(({ label, name }) =>
        TextParamsChanger({
          type: label,
          value: objectToSelect[name],
          uniqueKey: uniqueId,
        }),
      );

      ControlVisible.forEach((item) => {
        newElement.setControlVisible(item.corner, item.value);
      });
      newElement.set(ControlOptions);

      canvas.add(newElement);
      canvas.renderAll();
    }

    // ControlVisible.forEach((item) => {
    //   newElement.setControlVisible(item.corner, item.value);
    // });
    // newElement.set(ControlOptions);

    // canvas.add(newElement);
    // canvas.renderAll();
  };

  useEffect(() => {
    if (headText.length) {
      const objectToSelect = canvas
        .getObjects()
        .find((obj) => obj.uniqueKey === textUniqueKey);

      if (objectToSelect.type === "text") {
        const prevTexts = canvas.getObjects();

        prevTexts.forEach((textObj) => {
          canvas.remove(textObj);
        });

        const newText = new fabric.Text(
          TextParams.get("text").get(textUniqueKey),
          {
            ...prevTexts.find((item) => item.uniqueKey === textUniqueKey),
            text: TextParams.get("text").get(textUniqueKey) || "EasyText",
            fill: TextParams.get("color").get(textUniqueKey) || "#000",
            fontFamily:
              TextParams.get("fontFamily").get(textUniqueKey) || "Bebas Neue",
            fontSize: TextParams.get("fontSize").get(textUniqueKey) || "30",
            uniqueKey: textUniqueKey,
          },
        );

        const updatedTexts = [...prevTexts];
        updatedTexts[
          updatedTexts
            .map((item) => item.uniqueKey)
            .findIndex((item) => item === textUniqueKey)
        ] = newText;

        setHeadText(updatedTexts);

        updatedTexts.forEach((textObj) => {
          canvas.add(textObj);
        });

        canvas.renderAll();
      }
    }

    if (!textInputVisible && textInputValue) {
      const existingData = JSON.parse(localStorage.getItem("textData")) || [];
      const newTextData = [...existingData, textInputValue];
      localStorage.setItem("textData", JSON.stringify(newTextData));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas, TextParams]);

  useEffect(() => {
    if (canvas) {
      const prevTexts = canvas.getObjects();

      prevTexts.forEach((item) => {
        item.set(
          "visible",
          item.isFront === "front" && isFrontView
            ? true
            : item.isFront === "back" && !isFrontView
            ? true
            : false,
        );
      });

      canvas.renderAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFrontView]);

  const addText = () => {
    const uniqueKey = uuid();

    if (!textUniqueKey) {
      setTextUniqueKey(uniqueKey);
    }

    const newText = new fabric.Text("EasyPrint", {
      fill: "#000",
      fontFamily: "Bebas Neue",
      fontSize: "30",
      uniqueKey: uniqueKey,
      isFront: isFrontView ? "front" : "back",
    });

    ControlVisible.forEach((item) =>
      newText.setControlVisible(item.corner, item.value),
    );

    newText.set(ControlOptions);
    canvas.add(newText);
    setHeadText((prev) => [...prev, newText]);

    TextParamsChanger({ type: "fontSize", value: "30", uniqueKey });
    TextParamsChanger({ type: "fontFamily", value: "Bebas Neue", uniqueKey });
    TextParamsChanger({ type: "text", value: "EasyPrint", uniqueKey });
    TextParamsChanger({ type: "color", value: "#000000", uniqueKey });

    canvas.renderAll();
    setTextInputVisible(true);
  };

  useEffect(() => {
    if (canvas) {
      const handleObjectSelected = (e) => {
        const selectedObject = e.target;

        if (selectedObject && selectedObject.type === "text") {
          setTextUniqueKey(selectedObject.uniqueKey);
          setPhotoInputVisible(false);
          setTextInputVisible(true);
        } else if (selectedObject && selectedObject.type === "image") {
          setTextUniqueKey(selectedObject.uniqueKey);
          setImeyg(selectedObject.getSrc());
          setTextInputVisible(false);
          setPhotoInputVisible(true);
        }
      };

      canvas.on("selection:created", handleObjectSelected);
      canvas.on("selection:updated", handleObjectSelected);

      return () => {
        canvas.off("selection:created", handleObjectSelected);
        canvas.off("selection:updated", handleObjectSelected);
      };
    }
  }, [canvas]);

  const SetActiveLayer = (desiredUniqueKey) => {
    const objectToSelect = canvas
      .getObjects()
      .find((obj) => obj.uniqueKey === desiredUniqueKey);

    if (objectToSelect) {
      setTextUniqueKey(objectToSelect.uniqueKey);
      canvas.setActiveObject(objectToSelect);
      canvas.renderAll();
    }
  };

  // const _onReadyBack = (canvas) => {
  //   canvas.backgroundColor = "transparent";
  //   canvas.setDimensions({
  //     width: 300,
  //     height: 300,
  //     left: 10,
  //   });
  //   canvas.add(headTextBack);
  //   canvas.renderAll();
  //   if (typeof onReadyBack === "function") {
  //     onReadyBack(canvas);
  //   } else {
  //     console.error("onReadyBack is not a function");
  //   }
  // };

  // useEffect(() => {
  //   const storedCount = localStorage.getItem("counterValue");
  //   if (storedCount) {
  //     setCountHeader(Number(storedCount));
  //   }
  // }, []);

  localStorage.setItem("selectedColor", "#000000");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "Создайте свой собственный дизайн";
  }, []);

  const addCustomPicture = (e) => {
    const reader = new FileReader();
    const uniqueKey = uuid();

    reader.onload = function (event) {
      const imgObj = new Image();
      imgObj.src = event.target.result;

      setImeyg(event.target.result);

      fabric.Image.fromURL(event.target.result, (img) => {
        const scaleFactor = 234 / img.width;
        img.scale(scaleFactor);
        img.uniqueKey = uniqueKey;
        img.isFront = isFrontView ? "front" : "back";

        ControlVisible.forEach((item) => {
          img.setControlVisible(item.corner, item.value);
        });

        img.set(ControlOptions);
        canvas.add(img);
        setTextUniqueKey(uniqueKey);
        setHeadText((prev) => [...prev, img]);
        ImageParamsChanger({ type: "imageScale", value: 0, uniqueKey });
        canvas.renderAll();
      });
      setPhotoInputVisible(true);
    };

    setPrintImage(e.target.files[0]);

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageClick = (image, filter) => {
    if (selectedImage === image) {
      setSelectedImage(null);
    } else {
      setSelectedImage(image);
    }

    const objects = canvas.getObjects("image");
    const img = objects.find((obj) => obj.uniqueKey === textUniqueKey);

    if (img) {
      const filterList = new fabric.Image.filters.Composed({
        subFilters: [
          ...filter.map(
            (item) =>
              new fabric.Image.filters[item.label]({
                [item.valueLabel]: item.value,
              }),
          ),
        ],
      });

      img.filters = [filterList];
      img.applyFilters();
      canvas.renderAll();
    }
  };

  useEffect(() => {
    if (!isFrontView && refBack.current) {
      takeScreenshotBack(refBack.current).catch((error) => {
        console.error("Screenshot capture failed:", error);
      });
    }
  }, [isFrontView, takeScreenshotBack]);

  let getImage = () => {
    setIsFrontView(true);
  
    setTimeout(async () => {
      if (ref.current && isFrontView) {
        takeScreenshot(ref.current)
          .then(() => setIsFrontView(false))
          .catch((error) => {
            console.error("Screenshot capture failed:", error);
          });
      }
    }, 1000);
  
    if (image && imageBack) {
      const elements = document.getElementsByClassName("addToBasket_image");
  
      if (elements.length > 0) {
        const element = elements[0];
        element.setAttribute("data-bs-target", "#exampleModalToggle5");
        element.setAttribute("data-bs-toggle", "modal");
      } else {
        console.error("Element with class 'addToBasketImage' not found.");
      }
    }
  };  

  // let getImage = async () => {
  //   setIsFrontView(true);

  //   if (ref.current && isFrontView) {
  //     await takeScreenshot(ref.current)
  //       .then(() => setIsFrontView(false))
  //       .then(() => {
  //         if (refBack.current && !isFrontView) {
  //           takeScreenshotBack(refBack.current).catch((error) => {
  //             console.error("Screenshot capture failed:", error);
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Screenshot capture failed:", error);
  //       });
  //   }
  // };

  const handleScaleChange = (newValue) => {
    const val = newValue.target.value;
    ImageParamsChanger({ type: "imageScale", value: val });
    // setScale(val);

    const objects = canvas.getObjects("image");
    const img = objects.find((obj) => obj.uniqueKey === textUniqueKey);

    if (img) {
      const newScaleFactor = (234 + val * 10) / img.width;
      img.scale(newScaleFactor);

      canvas.renderAll();
    }
  };

  const handleSubmitLogin = (evt) => {
    evt.preventDefault();
  
    const { user_email, user_password } = evt.target.elements;

    const cleanedPhone = user_email.value.replace(/\D/g, '');

    // setPhoneNumber(cleanedPhone);
  
    fetch(`${process.env.REACT_APP_TWO}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: cleanedPhone,
        password: user_password.value.trim(),
      }),
    })
      .then(response => response.json())
      .then(result => {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user_name', result.data.name);
        localStorage.setItem('user_phone_number', result.data.user.email);
        setIsSuccesEntered(true); 
        setIsLoginEntered(false)
        setPasswordsMatch(true);
        setTimeout(() => {
          window.location.reload()
        }, 100);
      })
      .catch(error => {toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'); setIsSuccesEntered(false); setIsLoginEntered(true); setPasswordsMatch(false);});
  };  

  const handleSubmitRegister = (evt) => {
    evt.preventDefault();
  
    const { phone } = evt.target.elements;

    const cleanedPhone = phone.value.replace(/\D/g, '');

    setPhoneNumber(cleanedPhone);

    var myHeaders = new Headers();
    // myHeaders.append('language', localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru');
    myHeaders.append('language', 'uz');
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "laravel_session=y1Jx3e0YpgmZNhomT4H7G6IVj79Tj7OxleBR5Hl2");

    var formdata = new FormData();
    formdata.append("phone", cleanedPhone);
    formdata.append("is_forgot", 0);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_TWO}/phone-register`, requestOptions)
      .then(response => response.text())
      .then(result => {setIsCodeEntered(true); setIsPhoneNumberEntered(false); setIsForgetPasswordEntered(false)})
      .catch(error => {toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'); setIsCodeEntered(false); setIsPhoneNumberEntered(true);});
  }

  const handleSubmitRegister2 = (evt) => {
    evt.preventDefault();
  
    const { phone } = evt.target.elements;

    const cleanedPhone = phone.value.replace(/\D/g, '');

    setPhoneNumber(cleanedPhone);

    var myHeaders = new Headers();
    // myHeaders.append('language', localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru');
    myHeaders.append('language', 'uz');
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "laravel_session=y1Jx3e0YpgmZNhomT4H7G6IVj79Tj7OxleBR5Hl2");

    var formdata = new FormData();
    formdata.append("phone", cleanedPhone);
    formdata.append("is_forgot", 0);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_TWO}/phone-register`, requestOptions)
      .then(response => response.text())
      .then(result => {console.log(result); setIsCodeEntered2(true); setIsPhoneNumberEntered(false); setIsForgetPasswordEntered(false)})
      .catch(error => {toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'); setIsForgetPasswordEntered2(false); setIsCodeEntered2(true);});
  }

  const handleOpenCodeVerificationModal = (evt) => {
    evt.preventDefault();
  
    const { code_verify } = evt.target.elements;

      fetch(`${process.env.REACT_APP_TWO}/phone-verify`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          verify_code: localStorage.getItem('phone_code_verify'),
        }),
      })
        .then(response => response.json())
        .then(result => {localStorage.setItem('token', result.data.token); setIsCodeEntered(false); setIsSuccesEntered(false); setIsRegisterEntered(true);})
        .catch(error => {toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!'); setIsCodeEntered(true); setIsSuccesEntered(false); setIsRegisterEntered(false);});
  };

  const handleOpenCodeVerificationModal2 = (evt) => {
    evt.preventDefault();
  
    const { code_verify } = evt.target.elements;

      fetch(`${process.env.REACT_APP_TWO}/phone-verify`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          verify_code: localStorage.getItem('phone_code_verify'),
        }),
      })
        .then(response => response.json())
        .then(result => {localStorage.setItem('token', result.data.token); setIsCodeEntered2(false); setIsForgetPasswordEntered2(false); isForgetPasswordEntered2(true);})
        .catch(error => {console.log(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!', error); setIsForgetPasswordEntered2(true); setIsSuccesEntered(false); setIsCodeEntered2(false);});
  };

  const handleOpenRegisterModal = (evt) => {
    evt.preventDefault();
    setIsSuccesEntered(false);

    if (registrationData.password !== registrationData.passwordConfirmation) {
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);

    var myHeaders = new Headers();
    // myHeaders.append('language', localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru');
    myHeaders.append('language', 'uz');
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    myHeaders.append("Cookie", "laravel_session=y1Jx3e0YpgmZNhomT4H7G6IVj79Tj7OxleBR5Hl2");
  
    var formdata = new FormData();
    formdata.append("name", registrationData.name);
    formdata.append("surname", localStorage.getItem('user_last_name'));
    formdata.append("password", registrationData.password);
    formdata.append("password_confirmation", registrationData.passwordConfirmation);
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
  
    fetch(`${process.env.REACT_APP_TWO}/register`, requestOptions)
      .then(response => response.json())
      .then(result => {
        localStorage.setItem('user_name', result.data.user.first_name);
        localStorage.setItem('user_phone_number', result.data.user.email);
        setIsRegisterEntered(false);
        setIsSuccesEntered(true);
        // console.log(result);
        setTimeout(() => {window.location.reload()}, 100);
      })
      .catch(error => {
        toast.error('Регистрация не была оформлена.');
        console.log(error);
      });
  };

  const handleOpenRegisterModal2 = (evt) => {
    evt.preventDefault();
    setIsSuccesEntered(false);

    if (registrationData.password !== registrationData.passwordConfirmation) {
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);

    var myHeaders = new Headers();
    // myHeaders.append('language', localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru');
    myHeaders.append('language', 'uz');
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    myHeaders.append("Cookie", "laravel_session=y1Jx3e0YpgmZNhomT4H7G6IVj79Tj7OxleBR5Hl2");
  
    var formdata = new FormData()
    formdata.append("password", registrationData.password);
    formdata.append("password_confirmation", registrationData.passwordConfirmation);
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
  
    fetch(`${process.env.REACT_APP_TWO}/register`, requestOptions)
      .then(response => response.json())
      .then(result => {
        localStorage.setItem('user_name', result.data.user.first_name);
        setIsForgetPasswordEntered2(false);
        setIsSuccesEntered(true);
        // console.log(result);
        setTimeout(() => {window.location.reload()}, 100);
      })
      .catch(error => {
        toast.error('Регистрация не была оформлена.');
        console.log(error);
      });
  };

  const handleLibraryPictureChange = async () => {
    if (selectedImageIndex !== -1) {
      const selectedImage = imageList[selectedImageIndex];
      const imgObj = new Image();

      imgObj.src = selectedImage;

      imgObj.onload = function () {
        const img = new fabric.Image(imgObj);

        img.scaleToHeight(300);
        img.scaleToWidth(300);
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
        setShowLibrary(false);
        setPhotoInputVisible(!photoInputVisible);
      };
      setPrintImage(selectedImage);
      setImeyg(selectedImage);
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TWO}/anime-category-size-color`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          language: localStorage.getItem("selectedLanguage")
            ? localStorage.getItem("selectedLanguage")
            : "ru",
        },
      })
      .then((response) => {
        setCategorySize(response.data.data.category[0].sizes);
        setCategoryName(response.data.data);
      })
      .catch((error) => {
        toast.error(
          localStorage.getItem("selectedLanguage") === "ru"
            ? "Произошла ошибка. Пожалуйста, попробуйте еще раз!"
            : "Xatolik yuz berdi. Iltimos qaytadan urining!",
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  document.addEventListener("keydown", function (event) {
    if (
      event.code === "Delete" ||
      event.key === "Delete" ||
      event.keyCode === 46
    ) {
      canvas.remove(canvas.getActiveObject());
    }
  });

  const handleImageClickHeader = (active) => {
    if (selectedHeader === active) {
      setSelectedHeader(null);
    } else {
      setSelectedHeader(active);
    }
  };

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem("trashCard"));
    if (savedCards) {
      // setTrashCardData(savedCards);
    }
  }, []);

  const sliderStyle = {
    background: "transparent",
    color: "black",
  };

  const handleClickTrueFalse = () => {
    setIsFrontView((prev) => !prev);
  };

  const handleClickColorChange = () => {
    setIsColorChange((prev) => !prev);
  };

  useEffect(() => {
    const storedIsFrontView = localStorage.getItem("isFrontView");
    if (storedIsFrontView) {
      setIsFrontView(JSON.parse(storedIsFrontView));
    }
  }, []);

  const handleClickCategoryChange = () => {
    setIsCategoryChange((prev) => !prev);
  };

  const handleRadiusChange = (value) => {
    const newRadius = Math.max(0, Math.min(50, value));
    setRadius(newRadius);

    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "image") {
      activeObject.set({ borderRadius: newRadius });
      canvas.renderAll();
    }
  };

  if (image === null) {
    if (categoryChange === 31) {
      if (shirtColor === "#000000") {
        image = frontImageBlack;
      } else {
        image = frontImage;
      }
    } else if (categoryChange === 33) {
      if (shirtColor === "#000000") {
        image = hoodie_front_black;
      } else {
        image = hoodie_front_white;
      }
    } else if (categoryChange === 32) {
      if (shirtColor === "#000000") {
        image = sweatshot_front_black;
      } else {
        image = sweatshot_front_white;
      }
    }
  }

  if (imageBack === null) {
    if (categoryChange === 31) {
      if (shirtColor === "#000000") {
        imageBack = backImageBlack;
      } else {
        imageBack = backImage;
      }
    } else if (categoryChange === 33) {
      if (shirtColor === "#000000") {
        imageBack = hoodie_back_black;
      } else {
        imageBack = hoodie_back_white;
      }
    } else if (categoryChange === 32) {
      if (shirtColor === "#000000") {
        imageBack = sweatshot_back_black;
      } else {
        imageBack = sweatshot_back_white;
      }
    }
  }

  const product_id = JSON.parse(localStorage.getItem("currentProduct"));

  const fetchFiles = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Error fetching files:", error);
      throw error;
    }
  };

  const fetchFilesBack = async () => {
    try {
      const response = await fetch(imageBack);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Error fetching files:", error);
      throw error;
    }
  };

  useEffect(() => {
    const storedCount = localStorage.getItem('counterValue');
    if (storedCount) {
      setCountHeader(Number(storedCount));
    }
  }, []);

  const handleButtonClick = () => {
    const newCount = Math.max(1, countHeader + 1);
    setCountHeader(newCount);

    localStorage.setItem('counterValue', newCount.toString());
  };

  // const addToBasketTo = async (e) => {
  //   e.preventDefault();

  //   const frontImageBlob = await fetchFiles();
  //   const backImageBlob = await fetchFilesBack();

  //   var myHeaders = new Headers();
  //   myHeaders.append("language", "uz");
  //   myHeaders.append("Accept", "application/json");
  //   myHeaders.append(
  //     "Authorization",
  //     `Bearer ${localStorage.getItem("token")}`,
  //   );
  //   myHeaders.append(
  //     "Cookie",
  //     "laravel_session=RFyUZ3GeQSe3Lq7nUZa38vzJHBFTYrkdu1hOsLY5",
  //   );

  //   var formdata = new FormData();
  //   formdata.append("product_id", product_id.id);
  //   // formdata.append("category_id", categoryChange);
  //   formdata.append("quantity", 1);
  //   formdata.append("color_id", shirtColor === "#000000" ? 3 : 4);
  //   formdata.append("size_id", selectedSize);
  //   formdata.append("imagesPrint[]", printImage);
  //   formdata.append("image_front", frontImageBlob);
  //   formdata.append("image_back", backImageBlob);
  //   formdata.append("price", product_id.price);

  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: formdata,
  //     redirect: "follow",
  //   };

  //   fetch(`${process.env.REACT_APP_TWO}/order/set-warehouse`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result.status === true) {
  //         toast(
  //           <ToastComponent
  //             image={image ? image : ""}
  //             title={product_id.name}
  //             description={
  //               product_id.description
  //                 ? product_id.description
  //                 : "Описание недоступно"
  //             }
  //             link="/basket"
  //             linkText="Перейти в корзину"
  //             onClose={() => toast.dismiss()}
  //           />,
  //           {
  //             position: "top-center",
  //             autoClose: 3000,
  //             draggable: true,
  //             theme: "colored",
  //           },
  //         );
  //       } else {
  //         if (result.message === "Unauthenticated.") {
  //           toast.warn(
  //             "Вы еще не зарегистрированы. Товар добавлен в корзину.",
  //             {
  //               position: "top-right",
  //               autoClose: 5000,
  //               hideProgressBar: false,
  //               closeOnClick: true,
  //               pauseOnHover: true,
  //               draggable: true,
  //               progress: undefined,
  //               theme: "light",
  //             },
  //           );
  //         } else {
  //           toast.error("Товар не добавлен");
  //         }
  //       }
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  const addToBasketTo = async (e) => {
    e.preventDefault();

    const frontImageBlob = await fetchFiles();
    const backImageBlob = await fetchFilesBack();

    var myHeaders = new Headers();
    myHeaders.append("language", "uz");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    myHeaders.append("Cookie", "laravel_session=RFyUZ3GeQSe3Lq7nUZa38vzJHBFTYrkdu1hOsLY5");

    var formdata = new FormData();
    formdata.append("product_id", product_id.id);
    formdata.append("category_id", categoryChange);
    formdata.append("quantity", 1);
    formdata.append("color_id", shirtColor === '#000000' ? 3 : 4);
    formdata.append("size_id", selectedSize);
    formdata.append("imagesPrint[]", printImage);
    formdata.append("image_front", frontImageBlob);
    formdata.append("image_back", backImageBlob);
    formdata.append("price", shirtTypePrice ? shirtTypePrice : product_id.price);
    formdata.append("type", shirtTypeId);

    // console.log(printImage);
    // console.log(frontImageBlob);
    // console.log(backImageBlob);
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
  
    fetch(`${process.env.REACT_APP_TWO}/order/set-warehouse`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === true) {
          toast(
            <ToastComponent
              image={image ? image : ''}
              title={product_id.name}
              description={product_id.description ? product_id.description : 'Описание недоступно'}
              link="/basket"
              linkText="Перейти в корзину"
              onClose={() => toast.dismiss()}
            />,
            {
              position: "top-center",
              autoClose: 3000,
              draggable: true,
              theme: "colored",
            }
          );
          handleButtonClick()
        } else {
          if (result.message === "Unauthenticated.") {
            toast.warn('Вы еще не зарегистрированы. Товар добавлен в корзину.', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setVisible(true)
          } else {
            console.log(result);
            toast.error('Товар не добавлен');
          }
        }
      })
      .catch(error => console.log('error', error));
  };

  const handleShowLibrary = () => {
    setShowLibrary(!showLibrary);

    axios
      .get(`${process.env.REACT_APP_TWO}/get-image`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          language: localStorage.getItem("selectedLanguage")
            ? localStorage.getItem("selectedLanguage")
            : "ru",
        },
      })
      .then((response) => {
        setImageList(response.data.data);
      })
      .catch((error) => {
        toast.error(
          localStorage.getItem("selectedLanguage") === "ru"
            ? "Произошла ошибка. Пожалуйста, попробуйте еще раз!"
            : "Xatolik yuz berdi. Iltimos qaytadan urining!",
        );
      });
  };

  const handleImageClick2 = (index) => {
    if (index === selectedImageIndex) {
      setSelectedImageIndex(-1);
    } else {
      setSelectedImageIndex(index);
    }
  };

  return (
    <div>
      <HeaderMainCopy />
      <ToastContainer />

      {visible && (
        <div data-bs-dismiss="modal" aria-label="Close" style={{width: '100%', height: '2100px', overflow: 'hidden', position: 'absolute', backgroundColor: '#00000070', left: 0, top: 0, zIndex: 10000, overflow: 'hidden'}}></div>
      )}

      <center>
        <div className="white_background">
          <img
            onClick={() => {
              canvas.discardActiveObject();
              canvas.renderAll();

              getImage();
            }}
            style={{cursor: 'pointer', marginTop: '-10px', position: 'relative', left: '-30px'}}
            className="addToBasket_image"
            src={addToBasketImage}
            alt="addToBasketImage"
          />
        </div>
      </center>

      <div className="d-flex">
        <div className="layers">
          <Reveal>
            <p className="layers_text_fat">
              {localStorage.getItem("selectedLanguage") === "ru"
                ? "Слои"
                : "Qatlamlar"}
            </p>
          </Reveal>

          <Layers
            isActive={textUniqueKey}
            contents={headText}
            deleteElement={deleteElement}
            SetActiveLayer={SetActiveLayer}
            dublicateElement={dublicateElement}
          />
        </div>

        <div className="shirt_drawing">
          <div className="shirt_drawing_header">
            {/* <div
              style={{ width: "80%" }}
              onClick={() => {
                handleClickCategoryChange();
                // handleImageClickHeader(1);
              }}
              className={`shirt_drawing_header_select`}
            >
              {categoryChange === 31
                ? localStorage.getItem("selectedLanguage") === "ru"
                  ? "Футболка"
                  : "Futbolka"
                : categoryChange === 32
                ? localStorage.getItem("selectedLanguage") === "ru"
                  ? "Свитшот"
                  : "Svitter"
                : categoryChange === 33
                ? localStorage.getItem("selectedLanguage") === "ru"
                  ? "Худи"
                  : "Xudi"
                : localStorage.getItem("selectedLanguage") === "ru"
                ? "Футболка"
                : "Futbolka"}

              <DownArrowSVG w={20} h={20} />
            </div> */}

            <div style={{width: '80%'}} data-bs-target="#exampleModalToggle500" data-bs-toggle="modal" onClick={() => {handleImageClickHeader(1)}} className={`shirt_drawing_header_select`}>
              {localStorage.getItem('selectedLanguage') === 'ru' ? `${shirtTypeName}` : `${shirtTypeName}`}
              {/* {categoryChange === 31 ? localStorage.getItem('selectedLanguage') === 'ru' ? 'Тип: стандарт' : 'Turi: standart' : categoryChange === 32 ? localStorage.getItem('selectedLanguage') === 'ru' ? 'Свитшот' : 'Svitter' : categoryChange === 33 ? localStorage.getItem('selectedLanguage') === 'ru' ? 'Худи' : 'Xudi' : localStorage.getItem('selectedLanguage') === 'ru' ? 'Футболка' : 'Futbolka'}  */}
              <svg className='ms-2' xmlns="http://www.w3.org/2000/svg" style={{width: '16px', height: '16px'}} viewBox="0 0 16 16" fill="none">
                <path d="M8 12C7.72592 12.0004 7.45444 11.9511 7.20118 11.8547C6.94792 11.7583 6.71786 11.6169 6.52423 11.4385L1.79945 7.09254C1.36915 6.69675 1.36918 6.01767 1.79951 5.62192C2.18181 5.27034 2.76973 5.27034 3.15203 5.62192L8 10.0803L12.848 5.62189C13.2303 5.27033 13.8182 5.27033 14.2004 5.62189C14.6308 6.01764 14.6308 6.69674 14.2004 7.0925L9.47577 11.4375C9.28223 11.6161 9.05221 11.7577 8.79894 11.8543C8.54567 11.9508 8.27415 12.0003 8 12Z" fill="#32454B"/>
              </svg>
            </div>

            <div
              style={{ width: "60%" }}
              onClick={() => {
                handleClickColorChange();
                handleImageClickHeader(3);
              }}
              className={`shirt_drawing_header_select`}
            >
              Цвет
              <DownArrowSVG w={20} h={20} />
            </div>

            <div
              style={{ width: "80%" }}
              onClick={() => {
                handleClickTrueFalse();
                handleImageClickHeader(4);
              }}
              className={`shirt_drawing_header_select`}
            >
              {isFrontView
                ? localStorage.getItem("selectedLanguage") === "ru"
                  ? "Сзади"
                  : "Orqa"
                : localStorage.getItem("selectedLanguage") === "ru"
                ? "Спереди"
                : "Oldi"}
              <RefreshSVG />
            </div>

            <label
              style={{ width: "50%" }}
              className={`shirt_drawing_header_select`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={addCustomPicture}
                style={{ display: "none" }}
              />

              <div>
                <ImageSVG />

                <PlusSVG />
              </div>
            </label>

            <div
              style={{ width: "50%" }}
              onClick={() => {
                addText();
                handleImageClickHeader(6);
              }}
              className={`shirt_drawing_header_select`}
            >
              <LayerTSVG w="20" h="20" />

              <PlusSVG />
            </div>

            <div
              style={{ width: "100%" }}
              onClick={() => {
                handleShowLibrary();
                handleImageClickHeader(7);
              }}
              className={`shirt_drawing_header_select`}
            >
              {localStorage.getItem("selectedLanguage") === "ru"
                ? "Из библиотеки"
                : "Namunalar"}

              <ImageSVG ml={10} />
            </div>

            <div
              style={{ width: "60%" }}
              onClick={() => {
                handleImageClickHeader(8);
              }}
              className={`shirt_drawing_header_select`}
            >
              {localStorage.getItem("selectedLanguage") === "ru" ? "ИИ" : "SI"}
              <MagicStickSVG />
            </div>
          </div>

          <div className="d-flex justify-content-center mt-5 position-relative">
            <LeftArrovSVG />
            <Categories
              category={categoryChange}
              isFrontView={isFrontView}
              shirtColor={shirtColor}
              photoInputVisible={photoInputVisible}
              textInputVisible={textInputVisible}
              ref={isFrontView ? ref : refBack}
              ref2={canvasRef}
            />
            <RightArrovSVG />
          </div>
        </div>

        {showLibrary ? (
          <div className="layers_right">
            <Reveal>
              <p className="layers_text_fat">Библиотека</p>
            </Reveal>

            <Reveal>
              <div style={{ marginTop: "-180px" }}>
                <div style={{ height: "500px", overflow: "scroll" }}>
                  {imageList.map((item, index) => (
                    <img
                      style={{
                        width: "200px",
                        cursor: "pointer",
                        height: "200px",
                        borderRadius: "12px",
                        marginBottom: "24px",
                      }}
                      key={index}
                      src={item}
                      alt="build_library_img"
                      className={
                        index === selectedImageIndex &&
                        selectedImageIndex !== -1
                          ? "selected-image_modal"
                          : ""
                      }
                      onClick={() => handleImageClick2(index)}
                    />
                  ))}
                </div>

                <div>
                  <button
                    onClick={handleLibraryPictureChange}
                    className={
                      selectedImageIndex !== -1
                        ? "btn_library"
                        : "btn_library_disabled"
                    }
                  >
                    Выбрать
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        ) : (
          <div className="layers_right">
            <Reveal>
              <p className="layers_text_fat">
                {localStorage.getItem("selectedLanguage") === "ru"
                  ? "Детали"
                  : "Tafsilotlar"}
              </p>
            </Reveal>

            {textInputVisible ? (
              <Reveal>
                <div style={{ marginTop: "-150px" }}>
                  <div style={{ width: "250px", textAlign: "left" }}>
                    <p className="layers_text_fat">Размер</p>

                    <Slider
                      aria-label="Temperature"
                      defaultValue={30}
                      value={+TextParams.get("fontSize").get(textUniqueKey)}
                      onChange={(e) =>
                        TextParamsChanger({
                          type: "fontSize",
                          value: e.target.value,
                        })
                      }
                      valueLabelDisplay="auto"
                      min={10}
                      max={110}
                      style={sliderStyle}
                      step={1}
                      marks={[
                        { value: 20 },
                        { value: 30 },
                        { value: 40 },
                        { value: 50 },
                        { value: 60 },
                        { value: 70 },
                        { value: 80 },
                        { value: 90 },
                        { value: 100 },
                      ]}
                      color="primary"
                    />
                  </div>

                  <div
                    style={{
                      width: "250px",
                      textAlign: "left",
                      marginTop: "35px",
                    }}
                  >
                    <p className="layers_text_fat">Шрифт</p>

                    <select
                      className="selcet_option_layer"
                      style={{
                        height: "40px",
                        fontFamily:
                          TextParams.get("fontFamily").get(textUniqueKey),
                      }}
                      value={TextParams.get("fontFamily").get(textUniqueKey)}
                      onChange={(e) =>
                        TextParamsChanger({
                          type: "fontFamily",
                          value: e.target.value,
                        })
                      }
                    >
                      <option
                        value="Bebas Neue"
                        style={{ fontFamily: "Bebas Neue" }}
                      >
                        Bebas Neue
                      </option>
                      <option
                        value="Kelly Slab"
                        style={{ fontFamily: "Kelly Slab" }}
                      >
                        Kelly Slab
                      </option>
                      <option
                        value="Russo One"
                        style={{ fontFamily: "Russo One" }}
                      >
                        Russo One
                      </option>
                      <option value="Neucha" style={{ fontFamily: "Neucha" }}>
                        Neucha
                      </option>
                    </select>
                  </div>

                  <div
                    style={{
                      width: "250px",
                      textAlign: "left",
                      marginTop: "35px",
                    }}
                  >
                    <p className="layers_text_fat">Текст</p>

                    <textarea
                      value={TextParams.get("text").get(textUniqueKey)}
                      onChange={(e) =>
                        TextParamsChanger({
                          type: "text",
                          value: e.target.value,
                        })
                      }
                      style={{
                        padding: "12px",
                        minHeight: "73px",
                        outline: "none",
                        fontFamily:
                          TextParams.get("fontFamily").get(textUniqueKey),
                      }}
                      className="selcet_option_layer"
                      placeholder="Easy print"
                    ></textarea>
                  </div>

                  <div
                    style={{
                      width: "250px",
                      textAlign: "left",
                      marginTop: "35px",
                    }}
                  >
                    <p className="layers_text_fat">Цвет</p>

                    <div
                      style={{
                        width: "200px",
                        height: "40px",
                        padding: "16px",
                      }}
                      className="selcet_option_layer"
                    >
                      {TextParams.get("color").get(textUniqueKey)}
                    </div>
                    <SketchPicker
                      color={TextParams.get("color").get(textUniqueKey)}
                      // onBlur={(e) => console.log(e)}
                      onChange={(e) =>
                        TextParamsChanger({ type: "color", value: e.hex })
                      }
                      className={showPicker ? "" : "hidden"}
                    />
                  </div>
                </div>
              </Reveal>
            ) : photoInputVisible ? (
              <Reveal>
                <div style={{ marginTop: "-150px" }}>
                  <div style={{ width: "250px", textAlign: "left" }}>
                    <p className="layers_text_fat">Масштаб</p>

                    <Slider
                      aria-label="Масштаб"
                      value={+scale.get("imageScale").get(textUniqueKey)}
                      onChange={handleScaleChange}
                      valueLabelDisplay="auto"
                      step={1}
                      marks={[
                        { value: 10 },
                        { value: 20 },
                        { value: 30 },
                        { value: 40 },
                        { value: 50 },
                        { value: 60 },
                        { value: 70 },
                        { value: 80 },
                        { value: 90 },
                      ]}
                      min={0}
                      max={100}
                      color="primary"
                    />
                  </div>

                  <div
                    style={{
                      width: "250px",
                      textAlign: "left",
                      marginTop: "35px",
                    }}
                  >
                    <p className="layers_text_fat">Скругление углов</p>

                    <div
                      className="selcet_option_layer d-flex justify-content-between"
                      style={{
                        width: "76px",
                        height: "40px",
                        padding: "6px 8px",
                      }}
                    >
                      <span>{radius}%</span>

                      <div>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRadiusChange(radius + 1)}
                        >
                          <UpArrowSVG w={12} h={12} />
                        </div>

                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRadiusChange(radius - 1)}
                        >
                          <DownArrowSVG w={12} h={12} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "250px",
                      textAlign: "left",
                      marginTop: "35px",
                    }}
                  >
                    <p className="layers_text_fat">Фильтры</p>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                      }}
                    >
                      {filterOptions.map(
                        ({ name, option, styleFilter }, index) => (
                          <div
                            key={index}
                            className="center flex-column"
                            style={{
                              boxSizing: "border-box",
                            }}
                          >
                            <div
                              style={{
                                border:
                                  selectedImage === option[0]
                                    ? "1.5px solid #4D646B"
                                    : "",
                                borderRadius: "12px",
                              }}
                              onClick={() => handleImageClick(...option)}
                            >
                              <div
                                style={{
                                  filter: styleFilter,
                                  border:
                                    selectedImage === option[0]
                                      ? "1.5px solid #ffffff"
                                      : "",
                                  backgroundImage: `url(${imeyg})`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  borderRadius: "12px",
                                  width: "106px",
                                  height: "84px",
                                }}
                              ></div>
                            </div>
                            <p>{name}</p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <p className="layers_text">
                  {localStorage.getItem("selectedLanguage") === "ru"
                    ? "Детали объектов будут отображаться здесь"
                    : `Ob'ekt tafsilotlari bu yerda ko'rsatiladi`}
                </p>
              </Reveal>
            )}
          </div>
        )}
      </div>

      {isCategoryChange && (
        <>
          <div
            onClick={handleClickCategoryChange}
            style={{
              position: "absolute",
              background: "#7c7c7c12",
              width: "100%",
              height: "100%",
              top: "0",
              left: "0",
            }}
            className="color_background"
          ></div>

          <div
            style={{
              position: "absolute",
              top: "150px",
              left: "19.2%",
              boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
              width: "130px",
              height: "36px",
              transform: "scale(1.3)",
            }}
          >
            <div>
              {categoryName.category.map((cat, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (cat.type !== "no active") {
                      setCategoryChange(cat.id);
                      setCategorySize(cat.sizes);
                      setCategoryIndex(index);
                    }
                  }}
                  className={`${
                    cat.type === "no active"
                      ? "category_change_disbaled"
                      : `category_change ${
                          categoryIndex === index ? "selected" : ""
                        }`
                  } `}
                >
                  {cat.name}
                  {categoryIndex === index && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M4.14027 9.82979C3.84222 9.82992 3.55637 9.71145 3.3458 9.50052L0.943839 7.09945C0.685387 6.84092 0.685387 6.42183 0.943839 6.1633C1.20237 5.90485 1.62146 5.90485 1.87999 6.1633L4.14027 8.42358L10.12 2.44384C10.3785 2.18539 10.7976 2.18539 11.0562 2.44384C11.3146 2.70237 11.3146 3.12146 11.0562 3.37999L4.93474 9.50052C4.72417 9.71145 4.43832 9.82992 4.14027 9.82979Z"
                        fill="#32454B"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {isColorChange && (
        <>
          <div
            onClick={handleClickColorChange}
            style={{
              position: "absolute",
              background: "#7c7c7c12",
              width: "100%",
              height: "100%",
              top: "0",
              left: "0",
            }}
            className="color_background"
          ></div>

          <div
            style={{
              position: 'absolute', top: '170px', left: '30.6%', boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)', width: '104px', height: '36px', transform: 'scale(1.3)'
            }}
          >
            <div className="d-flex" style={{ cursor: "pointer" }}>
              <div
                onClick={() => setShirtColor("#FFF")}
                className="color_change_selector"
              >
                <div
                  className="center"
                  style={{
                    borderRadius: "50%",
                    width: "23px",
                    height: "23px",
                    backgroundColor: "white",
                    border: "0.5px solid var(--neutral-200, #CCC)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M4.14027 9.82979C3.84222 9.82992 3.55637 9.71145 3.3458 9.50052L0.943839 7.09945C0.685387 6.84092 0.685387 6.42183 0.943839 6.1633C1.20237 5.90485 1.62146 5.90485 1.87999 6.1633L4.14027 8.42358L10.12 2.44384C10.3785 2.18539 10.7976 2.18539 11.0562 2.44384C11.3146 2.70237 11.3146 3.12146 11.0562 3.37999L4.93474 9.50052C4.72417 9.71145 4.43832 9.82992 4.14027 9.82979Z"
                      fill={shirtColor === "#000000" ? "#FFFFFF" : "#000000"}
                    />
                  </svg>
                </div>
              </div>

              <div
                onClick={() => setShirtColor("#000000")}
                className="color_change_selector"
              >
                <div
                  className="center"
                  style={{
                    borderRadius: "50%",
                    width: "23px",
                    height: "23px",
                    backgroundColor: "black",
                    border: "0.5px solid var(--neutral-200, #CCC)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M4.14027 9.82979C3.84222 9.82992 3.55637 9.71145 3.3458 9.50052L0.943839 7.09945C0.685387 6.84092 0.685387 6.42183 0.943839 6.1633C1.20237 5.90485 1.62146 5.90485 1.87999 6.1633L4.14027 8.42358L10.12 2.44384C10.3785 2.18539 10.7976 2.18539 11.0562 2.44384C11.3146 2.70237 11.3146 3.12146 11.0562 3.37999L4.93474 9.50052C4.72417 9.71145 4.43832 9.82992 4.14027 9.82979Z"
                      fill={shirtColor === "#000000" ? "#FFFFFF" : "#000000"}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div
        className="modal fade"
        id="exampleModalToggle5"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{
            borderRadius: "0px",
            border: "none",
            width: "900px",
            height: "650px",
            marginLeft: "316px",
          }}
        >
          <div
            className="modal-content modal_content_print"
            style={{
              borderRadius: "0px",
              border: "none",
              width: "900px",
              height: "650px",
            }}
          >
            <div className="modal-header">
              <h5 className="modal-title">Просмотр дизайна</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{ padding: "32px", width: "900px", height: "650px" }}
            >
              <center>
                <img
                  style={{ width: "380px", height: "354px" }}
                  src={image}
                  alt=""
                />
                <img
                  style={{
                    marginLeft: "50px",
                    width: "380px",
                    height: "354px",
                  }}
                  src={imageBack}
                  alt=""
                />

                <center>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "40px",
                    }}
                  >
                    <span className="modal_size_title">Размер:</span>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        width: "600px",
                      }}
                    >
                      {categorySize.map((siz) => (
                        <div
                          title={siz.name}
                          key={siz.id}
                          onClick={() => {
                            setSize(siz.name);
                            setSelectedSize(siz.id);
                          }}
                          className="color_change_selector_modal"
                          style={{
                            width: "80px",
                            borderColor: size === siz.name ? "#829D50" : "#CCC",
                          }}
                        >
                          {siz.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </center>

                <img
                  // className="addToBasketImage"
                  onClick={(e) => {
                    addToBasketTo(e);
                  }}
                  src={addToBasketImage}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{ marginTop: "20px", cursor: "pointer" }}
                  alt="addToBasket"
                />
              </center>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModalToggle500" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '12px', border: 'none', width: '800px',marginTop: '100px', minHeight: '400px', marginLeft: '356px'}}>
          <div className="modal-content" style={{borderRadius: '12px', border: 'none', width: '800px', minHeight: '400px'}}>
            <div className="modal-body" style={{padding: '32px', width: '800px', minHeight: '400px'}}>
              <div className="d-flex justify-content-between">
                <div onClick={() => {setShirtTypePrice(150000); setShirtTypeName(localStorage.getItem('selectedLanguage') === 'ru' ? 'Стандарт' : 'Standart'); setShirtTypeId(0)}} className='center flex-column'>
                  <img className='modal_image' src={modal_image1} alt="modal_image1" />

                  <h2 className='modal_image_title'>Стандарт</h2>
                  <p className='modal_image_title_price'>150 000 сум</p>

                  <button onClick={() => {setShirtTypeId0(true);}} className='modal_image_title_button' style={{display: shirtTypeId0 || shirtTypeId1 || shirtTypeId2 === true ? 'none' : 'flex'}}>Таблица размеров</button>
                </div>

                <div onClick={() => {setShirtTypePrice(185000); setShirtTypeName(localStorage.getItem('selectedLanguage') === 'ru' ? 'С воротником' : 'Yoqa bilan'); setShirtTypeId(1)}}  className='center flex-column'>
                  <img className='modal_image' src={modal_image2} alt="modal_image1" />

                  <h2 className='modal_image_title'>С воротником</h2>
                  <p className='modal_image_title_price'>185 000 сум</p>

                  <button onClick={() => {setShirtTypeId1(true);}} className='modal_image_title_button' style={{display: shirtTypeId0 || shirtTypeId1 || shirtTypeId2 === true ? 'none' : 'flex'}}>Таблица размеров</button>
                </div>

                <div onClick={() => {setShirtTypePrice(195000); setShirtTypeName(localStorage.getItem('selectedLanguage') === 'ru' ? 'Оверсайз' : `Katta o'lchamli`); setShirtTypeId(2)}}  className='center flex-column'>
                  <img className='modal_image' src={modal_image3} alt="modal_image1" />

                  <h2 className='modal_image_title'>Оверсайз</h2>
                  <p className='modal_image_title_price'>195 000 сум</p>

                  <button onClick={() => {setShirtTypeId2(true);}} className='modal_image_title_button' style={{display: shirtTypeId0 || shirtTypeId1 || shirtTypeId2 === true ? 'none' : 'flex'}}>Таблица размеров</button>
                </div>
              </div>

              {shirtTypeId0 === true ? (
                <div className='center flex-column' style={{marginTop: '16px'}}>
                  <img src={modal_image_size1} alt="modal_image_size1" />

                  <button onClick={() => {setShirtTypeId0(false);}} style={{width: '89px'}} className='modal_image_title_button'>Свернуть</button>
                </div>
              ) : null}

              {shirtTypeId1 === true ? (
                <div className='center flex-column' style={{marginTop: '16px'}}>
                  <img src={modal_image_size1} alt="modal_image_size1" />

                  <button onClick={() => {setShirtTypeId1(false);}} style={{width: '89px'}} className='modal_image_title_button'>Свернуть</button>
                </div>
              ) : null}

              {shirtTypeId2 === true ? (
                <div className='center flex-column' style={{marginTop: '16px'}}>
                  <img src={modal_image_size1} alt="modal_image_size1" />

                  <button onClick={() => {setShirtTypeId2(false);}} style={{width: '89px'}} className='modal_image_title_button'>Свернуть</button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {visible && (
        <div className="modal fade show" style={{display: 'block', position: 'absolute', zIndex: 100000, }} id="exampleModal3" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex={1}>
          <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '12px', border: 'none'}}>
            <div className="modal-content" style={{borderRadius: '12px', border: 'none'}}>
              <div className="modal-body get_phonenumber" id='get_phonenumber' style={{padding: '32px', display: isPhoneNumberEntered ? 'block' : 'none', position: 'relative', zIndex: '10000000'}}>
                <form onSubmit={(evt) => { handleSubmitRegister(evt) }}>
                  <center>
                    <h2 className='register_title'>Введите номер телефона</h2>
                  </center>

                  <p className='register_text' style={{textAlign: 'left', marginTop: '32px'}}>Мы отправим 6-значный СМС-код безопасности на ваш номер</p>

                  <label style={{ width: '100%', display: 'grid', marginTop: '32px' }}>
                    <p className='register_in_text'>Номер телефона</p>

                    <input name='phone' id='phone' className='register_input' type="text" placeholder='+998' />
                  </label>

                  <button type='submit' className='register'>Подтвердить</button>
                </form>
              </div>

              <div className="modal-body get_code" id='get_code' style={{padding: '32px', display: isCodeEntered ? 'block' : 'none', position: 'relative', zIndex: '10000000'}}>
                <form onSubmit={(evt) => { handleOpenCodeVerificationModal(evt) }}>
                  <center>
                    <h2 className='register_title'>Введите код подтверждения</h2>
                  </center>

                  <p className='register_text' style={{textAlign: 'left', marginTop: '32px'}}>Мы отправили 6-значный СМС-код безопасности на ваш номер</p>

                  <label style={{ width: '100%', display: 'grid', marginTop: '32px' }}>
                    <p className='register_in_text'>Код подтверждения</p>

                    {/* <input name='phone' id='code_verify' className='register_input' type="text" placeholder='_ _ _ _ _ _' /> */}
                    <div className='center'>
                      <CodeVerificationInputLaptop length={6} name='phone' id='code_verify' />
                    </div>
                  </label>

                  <button className='register'>Подтвердить</button>
                </form>
              </div>

              <div className="modal-body get_code" id='get_code' style={{padding: '32px', display: isCodeEntered2 ? 'block' : 'none', position: 'relative', zIndex: '10000000'}}>
                <form onSubmit={(evt) => { handleOpenCodeVerificationModal2(evt) }}>
                  <center>
                    <h2 className='register_title'>Введите код подтверждения</h2>
                  </center>

                  <p className='register_text' style={{textAlign: 'left', marginTop: '32px'}}>Мы отправили 6-значный СМС-код безопасности на ваш номер</p>

                  <label style={{ width: '100%', display: 'grid', marginTop: '32px' }}>
                    <p className='register_in_text'>Код подтверждения</p>

                    {/* <input name='phone' id='code_verify' className='register_input' type="text" placeholder='_ _ _ _ _ _' /> */}
                    <div className='center'>
                      <CodeVerificationInputLaptop length={6} name='phone' id='code_verify' />
                    </div>
                  </label>

                  <button className='register'>Подтвердить</button>
                </form>
              </div>

              <div className="modal-body" id='get_register' style={{padding: '32px', display: isRegisterEntered ? 'block' : 'none', position: 'relative', zIndex: '10000000'}}>
                <form onSubmit={(evt) => { handleOpenRegisterModal(evt) }} action="">
                  <center>
                    <h2 className='register_title'>Регистация</h2>
                    <p className='register_text'>Введите свои данные</p>
                  </center>

                  <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                    <p className='register_in_text'>Имя</p>
                    <input
                      name='name'
                      className='register_input'
                      type="text"
                      required
                      placeholder='Введите имя'
                      onChange={(e) =>
                        setRegistrationData({
                          ...registrationData,
                          name: e.target.value,
                        })
                      }
                    />
                  </label>

                  <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                    <p className='register_in_text'>Фамилия</p>
                    <input
                      name='surname'
                      className='register_input'
                      type="text"
                      required
                      placeholder='Ведите фамилию'
                      onChange={(e) =>
                        localStorage.setItem(
                          'user_last_name',
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                    <p className='register_in_text'>Пароль</p>
                    <input
                      name='password'
                      className={`register_input ${!passwordsMatch ? 'password-error' : ''}`}
                      type="password"
                      placeholder='Введите пароль'
                      onChange={(e) =>
                        setRegistrationData({
                          ...registrationData,
                          password: e.target.value,
                        })
                      }
                    />
                  </label>

                  <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                    <p className='register_in_text'>Подтвердите пароль</p>
                    <input
                      name='passwordConfirmation'
                      className={`register_input ${!passwordsMatch ? 'password-error' : ''}`}
                      type="password"
                      placeholder='Подтвердите пароль'
                      onChange={(e) =>
                        setRegistrationData({
                          ...registrationData,
                          passwordConfirmation: e.target.value,
                        })
                      }
                    />
                  </label>

                  {passwordsMatch ? null : (
                    <p className='register_text_no_password' style={{color: 'red'}}>Пароли не совпадают</p>
                  )}

                  <button className='register'>
                    Регистрация
                  </button>
                </form>
              </div>

              <div className="modal-body" id='get_login' style={{padding: '32px', display: isLoginEntered ? 'block' : 'none', position: 'relative', zIndex: '10000000'}}>
                <form onSubmit={handleSubmitLogin} action="">
                  <center>
                    <h2 className='register_title'>Авторизация</h2>
                    <p className='register_text'>Введите свои данные</p>
                  </center>

                  <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                    <p className='register_in_text'>Hомер телефона</p>
                    <input name='user_email' required id='user_email' className={`register_input ${!passwordsMatch ? 'password-error' : ''}`} type="text" placeholder='Введите адрес электронной почты' />
                    {/* <input name='user_email' id='user_email' className={`register_input ${!passwordsMatch ? 'password-error' : ''}`} type="text" placeholder='+998' /> */}
                  </label>

                  <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                    <p className='register_in_text'>Пароль</p>
                    <input name='user_password' className={`register_input ${!passwordsMatch ? 'password-error' : ''}`} type="password" placeholder='Введите пароль' />
                  </label>

                  <p className='register_text_no_password'></p>

                  <div style={{textAlign: 'right'}}>
                    <p className='register_text_no_password' onClick={() => {setIsForgetPasswordEntered(true); setIsLoginEntered(false)}}>Забыли пароль?</p>
                  </div>

                  {passwordsMatch ? null : (
                    <p className='register_text_no_password' style={{color: 'red'}}>Аккаунт не найден :(</p>
                  )}

                  <button className='register'>Войти</button>
                </form>
              </div>

              <div className="modal-body" id='get_first' style={{padding: '32px', display: isFirstEntered ? 'block' : 'none', position: 'relative', zIndex: '10000000'}}>
                <center>
                  <h2 className='register_title'>Регистрация</h2>
                  <p className='register_text'>Зарегистрируйтесь если вы тут впервые</p>

                  <img src={register_image} alt={register_image} />
                </center>

                  <button onClick={() => { setIsPhoneNumberEntered(true); setIsFirstEntered(false); }} className='register'>Регистрация</button>
                  <button onClick={() => { setIsLoginEntered(true); setIsFirstEntered(false); }} className='login'>Войти в существующий</button>
              </div>

              <div className="modal-body" id='get_success' style={{padding: '32px', display: isSuccesEntered ? 'block' : 'none', position: 'relative', zIndex: '10000000'}}>
                <center>
                  <h2 className='register_title'>Отлично!</h2>
                  <p className='register_text'>Вы вошли в свой личный кабинет</p>
                  <img src={verifed} alt="verifed" />
                </center>

                <button className='register' data-bs-dismiss="modal">Назад на главную</button>
              </div>

              <div className="modal-body" id='get_success' style={{padding: '32px', display: isForgetPasswordEntered ? 'block' : 'none', position: 'relative', zIndex: '10000000'}}>
                <form onSubmit={(evt) => { handleSubmitRegister2(evt) }}>
                  <center>
                    <h2 className='register_title'>Восстановление пароля</h2>
                    <p className='register_title2_forget'>Введите номер телефона</p>
                  </center>

                  <p className='register_text' style={{textAlign: 'left', marginTop: '32px'}}>Мы отправим 6-значный СМС-код безопасности на ваш номер</p>

                  <label style={{ width: '100%', display: 'grid', marginTop: '32px' }}>
                    <p className='register_in_text'>Номер телефона</p>

                    <input name='phone' id='phone' className='register_input' type="text" placeholder='+998' />
                  </label>

                  <button type='submit' className='register'>Подтвердить</button>
                </form>
              </div>

              <div className="modal-body" id='get_register' style={{padding: '32px', display: isForgetPasswordEntered2 ? 'block' : 'none', position: 'relative', zIndex: '10000000'}}>
                <form onSubmit={(evt) => { handleOpenRegisterModal2(evt) }} action="">
                  <center>
                    <h2 className='register_title'>Сброс пароля</h2>
                    <p className='register_text'>Придумайте новый пароль</p>
                  </center>

                  <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                    <p className='register_in_text'>Пароль</p>
                    <input
                      name='password'
                      className={`register_input ${!passwordsMatch ? 'password-error' : ''}`}
                      type="password"
                      placeholder='Введите пароль'
                      onChange={(e) =>
                        setRegistrationData({
                          ...registrationData,
                          password: e.target.value,
                        })
                      }
                    />
                  </label>

                  <label style={{width: '100%', display: 'grid', marginTop: '16px'}}>
                    <p className='register_in_text'>Подтвердите пароль</p>
                    <input
                      name='passwordConfirmation'
                      className={`register_input ${!passwordsMatch ? 'password-error' : ''}`}
                      type="password"
                      placeholder='Подтвердите пароль'
                      onChange={(e) =>
                        setRegistrationData({
                          ...registrationData,
                          passwordConfirmation: e.target.value,
                        })
                      }
                    />
                  </label>

                  {passwordsMatch ? null : (
                    <p className='register_text_no_password' style={{color: 'red'}}>Пароли не совпадают</p>
                  )}

                  <button className='register'>
                    Сбросить пароль
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourDesign;

const TextParamsTypes = [
  { label: "fontSize", name: "fontSize" },
  { label: "fontFamily", name: "fontFamily" },
  { label: "text", name: "text" },
  { label: "color", name: "fill" },
];

const ControlVisible = [
  { corner: "tl", value: false },
  { corner: "tr", value: false },
  { corner: "bl", value: false },
  { corner: "br", value: false },
  { corner: "ml", value: false },
  { corner: "mt", value: false },
  { corner: "mr", value: false },
  { corner: "mb", value: false },
  { corner: "br", value: true },
];

const ControlOptions = {
  transparentCorners: false,
  cornerStrokeColor: "blue",
  borderColor: "blue",
  borderSize: 10,
  cornerSize: 6,
  cornerStyle: "circle",
};

const filterOptions = [
  {
    name: "Original",
    styleFilter: "",
    option: [1, []],
  },
  {
    name: "1977",
    styleFilter: "contrast(1.1) brightness(1.1) saturate(1.1)",
    option: [
      2,
      [
        {
          label: "Contrast",
          valueLabel: "contrast",
          value: 0.15,
        },
        {
          label: "Brightness",
          valueLabel: "brightness",
          value: 0.1,
        },
        {
          label: "Saturation",
          valueLabel: "saturation",
          value: 0.3,
        },
      ],
    ],
  },
  {
    name: "Aden",
    styleFilter:
      "contrast(0.9) brightness(1.2) hue-rotate(-20deg) saturate(0.85)",
    option: [
      3,
      [
        {
          label: "Contrast",
          valueLabel: "contrast",
          value: 0.2,
        },
        {
          label: "Brightness",
          valueLabel: "brightness",
          value: 0.05,
        },
        {
          label: "Saturation",
          valueLabel: "saturation",
          value: -0.3,
        },
        {
          label: "HueRotation",
          valueLabel: "rotation",
          value: -0.1,
        },
      ],
    ],
  },
  {
    name: "Amaro",
    styleFilter:
      "contrast(0.9) brightness(1.1) hue-rotate(-10deg) saturate(1.5)",
    option: [
      4,
      [
        { label: "Contrast", value: 0.9 },
        { label: "HueRotation", value: -10 },
        { label: "Saturation", value: 1.5 },
      ],
    ],
  },
  {
    name: "Brannan",
    styleFilter: "contrast(1.4) sepia(0.5)",
    option: [
      5,
      [
        {
          label: "Contrast",
          valueLabel: "contrast",
          value: 0.2,
        },
        {
          label: "Brightness",
          valueLabel: "brightness",
          value: -0.1,
        },
        {
          label: "Saturation",
          valueLabel: "saturation",
          value: -0.3,
        },
        {
          label: "HueRotation",
          valueLabel: "rotation",
          value: -0.08,
        },
      ],
    ],
  },
  {
    name: "Clarendon",
    styleFilter: "contrast(1.2) saturate(1.35)",
    option: [
      6,
      [
        {
          label: "Contrast",
          valueLabel: "contrast",
          value: 0.15,
        },
        {
          label: "Saturation",
          valueLabel: "saturation",
          value: 0.2,
        },
        {
          label: "Brightness",
          valueLabel: "brightness",
          value: -0.05,
        },
      ],
    ],
  },
  {
    name: "Early Bird",
    styleFilter: "contrast(0.9) sepia(0.2)",
    option: [
      7,
      [
        {
          label: "Contrast",
          valueLabel: "contrast",
          value: 0.15,
        },
        {
          label: "Brightness",
          valueLabel: "brightness",
          value: 0.03,
        },
        {
          label: "Saturation",
          valueLabel: "saturation",
          value: -0.3,
        },
      ],
    ],
  },
  {
    name: "Inkwell",
    styleFilter: "sepia(0.3) contrast(1.1) brightness(1.1) grayscale(1)",
    option: [
      8,
      [
        {
          label: "Grayscale",
          valueLabel: "grayscale",
          value: 1,
        },
      ],
    ],
  },
];
