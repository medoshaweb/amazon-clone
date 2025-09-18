import React from 'react'
import './Header.css'
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  return (
    <section className="header">
      <div className='logo'>
        {/*logo*/}
        <a href="/">
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="amazon logo"
          />
        </a>
        {/*delivery*/}
        <span><img src="../../assets/images/location.png" alt="" /></span>
        <div>
            <p>Delivered to</p>
            <span>Ethiopia</span>
      </div>
        </div>
      <div>
        {/*search*/}
        <select name="" id=""><option value="">All</option></select>
        <input type="text" name='' id='' placeholder='search product'/>
        <span><SearchIcon /></span>
      </div>
        {/*right*/}

      <div>
        <div>
            <img src="https://www.citypng.com/public/uploads/preview/hd-official-flag-of-united-states-illustration-7339616949735821oufrl8i2m.png" alt="" />
            <section>
                <option value="">EN</option>
            </section>
      </div>
      {/*account*/ }
      <a href="">
        <div>
            <p>Hello, Sign in</p>
            <span>Account & Lists</span>
        </div>
      </a>
        {/*orders*/}
        <a href="">
            <p>returns</p>
            <span>& Orders</span>
        </a>
        {/*cart*/}
        <a href="">
            <span>0</span>
            <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="" />
            <p>Cart</p>
        </a>
      </div>
    </section>
  );
}

export default Header
