import React, { useCallback, useEffect, useRef, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import HeaderMain from '../../components/header'
import './main.css';
import './main2.css';
import addToBasketImage from '../../layouts/icons/add_to_basket.svg'
import frontImage from '../../layouts/images/front.png'
import backImage from '../../layouts/images/back.png'
import hoodie_back_black from '../../layouts/images/hoodie_back.svg'
import hoodie_front_black from '../../layouts/images/hoodie_front.svg'
import sweatshot_back_black from '../../layouts/images/sweeatchot_back.svg'
import sweatshot_front_black from '../../layouts/images/sweeatchot_front.svg'
import hoodie_back_white from '../../layouts/images/hoodie_back_white.svg'
import hoodie_front_white from '../../layouts/images/hoodie_front_white.svg'
import sweatshot_back_white from '../../layouts/images/sweatshot_back_white.svg'
import sweatshot_front_white from '../../layouts/images/sweatshot_front_white.svg'
import backImageBlack from '../../layouts/images/back_black.png'
import frontImageBlack from '../../layouts/images/black_front.png'
import Reveal from '../../animation';
import { fabric } from "fabric";
import {useFabricJSEditor} from "fabricjs-react";
import { useScreenshot } from 'use-react-screenshot'
import axios from 'axios';
import { toast } from 'react-toastify';
import ToastComponent from '../../components/toast';

const YourDesign = () => {
  const [trashCardData, setTrashCardData] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [printImage, setPrintImage] = useState([]);
  const [categorySize, setCategorySize] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [color, setColor] = useState('#fff');
  const [size, setSize] = useState('xxs');
  const [category, setCategory] = useState('Футболка');
  const [shirtColor, setShirtColor] = useState('#FFFFFF');
  const [width, setWidth] = useState('604');
  const [height, setHeight] = useState('562');
  const [isFrontView, setIsFrontView] = useState(true);
  const [isColorChange, setIsColorChange] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [isCategoryChange, setIsCategoryChange] = useState(false);
  const [textInputVisible, setTextInputVisible] = useState(true);
  const [photoInputVisible, setPhotoInputVisible] = useState(true);
  const [textInputValue, setTextInputValue] = useState('');
  const [fontSizePx, setFontSizePx] = useState('');
  const [imeyg, setImeyg] = useState('');
  const [scale, setScale] = useState(10);
  const [categoryChange, setCategoryChange] = useState(31);
  const [categoryChangeCheck, setCategoryChangeCheck] = useState(31);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [radius, setRadius] = useState(0);
  const canvasRef = useRef(null);
  const token = localStorage.getItem('token');
  // T-Shirt
  const ref = useRef(null)
  const refBack = useRef(null)
  const refBlackTShirt = useRef(null)
  const refBackBlackTShirt = useRef(null)
  // Hoodie
  const refBackBlackHoodie = useRef(null)
  const refBackWhiteHoodie = useRef(null)
  const refBlackHoodie = useRef(null)
  const refWhiteHoodie = useRef(null)
  // Sweatshot
  const refBackBlackSweatshot = useRef(null)
  const refBackWhiteSweatshot = useRef(null)
  const refBlackSweatshot = useRef(null)
  const refWhiteSweatshot = useRef(null)

  const [categoryIndex, setCategoryIndex] = useState(0);
  // Screenshots
  let [image, takeScreenshot] = useScreenshot()
  let [imageBack, takeScreenshotBack] = useScreenshot()
  // T-Shirt
  let getImage = () => takeScreenshot(ref.current)
  let getImageBack = () => takeScreenshotBack(refBack.current)
  let getImageBlackTShirt = () => takeScreenshot(refBlackTShirt.current)
  let getImageBackBlackTShirt = () => takeScreenshotBack(refBackBlackTShirt.current)
  // Hoodie
  let getImageBlackHoodie = () => takeScreenshot(refBlackHoodie.current)
  let getImageBackBlackHoodie = () => takeScreenshotBack(refBackBlackHoodie.current)
  let getImageWhiteHoodie = () => takeScreenshot(refWhiteHoodie.current)
  let getImageBackWhiteHoodie = () => takeScreenshotBack(refBackWhiteHoodie.current)
  // Sweatshot
  let getImageBlackSweatshot = () => takeScreenshot(refBlackSweatshot.current)
  let getImageBackBlackSweatshot = () => takeScreenshotBack(refBackBlackSweatshot.current)
  let getImageWhiteSweatshot = () => takeScreenshot(refWhiteSweatshot.current)
  let getImageBackWhiteSweatshot = () => takeScreenshotBack(refBackWhiteSweatshot.current)
  const [countHeader, setCountHeader] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const {selectedObjects, editor, onReady} = useFabricJSEditor();
  const [currentTab, setCurrentTab] = useState("settings");
  const [lastTab, setLastTab] = useState("settings");

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
  
  localStorage.setItem('selectedColor', '#000000');

  useEffect(() => {
    window.scrollTo(0, 0)
  });

  useEffect(() => {
    document.title = 'Создайте свой собственный дизайн'
  }, []);

  const handleCustomPictureChange = (e) => {
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const imgObj = new Image();
      imgObj.src = event.target.result;
      setImeyg(imgObj.src);
  
      imgObj.onload = function () {
        const img = new fabric.Image(imgObj);
  
        img.scaleToHeight(300);
        img.scaleToWidth(300);
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
        setPhotoInputVisible(!photoInputVisible);
      };
    };

    setPrintImage(e.target.files[0]);
  
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleLibraryPictureChange = () => {
    if (selectedImageIndex !== -1) {
      const selectedImage = imageList[selectedImageIndex];
      const imgObj = new Image();
      
      imgObj.src = selectedImage;

      // console.log(imgObj);
      // console.log(selectedImage);
  
      imgObj.onload = function () {
        const img = new fabric.Image(imgObj);
  
        img.scaleToHeight(300);
        img.scaleToWidth(300);
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
        setPhotoInputVisible(!photoInputVisible);
        // console.log(imgObj);
      };
    }
    
    // console.log(selectedImageIndex);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/anime-category-size-color`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      setCategorySize(response.data.data.category[0].sizes)
      setCategoryName(response.data.data);
    }).catch((error) => {
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    });    
  }, []);

  document.addEventListener('keydown', function(event) {
    if (event.code === 'Delete' || event.key === 'Delete' || event.keyCode === 46) {
      canvas.remove(canvas.getActiveObject());
    }
  });

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    canvasRef.current = canvas;

    return () => {
      canvas.dispose();
    };
  }, []);
  
  const handleImageClickHeader = (active) => {
    if (selectedHeader === active) {
      setSelectedHeader(null);
    } else {
      setSelectedHeader(active);
    }
  };

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  useEffect(() => {
    const savedColor = localStorage.getItem('selectedColor');
    if (savedColor) {
      setColor(savedColor);
    }
  }, []);

  const handleClick = () => {
    setTextInputVisible(!textInputVisible);
    if (!textInputVisible && textInputValue) {
      const existingData = JSON.parse(localStorage.getItem('textData')) || [];
      const newTextData = [...existingData, textInputValue];
      localStorage.setItem('textData', JSON.stringify(newTextData));
    }
  };

  // useEffect(() => {
  //   const savedTextData = JSON.parse(localStorage.getItem('textData'));
  //   if (savedTextData) {
  //     // console.log(savedTextData);
  //   }
  // }, []);

  function valuetext(value) {
    setFontSizePx(value);
    return value;
  }

  const sliderStyle = {
    background: 'transparent',
    color: 'black',
  };

  const handleClickTrueFalse = () => {
    setIsFrontView((prev) => !prev);
  };

  const handleClickColorChange = () => {
    setIsColorChange((prev) => !prev);
  };

  useEffect(() => {
    const storedIsFrontView = localStorage.getItem('isFrontView');
    if (storedIsFrontView) {
      setIsFrontView(JSON.parse(storedIsFrontView));
    }
  }, []);

  const handleClickCategoryChange = () => {
    setIsCategoryChange((prev) => !prev);
  };

  useEffect(() => {
    setCanvas(new fabric.Canvas('tshirt-canvas'));
  }, []);

  const handleScaleChange = (newValue) => {
    setScale(newValue);

    var scaley = String(newValue).charAt(0)

    if (scaley === 1) {
      scaley = 0
    } else if (scaley === 2) {
      scaley = 1
    } else if (scaley === 3) {
      scaley = 2
    } else if (scaley === 4) {
      scaley = 3
    } else if (scaley === 5) {
      scaley = 4
    } else if (scaley === 6) {
      scaley = 5
    } else if (scaley === 7) {
      scaley = 6
    } else if (scaley === 8) {
      scaley = 7
    } else if (scaley === 9) {
      scaley = 8
    } 

    console.log(scaley);

    if(newValue) {
      document.querySelector('.drawing-area').style.transform = `scale(1.${scaley})`;
    } else {
      document.querySelector('.drawing-area').style.transform = `none`;
    }
  };

  const handleRadiusChange = (value) => {
    const newRadius = Math.max(0, Math.min(50, value));
    setRadius(newRadius);
  
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'image') {
      activeObject.set({ borderRadius: newRadius });
      canvas.renderAll();
    }
  };

  const handleImageClick = (image, filter) => {
    if (selectedImage === image) {
      setSelectedImage(null);
    } else {
      setSelectedImage(image);
    }

    if(filter) {
      document.querySelector('.lower-canvas').style.filter = filter;
    } else {
      document.querySelector('.lower-canvas').style.filter = 'none';
    }
  };

  if (image === null) {
    if (categoryChange === 31) {
      if (shirtColor === '#000000') {
        image = frontImageBlack
      } else {
        image = frontImage
      }
    } else if (categoryChange === 33) {
      if (shirtColor === '#000000') {
        image = hoodie_front_black
      } else {
        image = hoodie_front_white
      }
    } else if (categoryChange === 32) {
      if (shirtColor === '#000000') {
        image = sweatshot_front_black
      } else {
        image = sweatshot_front_white
      }
    } 
  }

  if (imageBack === null) {
    if (categoryChange === 31) {
      if (shirtColor === '#000000') {
        imageBack = backImageBlack
      } else {
        imageBack = backImage
      }
    } else if (categoryChange === 33) {
      if (shirtColor === '#000000') {
        imageBack = hoodie_back_black
      } else {
        imageBack = hoodie_back_white
      }
    } else if (categoryChange === 32) {
      if (shirtColor === '#000000') {
        imageBack = sweatshot_back_black
      } else {
        imageBack = sweatshot_back_white
      }
    }
  }

  const product_id = JSON.parse(localStorage.getItem('currentProduct'))

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
    formdata.append("quantity", 1);
    formdata.append("color_id", shirtColor === '#000000' ? 3 : 4);
    formdata.append("size_id", selectedSize);
    formdata.append("imagesPrint[]", printImage);
    formdata.append("image_front", frontImageBlob);
    formdata.append("image_back", backImageBlob);
    formdata.append("price", product_id.price);

    console.log(printImage);
    console.log(frontImageBlob);
    console.log(backImageBlob);
  
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
          } else {
            toast.error('Товар не добавлен');
          }
        }
      })
      .catch(error => console.log('error', error));
  };

  const handleShowLibrary = () => {
    setShowLibrary(!showLibrary);

    axios.get(`${process.env.REACT_APP_TWO}/get-image`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      // console.log(response.data.data);
      setImageList(response.data.data);
    }).catch((error) => {
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
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
      <HeaderMain />
      <div className='white_background'>
        <img onClick={() => {
            // T-shirt
            getImageBack();
            getImage();
            getImageBlackTShirt();
            getImageBackBlackTShirt();
            // Hoodie
            getImageBlackHoodie();
            getImageBackBlackHoodie();
            getImageWhiteHoodie();
            getImageBackWhiteHoodie();
            // Sweatshot
            getImageBlackSweatshot();
            getImageBackBlackSweatshot();
            getImageWhiteSweatshot();
            getImageBackWhiteSweatshot();
          }} style={{cursor: 'pointer'}} data-bs-target="#exampleModalToggle5" data-bs-toggle="modal" src={addToBasketImage} alt="" />
      </div>

      <div className="d-flex">
        <div className='shirt_drawing'>
          <div className="shirt_drawing_header">
            <div onClick={() => {handleClickCategoryChange(); handleImageClickHeader(1)}} style={{width: '138px'}} className={`shirt_drawing_header_select`}>
              Футболка
              <svg className='ms-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 12C7.72592 12.0004 7.45444 11.9511 7.20118 11.8547C6.94792 11.7583 6.71786 11.6169 6.52423 11.4385L1.79945 7.09254C1.36915 6.69675 1.36918 6.01767 1.79951 5.62192C2.18181 5.27034 2.76973 5.27034 3.15203 5.62192L8 10.0803L12.848 5.62189C13.2303 5.27033 13.8182 5.27033 14.2004 5.62189C14.6308 6.01764 14.6308 6.69674 14.2004 7.0925L9.47577 11.4375C9.28223 11.6161 9.05221 11.7577 8.79894 11.8543C8.54567 11.9508 8.27415 12.0003 8 12Z" fill="#32454B"/>
              </svg>
            </div>

            <div onClick={() => {handleClickColorChange(); handleImageClickHeader(3)}} style={{width: '101px'}} className={`shirt_drawing_header_select`}>
              Цвет
              <svg className='ms-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 12C7.72592 12.0004 7.45444 11.9511 7.20118 11.8547C6.94792 11.7583 6.71786 11.6169 6.52423 11.4385L1.79945 7.09254C1.36915 6.69675 1.36918 6.01767 1.79951 5.62192C2.18181 5.27034 2.76973 5.27034 3.15203 5.62192L8 10.0803L12.848 5.62189C13.2303 5.27033 13.8182 5.27033 14.2004 5.62189C14.6308 6.01764 14.6308 6.69674 14.2004 7.0925L9.47577 11.4375C9.28223 11.6161 9.05221 11.7577 8.79894 11.8543C8.54567 11.9508 8.27415 12.0003 8 12Z" fill="#32454B"/>
              </svg>
            </div>

            <div style={{width: '157px'}} onClick={() => {handleClickTrueFalse(); handleImageClickHeader(4)}}  className={`shirt_drawing_header_select`}>
              {isFrontView ? 'Сзади' : 'Спереди'} 
              <svg style={{marginLeft: '10px'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.329 10C16.9907 9.9956 16.7044 10.2481 16.6676 10.5834C16.3554 14.2632 13.1099 16.9939 9.41861 16.6827C5.72731 16.3715 2.98803 13.1361 3.30025 9.45626C3.61247 5.77644 6.85792 3.04569 10.5492 3.35691C12.1474 3.49166 13.6443 4.19285 14.7684 5.33332H12.6805C12.3112 5.33332 12.0118 5.63179 12.0118 5.99997C12.0118 6.36816 12.3112 6.66663 12.6805 6.66663H15.4511C16.1368 6.66626 16.6926 6.11219 16.693 5.42863V2.66666C16.693 2.29847 16.3936 2 16.0243 2C15.6549 2 15.3555 2.29847 15.3555 2.66666V4.052C12.0548 1.11172 6.98798 1.39559 4.03852 4.68607C1.08905 7.97654 1.37381 13.0275 4.67456 15.9678C7.97531 18.9081 13.0421 18.6242 15.9916 15.3338C17.1381 14.0547 17.8413 12.4417 17.9971 10.7333C18.0314 10.3641 17.7591 10.0371 17.3887 10.0029C17.3689 10.001 17.349 10.0001 17.329 10Z" fill="#122956"/>
              </svg>
            </div>

            <label>
              <input
                type="file"
                accept="image/*"
                id="tshirt-custompicture" 
                onChange={handleCustomPictureChange}
                style={{ display: 'none', }}
              />
              <div className={`shirt_drawing_header_select`} style={{width: '92px', height: '35px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M14.9475 15.2091H16.6849L15.3924 20L0 15.7921L2.37516 6.9962V13.4432L2.06462 14.6008L14.2174 17.9214L14.9475 15.2091ZM8.66974 5.91466C9.36634 5.91466 9.92866 5.34854 9.92866 4.64723C9.92866 3.94592 9.36634 3.37981 8.66974 3.37981C7.97314 3.37981 7.41083 3.94592 7.41083 4.64723C7.41083 5.34854 7.97314 5.91466 8.66974 5.91466ZM20 2.53485V13.5192H4.05371V2.53485C4.05371 1.14068 5.18674 0 6.57155 0H17.4822C18.867 0 20 1.14068 20 2.53485ZM5.73227 2.53485V11.5505L12.2283 5.01056L14.9979 7.7989L18.3214 4.45289V2.53485C18.3214 2.07013 17.9438 1.6899 17.4822 1.6899H6.57155C6.10995 1.6899 5.73227 2.07013 5.73227 2.53485ZM18.3214 11.8293V6.84411L14.9979 10.1901L12.2283 7.40177L7.83047 11.8293H18.3214Z" fill="#122956"/>
                </svg>

                <svg style={{marginLeft: '8px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14.2223 7.22225H8.77779V1.77777C8.77779 1.34821 8.42957 1 8.00002 1C7.57047 1 7.22225 1.34821 7.22225 1.77777V7.22221H1.77777C1.34821 7.22225 1 7.57047 1 8.00002C1 8.42957 1.34821 8.77779 1.77777 8.77779H7.22221V14.2222C7.22221 14.6518 7.57043 15 7.99998 15C8.42953 15 8.77775 14.6518 8.77775 14.2222V8.77779H14.2222C14.6517 8.77779 15 8.42957 15 8.00002C15 7.57047 14.6518 7.22225 14.2223 7.22225Z" fill="#122956"/>
                </svg>
              </div>
            </label>

            <div onClick={() => {handleClick(); handleImageClickHeader(6)}} style={{width: '92px'}} className={`shirt_drawing_header_select`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.5 0H2.5C1.83696 0 1.20107 0.263392 0.732233 0.732233C0.263392 1.20107 0 1.83696 0 2.5L0 20H20V2.5C20 1.83696 19.7366 1.20107 19.2678 0.732233C18.7989 0.263392 18.163 0 17.5 0ZM18.3333 18.3333H1.66667V2.5C1.66667 2.27899 1.75446 2.06702 1.91074 1.91074C2.06702 1.75446 2.27899 1.66667 2.5 1.66667H17.5C17.721 1.66667 17.933 1.75446 18.0893 1.91074C18.2455 2.06702 18.3333 2.27899 18.3333 2.5V18.3333ZM5 5H15V8.33333H13.3333V6.66667H10.8333V13.3333H12.5V15H7.5V13.3333H9.16667V6.66667H6.66667V8.33333H5V5Z" fill="#122956"/>
              </svg>

              <svg style={{marginLeft: '8px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14.2223 7.22225H8.77779V1.77777C8.77779 1.34821 8.42957 1 8.00002 1C7.57047 1 7.22225 1.34821 7.22225 1.77777V7.22221H1.77777C1.34821 7.22225 1 7.57047 1 8.00002C1 8.42957 1.34821 8.77779 1.77777 8.77779H7.22221V14.2222C7.22221 14.6518 7.57043 15 7.99998 15C8.42953 15 8.77775 14.6518 8.77775 14.2222V8.77779H14.2222C14.6517 8.77779 15 8.42957 15 8.00002C15 7.57047 14.6518 7.22225 14.2223 7.22225Z" fill="#122956"/>
              </svg>
            </div>

            <div onClick={() => {handleShowLibrary(); handleImageClickHeader(7)}} style={{width: '192px'}} className={`shirt_drawing_header_select`}>
              Из библиотеки 
              <svg style={{marginLeft: '10px'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M14.9475 15.2091H16.6849L15.3924 20L0 15.7921L2.37516 6.9962V13.4432L2.06462 14.6008L14.2174 17.9214L14.9475 15.2091ZM8.66974 5.91466C9.36634 5.91466 9.92866 5.34854 9.92866 4.64723C9.92866 3.94592 9.36634 3.37981 8.66974 3.37981C7.97314 3.37981 7.41083 3.94592 7.41083 4.64723C7.41083 5.34854 7.97314 5.91466 8.66974 5.91466ZM20 2.53485V13.5192H4.05371V2.53485C4.05371 1.14068 5.18674 0 6.57155 0H17.4822C18.867 0 20 1.14068 20 2.53485ZM5.73227 2.53485V11.5505L12.2283 5.01056L14.9979 7.7989L18.3214 4.45289V2.53485C18.3214 2.07013 17.9438 1.6899 17.4822 1.6899H6.57155C6.10995 1.6899 5.73227 2.07013 5.73227 2.53485ZM18.3214 11.8293V6.84411L14.9979 10.1901L12.2283 7.40177L7.83047 11.8293H18.3214Z" fill="#122956"/>
              </svg>
            </div>

            <div onClick={() => {handleImageClickHeader(8)}} style={{width: '128px'}} className={`shirt_drawing_header_select`}>
              ИИ 
              <svg style={{marginLeft: '10px'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0_2718_2172)">
                  <path d="M11.7346 4.655L0.750475 15.6408C0.299158 16.1248 0.0533432 16.765 0.0648389 17.4266C0.0763346 18.0883 0.344242 18.7196 0.812099 19.1876C1.27996 19.6555 1.91122 19.9236 2.57284 19.9352C3.23446 19.9469 3.87477 19.7012 4.35881 19.25L15.3455 8.26583L11.7346 4.655ZM12.9888 8.26583L10.8338 10.4208L9.58381 9.16667L11.7388 7.01167L12.9888 8.26583ZM3.18048 18.0733C3.01201 18.2339 2.78821 18.3235 2.55548 18.3235C2.32274 18.3235 2.09894 18.2339 1.93048 18.0733C1.76499 17.9074 1.67205 17.6827 1.67205 17.4483C1.67205 17.214 1.76499 16.9892 1.93048 16.8233L8.40464 10.3483L9.65881 11.6025L3.18048 18.0733ZM17.778 12.19L20.0005 13.3017L17.778 14.4167L16.6671 16.635L15.5563 14.4167L13.3338 13.3017L15.5563 12.19L16.6671 9.96833L17.778 12.19ZM5.55631 4.44417L3.33381 3.33333L5.55631 2.2225L6.66714 0L7.77798 2.2225L10.0005 3.33333L7.77798 4.44417L6.66714 6.66667L5.55631 4.44417ZM16.1113 3.88917L14.1671 2.91667L16.1113 1.94417L17.0838 0L18.0563 1.94417L20.0005 2.91667L18.0563 3.88917L17.0838 5.83333L16.1113 3.88917Z" fill="#122956"/>
                </g>
                <defs>
                  <clipPath id="clip0_2718_2172">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
              <g clip-path="url(#clip0_499_1673)">
                <path d="M1.46732 12.1867L3.66732 6.85326C3.79127 6.72829 3.93874 6.6291 4.10122 6.5614C4.2637 6.49371 4.43797 6.45886 4.61399 6.45886C4.79 6.45886 4.96428 6.49371 5.12675 6.5614C5.28923 6.6291 5.4367 6.72829 5.56065 6.85326C5.80899 7.10308 5.94838 7.44101 5.94838 7.79326C5.94838 8.14551 5.80899 8.48344 5.56065 8.73326L3.33399 14.8534L4.56106 14.3107C13.3385 10.4285 23.3835 10.6271 32.0007 14.8533C32.3543 14.8533 32.6934 14.9937 32.9435 15.2438C33.1935 15.4938 33.334 15.833 33.334 16.1866C33.334 16.5402 33.1935 16.8794 32.9435 17.1294C32.6934 17.3795 32.3543 17.5199 32.0007 17.5199C23.3762 13.3026 13.3097 13.2003 4.60125 17.2414L4.00065 17.5201L12.2273 20.9999C12.3523 21.1239 12.4515 21.2713 12.5192 21.4338C12.5869 21.5963 12.6217 21.7706 12.6217 21.9466C12.6217 22.1226 12.5869 22.2969 12.5192 22.4594C12.4515 22.6218 12.3523 22.7693 12.2273 22.8933C12.1034 23.0182 11.9559 23.1174 11.7934 23.1851C11.6309 23.2528 11.4567 23.2877 11.2807 23.2877C11.1046 23.2877 10.9304 23.2528 10.7679 23.1851C10.6054 23.1174 10.4579 23.0182 10.334 22.8933L3.62106 19.88C2.10905 19.2013 0.000652313 18.5107 0.000652313 16.8534C0.000652313 15.7934 0.66732 14.1867 1.46732 12.1867Z" fill="#17262B"/>
              </g>
              <defs>
                <clipPath id="clip0_499_1673">
                  <rect width="32" height="32" fill="white" transform="matrix(-1 0 0 1 32 0.186646)"/>
                </clipPath>
              </defs>
            </svg>

            {categoryChange === 31 ? (
              <>
                <div ref={ref} style={{display: isFrontView ? 'block' : 'none'}} id="tshirt-div">
                  <svg id="tshirt-backgroundpicture" width={width} height={height} viewBox="0 0 604 562" fill="none" style={{position: 'relative'}} xmlns="http://www.w3.org/2000/svg">
                    <path d="M238.94 1C259.202 18.5428 312.71 43.1028 364.646 1L378.706 6.1258L463.888 37.1821L602 141.206L536.666 236.184L494.488 219.12V561H109.099V219.12L67.3343 236.595L2 141.206L140.525 36.7709L224.838 6.1258L238.94 1Z" fill={shirtColor}/>
                    <path d="M238.94 1C259.202 18.5428 312.71 43.1028 364.646 1M238.94 1C239.767 24.162 253.496 71.884 301.793 73.3642C322.193 73.7753 361.338 59.8781 364.646 1M238.94 1L224.838 6.1258M364.646 1L378.706 6.1258M463.888 37.1821L602 141.206L536.666 236.184L494.488 219.12M463.888 37.1821L378.706 6.1258M463.888 37.1821C457.41 76.7905 454.46 168.794 494.488 219.12M494.488 219.12V561H109.099V219.12M109.099 219.12L67.3342 236.595L2 141.206L140.525 36.7709M109.099 219.12C149.457 170.439 146.866 77.3387 140.525 36.7709M140.525 36.7709L224.838 6.1258M378.706 6.1258C378.706 31.8279 363.323 86.4391 301.793 86.9324C277.781 87.1974 230.758 73.3806 224.838 6.1258" stroke="#666666" strokeWidth="1.5"/>
                    <g filter="url(#filter0_i_492_1558)">
                      <path d="M362.853 2.42342C312.917 41.4191 261.899 19.6435 240.69 2.46808C240.011 1.91829 238.996 2.42104 239.055 3.29262C239.223 5.76093 239.528 8.44604 239.991 11.279C243.999 35.7889 259.879 71.3662 301.789 73.3642C320.943 72.9781 356.624 61.4274 363.648 11.279C364.008 8.70691 364.293 6.03329 364.496 3.25443C364.56 2.38883 363.537 1.88924 362.853 2.42342Z" fill={shirtColor}/>
                    </g>
                    <path d="M362.853 2.42342C312.917 41.4191 261.899 19.6435 240.69 2.46808C240.011 1.91829 238.996 2.42104 239.055 3.29262C239.223 5.76093 239.528 8.44604 239.991 11.279C243.999 35.7889 259.879 71.3662 301.789 73.3642C320.943 72.9781 356.624 61.4274 363.648 11.279C364.008 8.70691 364.293 6.03329 364.496 3.25443C364.56 2.38883 363.537 1.88924 362.853 2.42342Z" stroke="#666666" strokeWidth="1.5"/>
                    <path d="M239.768 12.1013C252.95 28.9589 318.106 51.5727 363.424 12.1013" stroke="#666666" strokeWidth="0.5" strokeDasharray="3 3" />
                    <path d="M240.594 17.4464C253.642 34.7143 320.616 55.9531 362.992 17.4464" stroke="#666666" strokeWidth="0.5" strokeDasharray="3 3" />
                    <g filter="url(#filter1_i_492_1558)">
                      <path d="M239.768 10.4565C252.95 27.3141 318.106 49.9279 363.424 10.4565M241.81 19.9132C250.857 35.9485 322.964 56.9176 361.667 19.9132" stroke="#666666"/>
                    </g>
                    <path d="M23.5625 127L87.7812 226.4" stroke="#CCCCCC" strokeDasharray="4 4" />
                    <path d="M19.8125 131.667L82.625 227.8" stroke="#CCCCCC" strokeDasharray="4 4"/>
                    <path d="M579.031 126.067L514.812 225.467" stroke="#CCCCCC" strokeDasharray="4 4"/>
                    <path d="M582.781 130.733L519.969 226.867" stroke="#CCCCCC" strokeDasharray="4 4"/>
                    <path d="M110.75 545.133H492.781" stroke="#CCCCCC" strokeDasharray="4 4" />
                    <path d="M110.75 539.533H492.781" stroke="#CCCCCC" strokeDasharray="4 4" />
                    <defs>
                      <filter id="filter0_i_492_1558" x="238.303" y="-1.54187" width="126.947" height="75.6564" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy={-3} />
                        <feGaussianBlur stdDeviation={6} />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_492_1558"/>
                      </filter>
                      <filter id="filter1_i_492_1558" x="239.373" y="7.07947" width="124.379" height="33.9486" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy={-3} />
                        <feGaussianBlur stdDeviation={6} />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_492_1558"/>
                      </filter>
                    </defs>
                  </svg>

                  <div style={{display: !textInputVisible ? 'block' : 'none'}}>
                    <Reveal>

                      <div style={{position: 'relative', top: '-300px', left: '200px'}}>
                        <textarea style={{ color: color, fontSize: `${fontSizePx}px`, height: '50px' }} className='add_text' type="text" placeholder='Easy Print' value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)}/>
                      </div>

                      <style>
                        {`
                          .add_text::placeholder {
                            color: ${color};
                          }
                        `}
                      </style>
                    </Reveal>
                  </div>

                  <div style={{display: !photoInputVisible ? 'block' : 'none', border: !photoInputVisible ? 'none' : 'none'}} id="drawingArea" className="drawing-area">
                    <div className="canvas-container">
                      <canvas id="tshirt-canvas" width="234" height="350"></canvas>
                    </div>
                  </div>
                </div>

                <div ref={refBack} style={{display: !isFrontView ? 'block' : 'none'}}>
                  <svg width={width} height={height} style={{ display: 'block' }} viewBox="0 0 604 562" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M239.156 1.186c20.395 17.504 73.583 41.698 125.266-.005a.51.51 0 01.491-.084l13.793 5.029 85.182 31.056L602 141.206l-65.334 94.978-42.178-17.064V561H109.099V219.12l-41.765 17.475L2 141.206 140.525 36.771l84.313-30.645L238.664 1.1a.489.489 0 01.492.086z" fill={shirtColor}/>
                    <path d="M463.888 37.182L602 141.206l-65.334 94.978-42.178-17.064m-30.6-181.938L378.706 6.126l-13.793-5.029a.51.51 0 00-.491.084c-51.683 41.703-104.871 17.51-125.266.005a.489.489 0 00-.492-.086l-13.826 5.026-84.313 30.645m323.363.411c-6.478 39.608-9.428 131.612 30.6 181.938m0 0V561H109.099V219.12m0 0l-41.765 17.475L2 141.206 140.525 36.771M109.099 219.12c40.358-48.681 37.767-141.781 31.426-182.35" stroke="#666" strokeWidth={1.5}/>
                    <path d="M24.5 127l64.219 99.4M20.75 131.667L83.563 227.8M579.969 126.067l-64.219 99.4M583.719 130.733l-62.813 96.134M111.688 545.133h382.031M111.688 539.533h382.031" stroke="#CCC" strokeDasharray="4 4"/>
                  </svg>

                  <div style={{display: !textInputVisible ? 'block' : 'none'}}>
                    <Reveal>

                      <div style={{position: 'relative', top: '-300px', left: '200px'}}>
                        <textarea style={{ color: color, fontSize: `${fontSizePx}px`, height: '50px' }} className='add_text' type="text" placeholder='Easy Print' value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)}/>
                      </div>

                      <style>
                        {`
                          .add_text::placeholder {
                            color: ${color};
                          }
                        `}
                      </style>
                    </Reveal>
                  </div>

                  <div style={{display: !photoInputVisible ? 'block' : 'none', border: !photoInputVisible ? 'none' : 'none', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '-503px', left: '0', transform: 'scale(0.9)'}} id="drawingArea" className="drawing-area">
                    <div className="canvas-container">
                      <canvas id="tshirt-canvas" width="234" height="350"></canvas>
                    </div>
                  </div>
                </div>
              </>
            ) : categoryChange === 32 ? (
              shirtColor === '#000000' ? (
                !isFrontView ? (
                  <>
                    <div ref={refBackBlackHoodie}>
                      <img src={sweatshot_back_black} alt="sweatshot_back_black" />
                      {/* <svg width="549" height="493" viewBox="0 0 549 493" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M193.878 2.37883C214.178 18.9487 323.464 24.2143 347.727 4.27537C348.634 3.52917 349.836 3.25834 350.94 3.66091L363.186 8.1258L417.023 29.7972C429.024 34.628 439.472 42.654 447.234 53.0037C452.681 60.2668 456.68 68.5095 459.015 77.2828L544.48 398.5C549.836 416.653 548.757 423.754 542.98 433.5C541.208 447.671 541.479 456.17 543.841 469.688C544.191 471.691 543.012 473.658 541.068 474.257L489.81 490.054C487.762 490.686 485.582 489.585 484.845 487.573C479.132 471.97 474.813 463.739 465.98 453L428.48 385.12V459.5C426.654 467.695 425.743 473.672 427.008 484.436C427.226 486.295 425.759 487.941 423.888 487.877L368.98 486L336.57 488.216C319.199 489.404 301.765 489.354 284.401 488.068L281.237 487.834C264.757 486.613 248.207 486.649 231.732 487.941C214.259 489.311 196.705 489.269 179.24 487.813L157.48 486L121.262 487.811C119.331 487.908 117.818 486.177 118.109 484.265C119.871 472.699 118.872 466.831 116.48 459.5V372.12L75.037 459.5C68.6292 468.103 65.6696 476.235 60.7965 489.025C60.2067 490.573 58.7145 491.599 57.058 491.578C36.4864 491.32 25.4647 488.068 4.81356 479.927C2.53342 479.028 1.60948 476.292 2.44428 473.987C6.74969 462.103 3.84896 445.984 1.98047 442L1.80031 432.992C1.58787 422.37 2.66838 411.762 5.01801 401.401L42.9805 234L88.1818 77.179C90.6923 68.4692 94.8029 60.3031 100.303 53.0984L101.318 51.7696C108.342 42.5691 117.454 35.171 127.901 30.1856L178.318 6.1258L190.51 1.69431C191.664 1.27502 192.927 1.60271 193.878 2.37883Z" fill="#1A1A1A"/>
                        <path d="M428.48 385.12L465.98 453M428.48 385.12C423.054 326.262 415.32 226.291 418.601 147.5M428.48 385.12V459.5M116.48 372.12C120.857 314.211 126.012 223.316 123.264 147.5M116.48 372.12L75.037 459.5M116.48 372.12V459.5M542.98 433.5C541.208 447.671 541.479 456.17 543.841 469.688C544.191 471.692 543.012 473.658 541.068 474.257L489.81 490.054C487.762 490.686 485.582 489.585 484.845 487.573C479.132 471.97 474.813 463.739 465.98 453M542.98 433.5C548.757 423.754 549.836 416.653 544.48 398.5L459.015 77.2828C456.68 68.5095 452.681 60.2668 447.234 53.0037V53.0037C439.472 42.654 429.024 34.628 417.023 29.7972L363.186 8.1258L350.94 3.66091C349.836 3.25834 348.634 3.52917 347.727 4.27537C323.464 24.2143 214.178 18.9487 193.878 2.37883C192.927 1.60271 191.664 1.27502 190.51 1.69431L178.318 6.1258L127.901 30.1856C117.454 35.171 108.342 42.5691 101.318 51.7696L100.303 53.0984C94.8029 60.3031 90.6923 68.4692 88.1818 77.179L42.9805 234L5.01801 401.401C2.66838 411.762 1.58787 422.37 1.80031 432.992L1.98047 442M542.98 433.5L530.469 435.63C523.166 436.873 516.024 438.923 509.174 441.744L503.908 443.912C497.309 446.63 490.437 448.633 483.412 449.887L465.98 453M1.98047 442C3.84896 445.984 6.74969 462.103 2.44428 473.987C1.60947 476.292 2.53342 479.028 4.81356 479.927C25.4647 488.068 36.4864 491.32 57.058 491.578C58.7145 491.599 60.2067 490.573 60.7965 489.025C65.6696 476.235 68.6292 468.103 75.037 459.5M1.98047 442L16.2033 444.963C22.7105 446.319 29.0962 448.204 35.2964 450.599V450.599C43.7264 453.856 52.492 456.167 61.4321 457.489L75.037 459.5M116.48 459.5C118.872 466.831 119.871 472.699 118.109 484.265C117.818 486.177 119.331 487.907 121.262 487.811L157.48 486L179.24 487.813C196.705 489.269 214.259 489.311 231.732 487.941V487.941C248.207 486.649 264.757 486.613 281.237 487.834L284.401 488.068C301.765 489.354 319.199 489.404 336.571 488.216L368.98 486L423.888 487.877C425.759 487.941 427.226 486.295 427.008 484.436C425.743 473.672 426.654 467.695 428.48 459.5M116.48 459.5L157.48 457.5L179.24 459.313C196.705 460.769 214.259 460.811 231.732 459.441V459.441C248.207 458.149 264.757 458.113 281.237 459.334L284.401 459.568C301.765 460.854 319.199 460.904 336.571 459.716L368.98 457.5L428.48 459.5" stroke="#4D4D4D" stroke-width="1.5"/>
                      </svg> */}
                      
                      <div style={{display: !textInputVisible ? 'block' : 'none'}}>
                        <Reveal>

                          <div style={{position: 'relative', top: '-300px', left: '200px'}}>
                            <textarea style={{ color: color, fontSize: `${fontSizePx}px`, height: '50px' }} className='add_text' type="text" placeholder='Easy Print' value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)}/>
                          </div>

                          <style>
                            {`
                              .add_text::placeholder {
                                color: ${color};
                              }
                            `}
                          </style>
                        </Reveal>
                      </div>

                      <div style={{display: !photoInputVisible ? 'block' : 'none', border: !photoInputVisible ? 'none' : 'none', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '-503px', left: '0', transform: 'scale(0.9)'}} id="drawingArea" className="drawing-area">
                        <div className="canvas-container">
                          <canvas id="tshirt-canvas" width="234" height="350"></canvas>
                        </div>
                      </div>
                    </div>
                  </>
                ) : isFrontView ? (
                  <>
                    <div ref={refBlackHoodie}>
                      <img src={sweatshot_front_black} alt="sweatshot_front_black" />
                      
                      <div style={{display: !textInputVisible ? 'block' : 'none'}}>
                        <Reveal>

                          <div style={{position: 'relative', top: '-300px', left: '200px'}}>
                            <textarea style={{ color: color, fontSize: `${fontSizePx}px`, height: '50px' }} className='add_text' type="text" placeholder='Easy Print' value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)}/>
                          </div>

                          <style>
                            {`
                              .add_text::placeholder {
                                color: ${color};
                              }
                            `}
                          </style>
                        </Reveal>
                      </div>

                      <div style={{display: !photoInputVisible ? 'block' : 'none', border: !photoInputVisible ? 'none' : 'none', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '-510px', left: '0', transform: 'scale(0.9)'}} id="drawingArea" className="drawing-area">
                        <div className="canvas-container">
                          <canvas id="tshirt-canvas" width="234" height="350"></canvas>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div ref={refBlackHoodie}>
                      <img src={sweatshot_front_black} alt="sweatshot_front_black" />
                      
                      <div style={{display: !textInputVisible ? 'block' : 'none'}}>
                        <Reveal>

                          <div style={{position: 'relative', top: '-300px', left: '200px'}}>
                            <textarea style={{ color: color, fontSize: `${fontSizePx}px`, height: '50px' }} className='add_text' type="text" placeholder='Easy Print' value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)}/>
                          </div>

                          <style>
                            {`
                              .add_text::placeholder {
                                color: ${color};
                              }
                            `}
                          </style>
                        </Reveal>
                      </div>

                      <div style={{display: !photoInputVisible ? 'block' : 'none', border: !photoInputVisible ? 'none' : 'none', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '-510px', left: '0', transform: 'scale(0.9)'}} id="drawingArea" className="drawing-area">
                        <div className="canvas-container">
                          <canvas id="tshirt-canvas" width="234" height="350"></canvas>
                        </div>
                      </div>
                    </div>
                  </>
                )
              ) : (
                !isFrontView ? (
                  <>
                    <div ref={refBackWhiteHoodie}>
                      <img src={sweatshot_back_white} alt="sweatshot_back_black" />
                      
                      <div style={{display: !textInputVisible ? 'block' : 'none'}}>
                        <Reveal>

                          <div style={{position: 'relative', top: '-300px', left: '200px'}}>
                            <textarea style={{ color: color, fontSize: `${fontSizePx}px`, height: '50px' }} className='add_text' type="text" placeholder='Easy Print' value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)}/>
                          </div>

                          <style>
                            {`
                              .add_text::placeholder {
                                color: ${color};
                              }
                            `}
                          </style>
                        </Reveal>
                      </div>

                      <div style={{display: !photoInputVisible ? 'block' : 'none', border: !photoInputVisible ? 'none' : 'none', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '-510px', left: '0', transform: 'scale(0.9)'}} id="drawingArea" className="drawing-area">
                        <div className="canvas-container">
                          <canvas id="tshirt-canvas" width="234" height="350"></canvas>
                        </div>
                      </div>
                    </div>
                  </>
                ) : isFrontView ? (
                  <>
                    <div ref={refWhiteHoodie}>
                      <img src={sweatshot_front_white} alt="sweatshot_front_black" />
                      
                      <div style={{display: !textInputVisible ? 'block' : 'none'}}>
                        <Reveal>

                          <div style={{position: 'relative', top: '-300px', left: '200px'}}>
                            <textarea style={{ color: color, fontSize: `${fontSizePx}px`, height: '50px' }} className='add_text' type="text" placeholder='Easy Print' value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)}/>
                          </div>

                          <style>
                            {`
                              .add_text::placeholder {
                                color: ${color};
                              }
                            `}
                          </style>
                        </Reveal>
                      </div>

                      <div style={{display: !photoInputVisible ? 'block' : 'none', border: !photoInputVisible ? 'none' : 'none', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '-510px', left: '0', transform: 'scale(0.9)'}} id="drawingArea" className="drawing-area">
                        <div className="canvas-container">
                          <canvas id="tshirt-canvas" width="234" height="350"></canvas>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div ref={refWhiteHoodie}>
                      <img src={sweatshot_front_white} alt="sweatshot_front_black" />
                      
                      <div style={{display: !textInputVisible ? 'block' : 'none'}}>
                        <Reveal>

                          <div style={{position: 'relative', top: '-300px', left: '200px'}}>
                            <textarea style={{ color: color, fontSize: `${fontSizePx}px`, height: '50px' }} className='add_text' type="text" placeholder='Easy Print' value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)}/>
                          </div>

                          <style>
                            {`
                              .add_text::placeholder {
                                color: ${color};
                              }
                            `}
                          </style>
                        </Reveal>
                      </div>

                      <div style={{display: !photoInputVisible ? 'block' : 'none', border: !photoInputVisible ? 'none' : 'none', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '-510px', left: '0', transform: 'scale(0.9)'}} id="drawingArea" className="drawing-area">
                        <div className="canvas-container">
                          <canvas id="tshirt-canvas" width="234" height="350"></canvas>
                        </div>
                      </div>
                    </div>
                  </>
                )
              )
            ) : categoryChange === 33 ? (
              shirtColor === '#000000' ? (
                !isFrontView ? (
                  <>
                    <div ref={refBackBlackSweatshot}>
                      <img style={{width: '500px'}} src={hoodie_back_black} alt="hoodie_back_black" />

                      <div style={{display: !textInputVisible ? 'block' : 'none'}}>
                        <Reveal>

                          <div style={{position: 'relative', top: '-300px', left: '200px'}}>
                            <textarea style={{ color: color, fontSize: `${fontSizePx}px`, height: '50px' }} className='add_text' type="text" placeholder='Easy Print' value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)}/>
                          </div>

                          <style>
                            {`
                              .add_text::placeholder {
                                color: ${color};
                              }
                            `}
                          </style>
                        </Reveal>
                      </div>

                      <div style={{display: !photoInputVisible ? 'block' : 'none', border: !photoInputVisible ? 'none' : 'none', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '-510px', left: '0', transform: 'scale(0.9)'}} id="drawingArea" className="drawing-area">
                        <div className="canvas-container">
                          <canvas id="tshirt-canvas" width="234" height="350"></canvas>
                        </div>
                      </div>
                    </div>
                  </>
                ) : isFrontView ? (
                  <>
                    <div ref={refBlackSweatshot}>
                      <img style={{width: '500px'}} src={hoodie_front_black} alt="hoodie_front_black" />

                      <div style={{display: !textInputVisible ? 'block' : 'none'}}>
                        <Reveal>

                          <div style={{position: 'relative', top: '-300px', left: '200px'}}>
                            <textarea style={{ color: color, fontSize: `${fontSizePx}px`, height: '50px' }} className='add_text' type="text" placeholder='Easy Print' value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)}/>
                          </div>

                          <style>
                            {`
                              .add_text::placeholder {
                                color: ${color};
                              }
                            `}
                          </style>
                        </Reveal>
                      </div>

                      <div style={{display: !photoInputVisible ? 'block' : 'none', border: !photoInputVisible ? 'none' : 'none', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '-510px', left: '0', transform: 'scale(0.9)'}} id="drawingArea" className="drawing-area">
                        <div className="canvas-container">
                          <canvas id="tshirt-canvas" width="234" height="350"></canvas>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div ref={refBlackSweatshot}>
                      <img style={{width: '500px'}} src={hoodie_front_black} alt="hoodie_front_black" />

                      <div style={{display: !textInputVisible ? 'block' : 'none'}}>
                        <Reveal>

                          <div style={{position: 'relative', top: '-300px', left: '200px'}}>
                            <textarea style={{ color: color, fontSize: `${fontSizePx}px`, height: '50px' }} className='add_text' type="text" placeholder='Easy Print' value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)}/>
                          </div>

                          <style>
                            {`
                              .add_text::placeholder {
                                color: ${color};
                              }
                            `}
                          </style>
                        </Reveal>
                      </div>

                      <div style={{display: !photoInputVisible ? 'block' : 'none', border: !photoInputVisible ? 'none' : 'none', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '-510px', left: '0', transform: 'scale(0.9)'}} id="drawingArea" className="drawing-area">
                        <div className="canvas-container">
                          <canvas id="tshirt-canvas" width="234" height="350"></canvas>
                        </div>
                      </div>
                    </div>
                  </>
                )
              ) : (
                !isFrontView ? (
                  <>
                    <div ref={refBackWhiteSweatshot}>
                      <img style={{width: '500px'}} src={hoodie_back_white} alt="hoodie_back_white" />

                      <div style={{display: !textInputVisible ? 'block' : 'none'}}>
                        <Reveal>

                          <div style={{position: 'relative', top: '-300px', left: '200px'}}>
                            <textarea style={{ color: color, fontSize: `${fontSizePx}px`, height: '50px' }} className='add_text' type="text" placeholder='Easy Print' value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)}/>
                          </div>

                          <style>
                            {`
                              .add_text::placeholder {
                                color: ${color};
                              }
                            `}
                          </style>
                        </Reveal>
                      </div>

                      <div style={{display: !photoInputVisible ? 'block' : 'none', border: !photoInputVisible ? 'none' : 'none', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '-510px', left: '0', transform: 'scale(0.9)'}} id="drawingArea" className="drawing-area">
                        <div className="canvas-container">
                          <canvas id="tshirt-canvas" width="234" height="350"></canvas>
                        </div>
                      </div>
                    </div>
                  </>
                ) : isFrontView ? (
                  <>
                    <div ref={refWhiteSweatshot}>
                      <img style={{width: '500px'}} src={hoodie_front_white} alt="hoodie_front_white" />

                      <div style={{display: !textInputVisible ? 'block' : 'none'}}>
                        <Reveal>

                          <div style={{position: 'relative', top: '-300px', left: '200px'}}>
                            <textarea style={{ color: color, fontSize: `${fontSizePx}px`, height: '50px' }} className='add_text' type="text" placeholder='Easy Print' value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)}/>
                          </div>

                          <style>
                            {`
                              .add_text::placeholder {
                                color: ${color};
                              }
                            `}
                          </style>
                        </Reveal>
                      </div>

                      <div style={{display: !photoInputVisible ? 'block' : 'none', border: !photoInputVisible ? 'none' : 'none', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '-510px', left: '0', transform: 'scale(0.9)'}} id="drawingArea" className="drawing-area">
                        <div className="canvas-container">
                          <canvas id="tshirt-canvas" width="234" height="350"></canvas>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div ref={refWhiteSweatshot}>
                      <img style={{width: '500px'}} src={hoodie_front_white} alt="hoodie_front_white" />

                      <div style={{display: !textInputVisible ? 'block' : 'none'}}>
                        <Reveal>

                          <div style={{position: 'relative', top: '-300px', left: '200px'}}>
                            <textarea style={{ color: color, fontSize: `${fontSizePx}px`, height: '50px' }} className='add_text' type="text" placeholder='Easy Print' value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)}/>
                          </div>

                          <style>
                            {`
                              .add_text::placeholder {
                                color: ${color};
                              }
                            `}
                          </style>
                        </Reveal>
                      </div>

                      <div style={{display: !photoInputVisible ? 'block' : 'none', border: !photoInputVisible ? 'none' : 'none', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '-510px', left: '0', transform: 'scale(0.9)'}} id="drawingArea" className="drawing-area">
                        <div className="canvas-container">
                          <canvas id="tshirt-canvas" width="234" height="350"></canvas>
                        </div>
                      </div>
                    </div>
                  </>
                )
              )
            ) : null}

            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
              <g opacity="0.5" clip-path="url(#clip0_492_1578)">
                <path d="M30.5327 12.1867L28.3327 6.85326C28.2087 6.72829 28.0613 6.6291 27.8988 6.5614C27.7363 6.49371 27.562 6.45886 27.386 6.45886C27.21 6.45886 27.0357 6.49371 26.8732 6.5614C26.7108 6.6291 26.5633 6.72829 26.4393 6.85326C26.191 7.10308 26.0516 7.44101 26.0516 7.79326C26.0516 8.14551 26.191 8.48344 26.4393 8.73326L28.666 14.8534L27.4389 14.3107C18.6615 10.4285 8.61646 10.6271 -0.000651121 14.8533C-0.354273 14.8533 -0.693412 14.9937 -0.94346 15.2438C-1.19351 15.4938 -1.33398 15.833 -1.33398 16.1866C-1.33398 16.5402 -1.19351 16.8794 -0.94346 17.1294C-0.693412 17.3795 -0.354273 17.5199 -0.000651121 17.5199C8.62379 13.3026 18.6903 13.2003 27.3987 17.2414L27.9993 17.5201L19.7727 20.9999C19.6477 21.1239 19.5485 21.2713 19.4808 21.4338C19.4131 21.5963 19.3783 21.7706 19.3783 21.9466C19.3783 22.1226 19.4131 22.2969 19.4808 22.4594C19.5485 22.6218 19.6477 22.7693 19.7727 22.8933C19.8966 23.0182 20.0441 23.1174 20.2066 23.1851C20.3691 23.2528 20.5433 23.2877 20.7193 23.2877C20.8954 23.2877 21.0696 23.2528 21.2321 23.1851C21.3946 23.1174 21.5421 23.0182 21.666 22.8933L28.3789 19.88C29.891 19.2013 31.9993 18.5107 31.9993 16.8534C31.9993 15.7934 31.3327 14.1867 30.5327 12.1867Z" fill="#4D4D4D"/>
              </g>
              <defs>
                <clipPath id="clip0_492_1578">
                  <rect width="32" height="32" fill="white" transform="translate(0 0.186646)"/>
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModalToggle5" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '0px', border: 'none', width: '900px', height: '650px', marginLeft: '316px'}}>
          <div className="modal-content modal_content_print" style={{borderRadius: '0px', border: 'none', width: '900px', height: '650px'}}>
            <div className="modal-header">
              <h5 className="modal-title">Просмотр дизайна</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{padding: '32px', width: '900px', height: '650px'}}>
              <center>
                <img style={{width: '380px', height: '354px'}} src={image} alt="" />
                <img style={{marginLeft: '50px', width: '380px', height: '354px'}} src={imageBack} alt="" />

                <center>
                  <div style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
                    <span className='modal_size_title'>Размер:</span>
                    <div style={{display: 'flex', flexWrap: 'wrap', width: '600px'}}>
                      {categorySize.map(siz => (
                        <div title={siz.name} key={siz.id} onClick={() => {setSize(siz.name); setSelectedSize(siz.id)}} className='color_change_selector_modal' style={{width: '80px', borderColor: size === siz.name ? '#3C7CFB' : '#CCC'}}>
                          {siz.name}
                          {/* { && (
                            <svg className='ms-1' xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M4.14027 9.82979C3.84222 9.82992 3.55637 9.71145 3.3458 9.50052L0.943839 7.09945C0.685387 6.84092 0.685387 6.42183 0.943839 6.1633C1.20237 5.90485 1.62146 5.90485 1.87999 6.1633L4.14027 8.42358L10.12 2.44384C10.3785 2.18539 10.7976 2.18539 11.0562 2.44384C11.3146 2.70237 11.3146 3.12146 11.0562 3.37999L4.93474 9.50052C4.72417 9.71145 4.43832 9.82992 4.14027 9.82979Z" fill="#32454B" />
                            </svg>
                          )} */}
                        </div>
                      ))}
                    </div>
                  </div>
                </center>

                <img onClick={e => {addToBasketTo(e); handleButtonClick()}} src={addToBasketImage} data-bs-dismiss="modal" aria-label="Close" style={{marginTop: '20px', cursor: 'pointer'}} alt="addToBasket" />
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourDesign;