import React, { useEffect, useState } from 'react'
import HeaderMain from '../../components/header'
import AdvantageMain from '../../components/advantage'
import FooterMain from '../../components/footer'
import show_right from '../../layouts/icons/show_right.svg'
import show_left from '../../layouts/icons/show_left.svg'
import './main.css'
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import ToastComponent from '../../components/toast'
import Placeholder from 'react-placeholder-loading';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';

function ShowDetail() {
  const params = useParams()
  const [trashCardData, setTrashCardData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dataBeck, setDataBeck] = useState([]);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const token = localStorage.getItem('token');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [data, setData] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [colorArray, setColorArray] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [sizeArray, setSizeArray] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [displayedItems, setDisplayedItems] = useState(8);
  const [modalData, setModalData] = useState([]);
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState('s');
  const [selectedColor, setSelectedColor] = useState('#D9CCC6');
  const [defaultSize, setDefaultSize] = useState();
  const [defaultColor, setDefaultColor] = useState();
  const [countHeader, setCountHeader] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingModal, setIsLoadingModal] = useState(true);
  const [loader, setLoader] = useState(true);

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

  useEffect(() => {
    localStorage.setItem('selectedCategory', params.id);
  })

  useEffect(() => {
    document.title = 'Посмотреть продукт'
  }, []);

  if (params.id !== localStorage.getItem('selectedCategory')) {
    window.location.reload();
    window.scrollTo(0, 0);
  }

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (dataBeck.size_by_color && dataBeck.size_by_color.length > 0) {
      const sizes = dataBeck.size_by_color.flatMap((size) => size.sizes.map((s) => s.name));
      setSizeOptions(sizes);
    }

    if (dataBeck.color_by_size && dataBeck.color_by_size.length > 0) {
      const colors = dataBeck.color_by_size.flatMap((color) => color.color.map((c) => c.name));
      setColorOptions(colors);
    }
  }, [dataBeck]);

  const handleNextImage = () => {
    if (dataBeck.images && dataBeck.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % dataBeck.images.length);
      animateImage();
    }
  };
  
  const handlePrevImage = () => {
    if (dataBeck.images && dataBeck.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + dataBeck.images.length) % dataBeck.images.length);
      animateImage();
    }
  };
  
  const animateImage = () => {
    const image = document.querySelector('.img_card_detail img');
    image.style.animation = 'none';
    void image.offsetWidth;
    image.style.animation = null;
  };

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  useEffect(() => {
    addToBasket(selectedProduct);
  }, [selectedProduct]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/product/show/warehouse_product?warehouse_product_id=${params.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      setColorArray(response.data.data.color_by_size);
      setSizeArray(response.data.data.color_by_size);
      setDataBeck(response.data.data);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    });    
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
    }).catch((error) => {
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
      setModalData(response.data.data);
      setColorArray(response.data.data.color_by_size);
      setIsLoadingModal(false);
      setSizeArray(response.data.data.color_by_size);
    }).catch((error) => {
      setIsLoadingModal(false);
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    });
  }

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

  const handleShowMore = () => {
    if (data.data && data.data.warehouse_product_list.length > displayedItems) {
      setDisplayedItems((prevDisplayedItems) => prevDisplayedItems + 8);
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
      formdata.append("color_id", defaultColor ? defaultColor : colorId);
      formdata.append("size_id", defaultSize ? defaultSize : sizeId);
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
        color_id: defaultColor ? defaultColor : colorId,
        size_id: defaultSize ? defaultSize : sizeId,
        price: productData.price,
        discount: dataBeck.discount ? dataBeck.discount : '0'
      };

      localStorage.setItem('basket', JSON.stringify(basketData));

      // console.log(basketData);
  
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
          console.log('error', error);
        });
    }
  };
  
  useEffect(() => {
    addToBasket(selectedProduct);
  }, [selectedProduct]);

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

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalItems = data.data ? data.data.warehouse_product_list.length : 0;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      {loader ? (
        <center style={{background: '#F6F6F6'}}>
          <div className="center" style={{paddingTop: '284px', paddingBottom: '284px', zIndex: '2', position: 'relative'}}>
            <span class="loader_maen"></span>
          </div>

          <div style={{position: 'absolute', top: '0', cursor: 'pointer', zIndex: '10000', width: '100%'}}>
            <HeaderMain trashCardData={trashCardData} />
          </div>

          <div style={{position: 'absolute', top: '55%', left: '50%', zIndex: '1', transform: 'translate(-50%, -50%)'}}>
            <div>
              <>
                <div>
                  <div className="d-flex">
                    <div>
                      <div style={{marginBottom: '24px'}}>
                        <Placeholder 
                          shape="rect"
                          width={80} 
                          height={92} 
                          animation="wave" 
                          style={{ marginBottom: '20px' }}
                        />
                      </div>

                      <div style={{marginBottom: '24px'}}>
                        <Placeholder 
                          shape="rect"
                          width={80} 
                          height={92} 
                          animation="wave" 
                          style={{ marginBottom: '20px' }}
                        />
                      </div>

                      <div style={{marginBottom: '24px'}}>
                        <Placeholder 
                          shape="rect"
                          width={80} 
                          height={92} 
                          animation="wave" 
                          style={{ marginBottom: '20px' }}
                        />
                      </div>

                      <div style={{marginBottom: '24px'}}>
                        <Placeholder 
                          shape="rect"
                          width={80} 
                          height={92} 
                          animation="wave" 
                          style={{ marginBottom: '20px' }}
                        />
                      </div>

                      <div style={{marginBottom: '24px'}}>
                        <Placeholder 
                          shape="rect"
                          width={80} 
                          height={92} 
                          animation="wave" 
                          style={{ marginBottom: '20px' }}
                        />
                      </div>
                    </div>

                    <div style={{marginLeft: '32px'}}>
                      <Placeholder 
                        shape="rect"
                        width={500} 
                        height={580} 
                        animation="wave" 
                        style={{ marginBottom: '20px' }}
                      />
                    </div>

                    <div style={{marginLeft: '32px'}}>
                      <div style={{marginBottom: '16px'}}>
                        <Placeholder 
                          shape="rect"
                          width={477} 
                          height={40} 
                          animation="wave" 
                          style={{ marginBottom: '20px' }}
                        />
                      </div>

                      <div style={{marginBottom: '24px'}}>
                        <Placeholder 
                          shape="rect"
                          width={330} 
                          height={48} 
                          animation="wave" 
                          style={{ marginBottom: '20px' }}
                        />
                      </div>

                      <div style={{marginBottom: '27px'}}>
                        <Placeholder 
                          shape="rect"
                          width={192} 
                          height={39} 
                          animation="wave" 
                          style={{ marginBottom: '20px' }}
                        />
                      </div>

                      <div style={{marginBottom: '8px'}}>
                        <Placeholder 
                          shape="rect"
                          width={58} 
                          height={24} 
                          animation="wave" 
                          style={{ marginBottom: '20px' }}
                        />
                      </div>

                      <div className="d-flex" style={{marginBottom: '24px'}}>
                        <div className='d-flex flex-column' style={{marginRight: '12px'}}>
                          <div style={{marginBottom: '12px'}}>
                            <Placeholder 
                              shape="rect"
                              width={100} 
                              height={32} 
                              animation="wave" 
                              style={{ marginBottom: '20px' }}
                            />
                          </div>

                          <div style={{marginBottom: '12px'}}>
                            <Placeholder 
                              shape="rect"
                              width={100} 
                              height={32} 
                              animation="wave" 
                              style={{ marginBottom: '20px' }}
                            />
                          </div>
                        </div>

                        <div className='d-flex flex-column' style={{marginRight: '12px'}}>
                          <div style={{marginBottom: '12px'}}>
                            <Placeholder 
                              shape="rect"
                              width={100} 
                              height={32} 
                              animation="wave" 
                              style={{ marginBottom: '20px' }}
                            />
                          </div>

                          <div style={{marginBottom: '12px'}}>
                            <Placeholder 
                              shape="rect"
                              width={100} 
                              height={32} 
                              animation="wave" 
                              style={{ marginBottom: '20px' }}
                            />
                          </div>
                        </div>

                        <div className='d-flex flex-column' style={{marginRight: '12px'}}>
                          <div style={{marginBottom: '12px'}}>
                            <Placeholder 
                              shape="rect"
                              width={100} 
                              height={32} 
                              animation="wave" 
                              style={{ marginBottom: '20px' }}
                            />
                          </div>

                          <div style={{marginBottom: '12px'}}>
                            <Placeholder 
                              shape="rect"
                              width={100} 
                              height={32} 
                              animation="wave" 
                              style={{ marginBottom: '20px' }}
                            />
                          </div>
                        </div>
                      </div>

                      <div style={{marginBottom: '8px'}}>
                        <Placeholder 
                          shape="rect"
                          width={58} 
                          height={24} 
                          animation="wave" 
                          style={{ marginBottom: '20px' }}
                        />
                      </div>

                      <div className="d-flex" style={{marginBottom: '24px'}}>
                        <div className='d-flex flex-column' style={{marginRight: '12px'}}>
                          <div style={{marginBottom: '12px'}}>
                            <Placeholder 
                              shape="circle"
                              width={24} 
                              height={24} 
                              animation="wave" 
                              style={{ marginBottom: '20px' }}
                            />
                          </div>
                        </div>

                        <div className='d-flex flex-column' style={{marginRight: '12px'}}>
                          <div style={{marginBottom: '12px'}}>
                            <Placeholder 
                              shape="circle"
                              width={24} 
                              height={24} 
                              animation="wave" 
                              style={{ marginBottom: '20px' }}
                            />
                          </div>
                        </div>

                        <div className='d-flex flex-column' style={{marginRight: '12px'}}>
                          <div style={{marginBottom: '12px'}}>
                            <Placeholder 
                              shape="circle"
                              width={24} 
                              height={24} 
                              animation="wave" 
                              style={{ marginBottom: '20px' }}
                            />
                          </div>
                        </div>

                        <div className='d-flex flex-column' style={{marginRight: '12px'}}>
                          <div style={{marginBottom: '12px'}}>
                            <Placeholder 
                              shape="circle"
                              width={24} 
                              height={24} 
                              animation="wave" 
                              style={{ marginBottom: '20px' }}
                            />
                          </div>
                        </div>
                      </div>

                      <div style={{marginBottom: '24px'}}>
                        <Placeholder 
                          shape="rect"
                          width={58} 
                          height={24} 
                          animation="wave" 
                          style={{ marginBottom: '20px' }}
                        />
                      </div>

                      <div className='d-flex' style={{marginBottom: '24px'}}>
                        <div style={{marginRight: '12px'}}>
                          <Placeholder 
                            shape="rect"
                            width={229} 
                            height={48} 
                            animation="wave" 
                            style={{ marginBottom: '20px' }}
                          />
                        </div>

                        <div style={{marginRight: '12px'}}>
                          <Placeholder 
                            shape="rect"
                            width={236} 
                            height={48} 
                            animation="wave" 
                            style={{ marginBottom: '20px' }}
                          />
                        </div>
                      </div>

                      <div className='d-flex' style={{marginBottom: '24px'}}>
                        <div style={{marginRight: '4px'}}>
                          <Placeholder 
                            shape="rect"
                            width={52} 
                            height={20} 
                            animation="wave" 
                            style={{ marginBottom: '20px' }}
                          />
                        </div>

                        <div style={{marginRight: '12px'}}>
                          <Placeholder 
                            shape="rect"
                            width={71} 
                            height={22} 
                            animation="wave" 
                            style={{ marginBottom: '20px' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </center>
      ) : (
        <div>
          <HeaderMain trashCardData={trashCardData} />
          <ToastContainer />

          <div className="d-flex" style={{paddingLeft: '120px', position: 'relative', top: '30px'}}>
            <NavLink to={`/categories/${dataBeck.product_category ? dataBeck.product_category.id : null}/${dataBeck.product_category ? dataBeck.product_category.name : null}`} className='category_subcategor_name'>{dataBeck.product_category ? dataBeck.product_category.name : ''}</NavLink>

            <svg style={{display: dataBeck.product_sub_category === null ? 'none' : 'block'}} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <NavLink to={`/categories/${dataBeck.product_sub_category ? dataBeck.product_sub_category.id : null}/${dataBeck.product_sub_category ? dataBeck.product_sub_category.name : null}`} className='category_subcategor_name'>{dataBeck.product_sub_category ? dataBeck.product_sub_category.name : ''}</NavLink>
          </div>

          <div className="center flex-column" style={{paddingLeft: '120px', paddingRight: '120px'}}>
            <div className="card_detail">
              {isLoading ? (
                <>
                  <div>
                    <div className="d-flex">
                      <div>
                        <div style={{marginBottom: '24px'}}>
                          <Placeholder 
                            shape="rect"
                            width={80} 
                            height={92} 
                            animation="wave" 
                            style={{ marginBottom: '20px' }}
                          />
                        </div>

                        <div style={{marginBottom: '24px'}}>
                          <Placeholder 
                            shape="rect"
                            width={80} 
                            height={92} 
                            animation="wave" 
                            style={{ marginBottom: '20px' }}
                          />
                        </div>

                        <div style={{marginBottom: '24px'}}>
                          <Placeholder 
                            shape="rect"
                            width={80} 
                            height={92} 
                            animation="wave" 
                            style={{ marginBottom: '20px' }}
                          />
                        </div>

                        <div style={{marginBottom: '24px'}}>
                          <Placeholder 
                            shape="rect"
                            width={80} 
                            height={92} 
                            animation="wave" 
                            style={{ marginBottom: '20px' }}
                          />
                        </div>

                        <div style={{marginBottom: '24px'}}>
                          <Placeholder 
                            shape="rect"
                            width={80} 
                            height={92} 
                            animation="wave" 
                            style={{ marginBottom: '20px' }}
                          />
                        </div>
                      </div>

                      <div style={{marginLeft: '32px'}}>
                        <Placeholder 
                          shape="rect"
                          width={500} 
                          height={580} 
                          animation="wave" 
                          style={{ marginBottom: '20px' }}
                        />
                      </div>

                      <div style={{marginLeft: '32px'}}>
                        <div style={{marginBottom: '16px'}}>
                          <Placeholder 
                            shape="rect"
                            width={477} 
                            height={40} 
                            animation="wave" 
                            style={{ marginBottom: '20px' }}
                          />
                        </div>

                        <div style={{marginBottom: '24px'}}>
                          <Placeholder 
                            shape="rect"
                            width={330} 
                            height={48} 
                            animation="wave" 
                            style={{ marginBottom: '20px' }}
                          />
                        </div>

                        <div style={{marginBottom: '27px'}}>
                          <Placeholder 
                            shape="rect"
                            width={192} 
                            height={39} 
                            animation="wave" 
                            style={{ marginBottom: '20px' }}
                          />
                        </div>

                        <div style={{marginBottom: '8px'}}>
                          <Placeholder 
                            shape="rect"
                            width={58} 
                            height={24} 
                            animation="wave" 
                            style={{ marginBottom: '20px' }}
                          />
                        </div>

                        <div className="d-flex" style={{marginBottom: '24px'}}>
                          <div className='d-flex flex-column' style={{marginRight: '12px'}}>
                            <div style={{marginBottom: '12px'}}>
                              <Placeholder 
                                shape="rect"
                                width={100} 
                                height={32} 
                                animation="wave" 
                                style={{ marginBottom: '20px' }}
                              />
                            </div>

                            <div style={{marginBottom: '12px'}}>
                              <Placeholder 
                                shape="rect"
                                width={100} 
                                height={32} 
                                animation="wave" 
                                style={{ marginBottom: '20px' }}
                              />
                            </div>
                          </div>

                          <div className='d-flex flex-column' style={{marginRight: '12px'}}>
                            <div style={{marginBottom: '12px'}}>
                              <Placeholder 
                                shape="rect"
                                width={100} 
                                height={32} 
                                animation="wave" 
                                style={{ marginBottom: '20px' }}
                              />
                            </div>

                            <div style={{marginBottom: '12px'}}>
                              <Placeholder 
                                shape="rect"
                                width={100} 
                                height={32} 
                                animation="wave" 
                                style={{ marginBottom: '20px' }}
                              />
                            </div>
                          </div>

                          <div className='d-flex flex-column' style={{marginRight: '12px'}}>
                            <div style={{marginBottom: '12px'}}>
                              <Placeholder 
                                shape="rect"
                                width={100} 
                                height={32} 
                                animation="wave" 
                                style={{ marginBottom: '20px' }}
                              />
                            </div>

                            <div style={{marginBottom: '12px'}}>
                              <Placeholder 
                                shape="rect"
                                width={100} 
                                height={32} 
                                animation="wave" 
                                style={{ marginBottom: '20px' }}
                              />
                            </div>
                          </div>
                        </div>

                        <div style={{marginBottom: '8px'}}>
                          <Placeholder 
                            shape="rect"
                            width={58} 
                            height={24} 
                            animation="wave" 
                            style={{ marginBottom: '20px' }}
                          />
                        </div>

                        <div className="d-flex" style={{marginBottom: '24px'}}>
                          <div className='d-flex flex-column' style={{marginRight: '12px'}}>
                            <div style={{marginBottom: '12px'}}>
                              <Placeholder 
                                shape="circle"
                                width={24} 
                                height={24} 
                                animation="wave" 
                                style={{ marginBottom: '20px' }}
                              />
                            </div>
                          </div>

                          <div className='d-flex flex-column' style={{marginRight: '12px'}}>
                            <div style={{marginBottom: '12px'}}>
                              <Placeholder 
                                shape="circle"
                                width={24} 
                                height={24} 
                                animation="wave" 
                                style={{ marginBottom: '20px' }}
                              />
                            </div>
                          </div>

                          <div className='d-flex flex-column' style={{marginRight: '12px'}}>
                            <div style={{marginBottom: '12px'}}>
                              <Placeholder 
                                shape="circle"
                                width={24} 
                                height={24} 
                                animation="wave" 
                                style={{ marginBottom: '20px' }}
                              />
                            </div>
                          </div>

                          <div className='d-flex flex-column' style={{marginRight: '12px'}}>
                            <div style={{marginBottom: '12px'}}>
                              <Placeholder 
                                shape="circle"
                                width={24} 
                                height={24} 
                                animation="wave" 
                                style={{ marginBottom: '20px' }}
                              />
                            </div>
                          </div>
                        </div>

                        <div style={{marginBottom: '24px'}}>
                          <Placeholder 
                            shape="rect"
                            width={58} 
                            height={24} 
                            animation="wave" 
                            style={{ marginBottom: '20px' }}
                          />
                        </div>

                        <div className='d-flex' style={{marginBottom: '24px'}}>
                          <div style={{marginRight: '12px'}}>
                            <Placeholder 
                              shape="rect"
                              width={229} 
                              height={48} 
                              animation="wave" 
                              style={{ marginBottom: '20px' }}
                            />
                          </div>

                          <div style={{marginRight: '12px'}}>
                            <Placeholder 
                              shape="rect"
                              width={236} 
                              height={48} 
                              animation="wave" 
                              style={{ marginBottom: '20px' }}
                            />
                          </div>
                        </div>

                        <div className='d-flex' style={{marginBottom: '24px'}}>
                          <div style={{marginRight: '4px'}}>
                            <Placeholder 
                              shape="rect"
                              width={52} 
                              height={20} 
                              animation="wave" 
                              style={{ marginBottom: '20px' }}
                            />
                          </div>

                          <div style={{marginRight: '12px'}}>
                            <Placeholder 
                              shape="rect"
                              width={71} 
                              height={22} 
                              animation="wave" 
                              style={{ marginBottom: '20px' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="d-flex">
                  {dataBeck.images && dataBeck.images.length > 0 && (
                    <div className="image-thumbnails">
                      {dataBeck.images.map((image, index) => (
                        <div key={index} style={{backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}} className={index === currentImageIndex ? 'thumbnail-active' : 'thumbnail'} onClick={() => {setCurrentImageIndex(index); animateImage();}}></div>
                      ))}
                    </div>
                  )}

                  <div className="img_card_detail">
                    {dataBeck.images && dataBeck.images.length > 0 && (
                      <div data-bs-toggle="modal" data-bs-target="#exampleModal2" style={{backgroundImage: `url(${dataBeck.images[currentImageIndex]})`, width: '500px', height: '580px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}></div>
                    )}

                    <div className="d-flex justify-content-between" style={{width: '491px', marginLeft: '-3px', marginTop: '450px'}}>
                      <button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={handlePrevImage}>
                        <img style={{ width: '48px', height: '48px' }} src={show_right} alt="show_right" />
                      </button>

                      <button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={handleNextImage}>
                        <img style={{ width: '48px', height: '48px' }} src={show_left} alt="show_left" />
                      </button>
                    </div>
                  </div>

                  <div style={{marginLeft: '450px'}}>
                    <h2 className='show_detail_name'>{dataBeck.name ? dataBeck.name : 'Название отсутствует или не найден'}</h2>

                    <p className='show_detail_description'>{dataBeck.description ? dataBeck.description : 'Описание отсутствует или не найден'}</p>

                    <p className='show_detail_price'>
                      {dataBeck.price_discount ? 
                        <div>
                          {Number(dataBeck.price_discount).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}
                          <del className='show_detail_price_discount'>
                            {Number(dataBeck.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}
                          </del>
                        </div>
                        : 
                        <div>
                          {dataBeck.price ? `${Number(dataBeck.price).toLocaleString('ru-RU')} ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : 'so`m'}` : 'Цена отсутствует или не найден'}
                        </div>
                      }
                    </p>

                    <div>
                      <div style={{marginRight: '83px'}}>
                        <p className='show_detail_size'>Размер</p>
                        <div className='size_selection' style={{width: '350px'}}>
                          {sizeArray.map((size, index) => (
                            <div style={{marginBottom: '12px', cursor: 'pointer'}} key={size.id} className={`size_option ${selectedSizeIndex === index ? 'selected_size' : ''}`} onClick={() => { setSelectedSizeIndex(index); const selectedSizeId = size.id; setDefaultSize(selectedSizeId) }}>
                              {size.name}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className='show_detail_size'>Цвет</p>

                        <div className="d-flex">
                          {colorArray[selectedSizeIndex]?.color.map((color, index) => (
                            <div key={index} className="color_border me-4" style={{borderColor: selectedColorIndex === index ? '#3C7CFB' : '#E6E6E6', cursor: 'pointer'}} onClick={() => { setSelectedColorIndex(index); const selectedColorId = color.id; setDefaultColor(selectedColorId) }}>
                              <div className="color" style={{backgroundColor: color.code}}></div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className='d-flex'>
                        <p style={{color: '#1A1A1A'}} className='show_detail_size'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'В наличии' : 'Sotuvda'}: </p>
                        <p style={{color: '#1A1A1A'}} className='show_detail_size ms-1'>{dataBeck.quantity} {localStorage.getItem('selectedLanguage') === 'ru' ? '' : ' dona bor'}</p>
                      </div>
                    </div>

                    <div className="d-flex" style={{marginTop: '-14px'}}>
                      <button onClick={() => {addToBasket(dataBeck); handleButtonClick();}} className='add_basket_btn' style={{width: localStorage.getItem('selectedLanguage') === 'ru' ? '266px' : '224px', height: '56px', marginTop: '18px', marginLeft: '0px', padding: '15px 18px', marginRight: '12px'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M19.5 7H17C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2C10.6739 2 9.40215 2.52678 8.46447 3.46447C7.52678 4.40215 7 5.67392 7 7H4.5C3.83696 7 3.20107 7.26339 2.73223 7.73223C2.26339 8.20107 2 8.83696 2 9.5L2 17.8333C2.00132 18.938 2.44073 19.997 3.22185 20.7782C4.00296 21.5593 5.062 21.9987 6.16667 22H17.8333C18.938 21.9987 19.997 21.5593 20.7782 20.7782C21.5593 19.997 21.9987 18.938 22 17.8333V9.5C22 8.83696 21.7366 8.20107 21.2678 7.73223C20.7989 7.26339 20.163 7 19.5 7ZM12 3.66667C12.8841 3.66667 13.7319 4.01786 14.357 4.64298C14.9821 5.2681 15.3333 6.11594 15.3333 7H8.66667C8.66667 6.11594 9.01786 5.2681 9.64298 4.64298C10.2681 4.01786 11.1159 3.66667 12 3.66667ZM20.3333 17.8333C20.3333 18.4964 20.0699 19.1323 19.6011 19.6011C19.1323 20.0699 18.4964 20.3333 17.8333 20.3333H6.16667C5.50363 20.3333 4.86774 20.0699 4.3989 19.6011C3.93006 19.1323 3.66667 18.4964 3.66667 17.8333V9.5C3.66667 9.27899 3.75446 9.06702 3.91074 8.91074C4.06702 8.75446 4.27899 8.66667 4.5 8.66667H7V10.3333C7 10.5543 7.0878 10.7663 7.24408 10.9226C7.40036 11.0789 7.61232 11.1667 7.83333 11.1667C8.05435 11.1667 8.26631 11.0789 8.42259 10.9226C8.57887 10.7663 8.66667 10.5543 8.66667 10.3333V8.66667H15.3333V10.3333C15.3333 10.5543 15.4211 10.7663 15.5774 10.9226C15.7337 11.0789 15.9457 11.1667 16.1667 11.1667C16.3877 11.1667 16.5996 11.0789 16.7559 10.9226C16.9122 10.7663 17 10.5543 17 10.3333V8.66667H19.5C19.721 8.66667 19.933 8.75446 20.0893 8.91074C20.2455 9.06702 20.3333 9.27899 20.3333 9.5V17.8333Z" fill="white"/>
                        </svg>
                        <span>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Добавить в корзину' : 'Savatga qo\'shish'}</span>
                      </button>

                      <button onClick={() => {addToBasket(dataBeck); handleButtonClick(); setTimeout(() => {navigate('/basket');}, 1000);}} className='hero_button' style={{width: '236px', height: '56px', marginTop: '18px', marginLeft: '0px', padding: '15px 18px'}}>
                        <span>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Заказать сейчас' : 'Hozir xariq qilish'}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                          <path d="M22.5 13.0039C22.4951 12.4774 22.2832 11.9741 21.91 11.6029L17.62 7.29979C17.4326 7.11341 17.1792 7.00879 16.915 7.00879C16.6508 7.00879 16.3974 7.11341 16.21 7.29979C16.1163 7.39282 16.0419 7.5035 15.9911 7.62545C15.9403 7.7474 15.9142 7.8782 15.9142 8.0103C15.9142 8.14241 15.9403 8.27321 15.9911 8.39516C16.0419 8.5171 16.1163 8.62778 16.21 8.72081L19.5 12.0032H3.5C3.23478 12.0032 2.98043 12.1086 2.79289 12.2963C2.60536 12.484 2.5 12.7385 2.5 13.0039C2.5 13.2693 2.60536 13.5238 2.79289 13.7115C2.98043 13.8992 3.23478 14.0046 3.5 14.0046H19.5L16.21 17.297C16.0217 17.4841 15.9154 17.7384 15.9144 18.004C15.9135 18.2695 16.018 18.5246 16.205 18.713C16.392 18.9015 16.6461 19.0078 16.9115 19.0088C17.1768 19.0097 17.4317 18.9051 17.62 18.718L21.91 14.4149C22.2856 14.0413 22.4978 13.5339 22.5 13.0039Z" fill="white"/>
                        </svg>
                      </button>
                    </div>

                    <div style={{margin: '20px 0px -14px 0px'}}>
                      <p className='show_detail_author'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Состав' : 'Tarkibi'}: {dataBeck.composition ? dataBeck.composition : 'Состав отсутствует или не найден'}</p>
                    </div>

                    <div style={{display: 'flex', marginTop: '32px'}}>
                      <p className='show_detail_author'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Автор' : 'Muallif'}:</p>
                      <NavLink to={`/author/${dataBeck.company_id}/${dataBeck.company_name}`} className='show_detail_author_name' href="#">{dataBeck.company_name}</NavLink>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="container">
            <h3 className='show_detail_title' style={{marginBottom: '-20px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Похожие товары' : `Shunga o'xshash mahsulotlar`}</h3>

            <Swiper slidesPerView={4} navigation={true} modules={[Navigation]} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap' }}>
              <div style={{position: 'relative', left: '30px'}}>
                {data.data ? data.data.warehouse_product_list.slice(0, displayedItems).map((data2) => (
                  <SwiperSlide key={data2.id} className='mt-5'>
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
                            <div style={{width: '276px', borderRadius: '8px', height: '320px', backgroundImage: `url(${data2.images[0]})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                          </div>

                          <div style={{borderRadius: '8px',}} className="image-overlay">
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
                  </SwiperSlide>
                )): null}
              </div>
            </Swiper>
          </div>

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
                              <p className='show_detail_size_quantity ms-1'>{modalData.quantity}</p>
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
        
                              <div style={{marginTop: '12px'}} onClick={() => {handleCardClick(modalData.images ? modalData.images[0] : '', modalData.name, modalData.price); handleButtonClick(); addToBasket(modalData); localStorage.getItem('token') ? navigate('/basket') : console.log('no token');}}>
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

          <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '24px'}}>
              <div className="modal-content" style={{borderRadius: '0px'}}>
                <div style={{padding: '0px'}} className="modal-body">
                  <div className="d-flex justify-content-end">
                    <button style={{position: 'absolute', zIndex: '1', top: '12px', right: '12px'}} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className='img_animation' style={{backgroundColor: '#F6F6F6', height: '100%', width: '100%'}}>
                    {dataBeck.images && dataBeck.images.length > 0 && (
                      <>
                        {dataBeck.images && dataBeck.images.length > 0 && (
                          <div data-bs-toggle="modal" data-bs-target="#exampleModal2" style={{backgroundImage: `url(${dataBeck.images[currentImageIndex]})`, width: '500px', height: '580px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}></div>
                        )}
    
                        <div className="d-flex justify-content-between" style={{ width: '490px', marginLeft: '5px', position: 'absolute', bottom: '16px'}}>
                          <button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={handlePrevImage}>
                            <img style={{ width: '48px', height: '48px', boxShadow: '0px 13px 84px -22px rgba(0,0,0,0.75)', borderRadius: '50%' }} src={show_right} alt="show_right" />
                          </button>
    
                          <button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={handleNextImage}>
                            <img style={{ width: '48px', height: '48px', boxShadow: '0px 13px 84px -22px rgba(0,0,0,0.75)', borderRadius: '50%' }} src={show_left} alt="show_left" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AdvantageMain />
          <FooterMain />
        </div>
      )}
    </>
  );
}

export default ShowDetail;