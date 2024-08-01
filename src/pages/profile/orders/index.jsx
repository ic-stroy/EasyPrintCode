import React, { useEffect, useLayoutEffect, useState } from 'react'
import HeaderMain from '../../../components/header'
import AdvantageMain from '../../../components/advantage'
import FooterMain from '../../../components/footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../main.css';
import ProfileHeader from '../../../components/profile_header';
import no_addres from '../../../layouts/images/no_order.svg';
import Reveal from '../../../animation';
import './main.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfileOrders() {
  const [trashCardData, setTrashCardData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    document.title = 'Мои заказы'
  }, []);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('trashCard'));
    if (savedCards) {
      setTrashCardData(savedCards);
    }
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/order/get-my-orders`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      setOrders(response.data);
      console.log(response.data);
    }).catch((error) => {
      toast.error(error.response.data.message);
      console.log(error);
    });    
  }, []);

  const handleShowOrder = (id) => {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
      const button = item.querySelector('.accordion-button');
      const collapseId = button.getAttribute('data-bs-target').slice(1); 

      if (collapseId !== `flush-collapseOne${id}`) {
        const collapse = document.getElementById(collapseId);
        if (collapse.classList.contains('show')) {
          collapse.classList.remove('show');
        }
      }
    });

    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
        'Accept': 'application/json',
      },
    };
  
    axios.get(`${process.env.REACT_APP_TWO}/order/get-order-detail-by-order-id?id=${id}`, requestOptions)
      .then((response) => {
        setShow(response.data.data);
      })
      .catch((error) => {
        toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
      });
  };

  return (
    <>
      <HeaderMain trashCardData={trashCardData} />
      <ToastContainer />

      <div className="container mt-5 center">
        <div className="d-flex justify-content-between" style={{width: '1200px'}}>
          <ProfileHeader />

          <div className='info_profile'>
            <h3 className='user_name'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Мои заказы' : `Mening buyurtmalarim`}</h3>

            {orders.status === true ? (
              <div>
                <div>
                  {orders.data ? orders.data.map((order, index) => (
                    <div key={index} className="order_profile_fat">
                      <Reveal>
                        <h3 className='order_profile_title'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Номер заказа' : `Buyurtma raqami`} {order.code ? order.code : '12345678'}</h3>

                        <hr style={{ margin: '0' }} />

                        <div style={{ padding: '24px 32px', display: 'flex', alignItems: 'center' }}>
                          <div>
                            <p className='order_profile_opacity_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Статус:' : `Holat:`}</p>
                            <p className='order_profile_opacity_text' style={{fontSize: localStorage.getItem('selectedLanguage') === 'ru' ? '16px' : '13px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Дата заказа:' : `Buyurtma sanasi:`}</p>
                            <p className='order_profile_opacity_text' style={{fontSize: localStorage.getItem('selectedLanguage') === 'ru' ? '16px' : '13px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Дата доставки:' : `Yetkazib berish sanasi:`}</p>
                            <p className='order_profile_opacity_text' style={{fontSize: localStorage.getItem('selectedLanguage') === 'ru' ? '16px' : '13px'}}>{order.address_type === 'deliver' ? localStorage.getItem('selectedLanguage') === 'ru' ? 'Адрес доставки:' : `Yetkazib berish manzili:` : localStorage.getItem('selectedLanguage') === 'ru' ? 'Пункт самовывоза:' : `Qabul qilish punkti:`}</p>
                            <p className='order_profile_opacity_text' style={{fontSize: localStorage.getItem('selectedLanguage') === 'ru' ? '16px' : '13px'}}>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Время доставки' : `Yetkazib berish vaqti`}</p>
                            <p className='order_profile_opacity_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Сумма заказа:' : `Buyurtma narxi:`}</p>
                          </div>

                          <div style={{ marginLeft: '40px' }}>
                            <div className="d-flex">
                              <button className='btn_order_profile hidden_three_dots' 
                                style={{
                                  position: 'relative', 
                                  top: '-10px', 
                                  background: 
                                    order.status === 'Заказ принят' ? '#D8E5FE' : 
                                    order.status === 'Выполняется' ? '#D8E5FE' : 
                                    order.status === 'Доставляется' ? '#C9DA8F' : 
                                    order.status === 'Готов к выдаче' ? '#C9DA8F' : 
                                    order.status === 'Принят получателем' ? '#E6E6E6' : 
                                    order.status === 'Отменен' ? '#FFE7D6' :
                                    order.status === 'Buyurtma yaraldi' ? '#D8E5FE' : 
                                    order.status === 'Yasalmoqda' ? '#D8E5FE' : 
                                    order.status === 'Yetkazilmoqda' ? '#C9DA8F' : 
                                    order.status === 'Olib ketishga tayyor' ? '#C9DA8F' : 
                                    order.status === 'Xaridorga berildi' ? '#E6E6E6' : 
                                    order.status === 'Bekor qilingan' ? '#FFE7D6' : '#D8E5FE',
                                  color: 
                                    order.status === 'Заказ принят' ? '#3064CC' : 
                                    order.status === 'Выполняется' ? '#3064CC' : 
                                    order.status === 'Доставляется' ? '#000000' : 
                                    order.status === 'Готов к выдаче' ? '#000000' : 
                                    order.status === 'Принят получателем' ? '#333333' : 
                                    order.status === 'Отменен' ? '#FF4A32' :

                                    order.status === 'Buyurtma yaraldi' ? '#3064CC' : 
                                    order.status === 'Yasalmoqda' ? '#3064CC' : 
                                    order.status === 'Yetkazilmoqda' ? '#000000' : 
                                    order.status === 'Olib ketishga tayyor' ? '#000000' : 
                                    order.status === 'Xaridorga berildi' ? '#333333' : 
                                    order.status === 'Bekor qilingan' ? '#FF4A32' : '#3064CC',
                                  }}>{order.status}</button>
                              {/* <p style={{width: order.status === 'Accepted_by_recipient' ? '220px' : 'auto'}} className='order_profile_opacity_text hidden_three_dots pt-1 ps-3'>{order.order_status_date ? order.order_status_date : 'Нет данных'}</p> */}
                            </div>
                            <p className='order_profile_text'>{order.order_date ? order.order_date : localStorage.getItem('selectedLanguage') === 'ru' ? 'Нет данных' : `Maʼlumot yoʻq`}</p>
                            <p className='order_profile_text'>{order.delivery_date ? order.delivery_date : localStorage.getItem('selectedLanguage') === 'ru' ? 'Я еще не получила заказ :(' : `Siz hali buyurtmani olmadingiz`}</p>
                            <p className='order_profile_text'>{order.address ? `${order.address.region === null ? localStorage.getItem('selectedLanguage') === 'ru' ? 'Пока нет данных :(' : `Hozircha ma'lumot yo'q :(` : order.address.region} ${order.address.city === null ? '' : order.address.city} ${order.address.street === null ? '' : order.address.street} ${order.address.house === null ? '' : order.address.house === undefined ? '' : order.address.house}` : localStorage.getItem('selectedLanguage') === 'ru' ? 'Нет данных' : `Maʼlumot yoʻq`}</p>
                            <p className='order_profile_text' style={{position: 'relative', top: 6}}>10:00 - 20:00</p>
                            <p className='order_profile_text' style={{position: 'relative', top: 8}}>{Number(order.all_price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}</p>
                          </div>
                        </div>

                        <hr style={{ margin: '0', marginTop: '-20px' }} />

                        <div className="accordion accordion-flush" id="accordionFlushExample">
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button onClick={() => handleShowOrder(order.id)} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${order.id}`} aria-expanded="false" aria-controls={`flush-collapseOne${order.id}`}>
                                {order.product_quantity} {localStorage.getItem('selectedLanguage') === 'ru' ? 'товар' : `mahsulot`}
                              </button>
                            </h2>

                            <div id={`flush-collapseOne${order.id}`} className={`accordion-collapse collapse ${show.id === order.id ? 'show' : ''}`} data-bs-parent="#accordionFlushExample">
                              <div className="accordion-body">
                                {show && show.map((item, idx) => (
                                  <div key={idx}>
                                    <Reveal>
                                      <div className='d-flex justify-content-between'>
                                        <div>
                                          <div style={{width: '104px', height: '120px', backgroundImage: `url(${item.warehouse && item.warehouse.images && item.warehouse.images[0] ? item.warehouse.images[0] : item.image_front})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}></div>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                                          <p className='order_name'>{item.warehouse && item.warehouse.name ? item.warehouse.name : item.product.name}</p>
                                          <div className="d-flex">
                                            <div className='d-flex'>
                                              <div>
                                                <p className='order_name_tite'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Количество:' : `Miqdori:`}</p>
                                                <p className='order_name_tite'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Размер:' : `O'lchami`}</p>
                                              </div>
                                              <div className='center flex-column ms-2'>
                                                <p className='order_name_name' title={item.quantity}>{item.quantity}</p>
                                                <p className='order_name_name' title={item.warehouse && item.warehouse.size && item.warehouse.size.name ? item.warehouse.size.name : ''}>{item.warehouse && item.warehouse.size && item.warehouse.size.name ? item.warehouse.size.name : item.size.name}</p>
                                              </div>
                                            </div>
                                            <div className='center' style={{ marginLeft: '46px', alignItems: 'flex-end' }}>
                                              <div>
                                                <p className='order_name_tite'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Цвет:' : `Rangi:`}</p>
                                              </div>
                                              <div className='text-end center flex-column ms-2' style={{position: 'relative', top: '-12px'}}>
                                                <div style={{ backgroundColor: item.warehouse && item.warehouse.color && item.warehouse.color.code ? item.warehouse.color.code : item.color.code }} className='order_name_color'></div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className='d-flex justify-content-space-between flex-column'>
                                          {item.all_price ?
                                            <div style={{marginRight: '-20px', position: 'relative', left: '-6px'}} className='d-flex flex-column'>
                                              {Number(item.all_price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}
                                              <del style={{position: 'relative', left: '-10px', fontSize: '16px'}} className='show_detail_price_discount'>
                                                {Number(item.price).toLocaleString('ru-RU')} {localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}
                                              </del>
                                            </div>
                                            :
                                            <div>
                                              {item.price ? `${Number(item.price).toLocaleString('ru-RU')} ${localStorage.getItem('selectedLanguage') === 'ru' ? 'сум' : `so'm`}` : 'Цена отсутствует или не найден'}
                                            </div>
                                          }
                                        </div>
                                      </div>
                                    </Reveal>
                                    <hr />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    </div>
                  )) : (
                    <center style={{ marginTop: '56px' }}>
                      <img src={no_addres} alt="no_addres" />
                      <p className='no_address_text'>{localStorage.getItem('selectedLanguage') === 'ru' ? 'Вы ещё не оформляли зака' : `Siz hali buyurtma bermadingiz`}</p>
                    </center>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <AdvantageMain />
      <FooterMain />
    </>
  );
}

export default ProfileOrders