import React, { useEffect, useState } from 'react'
import './main.css'
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import HeaderMain from '../../components/header';
import Reveal from '../../animation';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import FooterMain from '../../components/footer';
import AdvantageMain from '../../components/advantage';
import ToastComponent from '../../components/toast';
import Placeholder from 'react-placeholder-loading';
import AdsSlider2 from '../../components/ads slider 2';

function AuthorPage() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [data, setData] = useState([]);
  const params = useParams()
  const [displayedItems, setDisplayedItems] = useState(6);
  const token = localStorage.getItem('token');
  const [selectedCard, setSelectedCard] = useState(null);
  const [colorArray, setColorArray] = useState([]);
  const [author, setAuthor] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('s');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [count, setCount] = useState(1);
  const [modalData, setModalData] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#D9CCC6');
  const [dataBeck, setDataBeck] = useState([]);
  const [sizeArray, setSizeArray] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/get-company-products?id=${params.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      // console.log(response.data.data[0]);
      setIsLoading(false);
      setAuthor(response.data.data[0]);
    }).catch((error) => {
      setIsLoading(false);
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    });    
  }, []);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedCategory', params.id);
  })

  useEffect(() => {
    document.title = 'Страница автора';
  }, []);

  if (params.id !== localStorage.getItem('selectedCategory')) {
    window.location.reload();
  }

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
    }).catch((error) => {
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    });    
  }, []);

  const handleShowMore = () => {
    if (data.data && data.data.warehouse_product_list.length > displayedItems) {
      setDisplayedItems((prevDisplayedItems) => prevDisplayedItems + 12);
    }
  };

  const addToBasket = (productData) => {
    if (productData) {
      const selectedColor = dataBeck.color_by_size[selectedSizeIndex];
      const selectedSize = dataBeck.size_by_color[selectedColorIndex];
  
      const colorId = selectedColor.color[selectedColorIndex].id;
      const sizeId = selectedSize.sizes[selectedSizeIndex].id;
  
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
      formdata.append("discount", dataBeck.discount ? dataBeck.discount : '0');
  
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
        discount: dataBeck.discount ? dataBeck.discount : '0'
      };

      localStorage.setItem('basket', JSON.stringify(basketData));
  
      fetch("http://admin.easyprint.uz/api/order/set-warehouse", requestOptions)
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
                discount: dataBeck.discount ? dataBeck.discount : '0'
              };
  
              localStorage.setItem('basket', JSON.stringify(basketData));
  
              toast.error('Вы еще не зарегистрированы. Товар добавлен в корзину.');
            } else {
              toast.error('Товар не добавлен');
            }
          }
        })
        .catch(error => {
          toast.error('Товар не добавлен');
        });
    }
  };

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
      setModalData(response.data.data);
      setColorArray(response.data.data.color_by_size);
      setSizeArray(response.data.data.color_by_size);
    }).catch((error) => {
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    });
  }

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

  const handleGetHome = () => {
    navigate('/basket');
  }

  return (
    <div>
      <HeaderMain trashCardData={trashCardData} />

      {/* <div style={{width: '100%', height: '260px', backgroundImage: `url(${Author_background_default})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}></div> */}
      <Reveal>
        <AdsSlider2 />
      </Reveal>

      <div className="container">
        <div className="d-flex center">
          <div className='author_detail'>
            <div className='d-flex justify-content-end'>
              <button style={{background: 'transparent', border: 'none'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="#829D50"/>
                </svg>
              </button>
            </div>

            <center>
              <div className="d-flex">
                <div style={{width: '200px'}} className='d-flex flex-column center text-center'>
                  <Reveal>
                    {author.avatar ? (
                      <img className='user_avatar' src={author.avatar} alt={localStorage.getItem('user_name')} />
                    ) : (
                      <div className='user_avatar'></div>
                    )}
                  </Reveal>

                  <Reveal>
                    <h3 className='author_name'>{author.full_name}</h3>
                  </Reveal>

                  <Reveal>
                    <p className='author_country'>{author.country === 'Uzbekistan' ? '🇺🇿' : ''} {author.country}</p>
                  </Reveal>

                  <Reveal>
                    <button className='author_button'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Пожаловаться' : 'Shikoyat'}</button>
                  </Reveal>
                </div>

                <div className='d-flex flex-column center text-center' style={{height: '172px', marginLeft: '40px', marginTop: '50px'}}>
                  <Reveal>
                    <h3 className='author_item mb-4'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Информация' : 'Ma`lumot'}</h3>
                  </Reveal>

                  <Reveal>
                    <p className='author_list'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Всего принтов' : 'Jami nashrlar'}</p>
                  </Reveal>

                  <Reveal>
                    <p className='author_item'>{Number(author.total_prints).toLocaleString('ru-RU')}</p>
                  </Reveal>

                  <Reveal>
                    <p className='author_list'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Продано товаров' : 'Sotilgan mahsulotlar'}</p>
                  </Reveal>

                  <Reveal>
                    <p className='author_item'>{Number(author.total_solds).toLocaleString('ru-RU')}</p>
                  </Reveal>

                  <Reveal>
                    <p className='author_list'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Дата регистрации' : `Ro'yxatga olingan sana`}</p>
                  </Reveal>
                  
                  <Reveal>
                    <p className='author_item'>{author.registration_date}</p>
                  </Reveal>
                </div>
              </div>
            </center>
          </div>
        </div>

        <h2 className='products_father_text ms-3' style={{marginBottom: '100px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Товары' : 'Mahsulotlar'}</h2>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap'}}>
          <div className="container">
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
              <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '-130px', alignItems: 'center', width: '100%', flexWrap: 'wrap'}}>
                {author.products ? author.products.product_list.map((data2) => (
                  <div key={data2.id} className='mt-5'>
                    <Reveal>
                      <div style={{textDecoration: 'none'}} className="cards">
                        <NavLink to={`/show/detail/${data2.id}/${data2.name}`} className="clothes_fat">
                          <div className="image-container" style={{position: 'relative', borderRadius: '8px', zIndex: '200'}}>
                            <div>
                              <div style={{position: 'absolute', top: '0', right: '0', zIndex: '1', display: data2.discount ? 'block' : 'none'}}>
                                <svg style={{borderTopRightRadius: '8px'}} xmlns="http://www.w3.org/2000/svg" width="80" height="44" viewBox="0 0 80 44" fill="none">
                                  <circle cx="75" cy="-31" r="74.5" fill="#FEF4EE" stroke="#F9D5BB"/>
                                </svg>
                                <div>
                                  <p className='discount'>-{data2.discount}%</p>
                                </div>
                              </div>
                              <div style={{width: '276px', height: '320px', borderRadius: '8px', backgroundImage: `url(${data2.images[0]})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                            </div>

                            <div className="image-overlay" style={{borderRadius: '8px'}}>
                              <div className='home_image_hover_product' style={{width: '276px', height: '320px', borderRadius: '8px', backgroundImage: `url(${data2.images[1] ? data2.images[1] : data2.images[0]})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                            </div>
                          </div>
                        </NavLink>

                        <div className="d-flex mt-3">
                          <div style={{textDecoration: 'none'}}>
                            <p className='t-shirt_name' style={{width: '100%'}}>{data2.name}</p>
                            <p className='t-shirt_price'>
                              {data2.price_discount ? 
                                <span>
                                  <span className='discount_price'>{Number(data2.price_discount).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}</span> 
                                  <del className='discount_price_del'>{Number(data2.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}</del> 
                                </span>
                                : 
                                <div>
                                  {Number(data2.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}
                                </div>
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                )): null}

                {author.products ? author.products.warehouse_product_list.slice(0, displayedItems).map((data2) => (
                  <div key={data2.id} className='mt-5'>
                    <Reveal>
                      <div style={{textDecoration: 'none'}} className="cards">
                        <NavLink to={`/show/detail/${data2.id}/${data2.name}`} className="clothes_fat">
                          <div className="image-container" style={{position: 'relative', borderRadius: '8px', zIndex: '200'}}>
                            <div>
                              <div style={{position: 'absolute', top: '0', right: '0', zIndex: '1', display: data2.discount ? 'block' : 'none'}}>
                                <svg style={{borderTopRightRadius: '8px'}} xmlns="http://www.w3.org/2000/svg" width="80" height="44" viewBox="0 0 80 44" fill="none">
                                  <circle cx="75" cy="-31" r="74.5" fill="#FEF4EE" stroke="#F9D5BB"/>
                                </svg>
                                <div>
                                  <p className='discount'>-{data2.discount}%</p>
                                </div>
                              </div>
                              <div style={{width: '276px', height: '320px', borderRadius: '8px', backgroundImage: `url(${data2.images[0]})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                            </div>

                            <div className="image-overlay" style={{borderRadius: '8px'}}>
                              <div className='home_image_hover_product' style={{width: '276px', height: '320px', borderRadius: '8px', backgroundImage: `url(${data2.images[1] ? data2.images[1] : data2.images[0]})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                            </div>
                          </div>
                        </NavLink>

                        <div className="d-flex mt-3">
                          <div style={{textDecoration: 'none'}}>
                            <p className='t-shirt_name'>{data2.name}</p>
                            <p className='t-shirt_price'>
                              {data2.price_discount ? 
                                <span>
                                  <span className='discount_price'>{Number(data2.price_discount).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}</span> 
                                  <del className='discount_price_del'>{Number(data2.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}</del> 
                                </span>
                                : 
                                <div>
                                  {Number(data2.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}
                                </div>
                              }
                            </p>
                          </div>

                          <div onClick={() => openModal({imageSrc: `${data2.images[0]}`, name: `${data2.name}`, price: `${data2.price}`, id: `${data2.id}`})} data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                    </Reveal>
                  </div>
                )): null}
              </div>
            )}

            {author.products && author.products.warehouse_product_list.length > displayedItems && (
              <center className='mt-5'>
                <button className='show_detail_button' onClick={handleShowMore}>Показать еще</button>
              </center>
            )}
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content" style={{borderRadius: '0px', width: '871px !important'}}>
            <div className="modal-body" style={{padding: '0', width: '871px !important'}}>
              {modalData && (
                <div className='d-flex'>
                  <div style={{padding: '80px 32px 0px 32px'}}>
                    <p className='modal_name'>{modalData.name ? modalData.name : 'Название отсутствует'}</p>
                    <p className='modal_info'>{modalData.description ? modalData.description : 'Описание отсутствует'}</p>
                    <p className='modal_price'>{Number(modalData.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}</p>

                    <div className="d-flex justify-content-between" style={{marginTop: '57px'}}>
                      <div className='d-flex' style={{marginRight: '83px'}}>
                        <p>Размер</p>
                        <select 
                          // className='show_detail_option' 
                          style={{border: 'none', height: '29px', marginLeft: '12px', outline: 'none'}}
                          value={sizeOptions[selectedSizeIndex]}
                          onChange={(e) => {
                            const index = sizeOptions.findIndex((size) => size === e.target.value);
                            // console.log(sizeArray[index]?.id);
                            setSelectedSizeIndex(index);
                          }}
                        >
                          {sizeArray.map((size) => (
                            <option key={size.id} value={size.name}>{size.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className='d-flex'>
                        <p>Цвет</p>

                        <div style={{marginLeft: '12px'}} className="d-flex">
                          {colorArray[selectedSizeIndex]?.color.map((color, index) => (
                            <div
                              key={index}
                              className="color_border me-2"
                              style={{borderColor: selectedColorIndex === index ? '#4D4D4D' : '#E6E6E6', cursor: 'pointer'}}
                              onClick={() => setSelectedColorIndex(index)}
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

                    <div style={{marginTop: '50px'}}  className="d-flex align-items-center justify-content-between">
                      <div onClick={() => {handleCardClick(modalData.images ? modalData.images[0] : '', modalData.name, modalData.price); addToBasket(modalData)} }>
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

                      <div style={{marginTop: '12px'}} data-bs-dismiss="modal" aria-label="Close" onClick={() => {handleCardClick(modalData.images ? modalData.images[0] : '', modalData.name, modalData.price); addToBasket(modalData); handleGetHome();}}>
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
            </div>
          </div>
        </div>
      </div>

      <AdvantageMain />
      <FooterMain />
    </div>
  )
}

export default AuthorPage