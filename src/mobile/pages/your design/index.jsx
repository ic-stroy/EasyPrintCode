import React, { useEffect, useState } from 'react'
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
import size_text from '../../layouts/icons/size_text.svg';
import text_text from '../../layouts/icons/text_text.svg';
import style_text from '../../layouts/icons/style_text.svg';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { fabric } from 'fabric';

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

  return (
    <div style={{overflow: 'hidden'}}>
      <div className='yourDesign_header_mobile'>
        <NavLink to={'/mobile'} className='center' style={{margin: 0, padding: 0}}>
          <img src={homeImage} alt="homeImage" />
        </NavLink>
        <img src={leftImage} alt="leftImage" />
        <img src={cachedImage} alt="cachedImage" />
        <img src={rightImage} alt="rightImage" />
        <img src={basketImage} alt="basketImage" />
      </div>

      <div style={{position: 'absolute', width: '100%', zIndex: 100, height: '100%', top: '0', left: '0'}} onClick={() => {setTextBar(false); setFirstBar(true); setImageBar(false); setDesigState(true); setLayersState(false); setLibraryState(false); setProductState(false);}}></div>

      <div style={{position: 'relative', zIndex: 200}}>
        {desigState === true && (
          <div style={{textAlign: 'left', height: '500px'}}>
            <center>
              <img style={{width: '90%', marginTop: '80px'}} src={tShirt} alt="tShirt" />

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
    </div>
  )
}

export default YourDesignMobile