import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css';

// Главные страница
import HomePage from './pages/home';
// Корзина страниция 
import Basket from './pages/basket';
// Мои заказы страниция 
import MyOrders from './pages/orders';
// Изменить футболки страниция 
import YourDesign from './pages/your design';
// 404 Не Найдено
import Error404 from './pages/404/index';
// Страница профиля
import Profile from './pages/profile';
import ProfileAddres from './pages/profile/addres';
import ProfileOrders from './pages/profile/orders';
import ProfilePayment from './pages/profile/pay';
// Показать детальный продукт
import ShowDetail from './pages/show';
// Страница категорий
import CategoryListByName from './pages/categories';
// Автор
import AuthorPage from './pages/author';
// Футeр страниция 
// -- Доставка
import FooterDeliveryPage from './pages/footer page/information/delivery';
// -- Оплата
import FooterPayPage from './pages/footer page/information/pay';
// -- Обмен и возврат
import FooterExchangePage from './pages/footer page/information/exchange';
// -- Oформить заказ?
import FooterOrderPage from './pages/footer page/information/order';
// -- Пользвательское соглашение
import FooterTermsPage from './pages/footer page/information/terms';

// Мобильная версия
import HomePageMobile from './mobile/pages/home';
// профиля страниция
import AuthPageMobile from './mobile/pages/auth';
import ProfileMobile from './mobile/pages/profile';
import ProfileMobileAddres from './mobile/pages/profile/addres';
import ProfileMobileOrder from './mobile/pages/profile/order';
// Корзина
import BasketMobile from './mobile/pages/basket';
// Мои заказы страниция
import OrderMobile from './mobile/pages/order';
// 404 Не Найдено
import MobileNotFound from './mobile/pages/404';
// Изменить футболки страниция 
import YourDesignMobile from './mobile/pages/your design';
// Показать детальный продукт
import ProductShowMobile from './mobile/pages/show';
// Футeр страниция 
import Delivermobile from './mobile/pages/footer page/information/delivery';
import PayMobile from './mobile/pages/footer page/information/pay';
import ExchangeMobile from './mobile/pages/footer page/information/exchange';
import TermsMobile from './mobile/pages/footer page/information/terms';
import OrderMobileFooter from './mobile/pages/footer page/information/order';
// Автор
import AuthorPageMobile from './mobile/pages/author';
// Страница категорий
import CategoryMobile from './mobile/pages/category';

function App() {
  const navigate = useNavigate();
  // const navigate = useNavigate();
  // const screenWidth = window.screen.width;

  // if (screenWidth < 600) {
  //   navigate('/mobile');
  // }

  return (
    <div>
      <center style={{textAlign: 'left'}}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/basket' element={<Basket />} />
          <Route path='/checkout' element={<MyOrders />} />
          <Route path='/yourDesign' element={<YourDesign />} />
          <Route path="/show/detail/:id/:name" element={<ShowDetail />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/addres' element={<ProfileAddres />} />
          <Route path='/profile/checkout' element={<ProfileOrders />} />
          <Route path='/profile/payment' element={<ProfilePayment />} />
          <Route path='/categories/:id/:name' element={<CategoryListByName />} />
          <Route path='/author/:id/:name' element={<AuthorPage />} />
          <Route path='/footer/delivery' element={<FooterDeliveryPage />} />
          <Route path='/footer/pay' element={<FooterPayPage />} />
          <Route path='/footer/exchange' element={<FooterExchangePage />} />
          <Route path='/footer/order' element={<FooterOrderPage />} />
          <Route path='/footer/terms' element={<FooterTermsPage />} />
          <Route path='*' element={<Error404 />} />
          {/* Мобильная версия */}
          <Route path='/mobile' element={<HomePageMobile />} />
          <Route path='/mobile/auth' element={<AuthPageMobile />} />
          <Route path='/mobile/profile' element={<ProfileMobile />} />
          <Route path='/mobile/profile/addres' element={<ProfileMobileAddres />} />
          <Route path='/mobile/profile/checkout' element={<ProfileMobileOrder />} />
          <Route path='/basket/mobile' element={<BasketMobile />} />
          <Route path='/mobile/checkout' element={<OrderMobile />} />
          <Route path='/mobile/404' element={<MobileNotFound />} />
          <Route path='/mobile/yourDesign' element={<YourDesignMobile />} />
          <Route path='/mobile/show/detail/:id/:name' element={<ProductShowMobile />} />
          <Route path='/mobile/footer/delivery' element={<Delivermobile />} />
          <Route path='/mobile/footer/pay' element={<PayMobile />} />
          <Route path='/mobile/footer/exchange' element={<ExchangeMobile />} />
          <Route path='/mobile/footer/terms' element={<TermsMobile />} />
          <Route path='/mobile/footer/order' element={<OrderMobileFooter />} />
          <Route path='/mobile/author/:id/:name' element={<AuthorPageMobile />} />
          <Route path='/mobile/categories/:id/:name' element={<CategoryMobile />} />
        </Routes>
      </center>
    </div>
  );
}

export default App;