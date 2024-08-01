import React, { useEffect, useLayoutEffect, useState } from 'react';
import HeaderMain from '../../components/header';
import './main.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import pencil from '../../layouts/icons/edit_product_basket.svg'
import trash from '../../layouts/icons/delete_product_basket.svg'
import pencil_uz from '../../layouts/icons/edit_text_uz.svg'
import trash_uz from '../../layouts/icons/delete_text_uz.svg'
import no_data from '../../layouts/images/no_trash.svg'
import AdvantageMain from '../../components/advantage';
import FooterMain from '../../components/footer';
import axios from 'axios';
import Placeholder from 'react-placeholder-loading';
import Reveal from '../../animation';

function Basket() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [allProduct, setAllProduct] = useState('');
  const [promoMessageColor, setPromoMessageColor] = useState('green');
  const [data, setData] = useState([]);
  const [coupon_price, setCoupon_price] = useState('');
  const [price, setPrice] = useState('');
  const [discount_price, setDiscount_price] = useState('');
  const [order_id, setOrder_id] = useState('');
  const [grant_total, setGrant_total] = useState('');
  const [grant_total2, setGrant_total2] = useState('');
  const token = localStorage.getItem('token');
  const [selectedColorId, setSelectedColorId] = useState('');
  const [selectedSizeId, setSelectedSizeId] = useState('');
  const [countHeader, setCountHeader] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorBorder, setErrorBorder] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    const storedCount = localStorage.getItem('counterValue');
    if (storedCount) {
      setCountHeader(Number(storedCount));
    }
  }, []);

  const decrementLocalStorageValue = (key) => {
    const storedValue = localStorage.getItem(key);
    const newValue = Math.max(0, Number(storedValue) - 1);

    if (newValue === 0) {
      localStorage.setItem(key, '0');
    } else {
      localStorage.setItem(key, newValue.toString());
    }

    return newValue;
  };

  const handleDecrementButtonClick = () => {
    const newCount = decrementLocalStorageValue('counterValue');
    setCountHeader(newCount);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = 'Корзина';
  }, []);

  function handleCountChange(id, change, maxQuantity, selectedColor, selectedSize) {
    setData((prevData) => {
      if (!maxQuantity) {
        maxQuantity = 9999;
      }
      let newGrantTotal = 0;
      let newDiscountPrice = 0;

      const updatedList = prevData.data.list.map((item) => {
        if (item.id === id && item.selected) {
          const newCount = item.quantity + change;
          const updatedCount = Math.min(Math.max(newCount, 1), maxQuantity);
          const updatedTotalPrice = item.price * updatedCount;

          const finalTotalPrice = item.discount_price
            ? updatedTotalPrice - item.discount_price
            : updatedTotalPrice;

          const newItem = {
            ...item,
            quantity: updatedCount,
            total_price: finalTotalPrice,
            selectedColor: selectedColor,
            selectedSize: selectedSize,
          };

          return newItem;
        }
        return item;
      });

      const updatedSelectedItems = updatedList.filter(item => item.selected);

      updatedList.forEach((item) => {
        newGrantTotal += item.total_price;
        newDiscountPrice += item.discount_price ? item.discount_price * item.quantity : 0;
      });

      const totalPriceArray = updatedList.map(item => item.total_price + (item.discount_price || 0));
      const totalPriceSum = totalPriceArray.reduce((accumulator, totalPrice) => accumulator + totalPrice, 0);

      setGrant_total(newGrantTotal);
      setDiscount_price(newDiscountPrice);
      setPrice(totalPriceSum);

      setSelectedItems(updatedSelectedItems);

      // Updating the allProduct count
      const newAllProductCount = updatedList.reduce((total, item) => total + item.quantity, 0);
      setAllProduct(newAllProductCount);

      return { ...prevData, data: { ...prevData.data, list: updatedList } };
    });
  }

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard')) || [];
    setTrashCardData(savedCards);
    calculateTotalPrice(savedCards);
  }, [selectedColorId, selectedSizeId]);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard')) || [];
    if (savedCards) {
      setTrashCardData(savedCards);
      calculateTotalPrice(savedCards);
    }
  }, []);

  useEffect(() => {
    if (isInitialRender) {
      if (data && data.data && data.data.list && data.data.list.length > 0) {
        setIsInitialRender(false); 
        handleSelectAll();
      }
    }
  }, [data]);

  function calculateTotalPrice(data) {
    if (!data || !data.length || data.length === 0) {
      return 0;
    }

    let total = 0;
    for (let i = 0; i < data.length; i++) {
      const price = typeof data[i].price === 'string' ? parseInt(data[i].price.replace(/\s/g, ''), 10) : 0;
      const count = data[i].count || 0;
      total += price * count;
    }

    if (promoCode === 'PROMO123') {
      const discountAmount = (total * discount) / 100;
      total -= discountAmount;
    }

    return total;
  }  

  const navigate = useNavigate();

  setTimeout(() => {
    setErrorBorder(false);
  }, 10000);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/order/get-basket`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      setIsLoading(false);
      if (response.data.status === false && response.data.message === "You do not have an order") {
        const savedCards = JSON.parse(localStorage.getItem('trashCard')) || [];
        setTrashCardData(savedCards);
        calculateTotalPrice(savedCards);
        toast.info('Sizda buyurtma (order) mavjud emas.');
      } else if (response.data.status === false) {
        const savedCards = JSON.parse(localStorage.getItem('trashCard')) || [];
        setTrashCardData(savedCards);
        calculateTotalPrice(savedCards);
      } else {
        setCoupon_price(response.data.data.coupon_price);
        localStorage.setItem('coupon_price', response.data.data.coupon_price);
        setOrder_id(response.data.data.id);
        localStorage.setItem('order_id', response.data.data.id);
        setGrant_total(response.data.data.grant_total);
        localStorage.setItem('grant_total', response.data.data.grant_total);
        setDiscount_price(response.data.data.discount_price);
        localStorage.setItem('discount_price', response.data.data.discount_price);
        setPrice(response.data.data.price);
        localStorage.setItem('price', response.data.data.price);
        setData(response.data);
        setSelectedColorId(response.data.data.list[0].color.id);
        setSelectedSizeId(response.data.data.list[0].size.id);
        setAllProduct(response.data.data.list.length);
        localStorage.setItem('basketData', JSON.stringify(response.data.data.list));
        console.log(response.data.data);
      }
    }).catch((error) => {
      setIsLoading(false);
      const savedCards = JSON.parse(localStorage.getItem('trashCard')) || [];
      setTrashCardData(savedCards);
      calculateTotalPrice(savedCards);
    });
  }, [token]);  

  async function saveOrder() {
    try {
      const selectedItemsData = selectedItems.map(item => ({
        order_detail_id: item.id,
        color_id: item.color.id,
        size_id: item.size.id,
        quantity: item.quantity
      }));

      const apiData = {
        data: selectedItemsData,
        order_id: data.data.id
      };

      if (apiData.data.length === 0) {
        toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Выберите хотя бы один элемент!' : 'Iltimos bitta bo`lsa ham maxsulot tanlang!');
        setErrorBorder(true);
        return;
      } else {
        setErrorBorder(false);
      }

      console.log(apiData);

      localStorage.setItem('order_id', data.data.id);
      localStorage.setItem('paymentDate', JSON.stringify({ price, coupon_price, discount_price, grant_total }));

      const response = await axios.post(`${process.env.REACT_APP_TWO}/order/connection/to_order`, apiData, {
        headers: {
          'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.status === true) {
        navigate('/checkout');
      } else {
        toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
      }
    } catch (error) {
      console.log(error);
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    }
  }

  const handleDeleteAddress = (id) => {
    const order_detail_id = id;
    axios
      .post(
        `${process.env.REACT_APP_TWO}/order/delete/order-detail`,
        { order_detail_id: order_detail_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        toast.success('Товар в корзине удален.');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        toast.error('Товар в корзине не был удален.');
      });
  };

  function applyPromoCode() {
    let promoMessage = '';
    let promoColor = 'green';

    axios.post(`${process.env.REACT_APP_TWO}/order/add-coupon`, {
        order_id: order_id,
        coupon_name: promoCode
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          lang: localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
        },
      }
    )
    .then((response) => {
      toast.success(`Введенный вами промокод ${promoCode} успешно введен.`);
      promoMessage = `Введенный вами промокод ${promoCode} успешно введен.`;
      setCoupon_price(response.data.data.coupon_price);
      setOrder_id(response.data.data.id);
      setGrant_total(response.data.data.grant_total);
      setDiscount_price(response.data.data.discount_price);
      setPrice(response.data.data.price);
      setPromoMessage(promoMessage);
      setPromoMessageColor(promoColor);
    })
    .catch((error) => {
      // toast.error(`Введенный вами промокод ${promoCode} не сработал.`);
      const russionText = `Введенный вами промокод <span style="color: #841d1d; font-weight: bold; font-family: 'Inter500';">${promoCode}</span> не сработал.`;
      const uzbekText = `Siz kiritgan <span style="color: #841d1d; font-weight: bold; font-family: 'Inter500';">${promoCode}</span> promo-kodi ishlamadi.`;
      promoMessage = localStorage.getItem('selectedLanguage') === 'ru' ? russionText : uzbekText;
      promoColor = 'red';
      setPromoMessage(promoMessage);
      setPromoMessageColor(promoColor);
      setCoupon_price(localStorage.getItem('coupon_price'));
      setOrder_id(localStorage.getItem('order_id'));
      setGrant_total(localStorage.getItem('grant_total'));
      setDiscount_price(localStorage.getItem('discount_price'));
      setPrice(localStorage.getItem('price'));
    });
  }

  const handleSelectAll = () => {
    setData((prevData) => {
      if (!prevData.data || !prevData.data.list) {
        return prevData;
      }

      const allSelected = prevData.data.list.every(item => item.selected);

      const updatedList = prevData.data.list.map((item) => {
        return {
          ...item,
          selected: !allSelected,
        };
      });

      const selectedItemsData = updatedList.filter(item => item.selected);
      setSelectedItems(selectedItemsData);
      setAllProduct(updatedList.length);
      const totalAmount = selectedItemsData.reduce((accumulator, item) => accumulator + item.total_price, 0);
      const totalPrice = selectedItemsData.reduce((accumulator, item) => accumulator + parseInt(item.price), 0);
      const totalDiscountPrice = selectedItemsData.reduce((accumulator, item) => accumulator + parseInt(item.discount_price), 0);

      setGrant_total(totalAmount);
      setPrice(totalPrice);
      setDiscount_price(totalDiscountPrice);
      calculateTotalPrice(selectedItemsData);

      return { ...prevData, data: { ...prevData.data, list: updatedList } };
    });
  };

  const handleSelectItem = (id) => {
    setData((prevData) => {
      if (!prevData.data || !prevData.data.list) {
        return prevData;
      }

      const updatedList = prevData.data.list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            selected: !item.selected,
          };
        }
        return item;
      });

      const selectedItemsData = updatedList.filter(item => item.selected);
      setSelectedItems(selectedItemsData);

      const totalAmount = selectedItemsData.reduce((accumulator, item) => accumulator + item.total_price, 0);
      const totalPrice = selectedItemsData.reduce((accumulator, item) => accumulator + parseInt(item.price), 0);
      const totalDiscountPrice = selectedItemsData.reduce((accumulator, item) => accumulator + parseInt(item.discount_price), 0);
      setAllProduct(selectedItemsData.length);
      setGrant_total(totalAmount);
      setPrice(totalPrice);
      setDiscount_price(totalDiscountPrice);
      calculateTotalPrice(selectedItemsData);

      return { ...prevData, data: { ...prevData.data, list: updatedList } };
    });

    setTrashCardData((prevTrashCardData) => {
      const updatedTrashCardData = prevTrashCardData.filter(item => item.id !== id);
      return updatedTrashCardData;
    });
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_TWO}/get-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            language: localStorage.getItem('selectedLanguage') || 'ru',
          },
        });
  
        if (response.data.status === true) {
          return;
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user_last_name');
          localStorage.removeItem('user_name');
          localStorage.removeItem('user_phone_number');
          localStorage.removeItem('grant_total');
          localStorage.removeItem('selectedCategory');
          localStorage.removeItem('currentProduct');
          localStorage.removeItem('selectedSubCategory');
          localStorage.removeItem('paymentDate');
          localStorage.removeItem('trueVerifed');
          localStorage.removeItem('basketData');
          localStorage.removeItem('trashCard');
          localStorage.removeItem('selectedCategoryId');
          localStorage.removeItem('basket');
          localStorage.removeItem('price');
          localStorage.removeItem('discount_price');
          localStorage.removeItem('user_image');
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user_last_name');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_phone_number');
        localStorage.removeItem('grant_total');
        localStorage.removeItem('selectedCategory');
        localStorage.removeItem('currentProduct');
        localStorage.removeItem('selectedSubCategory');
        localStorage.removeItem('paymentDate');
        localStorage.removeItem('trueVerifed');
        localStorage.removeItem('basketData');
        localStorage.removeItem('trashCard');
        localStorage.removeItem('selectedCategoryId');
        localStorage.removeItem('basket');
        localStorage.removeItem('price');
        localStorage.removeItem('discount_price');
        localStorage.removeItem('user_image');
      }
    };
  
    if (token) {
      checkUser();
    }
  }, [token]);

  return (
    <div>
      <ToastContainer />
      <HeaderMain trashCardData={trashCardData} />

      {isLoading ? (
        <div className="container" style={{ marginTop: '32px'  }}>
          <div className='basket_wrapper'>
            <div className="d-flex">
              <div style={{marginRight: '24px'}}>
                <Placeholder shape="rect" width={172} height={200} animation="wave" style={{ marginBottom: '20px' }}/>
              </div>

              <div style={{marginRight: '48px'}}>
                <div style={{marginBottom: '37px'}}>
                  <Placeholder shape="rect" width={190} height={58} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>

                <div className='d-flex' style={{marginBottom: '15px'}}>
                  <div style={{marginRight: '3px'}}>
                    <Placeholder shape="rect" width={83} height={19} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>

                  <div>
                    <Placeholder shape="rect" width={71} height={19} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>
                </div>

                <div className='d-flex' style={{marginBottom: '15px'}}>
                  <div style={{marginRight: '41px'}}>
                    <Placeholder shape="rect" width={43} height={19} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>

                  <div>
                    <Placeholder shape="circle"width={23} height={23} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>
                </div>

                <div className='d-flex'>
                  <div style={{marginRight: '18px'}}>
                    <Placeholder shape="rect" width={63} height={19} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>

                  <div>
                    <Placeholder shape="rect" width={20} height={20} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>
                </div>
              </div>

              <div style={{marginRight: '71px'}}>
                <div>
                  <Placeholder shape="rect" width={141} height={24} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>
              </div>

              <div style={{marginRight: '99px'}}>
                <div>
                  <Placeholder shape="rect" width={81} height={29} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>
              </div>

              <div style={{marginRight: '114px'}}>
                <div>
                  <Placeholder shape="rect" width={56} height={24} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>
              </div>

              <div>
                <div>
                  <Placeholder shape="rect" width={141} height={24} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>
              </div>
            </div>

            <div className="d-flex mt-4">
              <div style={{marginRight: '24px'}}>
                <Placeholder shape="rect" width={172} height={200} animation="wave" style={{ marginBottom: '20px' }}/>
              </div>

              <div style={{marginRight: '48px'}}>
                <div style={{marginBottom: '37px'}}>
                  <Placeholder shape="rect" width={190} height={58} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>

                <div className='d-flex' style={{marginBottom: '15px'}}>
                  <div style={{marginRight: '3px'}}>
                    <Placeholder shape="rect" width={83} height={19} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>

                  <div>
                    <Placeholder shape="rect" width={71} height={19} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>
                </div>

                <div className='d-flex' style={{marginBottom: '15px'}}>
                  <div style={{marginRight: '41px'}}>
                    <Placeholder shape="rect" width={43} height={19} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>

                  <div>
                    <Placeholder shape="circle"width={23} height={23} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>
                </div>

                <div className='d-flex'>
                  <div style={{marginRight: '18px'}}>
                    <Placeholder shape="rect" width={63} height={19} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>

                  <div>
                    <Placeholder shape="rect" width={20} height={20} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>
                </div>
              </div>

              <div style={{marginRight: '71px'}}>
                <div>
                  <Placeholder shape="rect" width={141} height={24} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>
              </div>

              <div style={{marginRight: '99px'}}>
                <div>
                  <Placeholder shape="rect" width={81} height={29} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>
              </div>

              <div style={{marginRight: '114px'}}>
                <div>
                  <Placeholder shape="rect" width={56} height={24} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>
              </div>

              <div>
                <div>
                  <Placeholder shape="rect" width={141} height={24} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>
              </div>
            </div>

            <div className="d-flex mt-4">
              <div style={{marginRight: '24px'}}>
                <Placeholder shape="rect" width={172} height={200} animation="wave" style={{ marginBottom: '20px' }}/>
              </div>

              <div style={{marginRight: '48px'}}>
                <div style={{marginBottom: '37px'}}>
                  <Placeholder shape="rect" width={190} height={58} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>

                <div className='d-flex' style={{marginBottom: '15px'}}>
                  <div style={{marginRight: '3px'}}>
                    <Placeholder shape="rect" width={83} height={19} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>

                  <div>
                    <Placeholder shape="rect" width={71} height={19} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>
                </div>

                <div className='d-flex' style={{marginBottom: '15px'}}>
                  <div style={{marginRight: '41px'}}>
                    <Placeholder shape="rect" width={43} height={19} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>

                  <div>
                    <Placeholder shape="circle"width={23} height={23} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>
                </div>

                <div className='d-flex'>
                  <div style={{marginRight: '18px'}}>
                    <Placeholder shape="rect" width={63} height={19} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>

                  <div>
                    <Placeholder shape="rect" width={20} height={20} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>
                </div>
              </div>

              <div style={{marginRight: '71px'}}>
                <div>
                  <Placeholder shape="rect" width={141} height={24} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>
              </div>

              <div style={{marginRight: '99px'}}>
                <div>
                  <Placeholder shape="rect" width={81} height={29} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>
              </div>

              <div style={{marginRight: '114px'}}>
                <div>
                  <Placeholder shape="rect" width={56} height={24} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>
              </div>

              <div>
                <div>
                  <Placeholder shape="rect" width={141} height={24} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>
              </div>
            </div>

            <div className="d-flex mt-4">
              <div style={{marginRight: '24px'}}>
                <Placeholder shape="rect" width={172} height={200} animation="wave" style={{ marginBottom: '20px' }}/>
              </div>

              <div style={{marginRight: '48px'}}>
                <div style={{marginBottom: '37px'}}>
                  <Placeholder shape="rect" width={190} height={58} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>

                <div className='d-flex' style={{marginBottom: '15px'}}>
                  <div style={{marginRight: '3px'}}>
                    <Placeholder shape="rect" width={83} height={19} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>

                  <div>
                    <Placeholder shape="rect" width={71} height={19} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>
                </div>

                <div className='d-flex' style={{marginBottom: '15px'}}>
                  <div style={{marginRight: '41px'}}>
                    <Placeholder shape="rect" width={43} height={19} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>

                  <div>
                    <Placeholder shape="circle"width={23} height={23} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>
                </div>

                <div className='d-flex'>
                  <div style={{marginRight: '18px'}}>
                    <Placeholder shape="rect" width={63} height={19} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>

                  <div>
                    <Placeholder shape="rect" width={20} height={20} animation="wave" style={{ marginBottom: '20px' }}/>
                  </div>
                </div>
              </div>

              <div style={{marginRight: '71px'}}>
                <div>
                  <Placeholder shape="rect" width={141} height={24} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>
              </div>

              <div style={{marginRight: '99px'}}>
                <div>
                  <Placeholder shape="rect" width={81} height={29} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>
              </div>

              <div style={{marginRight: '114px'}}>
                <div>
                  <Placeholder shape="rect" width={56} height={24} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>
              </div>

              <div>
                <div>
                  <Placeholder shape="rect" width={141} height={24} animation="wave" style={{ marginBottom: '20px' }}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container" style={{ marginTop: '32px' }}>
          <div>
            {!data.data || data.data.list.length === 0 ? (
              <Reveal>
                <div className='basket_wrapper' style={{height: '600px', paddingBottom: '20px'}}>
                  <h3 style={{marginLeft: '24px'}} className='basket_big_title mt-3'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Корзина' : 'Savatingiz'}</h3>
                  <center style={{marginTop: '115px'}}>
                    <img className='mt-3' src={no_data} alt="no_data" />
                  </center>
                </div>
              </Reveal>
            ) : (
              <>
                <div className='basket_wrapper' style={{paddingBottom: '90px'}}>
                  <div className='mt-3 d-flex justify-content-between'>
                    <h3 style={{marginLeft: '24px'}} className='basket_big_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Корзина' : 'Savatingiz'}</h3>

                    <div className='d-flex justify-content-between' style={{width: '571px', marginRight: '74px'}}>
                      <p className='basket_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Цена' : 'Narxi'}</p>
                      <p className='basket_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Количество' : 'Miqdori'}</p>
                      <p className='basket_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Скидка' : 'Chegirma'}</p>
                      <p className='basket_item'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Сумма' : 'Umumiy narx'}</p>
                    </div>
                  </div>

                  <hr />

                  <label style={{ cursor: 'pointer', marginLeft: '30px', marginTop: '-20px' }}>
                    <input 
                      style={{ position: 'relative', top: '20px', left: '-27px', border: errorBorder === true ? '1px solid red' : 'none' }} 
                      type="checkbox"
                      checked={data.data && data.data.list.length > 0 && data.data.list.every(item => item.selected)} 
                      onChange={handleSelectAll}  
                    />
                    <p className='basket_check'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Выбрать все' : 'Hammasini tanlang'}</p>
                  </label>

                  <div style={{marginTop: '-20px'}}>
                    <div>
                      {data.data && data.data.list.map((item) => {
                        return (
                          <div key={item.id}>
                            <Reveal>
                              <div className='d-flex basket_card'>
                                <div className='d-flex flex-column align-items-center'>
                                  <NavLink to={item.relation_type === 'warehouse_product' ? `/show/detail/${item.relation_id}/${item.name}` : `/yourDesign`} style={{ textDecoration: 'none' }}>
                                    <div className='basket_card_img' style={{backgroundImage: `url(${item.images[0]})`, backgroundColor: item.relation_type === 'product' ? '#ffffff' : '#E9E9E9', backgroundSize: item.relation_type === 'product' ? 'contain' : 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}></div>
                                  </NavLink>
                                  <input style={{ position: 'relative', top: '13px', left: '-77px', marginBottom: '-15px' }} type="checkbox" checked={item.selected} onChange={() => handleSelectItem(item.id)} />
                                </div>

                                <div>
                                  <div className="basket_info1">
                                    <NavLink to={item.relation_type === 'warehouse_product' ? `/show/detail/${item.relation_id}/${item.name}` : `/yourDesign`} style={{ textDecoration: 'none' }}>
                                      <p className='basket_card_name hiided_text'>{item.name ? item.name : `${localStorage.getItem('selectedLanguage') === 'ru' ? 'Название отсутствует или не найден' : `Sarlavha yo'q yoki topilmadi`}`}</p>
                                    </NavLink>

                                    <NavLink to={item.relation_type === 'warehouse_product' ? `/show/detail/${item.relation_id}/${item.name}` : `/yourDesign`} style={{ textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                      <p className='basket_card_price'>{Number(item.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}</p>
                                    </NavLink>

                                    <div className='d-flex'>
                                      <button style={{border: 'none'}} className='basket_card_plus_minus' onClick={() => handleCountChange(item.id, -1, item.max_quantity)}>
                                        -
                                      </button>

                                      <div>
                                        <div className='basket_card_count'>{item.quantity}</div>
                                      </div>

                                      <button style={{border: 'none'}} className='basket_card_plus_minus' onClick={() => handleCountChange(item.id, 1, item.max_quantity)}>
                                        +
                                      </button>
                                    </div>

                                    <NavLink to={item.relation_type === 'warehouse_product' ? `/show/detail/${item.relation_id}/${item.name}` : `/yourDesign`} style={{ textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                      <p className='basket_card_price_sale' style={{left: item.discount_price ? '0px' : '40px'}}>{item.discount_price ? `${Number(item.discount_price).toLocaleString('ru-RU')} ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}` : `0 ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}`}</p>
                                    </NavLink>

                                    <NavLink to={item.relation_type === 'warehouse_product' ? `/show/detail/${item.relation_id}/${item.name}` : `/yourDesign`} style={{ textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                      <p className='basket_card_price' id='all_price'>{item.total_price ? `${Number(item.total_price).toLocaleString('ru-RU')}` : '0'} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}</p>
                                    </NavLink>
                                  </div>

                                  <div className='basket_size_fat' style={{marginTop: item.company_name ? '-55px' : '-65px'}}>
                                    <div style={{display: item.company_name ? 'flex' : 'none'}}>
                                      <p className='basket_card_size'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Продавец' : 'Sotuvchi'}:</p>
                                      <p className='basket_card_size'>{item.company_name ? item.company_name : `${localStorage.getItem('selectedLanguage') === 'ru' ? 'Название не найден' : `Sarlavha topilmadi`}`}</p>
                                    </div>

                                    <div className='d-flex'>
                                      <p className='basket_card_size'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Цвет' : 'Rang'}:</p>
                                      <div className="d-flex align-items-center" style={{marginTop: '-10px', marginLeft: '39px'}}>
                                        <div key={item.color.id} className={`color_border_basket me-2 ${item.color}`} style={{ borderColor: '#E6E6E6', cursor: 'pointer' }}>
                                          <div className="color_basket" style={{ backgroundColor: item.color.code }}></div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className='d-flex'>
                                      <p className='basket_card_size'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Размер' : `O'lchami`}:</p>
                                      <div style={{ border: 'none', outline: 'none', background: 'transparent', marginTop: '6px', marginLeft: '22px' }}>
                                        {item.size.name}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <hr />

                              <div className='d-flex basket_size_fat2'>
                                <div style={{display: item.relation_type === 'warehouse_product' ? 'none' : 'flex'}}>
                                  <NavLink to={'/yourDesign'}>
                                    {
                                      localStorage.getItem('selectedLanguage') === 'ru' ? <img src={pencil} alt={pencil} /> : <img src={pencil_uz} alt={pencil_uz} />
                                    }
                                  </NavLink>
                                </div>

                                <div className='d-flex' style={{marginLeft: item.relation_type === 'warehouse_product' ? '148px' : '48px'}}>
                                  <NavLink onClick={() => {handleDeleteAddress(item.id); handleDecrementButtonClick()}} to={'#'}>
                                    {localStorage.getItem('selectedLanguage') === 'ru' ? <img src={trash} alt={trash} /> : <img src={trash_uz} alt={trash_uz} />}
                                  </NavLink>
                                </div>
                              </div>
                            </Reveal>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <Reveal>
            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
              <NavLink to={'/'} style={{minWidth: '323px', textDecoration: 'none'}} className='basket_promo_btn_price'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M2 10.9961C2.00487 11.5226 2.21684 12.0259 2.59 12.3971L6.88 16.7002C7.06736 16.8866 7.32082 16.9912 7.585 16.9912C7.84919 16.9912 8.10264 16.8866 8.29 16.7002C8.38373 16.6072 8.45812 16.4965 8.50889 16.3746C8.55966 16.2526 8.5858 16.1218 8.5858 15.9897C8.5858 15.8576 8.55966 15.7268 8.50889 15.6048C8.45812 15.4829 8.38373 15.3722 8.29 15.2792L5 11.9968L21 11.9968C21.2652 11.9968 21.5196 11.8914 21.7071 11.7037C21.8946 11.516 22 11.2615 22 10.9961C22 10.7307 21.8946 10.4762 21.7071 10.2885C21.5196 10.1008 21.2652 9.99538 21 9.99538L5 9.99538L8.29 6.70301C8.4783 6.51589 8.58462 6.26159 8.58556 5.99603C8.58649 5.73048 8.48198 5.47543 8.295 5.28699C8.10802 5.09855 7.8539 4.99216 7.58854 4.99122C7.32317 4.99028 7.06831 5.09487 6.88 5.28198L2.59 9.58508C2.21441 9.9587 2.00223 10.4661 2 10.9961Z" fill="white"/>
                </svg>
                {localStorage.getItem('selectedLanguage') === 'ru' ? 'Продолжить покупки' : 'Xarid qilishda davom etish'}
              </NavLink>
            </div>
          </Reveal>

            {!data.data || data.data.list.length === 0 ? (
              <></>
            ) : (
              <Reveal>
                <div className="basket_wrapper" style={{marginTop: '36px', paddingBottom: '30px'}}>
                  <div className="d-flex justify-content-between">
                    <div style={{width: '400px'}}>
                      <h3 className='basket_promo_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Промокод' : 'Promokod'}</h3>
                      <p className='basket_promo_text' style={{width: '400px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Введите промокод чтобы активировать скидку' : 'Chegirmani faollashtirish uchun reklama kodini kiriting'}</p>
                      <input className='basket_promo' style={{width: '400px'}} type="text" placeholder={localStorage.getItem('selectedLanguage') === 'ru' ? 'Введите промокод' : 'Kupon kodini kiriting'} value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                      {/* <p style={{ color: promoMessageColor }} className='basket_promo_text'>{promoMessage}</p> */}
                      <p
                        style={{ color: promoMessageColor }}
                        className='basket_promo_text'
                        dangerouslySetInnerHTML={{ __html: promoMessage }}
                      />
                      <p className='basket_promo_text' style={{marginTop: '32px', width: '400px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? '*Вы можете использовать только один промокод в одном заказе' : '*Har bir buyurtma uchun faqat bitta promokoddan foydalanishingiz mumkin'}</p>
                      <center style={{marginTop: '27px', width: '100%'}}>
                        <button style={{width: '100%'}} onClick={applyPromoCode} className='basket_promo_btn'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Применить' : `Qo'llash`}</button>
                      </center>
                    </div>

                    <div style={{width: '540px'}}>
                      <div className="basket_total" style={{width: '540px'}}>
                        <div>
                          {/* <p className='basket_total_title' style={{marginBottom: '28px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Итог товаров' : 'Jami tovarlar'} ({allProduct})</p> */}
                          <p className='basket_total_title' style={{marginBottom: '28px'}}>
                            {localStorage.getItem('selectedLanguage') === 'ru' ? 'Итог товаров' : 'Jami tovarlar'} ({allProduct})
                          </p>
                          <p className='basket_total_title' style={{marginBottom: '28px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Промокоды' : 'Promo kodlar'}</p>
                          <p className='basket_total_title' style={{marginBottom: '28px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Скидка' : 'Chegirmalar'}</p>
                          <p className='basket_total_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Итог' : 'Jami'}</p>
                        </div>
                        <div style={{textAlign: 'right'}}>
                          <p className='basket_total_price' style={{marginBottom: '28px'}}>{price ? `${Number(price).toLocaleString('ru-RU')} ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}` : `0 ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}`}</p>
                          <p className='basket_total_price' style={{marginBottom: '28px'}}>{coupon_price ? `${Number(coupon_price).toLocaleString('ru-RU')} ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}` : `0 ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}`}</p>
                          <p className='basket_total_price' style={{marginBottom: '28px'}}>{discount_price ? `${Number(discount_price).toLocaleString('ru-RU')} ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}` : `0 ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}`}</p>
                          <p className='basket_total_price'>{grant_total ? `${Number(localStorage.getItem('grant_total')).toLocaleString('ru-RU')} ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}` : `0 ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}`}</p>
                        </div>
                      </div>

                      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <button className='basket_promo_btn_price' onClick={() => {saveOrder();}}>
                          {localStorage.getItem('selectedLanguage') === 'ru' ? 'Перейти к оформлению ' : 'Rasmiylashtirishga o`tish'}
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M22 13.0039C21.9951 12.4774 21.7832 11.9741 21.41 11.6029L17.12 7.29979C16.9326 7.11341 16.6792 7.00879 16.415 7.00879C16.1508 7.00879 15.8974 7.11341 15.71 7.29979C15.6163 7.39282 15.5419 7.5035 15.4911 7.62545C15.4403 7.7474 15.4142 7.8782 15.4142 8.0103C15.4142 8.14241 15.4403 8.27321 15.4911 8.39516C15.5419 8.5171 15.6163 8.62778 15.71 8.72081L19 12.0032H3C2.73478 12.0032 2.48043 12.1086 2.29289 12.2963C2.10536 12.484 2 12.7385 2 13.0039C2 13.2693 2.10536 13.5238 2.29289 13.7115C2.48043 13.8992 2.73478 14.0046 3 14.0046H19L15.71 17.297C15.5217 17.4841 15.4154 17.7384 15.4144 18.004C15.4135 18.2695 15.518 18.5246 15.705 18.713C15.892 18.9015 16.1461 19.0078 16.4115 19.0088C16.6768 19.0097 16.9317 18.9051 17.12 18.718L21.41 14.4149C21.7856 14.0413 21.9978 13.5339 22 13.0039Z" fill="white"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}
        </div>
      )}

      <AdvantageMain />
      <FooterMain />
    </div>
  );
}

export default Basket;