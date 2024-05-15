import React, { useEffect, useState } from 'react'
import './main.css'
import logo from '../../layouts/icons/logo.svg'
import search_mobile from '../../layouts/icons/search_mobile.svg'
import burger_meny from '../../layouts/icons/burger_meny.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

function HeaderMainMobile() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [category, setCategory] = useState(null);
  const [category2, setCategory2] = useState(null);
  const [categoryShow, setCategoryShow] = useState(false);
  const [categoryShow2, setCategoryShow2] = useState(true);
  const [subCategoryShow, setSubCategoryShow] = useState(false);
  const [subCategoryShowDef, setSubCategoryShowDef] = useState(null);
  const [position, setPosition] = useState(window.pageYOffset)
  const [visible, setVisible] = useState(true) 
  const [searchShow, setSearchShow] = useState(false);

  if (!localStorage.getItem('selectedLanguage')) {
    localStorage.setItem('selectedLanguage', 'ru')
  }

  // useEffect(() => {
  //   const checkScreenSize = () => {
  //     if (window.screen.width < 800) {
  //       navigate(`/${window.location.pathname}`);
  //     }
  //   };

  //   checkScreenSize();

  //   window.addEventListener('resize', checkScreenSize);

  //   return () => {
  //     window.removeEventListener('resize', checkScreenSize);
  //   };
  // }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TWO}/get-categories`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'language': localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'ru',
      }
    }).then((response) => {
      setCategory(response.data.data[0]);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(()=> {
    const handleScroll = () => {
      let moving = window.pageYOffset
      
      setVisible(position > moving);
      setPosition(moving)
    };

    window.addEventListener("scroll", handleScroll);
    return(() => {
      window.removeEventListener("scroll", handleScroll);
    })
})

const cls = visible ? "visible_mobile header_main" : "hidden_mobile header_main";

  const handleHumburgerMenuClick = () => {
    setCategoryShow((prev) => !prev);
  };

  const handleSearchClick = () => {
    setSearchShow((prev) => !prev);
  };

  // const handleSubCategoryClick = () => {
  //   setSubCategoryShow((prev) => !prev);
  // };

  const selectedSubCategoryString = localStorage.getItem('selectedSubCategory');
  let selectedSubCategory = [];
  if (selectedSubCategoryString) {
    try {
      selectedSubCategory = JSON.parse(selectedSubCategoryString);
    } catch (error) {
      console.error('Error parsing selectedSubCategory:', error);
    }
  }
  

  return (
    <header>
      <div style={{width: '100%', display: 'flex', paddingTop: '16px', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px'}}>
        <img onClick={handleHumburgerMenuClick} src={burger_meny} alt="burger_meny" />
        <NavLink to={'/mobile'}>
          <img src={logo} alt="logo" />
        </NavLink>
        <img onClick={handleSearchClick} src={search_mobile} alt="search_mobile" />
      </div>

      {categoryShow && (
        <>
          <div style={{backgroundColor: 'white', boxShadow: '-2px 37px 50px -22px rgba(0,0,0,0.69)', position: 'absolute', width: '100%', zIndex: 100000}}>
            {subCategoryShow && (
              <div className='sub_category_mobile'>
                  <svg onClick={() => {setCategoryShow2(true); setSubCategoryShow(false)}} style={{marginTop: '-2px'}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#18356D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  <NavLink style={{width: '100%', textDecoration: 'none'}} to={`/mobile/categories/${localStorage.getItem('selectedCategoryId')}/${localStorage.getItem('selectedCategoryName')}`}>
                    <p style={{textDecoration: 'none'}} className='sub_category_mobile_text'>{localStorage.getItem('selectedCategoryName')}</p>
                  </NavLink>

                  <div style={{backgroundColor: 'white', left: '0', top: '44px', position: 'absolute', width: '100%', zIndex: 100000}}>
                    {selectedSubCategory && selectedSubCategory.map((item, index) => (
                      <NavLink to={`/mobile/categories/${item.id}/${item.name}`} className='header_button_mobile' key={index}>{item.name}</NavLink>
                    ))}
                  </div>
              </div>
            )}

            {categoryShow2 && (
              <>
                {category && category.map((item, index) => (
                  <div onClick={() => {localStorage.setItem('selectedCategoryName', item.name); localStorage.setItem('selectedCategoryId', item.id); localStorage.setItem('selectedSubCategory', JSON.stringify(item.sub_category)); setCategoryShow2(false); setSubCategoryShow(true)}} className='header_button_mobile' key={index}>{item.name}</div>
                ))}
              </>
            )}
          </div>

          <div onClick={handleHumburgerMenuClick} style={{backgroundColor: '#0101011A', position: 'absolute', width: '100%', height: '100%', zIndex: 10000}}></div>
        </>
      )}  

      {searchShow && (
        <center>
          <div style={{paddingLeft: '20px', paddingRight: '20px', position: 'absolute', width: '100%', top: '9px'}}>
            <div className='d-flex'>
              <img onClick={handleHumburgerMenuClick} src={burger_meny} alt="burger_meny" />
              <input placeholder='Поиск...' className='search_input_mobile' type="text" />
            </div>
          </div>

          <img style={{position: 'absolute', top: '20px', right: '32px', width: '24px', height: '24px'}} onClick={handleSearchClick} src={search_mobile} alt="search_mobile" />
        </center>
      )}
    </header>
  )
}

export default HeaderMainMobile