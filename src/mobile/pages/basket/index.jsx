import React, { useEffect, useState } from 'react'
import HeaderMainMobile from '../../components/header'
import FooterMainMobile from '../../components/footer'
import FooterBarMobile from '../../components/footer bar'
import pencil from '../../layouts/icons/edit_product_basket.svg'
import trash from '../../layouts/icons/delete_product_basket.svg'
import no_basket from '../../layouts/images/no_trash.svg'
import axios from 'axios';
import './main.css';
import Reveal from '../../animation'
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom'

function BasketMobile() {
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
  const [colorOptions, setColorOptions] = useState({});
  const [sizeOptions, setSizeOptions] = useState({});
  const token = localStorage.getItem('token');
  const [selectedColorId, setSelectedColorId] = useState('');
  const [selectedSizeId, setSelectedSizeId] = useState('');
  const [countHeader, setCountHeader] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingModal, setIsLoadingModal] = useState(true);
  const [errorBorder, setErrorBorder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    const basketData = localStorage.getItem('basketData')
    setSelectedItems(JSON.parse(basketData));
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

      return { ...prevData, data: { ...prevData.data, list: updatedList } };
    });
  }, [])

  function calculateTotalPrice(data) {
    if (!data || !data.length || data.length === 0) {
      return 0;
    }
  
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      const price = parseInt(data[i].price.replace(/\s/g, ''), 10);
      const count = data[i].count;
      total += price * count;
    }
  
    if (promoCode === 'PROMO123') {
      const discountAmount = (total * discount) / 100;
      total -= discountAmount;
    }
  
    return total;
  }

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
        // color_id: selectedColorId !== '' ? selectedColorId : colorOptions,
        // size_id: selectedSizeId !== '' ? selectedSizeId : sizeOptions,
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
        localStorage.setItem('trueVerifed', true);
        navigate('/mobile/checkout');
        // window.location.href = '/#/checkout';
      } else {
        toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
      }
    } catch (error) {
      console.log(error);
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    }
  }

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
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
      toast.error(`Введенный вами промокод ${promoCode} не сработал.`);
      promoMessage = `Введенный вами промокод ${promoCode} не сработал.`;
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
        alert('Товар в корзине удален.');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        alert('Товар в корзине не был удален.');
      });
  };  

  async function saveOrder() {
    try {
      const selectedItemsData = selectedItems.map(item => ({
        order_detail_id: item.id,
        color_id: selectedColorId !== '' ? selectedColorId : colorOptions,
        size_id: selectedSizeId !== '' ? selectedSizeId : sizeOptions,
        quantity: item.quantity
      }));

      const apiData = {
        data: selectedItemsData,
        order_id: data.data.id
      };

      // console.log('apiData:', apiData);

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
        navigate('/mobile/checkout');
        // window.location.href = '/#/checkout';
      } else {
        toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
      }
    } catch (error) {
      console.log(error);
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    }
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
      
      // console.log(selectedItemsData.map(item => item.discount_price));

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

  return (
    <div>
      <HeaderMainMobile />

      <center style={{padding: '16px'}}>
        <div style={{textAlign: 'left', width: '100%', padding: '12px', marginTop: '12px', backgroundColor: '#FFFFFF'}}>
          <Reveal>
            <h3 className='basket_name_mobile_title'>Корзина</h3>
          </Reveal>

          {!data.data || data.data.list.length === 0 ? (
            null
          ) : (
            <label style={{position: 'absolute', right: '40px', top: '120px'}}>
              <p style={{position: 'relative', right: '23px', top: '0px'}} className='basket_name_mobile_select_all'>Выбрать все</p>
              <input type="checkbox" name="" id="" style={{ position: 'absolute', top: '0px', right: '0px', border: errorBorder === true ? '1px solid red' : 'none' }} checked={data.data && data.data.list.length > 0 && data.data.list.every(item => item.selected)} onChange={handleSelectAll} />
            </label>
          )}

          {!data.data || data.data.list.length === 0 ? (
            <Reveal>
              <center>
                <img style={{marginTop: '160px', marginBottom: '334px'}} src={no_basket} alt="no_basket" />
              </center>
            </Reveal>
          ) : (
            <>
              {data.data && data.data.list.map((item) => {
                return (
                  <Reveal>
                    <input style={{position: 'absolute', right: '40px'}} checked={item.selected} onChange={() => handleSelectItem(item.id)} type="checkbox" name="" id="" />
                    <div key={item.id} style={{marginBottom: '12px'}}>
                      <div className='d-flex'>
                        <div>
                          <div style={{width: '130px', height: '180px', backgroundColor: '#F6F6F6', backgroundImage: `url(${item.images[0]})`, borderRadius: '8px', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}></div>
                        </div>

                        <div style={{display: 'flex', width: '23.66504854368932vh', flexDirection: 'column', justifyContent: 'space-between', marginLeft: '12px'}}>
                          <p className='basket_name_mobile'>{item.name}</p>
                          <div className="d-flex">
                            <div className='d-flex' style={{marginTop: '-44px'}}>
                              <div>
                                <p style={{marginBottom: '10px', marginTop: '10px'}} className='basket_name_tite'>Количество: <span className='order_name_name ms-1' style={{fontFamily: 'Inter500', color: '#1A1A1A', fontSize: '13px'}}>{item.quantity}</span></p>
                                <p style={{marginBottom: '10px'}} className='basket_name_tite'>Размер: <span className='order_name_name ms-1' style={{color: '#1A1A1A', fontSize: '13px'}}>{item.warehouse && item.warehouse.size && item.warehouse.size.name ? item.warehouse.size.name : item.size.name}</span></p>
                                <p style={{marginBottom: '0'}} className='basket_name_tite d-flex'>Цвет: <div style={{ backgroundColor: item.warehouse && item.warehouse.color && item.warehouse.color.code ? item.warehouse.color.code : item.color.code, width: '16px', height: '16px' }} className='order_name_color ms-1'></div></p>
                              </div>
                            </div>
                          </div>
                          <p style={{color: '#18356D', fontFamily: 'Inter400', marginBottom: '0', position: 'relative', top: '-11px'}} className='order_price'>{Number(item.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm` : `so'm`}</p>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <div onClick={() => {handleDeleteAddress(item.id)}}>
                        <img src={trash} alt="trash" />
                      </div>
                      <div style={{display: item.relation_type === 'warehouse_product' ? 'none' : 'flex'}}>
                        <img src={pencil} alt="pencil" />
                      </div>
                    </div>

                    <hr style={{marginTop: '20px', marginBottom: '20px'}} />
                  </Reveal>
                );
              })}
            </>
          )}
        </div>

        <div style={{textAlign: 'left'}}>
          {!data.data || data.data.list.length === 0 ? (
            <></>
          ) : (
            <Reveal>
              <div style={{width: '100%', marginTop: '24px', backgroundColor: '#fff', padding: '16px'}}>
                <div className="basket_total" style={{width: '100%', padding: '16px 12px', paddingBottom: '0px', height: 'auto'}}>
                  <div>
                    <p className='basket_total_title' style={{marginBottom: '28px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Итог товаров' : 'Jami tovarlar'} ({allProduct})</p>
                    <p className='basket_total_title' style={{marginBottom: '28px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Промокоды' : 'Promo kodlar'}</p>
                    <p className='basket_total_title' style={{marginBottom: '28px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Скидка' : 'Chegirmalar'}</p>
                    <p className='basket_total_title_all'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Итого' : 'Jami'}</p>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <p className='basket_total_price' style={{marginBottom: '28px'}}>{price ? `${Number(price).toLocaleString('ru-RU')} ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}` : `0 ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}`}</p>
                    <p className='basket_total_price' style={{marginBottom: '28px'}}>{coupon_price ? `${Number(coupon_price).toLocaleString('ru-RU')} ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}` : `0 ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}`}</p>
                    <p className='basket_total_price' style={{marginBottom: '28px'}}>{discount_price ? `${Number(discount_price).toLocaleString('ru-RU')} ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}` : `0 ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}`}</p>
                    <p className='basket_total_title_all'>{grant_total ? `${Number(grant_total).toLocaleString('ru-RU')} ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}` : `0 ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}`}</p>
                  </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <button style={{width: '100%', padding: '16px 21px'}} className='basket_promo_btn_price' onClick={() => {saveOrder();}}>
                    {localStorage.getItem('selectedLanguage') === 'ru' ? 'Перейти к оформлению ' : 'Rasmiylashtirishga o`tish'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M22 13.0039C21.9951 12.4774 21.7832 11.9741 21.41 11.6029L17.12 7.29979C16.9326 7.11341 16.6792 7.00879 16.415 7.00879C16.1508 7.00879 15.8974 7.11341 15.71 7.29979C15.6163 7.39282 15.5419 7.5035 15.4911 7.62545C15.4403 7.7474 15.4142 7.8782 15.4142 8.0103C15.4142 8.14241 15.4403 8.27321 15.4911 8.39516C15.5419 8.5171 15.6163 8.62778 15.71 8.72081L19 12.0032H3C2.73478 12.0032 2.48043 12.1086 2.29289 12.2963C2.10536 12.484 2 12.7385 2 13.0039C2 13.2693 2.10536 13.5238 2.29289 13.7115C2.48043 13.8992 2.73478 14.0046 3 14.0046H19L15.71 17.297C15.5217 17.4841 15.4154 17.7384 15.4144 18.004C15.4135 18.2695 15.518 18.5246 15.705 18.713C15.892 18.9015 16.1461 19.0078 16.4115 19.0088C16.6768 19.0097 16.9317 18.9051 17.12 18.718L21.41 14.4149C21.7856 14.0413 21.9978 13.5339 22 13.0039Z" fill="white"/>
                    </svg>
                  </button>
                </div>
              </div>
            </Reveal>
          )}

          {!data.data || data.data.list.length === 0 ? (
            <></>
          ) : (
            <Reveal>
              <div className="basket_wrapper" style={{marginTop: '20px', padding: '16px'}}>
                <div className="d-flex justify-content-between">
                  <div style={{width: '100%'}}>
                    <h3 className='basket_promo_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Промокод' : 'Promokod'}</h3>
                    <p className='basket_promo_text' style={{width: '100%'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Введите промокод чтобы активировать скидку' : 'Chegirmani faollashtirish uchun reklama kodini kiriting'}</p>
                    <input className='basket_promo' style={{width: '100%'}} type="text" placeholder={localStorage.getItem('selectedLanguage') === 'ru' ? 'Введите промокод' : 'Kupon kodini kiriting'} value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                    <p style={{ color: promoMessageColor }} className='basket_promo_text'>{promoMessage}</p>
                    <p className='basket_promo_text' style={{marginTop: '32px', width: '100%'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? '*Вы можете использовать только один промокод в одном заказе' : '*Har bir buyurtma uchun faqat bitta promokoddan foydalanishingiz mumkin'}</p>
                    <center style={{marginTop: '27px', width: '100%'}}>
                      <button style={{width: '100%'}} onClick={applyPromoCode} className='basket_promo_btn'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Применить' : `Qo'llash`}</button>
                    </center>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          <center>
            <div className='center'>
              <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                <NavLink to={'/mobile'} style={{width: '100%', marginTop: '32px', marginBottom: '32px', textDecoration: 'none'}} className='basket_promo_btn_price'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M2 10.9961C2.00487 11.5226 2.21684 12.0259 2.59 12.3971L6.88 16.7002C7.06736 16.8866 7.32082 16.9912 7.585 16.9912C7.84919 16.9912 8.10264 16.8866 8.29 16.7002C8.38373 16.6072 8.45812 16.4965 8.50889 16.3746C8.55966 16.2526 8.5858 16.1218 8.5858 15.9897C8.5858 15.8576 8.55966 15.7268 8.50889 15.6048C8.45812 15.4829 8.38373 15.3722 8.29 15.2792L5 11.9968L21 11.9968C21.2652 11.9968 21.5196 11.8914 21.7071 11.7037C21.8946 11.516 22 11.2615 22 10.9961C22 10.7307 21.8946 10.4762 21.7071 10.2885C21.5196 10.1008 21.2652 9.99538 21 9.99538L5 9.99538L8.29 6.70301C8.4783 6.51589 8.58462 6.26159 8.58556 5.99603C8.58649 5.73048 8.48198 5.47543 8.295 5.28699C8.10802 5.09855 7.8539 4.99216 7.58854 4.99122C7.32317 4.99028 7.06831 5.09487 6.88 5.28198L2.59 9.58508C2.21441 9.9587 2.00223 10.4661 2 10.9961Z" fill="white"/>
                  </svg>
                  {localStorage.getItem('selectedLanguage') === 'ru' ? 'Продолжить покупки' : 'Xarid qilishda davom etish'}
                </NavLink>
              </div>
            </div>
          </center>
        </div>
      </center>

      <FooterMainMobile />
      <FooterBarMobile />
    </div>
  )
}

export default BasketMobile