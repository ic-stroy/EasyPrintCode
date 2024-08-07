import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom';
import blueVerifed from '../../layouts/icons/blue_verifed.svg'
import blueBuds from '../../layouts/icons/operator.svg'
import blueTruck from '../../layouts/icons/truck.svg'
import './main.css'
import HeaderMainMobile from '../../components/header';
import FooterMainMobile from '../../components/footer';
import FooterBarMobile from '../../components/footer bar';
import Placeholder from 'react-placeholder-loading';
import Reveal from '../../animation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';

const clearLocalStorage = () => {
  const keysToRemove = [
    'token', 'user_last_name', 'user_name', 'user_phone_number',
    'grant_total', 'selectedCategory', 'currentProduct', 'selectedSubCategory',
    'paymentDate', 'trueVerifed', 'basketData', 'trashCard',
    'selectedCategoryId', 'basket', 'price', 'discount_price', 'user_image'
  ];
  keysToRemove.forEach(key => localStorage.removeItem(key));
};

const checkUser = async (token) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_TWO}/get-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        language: localStorage.getItem('selectedLanguage') || 'ru',
      },
    });

    if (!response.data.status) {
      clearLocalStorage();
    }
  } catch (error) {
    console.error('Error checking user:', error);
    clearLocalStorage();
  }
};

