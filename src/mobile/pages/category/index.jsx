import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom'
import HeaderMainMobile from '../../components/header';
import FooterMainMobile from '../../components/footer';
import FooterBarMobile from '../../components/footer bar';
import './main.css';
import Reveal from '../../animation';

function CategoryMobile() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subCategoryList, setSubCategoryList] = useState('');
  const [subCategoryActive, setSubCategoryActive] = useState('');
  const [subCategoryQuant, setSubCategoryQuant] = useState('');
  const token = localStorage.getItem('token');
  const params = useParams()

  useEffect(() => {
    localStorage.setItem('selectedCategory', params.id);
  })

  if (params.id !== localStorage.getItem('selectedCategory')) {
    window.location.reload();
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/get-products-by-category?category_id=${params.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      setData(response.data.data[0]);
      console.log(response.data.data);
      setCategory(response.data.data[0].category.name);
      setSubCategory(response.data.data[0].sub_category[0].name);
      setSubCategoryList(response.data.data[0].sub_category);
      setSubCategoryQuant(response.data.data[0].products.length);
      setSubCategoryActive(response.data.data[0].category_active);
    }).catch((error) => {
      toast.error(localStorage.getItem('selectedLanguage') === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте еще раз!' : 'Xatolik yuz berdi. Iltimos qaytadan urining!');
    });    
  }, []);

  return (
    <div>
      <HeaderMainMobile />

      <center>
        {subCategoryActive === true ? (
          <div style={{backgroundColor: 'white', top: '64px', position: 'absolute', width: '100%', zIndex: 100000}}>
            <Reveal>
              <div className='sub_category_mobile'>
                <NavLink to={'/mobile'}>
                  <svg style={{marginTop: '-2px'}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#18356D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </NavLink>

                <div style={{width: '100%', textDecoration: 'none'}}>
                  <p style={{textDecoration: 'none'}} className='sub_category_mobile_text'>{category}</p>
                </div>

                <div style={{backgroundColor: 'white', left: '0', top: '44px', position: 'absolute', width: '100%', zIndex: 100000}}>
                  {subCategoryList && subCategoryList.map((item, index) => (
                    <NavLink to={`/mobile/categories/${item.id}/${item.name}`} className='header_button_mobile' key={index}>{item.name}</NavLink>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        ) : (
          <div style={{width: '344px', marginTop: '21px'}}>
            <Reveal>
              <p className='categories_title'>
                {category}

                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="#3C7CFB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                {subCategory}
              </p>

              <h3 className='categories_sub_title' style={{textAlign: 'left', marginTop: '-12px', marginBottom: '16px'}}>{subCategory} <span className='categories_quant' style={{fontSize: '14px'}}>{subCategoryQuant}</span></h3>
            </Reveal>
          </div>
        )}

        <div className="d-flex" style={{width: '344px', marginTop: subCategoryActive === true ? '180px' : '0px', flexWrap: 'wrap', justifyContent: 'space-between'}}>
          {data && data.products ? data.products.map((data2) => (
            <Reveal>
              <NavLink onClick={() => {localStorage.setItem('idActive', data2.id); localStorage.setItem('nameActive', data2.name)}} to={`/mobile/show/detail/${data2.id}/${data2.name}`} style={{textDecoration: 'none', marginBottom: '32px'}}>
                <div className="clothes_fat" style={{borderRadius: '6px'}}>
                  <div className="image-container" style={{position: 'relative', borderRadius: '6px', zIndex: '200'}}>
                    <div>
                      <div style={{width: '162px', height: '190px', backgroundImage: `url(${data2.images[0]})`, borderRadius: '6px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
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
          )) : null}
        </div>
      </center>

      <FooterMainMobile />
      <FooterBarMobile />
    </div>
  )
}

export default CategoryMobile