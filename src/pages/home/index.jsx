import React, { useEffect, useLayoutEffect, useState } from 'react'
import './main.css'
import HeaderMain from '../../components/header'
import HeroMain from '../../components/hero'
import blueVerifed from '../../layouts/icons/blue_verifed.svg'
import blueBuds from '../../layouts/icons/operator.svg'
import blueTruck from '../../layouts/icons/truck.svg'
import your_design from '../../layouts/icons/your_design.svg'
import FooterMain from '../../components/footer'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ToastComponent from '../../components/toast'
import Placeholder from 'react-placeholder-loading';

function HomePage() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [count, setCount] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedSize, setSelectedSize] = useState('s');
  const [sizeOptions, setSizeOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#D9CCC6');
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');
  const [sizeArray, setSizeArray] = useState([]);
  const [colorArray, setColorArray] = useState([]);
  const navigate = useNavigate();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countHeader, setCountHeader] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingModal, setIsLoadingModal] = useState(true);
  const [defaultSize, setDefaultSize] = useState();
  const [defaultColor, setDefaultColor] = useState();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.screen.width < 800) {
        navigate('/mobile');
      }
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

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

  useEffect(() => {
    document.title = 'Easy Print';
  }, []);

  function handleCardClick(imageSrc, name, price) {
    const currentTime = new Date();
    const clickedCardData = {
      id: idCounter,
      count: count,
      imageSrc,
      selectedSize,
      selectedColor,
      name,
      price,
      timestamp: currentTime.toString(),
    };
  
    if (count > 1) {
      setCount(count - 1);
    }
  
    setIdCounter((prevId) => prevId + 1);
  
    setTrashCardData((prevData) => [...prevData, clickedCardData]);
  
    localStorage.setItem('trashCard', JSON.stringify([...trashCardData, clickedCardData]));
  
    // toast.success(`${name} в корзину`, {
    //   position: toast.POSITION.TOP_RIGHT,
    //   autoClose: 2000,
    // });
  }  

  function handleCardShow(imageSrc, name, price, id) {
    axios.get(`${process.env.REACT_APP_TWO}/product/show/warehouse_product?warehouse_product_id=${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      const resp = response
    }).catch((error) => {
        // toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    });
  }  

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/get-warehouses`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      setData(response.data);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    });    
  }, []);

  function openModal(cardData) {
    setSelectedCard(cardData);
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.style.display = 'block';
    }
    
    axios.get(`${process.env.REACT_APP_TWO}/product/show/warehouse_product?warehouse_product_id=${cardData.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      setColorArray(response.data.data.color_by_size);
      setSizeArray(response.data.data.color_by_size);
      setModalData(response.data.data);
      setIsLoadingModal(false);
    }).catch((error) => {
      setIsLoadingModal(false);
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    });
  }

  const addToBasket = (productData) => {
    if (productData) {
      const selectedColor = modalData.color_by_size[selectedSizeIndex];
      const selectedSize = modalData.size_by_color[selectedColorIndex];
  
      const colorId = selectedColor.color[0].id;
      const sizeId = selectedSize.sizes[0].id;
  
      var myHeaders = new Headers();
      myHeaders.append("language", "uz");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
  
      var formdata = new FormData();
      formdata.append("warehouse_product_id", productData.id);
      formdata.append("quantity", 1);
      formdata.append("color_id", colorId);
      formdata.append("size_id", sizeId);
      formdata.append("price", productData.price);
      formdata.append("discount", modalData.discount ? modalData.discount : '0');
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
      
      const basketData = {
        warehouse_product_id: productData.id,
        quantity: 1,
        color_id: colorId,
        size_id: sizeId,
        price: productData.price,
        discount: modalData.discount ? modalData.discount : '0'
      };

      localStorage.setItem('basket', JSON.stringify(basketData));

      fetch(`${process.env.REACT_APP_TWO}/order/set-warehouse`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.status === true) {
            toast(
              <ToastComponent
                image={productData.images[0] ? productData.images[0] : ''}
                title={productData.name}
                description={productData.description ? productData.description : 'Описание недоступно'}
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
              const basketData = {
                warehouse_product_id: productData.id,
                quantity: 1,
                color_id: colorId,
                size_id: sizeId,
                price: productData.price,
                discount: modalData.discount ? modalData.discount : '0'
              };

              localStorage.setItem('basket', JSON.stringify(basketData));

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
        .catch(error => {
          toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
          toast.error('Товар не добавлен');
        });
    }
  };

  useEffect(() => {
    if (modalData.size_by_color && modalData.size_by_color.length > 0) {
      const sizes = modalData.size_by_color.flatMap((size) => size.sizes.map((s) => s.name));
      setSizeOptions(sizes);
    }

    if (modalData.color_by_size && modalData.color_by_size.length > 0) {
      const colors = modalData.color_by_size.flatMap((color) => color.color.map((c) => c.name));
      setColorOptions(colors);
    }
  }, [modalData]);

  useEffect(() => {
    if (data.data && data.data.product_list) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.data.product_list.length);
      }, 10000);

      return () => clearInterval(intervalId);
    }
  }, [data.data]);

  const currentProduct = data.data && data.data.product_list ? data.data.product_list[currentIndex] : null;

  localStorage.setItem('currentProduct', JSON.stringify(currentProduct));

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <HeaderMain trashCardData={trashCardData} />
      <HeroMain />
      
      <section style={{margin: '24px 100px', marginTop: '-100px'}}>
        <center>
          <h2 className='products_father_text mb-3 ms-5' style={{textAlign: 'left'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Хиты Продаж' : 'Savdo Xitlari'}</h2>
        </center>

        <div className='center container'>
          <div className='center' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '1200px', flexWrap: 'wrap'}}>
            {isLoading ? (
              <>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap'}}>
                  <Placeholder 
                    shape="rect"
                    width={276} 
                    height={320} 
                    animation="wave" 
                    style={{ marginBottom: '20px' }}
                  />

                  <Placeholder 
                    shape="rect"
                    width={276} 
                    height={320} 
                    animation="wave" 
                    style={{ marginBottom: '20px' }}
                  />

                  <Placeholder 
                    shape="rect"
                    width={276} 
                    height={320} 
                    animation="wave" 
                    style={{ marginBottom: '20px' }}
                  />

                  <Placeholder 
                    shape="rect"
                    width={276} 
                    height={320} 
                    animation="wave" 
                    style={{ marginBottom: '20px' }}
                  />
                </div>
                
                <div style={{display: 'flex', marginTop: '20px', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap'}}>
                  <Placeholder 
                    shape="rect"
                    width={276} 
                    height={320} 
                    animation="wave" 
                    style={{ marginBottom: '20px' }}
                  />

                  <Placeholder 
                    shape="rect"
                    width={276} 
                    height={320} 
                    animation="wave" 
                    style={{ marginBottom: '20px' }}
                  />

                  <Placeholder 
                    shape="rect"
                    width={276} 
                    height={320} 
                    animation="wave" 
                    style={{ marginBottom: '20px' }}
                  />

                  <Placeholder 
                    shape="rect"
                    width={276} 
                    height={320} 
                    animation="wave" 
                    style={{ marginBottom: '20px' }}
                  />
                </div>
              </>
            ) : (
              <center>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
                  {currentProduct && (
                    <div key={currentProduct.id}>
                      <div style={{textDecoration: 'none'}} className="cards your_print">
                        <NavLink to={'/yourDesign'} onClick={() => handleCardShow(`${currentProduct.images[0]}`, `${currentProduct.name}`, `${currentProduct.price}`, `${currentProduct.id}`)} className="clothes_fat">
                          <div className="image-container" style={{position: 'relative', borderRadius: '8px', zIndex: '200'}}>
                            <div>
                              <div style={{position: 'absolute', top: '0', right: '0', zIndex: '1', display: currentProduct.discount ? 'block' : 'none'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="44" viewBox="0 0 80 44" fill="none">
                                  <circle cx="75" cy="-31" r="74.5" fill="#FEF4EE" stroke="#F9D5BB"/>
                                </svg>
                                <div>
                                  <p className='discount'>-{currentProduct.discount}%</p>
                                </div>
                              </div>
                              {/* <img style={{ borderRadius: '20px', width: '276px', height: '320px' }} src={`${currentProduct.images[0]}`} alt={currentProduct.name} /> */}
                              <div style={{width: '276px', height: '320px', borderRadius: '8px', backgroundImage: `url(${your_design})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                            </div>
                            
                            <div className="image-overlay" style={{borderRadius: '8px'}}>
                              <div className="detail_back">
                                <p className="overlay-text">Свой дизайн</p>
                              </div>
                            </div>
                          </div>
                        </NavLink>

                        <div className="d-flex mt-3">
                          <div style={{textDecoration: 'none'}}>
                            <p className='t-shirt_name' style={{width: '100%'}}>Одежда с вашим дизайном</p>
                            <p className='t-shirt_price'>
                              {currentProduct.price_discount ? 
                                <span>
                                  <span className='discount_price'>{Number(currentProduct.price_discount).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</span> 
                                  <del className='discount_price_del'>{Number(currentProduct.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</del> 
                                </span>
                                : 
                                <div>
                                  От {Number(currentProduct.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}
                                </div>
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {data.data ? data.data.warehouse_product_list.slice(0, 3).map((data2) => (
                    <div key={data2.id}>
                      <div style={{textDecoration: 'none'}} className="cards">
                        <NavLink to={`/show/detail/${data2.id}/${data2.name}`} onClick={() => handleCardShow(`${data2.images[0]}`, `${data2.name}`, `${data2.price}`, `${data2.id}`)} className="clothes_fat">
                          <div className="image-container" style={{position: 'relative', borderRadius: '8px', zIndex: '200'}}>
                            <div>
                              <div style={{position: 'absolute', borderRadius: '8px', top: '0', right: '0', zIndex: '1', display: data2.discount ? 'block' : 'none'}}>
                                <svg style={{borderTopRightRadius: '8px'}} xmlns="http://www.w3.org/2000/svg" width="80" height="44" viewBox="0 0 80 44" fill="none">
                                  <circle cx="75" cy="-31" r="74.5" fill="#FEF4EE" stroke="#F9D5BB"/>
                                </svg>
                                <div>
                                  <p className='discount'>-{data2.discount}%</p>
                                </div>
                              </div>
                              {/* <img style={{ width: '276px', height: '320px' }} src={`${data2.images[0]}`} alt={data2.name} /> */}
                              <div style={{width: '276px', height: '320px', borderRadius: '8px', backgroundImage: `url(${data2.images[0]})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                            </div>

                            <div className="image-overlay" style={{borderRadius: '8px'}}>
                              <div className="detail_back">
                                <p className="overlay-text">Посмотреть детали</p>
                              </div>
                            </div>
                          </div>
                        </NavLink>

                        <div className="d-flex mt-3">
                          <div style={{textDecoration: 'none'}}>
                            <p className='t-shirt_name'>{data2.name}</p>
                            <p className='t-shirt_price'>
                              {data2.price_discount ? 
                                <span>
                                  <span className='discount_price'>{Number(data2.price_discount).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</span> 
                                  <del className='discount_price_del'>{Number(data2.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</del> 
                                </span>
                                : 
                                <div>
                                  {Number(data2.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}
                                </div>
                              }
                            </p>
                          </div>

                          <div onClick={() => openModal({id: `${data2.id}`, imageSrc: `${data2.images[0]}`, name: `${data2.name}`, price: `${data2.price}`})} data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <button className='add_to_basket'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <g clip-path="url(#clip0_2381_4754)">
                                  <path d="M17.5 5H15C15 3.67392 14.4732 2.40215 13.5355 1.46447C12.5979 0.526784 11.3261 0 10 0C8.67392 0 7.40215 0.526784 6.46447 1.46447C5.52678 2.40215 5 3.67392 5 5H2.5C1.83696 5 1.20107 5.26339 0.732233 5.73223C0.263392 6.20107 0 6.83696 0 7.5L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333V7.5C20 6.83696 19.7366 6.20107 19.2678 5.73223C18.7989 5.26339 18.163 5 17.5 5ZM10 1.66667C10.8841 1.66667 11.7319 2.01786 12.357 2.64298C12.9821 3.2681 13.3333 4.11594 13.3333 5H6.66667C6.66667 4.11594 7.01786 3.2681 7.64298 2.64298C8.2681 2.01786 9.11594 1.66667 10 1.66667ZM18.3333 15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V7.5C1.66667 7.27899 1.75446 7.06702 1.91074 6.91074C2.06702 6.75446 2.27899 6.66667 2.5 6.66667H5V8.33333C5 8.55435 5.0878 8.76631 5.24408 8.92259C5.40036 9.07887 5.61232 9.16667 5.83333 9.16667C6.05435 9.16667 6.26631 9.07887 6.42259 8.92259C6.57887 8.76631 6.66667 8.55435 6.66667 8.33333V6.66667H13.3333V8.33333C13.3333 8.55435 13.4211 8.76631 13.5774 8.92259C13.7337 9.07887 13.9457 9.16667 14.1667 9.16667C14.3877 9.16667 14.5996 9.07887 14.7559 8.92259C14.9122 8.76631 15 8.55435 15 8.33333V6.66667H17.5C17.721 6.66667 17.933 6.75446 18.0893 6.91074C18.2455 7.06702 18.3333 7.27899 18.3333 7.5V15.8333Z" fill="white"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_2381_4754">
                                    <rect width="20" height="20" fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>

                              <svg style={{marginLeft: '-8px', marginRight: '2px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M13.3333 8.33334H8.66666V3.66666C8.66666 3.29847 8.36819 3 8 3C7.63181 3 7.33334 3.29847 7.33334 3.66666V8.33331H2.66666C2.29847 8.33334 2 8.63181 2 9C2 9.36819 2.29847 9.66666 2.66666 9.66666H7.33331V14.3333C7.33331 14.7015 7.63178 15 7.99997 15C8.36816 15 8.66662 14.7015 8.66662 14.3333V9.66666H13.3333C13.7015 9.66666 13.9999 9.36819 13.9999 9C14 8.63181 13.7015 8.33334 13.3333 8.33334Z" fill="white"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )): null}

                  {data.data ? data.data.warehouse_product_list.slice(3).map((data2) => (
                    <div key={data2.id} style={{marginTop: '48px'}}>
                      <div style={{textDecoration: 'none'}} className="cards">
                        <NavLink to={`/show/detail/${data2.id}/${data2.name}`} onClick={() => handleCardShow(`${data2.images[0]}`, `${data2.name}`, `${data2.price}`, `${data2.id}`)} className="clothes_fat">
                          <div className="image-container" style={{position: 'relative', borderRadius: '8px', zIndex: '200'}}>
                            <div>
                              <div style={{position: 'absolute', top: '0', borderRadius: '8px', right: '0', zIndex: '1', display: data2.discount ? 'block' : 'none'}}>
                                <svg style={{borderTopRightRadius: '8px'}} xmlns="http://www.w3.org/2000/svg" width="80" height="44" viewBox="0 0 80 44" fill="none">
                                  <circle cx="75" cy="-31" r="74.5" fill="#FEF4EE" stroke="#F9D5BB"/>
                                </svg>
                                <div>
                                  <p className='discount'>-{data2.discount}%</p>
                                </div>
                              </div>
                              {/* <img style={{ width: '276px', height: '320px' }} src={`${data2.images[0]}`} alt={data2.name} /> */}
                              <div style={{width: '276px', height: '320px', borderRadius: '8px', backgroundImage: `url(${data2.images[0]})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                            </div>
                            <div className="image-overlay" style={{borderRadius: '8px'}}>
                              <div className="detail_back">
                                <p className="overlay-text">Посмотреть детали</p>
                              </div>
                            </div>
                          </div>
                        </NavLink>

                        <div className="d-flex">
                          <div>
                            <p className='t-shirt_name' style={{marginTop: '5px'}} title={data2.name}>{data2.name}</p>
                            <p className='t-shirt_price'>
                              {data2.price_discount ? 
                                <span>
                                  <span className='discount_price'>{Number(data2.price_discount).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</span> 
                                  <del className='discount_price_del'>{Number(data2.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</del> 
                                </span>
                                : 
                                <div>
                                  {Number(data2.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}
                                </div>
                              }
                            </p>
                          </div>

                          <div onClick={() => openModal({ imageSrc: `${data2.images[0]}`, name: `${data2.name}`, price: `${data2.price}`, id: `${data2.id}` })} data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <button className='add_to_basket' style={{marginTop: '22px'}}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <g clip-path="url(#clip0_2381_4754)">
                                  <path d="M17.5 5H15C15 3.67392 14.4732 2.40215 13.5355 1.46447C12.5979 0.526784 11.3261 0 10 0C8.67392 0 7.40215 0.526784 6.46447 1.46447C5.52678 2.40215 5 3.67392 5 5H2.5C1.83696 5 1.20107 5.26339 0.732233 5.73223C0.263392 6.20107 0 6.83696 0 7.5L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333V7.5C20 6.83696 19.7366 6.20107 19.2678 5.73223C18.7989 5.26339 18.163 5 17.5 5ZM10 1.66667C10.8841 1.66667 11.7319 2.01786 12.357 2.64298C12.9821 3.2681 13.3333 4.11594 13.3333 5H6.66667C6.66667 4.11594 7.01786 3.2681 7.64298 2.64298C8.2681 2.01786 9.11594 1.66667 10 1.66667ZM18.3333 15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V7.5C1.66667 7.27899 1.75446 7.06702 1.91074 6.91074C2.06702 6.75446 2.27899 6.66667 2.5 6.66667H5V8.33333C5 8.55435 5.0878 8.76631 5.24408 8.92259C5.40036 9.07887 5.61232 9.16667 5.83333 9.16667C6.05435 9.16667 6.26631 9.07887 6.42259 8.92259C6.57887 8.76631 6.66667 8.55435 6.66667 8.33333V6.66667H13.3333V8.33333C13.3333 8.55435 13.4211 8.76631 13.5774 8.92259C13.7337 9.07887 13.9457 9.16667 14.1667 9.16667C14.3877 9.16667 14.5996 9.07887 14.7559 8.92259C14.9122 8.76631 15 8.55435 15 8.33333V6.66667H17.5C17.721 6.66667 17.933 6.75446 18.0893 6.91074C18.2455 7.06702 18.3333 7.27899 18.3333 7.5V15.8333Z" fill="white"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_2381_4754">
                                    <rect width="20" height="20" fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>

                              <svg style={{marginLeft: '-8px', marginRight: '2px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M13.3333 8.33334H8.66666V3.66666C8.66666 3.29847 8.36819 3 8 3C7.63181 3 7.33334 3.29847 7.33334 3.66666V8.33331H2.66666C2.29847 8.33334 2 8.63181 2 9C2 9.36819 2.29847 9.66666 2.66666 9.66666H7.33331V14.3333C7.33331 14.7015 7.63178 15 7.99997 15C8.36816 15 8.66662 14.7015 8.66662 14.3333V9.66666H13.3333C13.7015 9.66666 13.9999 9.36819 13.9999 9C14 8.63181 13.7015 8.33334 13.3333 8.33334Z" fill="white"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )): null}
                </div>
              </center>
            )}
          </div>
        </div>
      </section>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content" style={{borderRadius: '0px', width: '871px !important'}}>
            <div className="modal-body" style={{padding: '0', width: '871px !important'}}>
              {isLoadingModal ? (
                <div>
                  <div className='d-flex'>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                      <div style={{margin: '80px 32px 16px 32px'}}>
                        <Placeholder 
                          shape="rect"
                          width={336} 
                          height={80} 
                          animation="wave" 
                          style={{ marginBottom: '20px' }}
                        />
                      </div>

                      <div style={{margin: '16px 32px 16px 32px'}}>
                        <Placeholder 
                          shape="rect"
                          width={330} 
                          height={48} 
                          animation="wave" 
                          style={{ marginBottom: '20px' }}
                        />
                      </div>

                      <div style={{margin: '16px 32px 57px 32px'}}>
                        <Placeholder 
                          shape="rect"
                          width={336} 
                          height={22} 
                          animation="wave" 
                          style={{ marginBottom: '20px' }}
                        />
                      </div>

                      <div style={{margin: '16px 32px 57px 32px'}}>
                        <Placeholder 
                          shape="rect"
                          width={336} 
                          height={68} 
                          animation="wave" 
                          style={{ marginBottom: '20px' }}
                        />
                      </div>

                      <div className='d-flex' style={{margin: '16px 32px 57px 32px'}}>
                        <div>
                          <Placeholder 
                            shape="rect"
                            width={84} 
                            height={56} 
                            animation="wave" 
                            style={{ marginBottom: '20px' }}
                          />
                        </div>

                        <div style={{marginLeft: '16px'}}>
                          <Placeholder 
                            shape="rect"
                            width={236} 
                            height={56} 
                            animation="wave" 
                            style={{ marginBottom: '20px' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div style={{margin: '16px'}}>
                      <Placeholder 
                        shape="rect"
                        width={378} 
                        height={580} 
                        animation="wave" 
                        style={{ marginBottom: '20px' }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {modalData && (
                    <div className='d-flex'>
                      <div style={{padding: '80px 32px 0px 32px'}}>
                        <p className='modal_name'>{modalData.name ? modalData.name : 'Название отсутствует'}</p>
                        <p className='modal_info'>{modalData.description ? modalData.description : 'Описание отсутствует'}</p>
                        <p className='modal_price'>{Number(modalData.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}</p>

                        <div className="d-flex justify-content-between" style={{marginTop: '57px'}}>
                          <div className='d-flex' style={{marginRight: '83px'}}>
                            <p>Размер</p>
                            <select
                              style={{border: 'none', height: '29px', marginLeft: '12px', outline: 'none'}}
                              value={sizeOptions[selectedSizeIndex]}
                              onChange={(e) => {
                                const index = sizeOptions.findIndex((size) => size === e.target.value);
                                setSelectedSizeIndex(index);
                              }}
                            >
                              {sizeArray.map((size, index) => (
                                <option key={size.id} onClick={() => {setSelectedSizeIndex(index); const selectedSizeId = size.id; setDefaultSize(selectedSizeId)}} value={size.name}>{size.name}</option>
                              ))}
                            </select>
                          </div>

                          <div className='d-flex'>
                            <p>Цвет</p>

                            <div style={{marginLeft: '12px'}} className="d-flex">
                              {colorArray[selectedSizeIndex]?.color.map((color, index) => (
                                <div
                                  key={index}
                                  className="color_border me-4"
                                  style={{borderColor: selectedColorIndex === index ? '#4D4D4D' : '#E6E6E6', cursor: 'pointer'}}
                                  onClick={() => {
                                    setSelectedColorIndex(index);
                                    const selectedColorId = color.id;
                                    setDefaultColor(selectedColorId)
                                  }}
                                >
                                  <div className="color" style={{backgroundColor: color.code}}></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <hr style={{color: '#CCCCCC', marginTop: '-3px', marginBottom: '4px'}} />

                        <div className="d-flex justify-content-between">
                          <div className='basket_card_plus_minus' style={{backgroundColor: 'transparent', color: '#000', cursor: 'pointer'}} onClick={() => setCount(Math.max(1, count - 1))}>-</div>
    
                          <input
                            type='text'
                            style={{border: 'none', color: '#000', outline: 'none', width: '40px', textAlign: 'center'}}
                            value={count}
                            onChange={(e) => {
                              const newValue = parseInt(e.target.value, 10);
                              if (!isNaN(newValue)) {
                                setCount(Math.min(modalData.quantity, Math.max(1, newValue)));
                              }
                            }}
                          />
    
                          <div className='basket_card_plus_minus' style={{backgroundColor: 'transparent', color: '#000', cursor: 'pointer'}} onClick={() => setCount(Math.min(modalData.quantity, count + 1))}>+</div>
                        </div>

                        <div className='d-flex'>
                          <p style={{color: '#1A1A1A'}} className='show_detail_size'>В наличии: </p>
                          <p style={{color: '#1A1A1A'}} className='show_detail_size ms-1'>{modalData.quantity}</p>
                        </div>

                        <div style={{marginTop: '50px'}}  className="d-flex align-items-center justify-content-between">
                          <div onClick={() => {handleCardClick(modalData.images ? modalData.images[0] : '', modalData.name, modalData.price); handleButtonClick(); addToBasket(modalData)} }>
                            <button className='add_to_basket' style={{width: '84px', height: '56px', padding: '18px 20px'}}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <g clip-path="url(#clip0_2381_4754)">
                                  <path d="M17.5 5H15C15 3.67392 14.4732 2.40215 13.5355 1.46447C12.5979 0.526784 11.3261 0 10 0C8.67392 0 7.40215 0.526784 6.46447 1.46447C5.52678 2.40215 5 3.67392 5 5H2.5C1.83696 5 1.20107 5.26339 0.732233 5.73223C0.263392 6.20107 0 6.83696 0 7.5L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333V7.5C20 6.83696 19.7366 6.20107 19.2678 5.73223C18.7989 5.26339 18.163 5 17.5 5ZM10 1.66667C10.8841 1.66667 11.7319 2.01786 12.357 2.64298C12.9821 3.2681 13.3333 4.11594 13.3333 5H6.66667C6.66667 4.11594 7.01786 3.2681 7.64298 2.64298C8.2681 2.01786 9.11594 1.66667 10 1.66667ZM18.3333 15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V7.5C1.66667 7.27899 1.75446 7.06702 1.91074 6.91074C2.06702 6.75446 2.27899 6.66667 2.5 6.66667H5V8.33333C5 8.55435 5.0878 8.76631 5.24408 8.92259C5.40036 9.07887 5.61232 9.16667 5.83333 9.16667C6.05435 9.16667 6.26631 9.07887 6.42259 8.92259C6.57887 8.76631 6.66667 8.55435 6.66667 8.33333V6.66667H13.3333V8.33333C13.3333 8.55435 13.4211 8.76631 13.5774 8.92259C13.7337 9.07887 13.9457 9.16667 14.1667 9.16667C14.3877 9.16667 14.5996 9.07887 14.7559 8.92259C14.9122 8.76631 15 8.55435 15 8.33333V6.66667H17.5C17.721 6.66667 17.933 6.75446 18.0893 6.91074C18.2455 7.06702 18.3333 7.27899 18.3333 7.5V15.8333Z" fill="white"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_2381_4754">
                                    <rect width="20" height="20" fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
    
                              <svg style={{marginLeft: '-8px', marginRight: '2px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M13.3333 8.33334H8.66666V3.66666C8.66666 3.29847 8.36819 3 8 3C7.63181 3 7.33334 3.29847 7.33334 3.66666V8.33331H2.66666C2.29847 8.33334 2 8.63181 2 9C2 9.36819 2.29847 9.66666 2.66666 9.66666H7.33331V14.3333C7.33331 14.7015 7.63178 15 7.99997 15C8.36816 15 8.66662 14.7015 8.66662 14.3333V9.66666H13.3333C13.7015 9.66666 13.9999 9.36819 13.9999 9C14 8.63181 13.7015 8.33334 13.3333 8.33334Z" fill="white"/>
                              </svg>
                            </button>
                          </div>
    
                          <div style={{marginTop: '12px'}} onClick={() => {handleCardClick(modalData.images ? modalData.images[0] : '', modalData.name, modalData.price); handleButtonClick(); addToBasket(modalData); navigate('/basket')}}>
                            <button style={{height: '56px', width: '234px', marginLeft: '12px', padding: '12px 8px'}} className='no_address_button'>
                              <span>Заказать сейчас </span>
    
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M22 13.0039C21.9951 12.4774 21.7832 11.9741 21.41 11.6029L17.12 7.29979C16.9326 7.11341 16.6792 7.00879 16.415 7.00879C16.1508 7.00879 15.8974 7.11341 15.71 7.29979C15.6163 7.39282 15.5419 7.5035 15.4911 7.62545C15.4403 7.7474 15.4142 7.8782 15.4142 8.0103C15.4142 8.14241 15.4403 8.27321 15.4911 8.39516C15.5419 8.5171 15.6163 8.62778 15.71 8.72081L19 12.0032H3C2.73478 12.0032 2.48043 12.1086 2.29289 12.2963C2.10536 12.484 2 12.7385 2 13.0039C2 13.2693 2.10536 13.5238 2.29289 13.7115C2.48043 13.8992 2.73478 14.0046 3 14.0046H19L15.71 17.297C15.5217 17.4841 15.4154 17.7384 15.4144 18.004C15.4135 18.2695 15.518 18.5246 15.705 18.713C15.892 18.9015 16.1461 19.0078 16.4115 19.0088C16.6768 19.0097 16.9317 18.9051 17.12 18.718L21.41 14.4149C21.7856 14.0413 21.9978 13.5339 22 13.0039Z" fill="white"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
    
                      <div className='modal_image_fat'>
                        <img src={modalData.images ? modalData.images[0] : ''} alt="your_design" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <center style={{marginTop: '120px'}}>
          <div className="container">
            <h3 className='advantage_main_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Наше преимущество' : 'Bizning ustunligimiz'}</h3>

            <div className='d-flex justify-content-between'>
              <div style={{backgroundColor: '#F8F8F8', width: '302px', height: '259px'}} className='advantage_cards'>
                <img src={blueVerifed} alt="blueVerifed" />

                <h3 className='advantage_theme'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Гарантия качества' : 'Sifat kafolati'}</h3>
                <p className='advantage_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Качественные экологичные материалы` : `Yuqori sifatli ekologik toza materiallar`}</p>
              </div>

              <div style={{backgroundColor: '#F8F8F8', width: '302px', height: '259px', padding: '40px 35px'}} className='advantage_cards'>
                <img src={blueTruck} alt="blueVerifed" />

                <h3 className='advantage_theme'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Быстрая доставка' : 'Tez yetkazib berish'}</h3>
                <p className='advantage_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Доставка по всему Узбекистану` : `O'zbekiston bo'ylab yetkazib berish`}</p>
              </div>

              <div style={{backgroundColor: '#F8F8F8', width: '302px', height: '259px'}} className='advantage_cards'>
                <img src={blueBuds} alt="blueVerifed" />

                <h3 className='advantage_theme'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Сервис' : 'Xizmat'}</h3>
                <p className='advantage_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Лёгкий процесс оплаты, обмена и возврата` : `Oson to'lov, almashtirish va qaytarish jarayoni`}</p>
              </div>
            </div>
          </div>
        </center>
      </div>

      <FooterMain />
    </div>
  )
}

export default HomePage