function ProductShowMobile() {
  const params = useParams()
  const [trashCardData, setTrashCardData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderedProduct, setOrderedProduct] = useState(true);
  const [loader, setLoader] = useState(true);
  const [dataBeck, setDataBeck] = useState([]);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const token = localStorage.getItem('token');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [data, setData] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [colorArray, setColorArray] = useState([]);
  const [sizeArray, setSizeArray] = useState([]);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [defaultSize, setDefaultSize] = useState();
  const [defaultColor, setDefaultColor] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);
  const [countHeader, setCountHeader] = useState(0);
  const [displayedPrice, setDisplayedPrice] = useState();
  const [displayedName, setDisplayedName] = useState();
  const [displayedImage, setDisplayedImage] = useState();
  const [displayedId, setDisplayedId] = useState();
  const [displayedQuantity, setDisplayedQuantity] = useState();
  const [clickIdColor, setClickIdColor] = useState();

  // useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.REACT_APP_TWO}/get-user`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: 'application/json',
  //           language: localStorage.getItem('selectedLanguage') || 'ru',
  //         },
  //       });
  
  //       if (response.data.status === true) {
  //         return;
  //       } else {
  //         localStorage.removeItem('token');
  //         localStorage.removeItem('user_last_name');
  //         localStorage.removeItem('user_name');
  //         localStorage.removeItem('user_phone_number');
  //         localStorage.removeItem('grant_total');
  //         localStorage.removeItem('selectedCategory');
  //         localStorage.removeItem('currentProduct');
  //         localStorage.removeItem('selectedSubCategory');
  //         localStorage.removeItem('paymentDate');
  //         localStorage.removeItem('trueVerifed');
  //         localStorage.removeItem('basketData');
  //         localStorage.removeItem('trashCard');
  //         localStorage.removeItem('selectedCategoryId');
  //         localStorage.removeItem('basket');
  //         localStorage.removeItem('price');
  //         localStorage.removeItem('discount_price');
  //         localStorage.removeItem('user_image');
  //       }
  //     } catch (error) {
  //       localStorage.removeItem('token');
  //       localStorage.removeItem('user_last_name');
  //       localStorage.removeItem('user_name');
  //       localStorage.removeItem('user_phone_number');
  //       localStorage.removeItem('grant_total');
  //       localStorage.removeItem('selectedCategory');
  //       localStorage.removeItem('currentProduct');
  //       localStorage.removeItem('selectedSubCategory');
  //       localStorage.removeItem('paymentDate');
  //       localStorage.removeItem('trueVerifed');
  //       localStorage.removeItem('basketData');
  //       localStorage.removeItem('trashCard');
  //       localStorage.removeItem('selectedCategoryId');
  //       localStorage.removeItem('basket');
  //       localStorage.removeItem('price');
  //       localStorage.removeItem('discount_price');
  //       localStorage.removeItem('user_image');
  //     }
  //   };
  
  //   if (token) {
  //     checkUser();
  //   }
  // }, [token]);

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

  if (params.id !== localStorage.getItem('selectedCategory')) {
    window.location.reload();
    window.scrollTo(0, 0);
  }

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

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

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
      setDisplayedName(response.data.data.color_by_size[0].color[selectedSizeIndex].product.name);
      setDisplayedQuantity(response.data.data.color_by_size[0].color[selectedSizeIndex].product.quantity);
      setDisplayedImage(response.data.data.color_by_size[0].color[selectedSizeIndex].product.img)
      setDisplayedId(response.data.data.color_by_size[0].color[selectedSizeIndex].product.id);
      setDisplayedPrice(response.data.data.color_by_size[0].color[selectedSizeIndex].product.price)
      setDataBeck(response.data.data);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
      // alert(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
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
      console.log(error);
      // alert(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    });    
  }, []);

  const addToBasket = (productData) => {
    if (productData) {
      const selectedColor = dataBeck.color_by_size[selectedSizeIndex];
      const selectedSize = dataBeck.size_by_color[selectedColorIndex];

      const colorId = selectedColor.id;
      const sizeId = selectedSize.id;

      var myHeaders = new Headers();
      myHeaders.append("language", "uz");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      var formdata = new FormData();
      formdata.append("warehouse_product_id", displayedId);
      formdata.append("quantity", 1);
      formdata.append("color_id", defaultColor ? defaultColor : clickIdColor);
      formdata.append("size_id", defaultSize ? defaultSize : colorId);
      formdata.append("price", productData.price);
      formdata.append("discount", dataBeck.discount ? dataBeck.discount : '0');
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      const basketData = {
        warehouse_product_id: displayedId,
        quantity: 1,
        color_id: defaultColor ? defaultColor : clickIdColor,
        size_id: defaultSize ? defaultSize : colorId,
        price: productData.price,
        discount: dataBeck.discount ? dataBeck.discount : '0'
      };

      localStorage.setItem('basket', JSON.stringify(basketData));

      fetch(`${process.env.REACT_APP_TWO}/order/set-warehouse`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.status === true) {
            // toast(
            //   <ToastComponent
            //     image={displayedImage[0] ? displayedImage[0] : ''}
            //     title={displayedName}
            //     description={productData.description ? productData.description : 'Описание недоступно'}
            //     link="/basket"
            //     linkText="Перейти в корзину"
            //     onClose={() => toast.dismiss()}
            //   />,
            //   {
            //     position: "top-center",
            //     autoClose: 3000,
            //     draggable: true,
            //     theme: "colored",
            //   }
            // );
            alert('Товар добавлен ')
          } else {
            if (result.message === 'Unauthenticated.') {
              const basketData = {
                warehouse_product_id: productData.id,
                quantity: 1,
                color_id: colorId,
                size_id: sizeId,
                price: productData.price,
                discount: productData.discount ? productData.discount : '0'
              };

              localStorage.setItem('basket', JSON.stringify(basketData));

              alert(result.message)
            } else {
              alert(localStorage.getItem('selectedLanguage') === 'ru' ? 'Товар не добавлен' : 'Mahsulot qo`shilmadi')
            }
          }
        })
        .catch(error => {
          // toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Товар не добавлен' : 'Mahsulot qo`shilmadi');
          alert(localStorage.getItem('selectedLanguage') === 'ru' ? 'Товар не добавлен' : 'Mahsulot qo`shilmadi')
          console.log('error', error);
        });
    }
  };

  useEffect(() => {
    addToBasket(selectedProduct);
  }, [selectedProduct]);

  const handleIndicatorClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    if (touchStartX === null) return;

    const touchEndX = event.touches[0].clientX;
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > 50) {
      if (difference > 0 && currentImageIndex < dataBeck.images.length - 1) {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      } else if (difference < 0 && currentImageIndex > 0) {
        setCurrentImageIndex((prevIndex) => prevIndex - 1);
      }

      setTouchStartX(null);
    }
  };

  useEffect(() => {
    if (colorArray[selectedSizeIndex] && colorArray[selectedSizeIndex].color.length > 0) {
      const defaultColor = colorArray[selectedSizeIndex].color[0];
      setSelectedColorIndex(0);
      setClickIdColor(defaultColor.id);
      setDefaultColor(defaultColor.id);
      setDisplayedId(defaultColor.product.id);
      setDisplayedPrice(defaultColor.product.price);
      setDisplayedName(defaultColor.product.name);
      setDisplayedQuantity(defaultColor.product.quantity);
      setDisplayedImage(defaultColor.product.img);
    }
  }, [selectedSizeIndex, colorArray]);

  return (
    <>
      {loader ? (
        <center style={{background: '#F6F6F6'}}>
          <div className="center" style={{paddingTop: '284px', paddingBottom: '284px', zIndex: '2', position: 'relative'}}>
            <span class="loader_maen"></span>
          </div>

          <div style={{position: 'absolute', top: '65%', left: '50%', zIndex: '1', transform: 'translate(-50%, -50%)'}}>
            <HeaderMainMobile />
            <div>
              <center>
                <div style={{marginBottom: '20px'}}>
                  <Placeholder 
                    shape="rect"
                    width={400} 
                    height={314} 
                    animation="wave" 
                  />
                </div>
              </center>

              <div style={{marginLeft: '16px'}}>
                <div style={{marginBottom: '8px', marginTop: '16px'}}>
                  <Placeholder 
                    shape="rect"
                    width={343} 
                    height={24} 
                    animation="wave" 
                  />
                </div>

                <div style={{marginBottom: '8px', marginTop: '16px'}}>
                  <Placeholder 
                    shape="rect"
                    width={343} 
                    height={44} 
                    animation="wave" 
                  />
                </div>

                <div style={{marginBottom: '8px', marginTop: '16px'}}>
                  <Placeholder 
                    shape="rect"
                    width={107} 
                    height={20} 
                    animation="wave" 
                  />
                </div>

                <div style={{marginBottom: '8px', marginTop: '16px'}}>
                  <Placeholder 
                    shape="rect"
                    width={343} 
                    height={20} 
                    animation="wave" 
                  />
                </div>

                <div className="d-flex">
                  <div style={{marginBottom: '24px', marginTop: '16px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="circle"
                      width={48} 
                      height={48} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '24px', marginTop: '16px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="circle"
                      width={48} 
                      height={48} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '24px', marginTop: '16px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="circle"
                      width={48} 
                      height={48} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '24px', marginTop: '16px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="circle"
                      width={48} 
                      height={48} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '24px', marginTop: '16px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="circle"
                      width={48} 
                      height={48} 
                      animation="wave" 
                    />
                  </div>
                </div>

                <div style={{marginBottom: '8px', marginTop: '16px'}}>
                  <Placeholder 
                    shape="rect"
                    width={343} 
                    height={20} 
                    animation="wave" 
                  />
                </div>

                <div className="d-flex">
                  <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="rect"
                      width={74} 
                      height={32} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="rect"
                      width={74} 
                      height={32} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="rect"
                      width={74} 
                      height={32} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="rect"
                      width={74} 
                      height={32} 
                      animation="wave" 
                    />
                  </div>
                </div>

                <div className="d-flex">
                  <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="rect"
                      width={74} 
                      height={32} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="rect"
                      width={74} 
                      height={32} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="rect"
                      width={74} 
                      height={32} 
                      animation="wave" 
                    />
                  </div>
                  
                  <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="rect"
                      width={74} 
                      height={32} 
                      animation="wave" 
                    />
                  </div>
                </div>

                <div style={{marginBottom: '8px', marginTop: '16px'}}>
                  <Placeholder 
                    shape="rect"
                    width={343} 
                    height={20} 
                    animation="wave" 
                  />
                </div>

                <div style={{marginBottom: '8px', marginTop: '16px'}}>
                  <Placeholder 
                    shape="rect"
                    width={343} 
                    height={20} 
                    animation="wave" 
                  />
                </div>

                <div style={{marginBottom: '8px', marginTop: '16px'}}>
                  <Placeholder 
                    shape="rect"
                    width={327} 
                    height={48} 
                    animation="wave" 
                  />
                </div>
              </div>
            </div>
          </div>
        </center>
      ) : (
        <div style={{backgroundColor: 'white'}}>
          <HeaderMainMobile />

          <div style={{width: '100%', backgroundColor: 'white'}}>
            {isLoading ? (
              <>
                <center>
                  <div style={{marginBottom: '20px'}}>
                    <Placeholder 
                      shape="rect"
                      width={200} 
                      height={214} 
                      animation="wave" 
                    />
                  </div>
                </center>

                <div className="d-flex center">
                  <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="rect"
                      width={42} 
                      height={42} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="rect"
                      width={42} 
                      height={42} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="rect"
                      width={42} 
                      height={42} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="rect"
                      width={42} 
                      height={42} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                    <Placeholder 
                      shape="rect"
                      width={42} 
                      height={42} 
                      animation="wave" 
                    />
                  </div>
                </div>

                <div style={{marginLeft: '16px'}}>
                  <div style={{marginBottom: '8px', marginTop: '16px'}}>
                    <Placeholder 
                      shape="rect"
                      width={343} 
                      height={24} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '8px', marginTop: '16px'}}>
                    <Placeholder 
                      shape="rect"
                      width={343} 
                      height={44} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '8px', marginTop: '16px'}}>
                    <Placeholder 
                      shape="rect"
                      width={107} 
                      height={20} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '8px', marginTop: '16px'}}>
                    <Placeholder 
                      shape="rect"
                      width={343} 
                      height={20} 
                      animation="wave" 
                    />
                  </div>

                  <div className="d-flex">
                    <div style={{marginBottom: '24px', marginTop: '16px', marginLeft: '10px', marginRight: '10px'}}>
                      <Placeholder 
                        shape="circle"
                        width={48} 
                        height={48} 
                        animation="wave" 
                      />
                    </div>

                    <div style={{marginBottom: '24px', marginTop: '16px', marginLeft: '10px', marginRight: '10px'}}>
                      <Placeholder 
                        shape="circle"
                        width={48} 
                        height={48} 
                        animation="wave" 
                      />
                    </div>

                    <div style={{marginBottom: '24px', marginTop: '16px', marginLeft: '10px', marginRight: '10px'}}>
                      <Placeholder 
                        shape="circle"
                        width={48} 
                        height={48} 
                        animation="wave" 
                      />
                    </div>

                    <div style={{marginBottom: '24px', marginTop: '16px', marginLeft: '10px', marginRight: '10px'}}>
                      <Placeholder 
                        shape="circle"
                        width={48} 
                        height={48} 
                        animation="wave" 
                      />
                    </div>

                    <div style={{marginBottom: '24px', marginTop: '16px', marginLeft: '10px', marginRight: '10px'}}>
                      <Placeholder 
                        shape="circle"
                        width={48} 
                        height={48} 
                        animation="wave" 
                      />
                    </div>
                  </div>

                  <div style={{marginBottom: '8px', marginTop: '16px'}}>
                    <Placeholder 
                      shape="rect"
                      width={343} 
                      height={20} 
                      animation="wave" 
                    />
                  </div>

                  <div className="d-flex">
                    <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                      <Placeholder 
                        shape="rect"
                        width={74} 
                        height={32} 
                        animation="wave" 
                      />
                    </div>

                    <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                      <Placeholder 
                        shape="rect"
                        width={74} 
                        height={32} 
                        animation="wave" 
                      />
                    </div>

                    <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                      <Placeholder 
                        shape="rect"
                        width={74} 
                        height={32} 
                        animation="wave" 
                      />
                    </div>

                    <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                      <Placeholder 
                        shape="rect"
                        width={74} 
                        height={32} 
                        animation="wave" 
                      />
                    </div>
                  </div>

                  <div className="d-flex">
                    <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                      <Placeholder 
                        shape="rect"
                        width={74} 
                        height={32} 
                        animation="wave" 
                      />
                    </div>

                    <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                      <Placeholder 
                        shape="rect"
                        width={74} 
                        height={32} 
                        animation="wave" 
                      />
                    </div>

                    <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                      <Placeholder 
                        shape="rect"
                        width={74} 
                        height={32} 
                        animation="wave" 
                      />
                    </div>
                    
                    <div style={{marginBottom: '12px', marginLeft: '10px', marginRight: '10px'}}>
                      <Placeholder 
                        shape="rect"
                        width={74} 
                        height={32} 
                        animation="wave" 
                      />
                    </div>
                  </div>

                  <div style={{marginBottom: '8px', marginTop: '16px'}}>
                    <Placeholder 
                      shape="rect"
                      width={343} 
                      height={20} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '8px', marginTop: '16px'}}>
                    <Placeholder 
                      shape="rect"
                      width={343} 
                      height={20} 
                      animation="wave" 
                    />
                  </div>

                  <div style={{marginBottom: '8px', marginTop: '16px'}}>
                    <Placeholder 
                      shape="rect"
                      width={327} 
                      height={48} 
                      animation="wave" 
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <center style={{width: '100%'}}>
                  <Reveal>
                    <div className='img_animation' style={{backgroundColor: '#F6F6F6', height: '100%', width: '100%'}}>
                      {displayedImage && (
                        <div id="carouselExampleIndicators" className="carousel slide">
                          <div className="carousel-indicators">
                            {displayedImage.map((image, index) => (
                              <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === currentImageIndex ? "active" : ""} aria-current={index === currentImageIndex ? "true" : "false"} aria-label={`Slide ${index + 1}`} onClick={() => handleIndicatorClick(index)}></button>
                            ))}
                          </div>
                          <div className="carousel-inner" style={{borderRadius: '6px'}}>
                            {displayedImage.map((image, index) => (
                              <div key={index} className={`carousel-item ${index === currentImageIndex ? "active" : ""}`} style={{borderRadius: '6px'}}>
                                <div className='img_animation_img' data-bs-toggle="modal" data-bs-target="#exampleModal"style={{backgroundImage: `url(${image})`, backgroundPosition: 'center', borderRadius: '6px', width: '100%', height: '382px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}onTouchStart={handleTouchStart}onTouchMove={handleTouchMove}></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Reveal>
                </center>

                <Reveal>
                  <center style={{width: '100%', textAlign: 'left'}}>
                    <div style={{backgroundColor: 'white', padding: '16px'}}>
                      <p className='show_detail_price_mobile'>
                        {displayedPrice ? `${Number(displayedPrice).toLocaleString('ru-RU')} ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}` : 'Цена отсутствует или не найден'}
                      </p>

                      <h3 className='show_detail_title_mobile'>{displayedName ? displayedName : 'Название отсутствует или не найден'}</h3>

                      <h3 className='show_detail_title_mobile' style={{marginTop: '8px'}}>Цвет:</h3>

                      <div className="d-flex">
                        {colorArray[selectedSizeIndex]?.color.map((color, index) => (
                          <div
                            key={index}
                            className="color_border me-4"
                            style={{borderColor: selectedColorIndex === index ? '#829D50' : '#E6E6E6', cursor: 'pointer', width: '50px', height: '50px'}}
                            onClick={() => {
                              setSelectedColorIndex(index);
                              const selectedColorId = color.id;
                              setClickIdColor(color.id);
                              setDefaultColor(selectedColorId);
                              setDisplayedId(color.product.id);
                              setDisplayedPrice(color.product.price);
                              setDisplayedName(color.product.name);
                              setDisplayedQuantity(color.product.quantity);
                              setDisplayedImage(color.product.img);
                            }}
                          >
                            <div className="color" style={{backgroundColor: color.code, width: '48px', height: '48px'}}></div>
                          </div>
                        ))}
                      </div>

                      <h3 className='show_detail_title_mobile' style={{marginTop: '16px'}}>Размер:</h3>

                      <div className='size_selection' style={{width: '350px'}}>
                        {sizeArray.map((size, index) => (
                          <div style={{marginBottom: '12px', cursor: 'pointer'}} key={size.id} className={`size_option ${selectedSizeIndex === index ? 'selected_size' : ''}`} onClick={() => { setSelectedSizeIndex(index); const selectedSizeId = size.id;  setClickIdColor(size.color[0].id); setDefaultSize(selectedSizeId); setDisplayedId(size.color[0].product.id); setDisplayedPrice(size.color[0].product.price); setDisplayedName(size.color[0].product.name); setDisplayedQuantity(size.color[0].product.quantity); setDisplayedImage(size.color[0].product.img) }}>
                            {size.name}
                          </div>
                        ))}
                      </div>

                      <div style={{margin: '20px 0px -14px 0px'}}>
                        <p className='show_detail_author'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Состав' : 'Tarkibi'}: {dataBeck.material_composition ? dataBeck.material_composition : 'Состав отсутствует или не найден'}</p>
                      </div>

                      <div style={{display: 'flex', marginTop: '32px'}}>
                        <p className='show_detail_author'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Автор' : 'Muallif'}:</p>
                        <NavLink to={`/mobile/author/${dataBeck.company_id}/${dataBeck.company_name}`} className='show_detail_author_name' href="#">{dataBeck.company_name}</NavLink>
                      </div>

                      <center>
                        {orderedProduct ? (
                          <button onClick={() => {addToBasket(dataBeck); handleButtonClick()}} className='add_basket_btn center' style={{width: localStorage.getItem('selectedLanguage') === 'ru' ? '100%' : '100%', height: '56px', marginTop: '18px', marginLeft: '0px', padding: '15px 18px', marginRight: '12px'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M19.5 7H17C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2C10.6739 2 9.40215 2.52678 8.46447 3.46447C7.52678 4.40215 7 5.67392 7 7H4.5C3.83696 7 3.20107 7.26339 2.73223 7.73223C2.26339 8.20107 2 8.83696 2 9.5L2 17.8333C2.00132 18.938 2.44073 19.997 3.22185 20.7782C4.00296 21.5593 5.062 21.9987 6.16667 22H17.8333C18.938 21.9987 19.997 21.5593 20.7782 20.7782C21.5593 19.997 21.9987 18.938 22 17.8333V9.5C22 8.83696 21.7366 8.20107 21.2678 7.73223C20.7989 7.26339 20.163 7 19.5 7ZM12 3.66667C12.8841 3.66667 13.7319 4.01786 14.357 4.64298C14.9821 5.2681 15.3333 6.11594 15.3333 7H8.66667C8.66667 6.11594 9.01786 5.2681 9.64298 4.64298C10.2681 4.01786 11.1159 3.66667 12 3.66667ZM20.3333 17.8333C20.3333 18.4964 20.0699 19.1323 19.6011 19.6011C19.1323 20.0699 18.4964 20.3333 17.8333 20.3333H6.16667C5.50363 20.3333 4.86774 20.0699 4.3989 19.6011C3.93006 19.1323 3.66667 18.4964 3.66667 17.8333V9.5C3.66667 9.27899 3.75446 9.06702 3.91074 8.91074C4.06702 8.75446 4.27899 8.66667 4.5 8.66667H7V10.3333C7 10.5543 7.0878 10.7663 7.24408 10.9226C7.40036 11.0789 7.61232 11.1667 7.83333 11.1667C8.05435 11.1667 8.26631 11.0789 8.42259 10.9226C8.57887 10.7663 8.66667 10.5543 8.66667 10.3333V8.66667H15.3333V10.3333C15.3333 10.5543 15.4211 10.7663 15.5774 10.9226C15.7337 11.0789 15.9457 11.1667 16.1667 11.1667C16.3877 11.1667 16.5996 11.0789 16.7559 10.9226C16.9122 10.7663 17 10.5543 17 10.3333V8.66667H19.5C19.721 8.66667 19.933 8.75446 20.0893 8.91074C20.2455 9.06702 20.3333 9.27899 20.3333 9.5V17.8333Z" fill="white"/>
                            </svg>
                            <span>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Добавить в корзину' : 'Savatga qo\'shish'}</span>
                          </button>
                        ) : (
                          <NavLink to={localStorage.getItem('token') ? '/basket/mobile' : ''} className='add_basket_btn center' style={{width: localStorage.getItem('selectedLanguage') === 'ru' ? '100%' : '100%', height: '56px', marginTop: '18px', backgroundColor: '#829D50', marginLeft: '0px', padding: '15px 18px', marginRight: '12px'}}>
                            <span>Перейти в корзину </span>
                          </NavLink>
                        )}
                      </center>
                    </div>
                  </center>
                </Reveal>
              </div>
            )}

            <center>
              <h2 style={{marginBottom: '-4px'}} className='home_card_title_mobile'>Рекомендуем вам:</h2>

              <Swiper style={{marginLeft: '30px'}} slidesPerView={2.3} spaceBetween={10} freeMode={true} pagination={{clickable: true,}} className="mySwiper">
                {data.data ? data.data.warehouse_product_list.filter((data2) => data2.id !== parseInt(params.id))
                      .map((data2) => (
                  <SwiperSlide key={data2.id}>
                    <Reveal>
                      <NavLink onClick={() => {localStorage.setItem('idActive', data2.id); localStorage.setItem('nameActive', data2.name)}} to={`/mobile/show/detail/${data2.id}/${data2.name}`} style={{textDecoration: 'none', marginLeft: '8px', marginRight: '8px'}}>
                        <div className="clothes_fat" style={{borderRadius: '6px', width: '162px', height: '190px'}}>
                          <div className="image-container" style={{position: 'relative', borderRadius: '6px', zIndex: '200'}}>
                            <div>
                              <div style={{width: '162px', height: '190px', borderRadius: '6px', backgroundImage: `url(${data2.images[0]})`, backgroundPosition: 'center', borderRadius: '6px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex">
                          <div>
                            <p className='home_card_price'>{Number(data2.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}</p>
                            <p className='home_card_title hiided_text' title={data2.name}>{data2.name}</p>
                          </div>
                        </div>
                      </NavLink>
                    </Reveal>
                  </SwiperSlide>
                )) : null}
              </Swiper>
            </center>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h3 className='advantage_main_text_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Наше преимущество' : 'Bizning ustunligimiz'}</h3>

            <div className='d-flex justify-content-between flex-column'>
              <Reveal>
                <div style={{backgroundColor: '#F8F8F8', padding: '40px 25px', width: '280px', height: '259px'}} className='advantage_cards'>
                  <img src={blueVerifed} alt="blue verifed icon" />

                  <h3 className='advantage_theme_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Гарантия качества' : 'Sifat kafolati'}</h3>
                  <p className='advantage_text_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Качественные экологичные материалы` : `Yuqori sifatli ekologik toza materiallar`}</p>
                </div>
              </Reveal>

              <Reveal>
                <div style={{backgroundColor: '#F8F8F8', padding: '40px 25px', width: '280px', height: '259px', marginTop: '-50px'}} className='advantage_cards'>
                  <img src={blueTruck} alt="blue truck icon" />

                  <h3 className='advantage_theme_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Быстрая доставка' : 'Tez yetkazib berish'}</h3>
                  <p className='advantage_text_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Доставка по всему Узбекистану` : `O'zbekiston bo'ylab yetkazib berish`}</p>
                </div>
              </Reveal>

              <Reveal>
                <div style={{backgroundColor: '#F8F8F8', padding: '40px 25px', width: '280px', height: '259px', marginTop: '-50px'}} className='advantage_cards'>
                  <img src={blueBuds} alt="blue buds icon" />

                  <h3 className='advantage_theme_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Сервис' : 'Xizmat'}</h3>
                  <p className='advantage_text_mobile'>{localStorage.getItem('selectedLanguage') === 'ru' ? `Лёгкий процесс оплаты, обмена и возврата` : `Oson to'lov, almashtirish va qaytarish jarayoni`}</p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" style={{borderRadius: '24px'}}>
              <div className="modal-content" style={{borderRadius: '0px'}}>
                <div style={{padding: '0px'}} className="modal-body">
                  <div className="d-flex justify-content-end">
                    <button style={{position: 'absolute', zIndex: '1', top: '12px', right: '12px'}} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className='img_animation' style={{backgroundColor: '#F6F6F6', height: '100%', width: '100%'}}>
                    {dataBeck.images && dataBeck.images.length > 0 && (
                      <div id="carouselExampleIndicators" className="carousel slide">
                        <div className="carousel-indicators">
                          {dataBeck.images && dataBeck.images.map((image, index) => (
                            <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === currentImageIndex ? "active" : ""} aria-current={index === currentImageIndex ? "true" : "false"} aria-label={`Slide ${index + 1}`} onClick={() => handleIndicatorClick(index)}></button>
                          ))}
                        </div>
                        <div className="carousel-inner">
                          {dataBeck.images && dataBeck.images.map((image, index) => (
                            <div key={index} className={`carousel-item ${index === currentImageIndex ? "active" : ""}`}>
                              <div 
                                className='img_animation_img' 
                                data-bs-toggle="modal" 
                                data-bs-target="#exampleModal"
                                style={{backgroundImage: `url(${image})`, backgroundPosition: 'center', width: '100%', height: '382px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FooterMainMobile />
          <FooterBarMobile />
        </div>
      )}
    </>
  )
}

export default ProductShowMobile