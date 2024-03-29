import React, { useEffect, useRef, useState } from 'react'
import './main.css';
import homeImage from '../../layouts/icons/home.svg';
import leftImage from '../../layouts/icons/left.svg';
import cachedImage from '../../layouts/icons/cached.svg';
import rightImage from '../../layouts/icons/right.svg';
import basketImage from '../../layouts/icons/basket.svg';
import addImage from '../../layouts/icons/add_image.svg';
import addText from '../../layouts/icons/add_text.svg';
import design from '../../layouts/images/design.svg';
import layer from '../../layouts/images/layer.svg';
import library from '../../layouts/images/library.svg';
import product from '../../layouts/images/product.svg';
import tShirt from '../../layouts/images/front.svg';
import tShirt_back from '../../layouts/icons/back.svg';
import size_text from '../../layouts/icons/size_text.svg';
import text_text from '../../layouts/icons/text_text.svg';
import style_text from '../../layouts/icons/style_text.svg';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { fabric } from 'fabric';
import html2canvas from 'html2canvas';
import { useScreenshot } from 'use-react-screenshot'

function YourDesignMobile() {
  const token = localStorage.getItem('token');

  const [desigState, setDesigState] = useState(true);
  const [layersState, setLayersState] = useState(false);
  const [libraryState, setLibraryState] = useState(false);
  const [productState, setProductState] = useState(false);

  const [firstBar, setFirstBar] = useState(true);
  const [textBar, setTextBar] = useState(false);
  const [imageBar, setImageBar] = useState(false);

  const [styleText, setStyleText] = useState(false);
  const [textText, setTextText] = useState(true);
  const [sizeText, setSizeText] = useState(false);
  
  const [imageList, setImageList] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [categoryName, setCategoryName] = useState([]);
  const [categorySize, setCategorySize] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [categoryChangeCheck, setCategoryChangeCheck] = useState(31);
  const [category, setCategory] = useState('Футболка');
  const [categoryChange, setCategoryChange] = useState(31);
  const [shirtColor, setShirtColor] = useState('#FFFFFF');
  const [size, setSize] = useState('xxs');
  const [selectedSize, setSelectedSize] = useState(null);
  const [textValue, setTextValue] = useState('EasyPrint');
  const [tshirtImage, setTshirtImage] = useState(false);
  const [printImage, setPrintImage] = useState([]);
  const [countHeader, setCountHeader] = useState(0);

  const ref = useRef(null)
  const refBack = useRef(null)

  let [image, takeScreenshot] = useScreenshot()
  let [imageBack, takeScreenshotBack] = useScreenshot()

  let getImage = () => takeScreenshot(ref.current)
  let getImageBack = () => takeScreenshotBack(refBack.current)

  useEffect(() => {
    setDesigState(true);
    setLayersState(false);
    setLibraryState(false);
    setProductState(false);

    setFirstBar(true);
    setTextBar(false);
    setImageBar(false);

    setStyleText(false);
    setTextText(true);
    setSizeText(false);
  }, [])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/anime-category-size-color`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      // console.log(response.data.data.category[0].sizes[0].id);
      setSelectedSize(response.data.data.category[0].sizes[0].id);
    }).catch((error) => {
      console.log(error);
    });   
  }, [])

  const handleShowLibrary = () => {
    axios.get(`${process.env.REACT_APP_TWO}/get-image`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      setImageList(response.data.data);
    }).catch((error) => {
      console.log(error);    
    });    
  };

  const handleImageClick2 = (index) => {
    if (index === selectedImageIndex) {
      setSelectedImageIndex(-1);
    } else {
      setSelectedImageIndex(index);
    }
  };

  const handleShowAnime = () => {
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
      console.log(error);
    });   
  };

  useEffect(() => {
    if (textBar) {
      const canvas = new fabric.Canvas('canvasTextMobile');
      canvas.clear();
      const text = new fabric.Textbox(textValue, {
        left: 50,
        top: 50,
        fill: '#000000',
        fontSize: 20,
        fontFamily: 'Arial'
      });
      canvas.add(text);
    }
  }, [textBar, textValue]);

  const handleInputChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleClickTshirtChange = () => {
    setTshirtImage((prev) => !prev);
  };

  if (image === null) {
    image = tShirt
  }

  useEffect(() => {
    const storedCount = localStorage.getItem('counterValue');
    if (storedCount) {
      setCountHeader(Number(storedCount));
    }
  }, []);

  const handleButtonClick = () => {
    if (!localStorage.getItem('token')) {
      console.log('Please login first');
    } else {
      const newCount = Math.max(1, countHeader + 1);
      setCountHeader(newCount);

      localStorage.setItem('counterValue', newCount.toString());
    }
  };

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

    var formdata = new FormData();
    formdata.append("product_id", product_id.id);
    formdata.append("category_id", categoryChange);
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
    console.log(selectedSize);
    console.log(shirtColor === '#000000' ? 3 : 4);
    console.log(categoryChange);
  
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
          alert('Товар добавлен в корзину.');
        } else {
          if (result.message === "Unauthenticated.") {
            alert('Вы еще не зарегистрированы. Товар добавлен в корзину.');
          } else {
            alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
          }
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <div style={{overflow: 'hidden'}}>
      <div className='yourDesign_header_mobile'>
        <NavLink to={'/mobile'} className='center' style={{margin: 0, padding: 0}}>
          <img src={homeImage} alt="homeImage" />
        </NavLink>
        <img src={leftImage} alt="leftImage" />
        <img onClick={handleClickTshirtChange} src={cachedImage} alt="cachedImage" />
        <img src={rightImage} alt="rightImage" />
        <img onClick={() => {getImage(); getImageBack();}} data-bs-toggle="modal" data-bs-target="#exampleModal" src={basketImage} alt="basketImage" />
      </div>

      <div style={{position: 'absolute', width: '100%', zIndex: 100, height: '100%', top: '0', left: '0'}} onClick={() => {setTextBar(false); setFirstBar(true); setImageBar(false); setDesigState(true); setLayersState(false); setLibraryState(false); setProductState(false);}}></div>

      <div style={{position: 'relative', zIndex: 200}}>
        {desigState === true && (
          <div style={{textAlign: 'left', height: '500px'}}>
            <center>
              <div id='screenshot'>
                <img style={{width: '90%', marginTop: '80px'}} src={tshirtImage ? tShirt_back : tShirt} alt="tShirt" ref={ref} />
              </div>

              <div className='yourDesign_canvas_mobile'>
                <canvas style={{position: 'absolute', zIndex: 300, top: '-300px', left: '0'}} id="canvasTextMobile" width="190" height="220"></canvas>
              </div>
            </center>
          </div>
        )}

        {layersState === true && (
          <center style={{textAlign: 'left', padding: '16px'}}>
            <div className='yourDesign_layer'>
              <div className='d-flex'>
                <svg style={{marginRight: '12px'}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <g clip-path="url(#clip0_519_4035)">
                    <path d="M26.25 0H3.75C2.75544 0 1.80161 0.395088 1.09835 1.09835C0.395088 1.80161 0 2.75544 0 3.75L0 30H30V3.75C30 2.75544 29.6049 1.80161 28.9017 1.09835C28.1984 0.395088 27.2446 0 26.25 0ZM27.5 27.5H2.5V3.75C2.5 3.41848 2.6317 3.10054 2.86612 2.86612C3.10054 2.6317 3.41848 2.5 3.75 2.5H26.25C26.5815 2.5 26.8995 2.6317 27.1339 2.86612C27.3683 3.10054 27.5 3.41848 27.5 3.75V27.5ZM7.5 7.5H22.5V12.5H20V10H16.25V20H18.75V22.5H11.25V20H13.75V10H10V12.5H7.5V7.5Z" fill="#18356D"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_519_4035">
                      <rect width="30" height="30" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
          
                <h3 className='layers_text_value'>Easy Print</h3>
              </div>
        
              <div className='d-flex'>
                <svg id='clone' style={{marginRight: '12px'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clip-path="url(#clip0_519_4042)">
                    <path d="M16.6667 16.6667H0V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0L14.1667 0C14.8297 0 15.4656 0.263392 15.9344 0.732233C16.4033 1.20107 16.6667 1.83696 16.6667 2.5V16.6667ZM1.66667 15H15V2.5C15 2.27899 14.9122 2.06702 14.7559 1.91074C14.5996 1.75446 14.3877 1.66667 14.1667 1.66667H2.5C2.27899 1.66667 2.06702 1.75446 1.91074 1.91074C1.75446 2.06702 1.66667 2.27899 1.66667 2.5V15ZM18.3333 3.48667V18.3333H3.33333V20H20V5.83333C19.9979 5.31812 19.8366 4.81614 19.5383 4.39608C19.2399 3.97603 18.8191 3.6584 18.3333 3.48667Z" fill="#18356D"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_519_4042">
                      <rect width="20" height="20" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
          
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clip-path="url(#clip0_519_4037)">
                    <path d="M18.3327 3.33333H14.166V1.66667C14.166 1.22464 13.9904 0.800716 13.6779 0.488155C13.3653 0.175595 12.9414 0 12.4993 0L7.49935 0C7.05732 0 6.6334 0.175595 6.32084 0.488155C6.00828 0.800716 5.83268 1.22464 5.83268 1.66667V3.33333H1.66602V5H3.33268V17.5C3.33268 18.163 3.59607 18.7989 4.06492 19.2678C4.53376 19.7366 5.16964 20 5.83268 20H14.166C14.8291 20 15.4649 19.7366 15.9338 19.2678C16.4026 18.7989 16.666 18.163 16.666 17.5V5H18.3327V3.33333ZM7.49935 1.66667H12.4993V3.33333H7.49935V1.66667ZM14.9993 17.5C14.9993 17.721 14.9116 17.933 14.7553 18.0893C14.599 18.2455 14.387 18.3333 14.166 18.3333H5.83268C5.61167 18.3333 5.39971 18.2455 5.24343 18.0893C5.08715 17.933 4.99935 17.721 4.99935 17.5V5H14.9993V17.5Z" fill="#18356D"/>
                    <path d="M9.16667 8.33337H7.5V15H9.16667V8.33337Z" fill="#32454B"/>
                    <path d="M12.4987 8.33337H10.832V15H12.4987V8.33337Z" fill="#32454B"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_519_4037">
                      <rect width="20" height="20" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </center>
        )}

        {libraryState === true && (
          <center style={{textAlign: 'left', padding: '16px'}}>
            <div className="d-flex justify-content-between" style={{flexWrap: 'wrap', padding: '24px'}}>
              {imageList.map((item, index) => (
                <img style={{width: '18.203883495145632vh', cursor: 'pointer', height: '18.203883495145632vh', marginBottom: '2.912621359223301vh'}} key={index} src={item} alt="build_library_img" className={(index === selectedImageIndex && selectedImageIndex !== -1) ? 'selected-image_modal' : ''} onClick={() => handleImageClick2(index)} />
              ))}
            </div>
          </center>
        )}

        {productState === true && (
          <center style={{textAlign: 'left', padding: '16px'}}>
            <div className="center" style={{flexWrap: 'wrap', justifyContent: 'flex-start', padding: '2.912621359223301vh'}}>
              {categoryName && categoryName.category && categoryName.category.map((cat, index) => (
                <div key={index} onClick={() => {if (cat.type !== 'no active') { setCategory(cat.name); setCategoryChange(cat.id); setCategoryChangeCheck(cat.id); setCategorySize(cat.sizes); setCategoryIndex(index); } }} className={`${cat.type === 'no active' ? 'category_change_disbaled_mobile' : `category_change_mobile ${categoryIndex === index ? 'selected_category_mobile' : ''}`}`}>              
                  {cat.name}
                </div>
              ))}
            </div>

            <p className='product_state_text'>Размер</p>

            <div className="center" style={{flexWrap: 'wrap', justifyContent: 'flex-start', padding: '24px'}}>
              {categorySize.map((siz, index) => (
                <div key={siz.id} onClick={() => {setSize(siz.name); setSelectedSize(siz.id); setColorIndex(index)}} className={`${siz.type === 'no active' ? 'size_change_selector_disbaled_mobile' : `size_change_selector_mobile ${colorIndex === index ? 'size_change_selector_selected_mobile' : ''}`}`} style={{margin: '1px',}}>
                  {siz.name}
                </div>
              ))}
            </div>

            <p className='product_state_text'>Цвет</p>

            <div className="d-flex justify-content-between" style={{flexWrap: 'wrap'}}>
              <div className='d-flex' style={{padding: '24px'}}>
                <div onClick={() => setShirtColor('#FFFFFF')} className='color_change_selector_mobile'>
                  <div className='center' style={{borderRadius: '50%', width: '50px', height: '50px', backgroundColor: 'white', border: '0.5px solid var(--neutral-200, #CCC)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4.14027 9.82979C3.84222 9.82992 3.55637 9.71145 3.3458 9.50052L0.943839 7.09945C0.685387 6.84092 0.685387 6.42183 0.943839 6.1633C1.20237 5.90485 1.62146 5.90485 1.87999 6.1633L4.14027 8.42358L10.12 2.44384C10.3785 2.18539 10.7976 2.18539 11.0562 2.44384C11.3146 2.70237 11.3146 3.12146 11.0562 3.37999L4.93474 9.50052C4.72417 9.71145 4.43832 9.82992 4.14027 9.82979Z" fill={shirtColor === '#000000' ? '#FFFFFF' : '#000000'} />
                    </svg>
                  </div>
                </div>

                <div onClick={() => setShirtColor('#000000')} className='color_change_selector_mobile'>
                  <div className='center' style={{borderRadius: '50%', width: '50px', height: '50px', backgroundColor: 'black', marginLeft: '19px', border: '0.5px solid var(--neutral-200, #CCC)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4.14027 9.82979C3.84222 9.82992 3.55637 9.71145 3.3458 9.50052L0.943839 7.09945C0.685387 6.84092 0.685387 6.42183 0.943839 6.1633C1.20237 5.90485 1.62146 5.90485 1.87999 6.1633L4.14027 8.42358L10.12 2.44384C10.3785 2.18539 10.7976 2.18539 11.0562 2.44384C11.3146 2.70237 11.3146 3.12146 11.0562 3.37999L4.93474 9.50052C4.72417 9.71145 4.43832 9.82992 4.14027 9.82979Z" fill={shirtColor === '#000000' ? '#FFFFFF' : '#000000'} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </center>
        )}

        {firstBar === true && (
          <div className="yourDesign_bar">
            {desigState === true && (
              <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', position: 'relative', bottom: '-30px', zIndex: '100'}}>
                <img src={addImage} alt="addImage" />

                <img onClick={() => {setTextBar(true); setFirstBar(false); setImageBar(false)}} src={addText} alt="addText" />
              </div>
            )}

            <div className="yourDesign_bar_bottom">
              <div onClick={() => {setDesigState(true); setLayersState(false); setLibraryState(false); setProductState(false);}}>
                <img src={design} alt="design" />
              </div>

              <div onClick={() => {setDesigState(false); setLayersState(true); setLibraryState(false); setProductState(false);}}>
                <img src={layer} alt="layer" />
              </div>

              <div onClick={() => {setDesigState(false); setLayersState(false); setLibraryState(true); setProductState(false); handleShowLibrary()}}>
                <img src={library} alt="library" />
              </div>

              <div onClick={() => {setDesigState(false); setLayersState(false); setLibraryState(false); setProductState(true); handleShowAnime()}}>
                <img src={product} alt="product" />
              </div>
            </div>
          </div>
        )}

        {textBar === true && (
          <>
            {styleText === true && (
              <div className="d-flex">
                <select className='mobile_add_text_select'>
                  <option value="Inter">Inter</option>
                  <option value="Inter">Inter</option>
                  <option value="Inter">Inter</option>
                  <option value="Inter">Inter</option>
                </select>
              </div>
            )}

            {textText === true && (
              <input className='mobile_add_text_imput' type="text" name="" id="" value={textValue} onChange={handleInputChange} />
            )}

            {sizeText === true && (
              <input className='mobile_add_text_imput' type="text" name="" id="" value={textValue} onChange={handleInputChange} />
            )}

            <div className="yourDesign_bar">
              <div className="yourDesign_bar_bottom">
                <div onClick={() => {setTextText(false); setStyleText(true); setSizeText(false)}}>
                  <img src={style_text} alt="style_text" />
                </div>

                <div onClick={() => {setTextText(true); setStyleText(false); setSizeText(false)}}>
                  <img src={text_text} alt="text_text" />
                </div>

                <div onClick={() => {setTextText(false); setStyleText(false); setSizeText(true)}}>
                  <img src={size_text} alt="size_text" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '0'}}>
          <div className="modal-content" style={{borderRadius: '0'}}>
            <div style={{padding: '48px'}} className="modal-body">
              <div>
                <div data-bs-dismiss="modal" style={{position: 'absolute', left: '16px', top: '24px'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>

                <div className="flex-column center">
                  <div>
                    <img style={{width: '220px', height: '220px'}} src={image} alt="tShirt_front" ref={ref} />
                  </div>

                  <div>
                    <img style={{width: '220px', height: '220px', marginTop: '32px'}} src={tShirt_back} alt="tShirt_back" ref={refBack} />
                  </div>
                </div>
                <center>
                  {/* {orderedProduct ? ( */}
                    <button onClick={e => {addToBasketTo(e); handleButtonClick()}} className='add_basket_btn center' style={{width: '100%', height: '56px', marginTop: '18px', marginLeft: '0px', padding: '15px 18px', marginBottom: '0px', marginRight: '12px'}} data-bs-dismiss="modal">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19.5 7H17C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2C10.6739 2 9.40215 2.52678 8.46447 3.46447C7.52678 4.40215 7 5.67392 7 7H4.5C3.83696 7 3.20107 7.26339 2.73223 7.73223C2.26339 8.20107 2 8.83696 2 9.5L2 17.8333C2.00132 18.938 2.44073 19.997 3.22185 20.7782C4.00296 21.5593 5.062 21.9987 6.16667 22H17.8333C18.938 21.9987 19.997 21.5593 20.7782 20.7782C21.5593 19.997 21.9987 18.938 22 17.8333V9.5C22 8.83696 21.7366 8.20107 21.2678 7.73223C20.7989 7.26339 20.163 7 19.5 7ZM12 3.66667C12.8841 3.66667 13.7319 4.01786 14.357 4.64298C14.9821 5.2681 15.3333 6.11594 15.3333 7H8.66667C8.66667 6.11594 9.01786 5.2681 9.64298 4.64298C10.2681 4.01786 11.1159 3.66667 12 3.66667ZM20.3333 17.8333C20.3333 18.4964 20.0699 19.1323 19.6011 19.6011C19.1323 20.0699 18.4964 20.3333 17.8333 20.3333H6.16667C5.50363 20.3333 4.86774 20.0699 4.3989 19.6011C3.93006 19.1323 3.66667 18.4964 3.66667 17.8333V9.5C3.66667 9.27899 3.75446 9.06702 3.91074 8.91074C4.06702 8.75446 4.27899 8.66667 4.5 8.66667H7V10.3333C7 10.5543 7.0878 10.7663 7.24408 10.9226C7.40036 11.0789 7.61232 11.1667 7.83333 11.1667C8.05435 11.1667 8.26631 11.0789 8.42259 10.9226C8.57887 10.7663 8.66667 10.5543 8.66667 10.3333V8.66667H15.3333V10.3333C15.3333 10.5543 15.4211 10.7663 15.5774 10.9226C15.7337 11.0789 15.9457 11.1667 16.1667 11.1667C16.3877 11.1667 16.5996 11.0789 16.7559 10.9226C16.9122 10.7663 17 10.5543 17 10.3333V8.66667H19.5C19.721 8.66667 19.933 8.75446 20.0893 8.91074C20.2455 9.06702 20.3333 9.27899 20.3333 9.5V17.8333Z" fill="white"/>
                      </svg>
                      <span>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Добавить в корзину' : 'Savatga qo\'shish'}</span>
                    </button>
                  {/* ) : (
                    <NavLink to={localStorage.getItem('token') ? '/basket/mobile' : ''} className='add_basket_btn center' style={{width: localStorage.getItem('selectedLanguage') === 'ru' ? '100%' : '100%', height: '56px', marginTop: '18px', backgroundColor: '#3C7CFB', marginLeft: '0px', padding: '15px 18px', marginRight: '12px'}}>
                      <span>Перейти в корзину </span>
                    </NavLink>
                  )} */}
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourDesignMobile