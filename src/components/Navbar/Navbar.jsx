import "./Navbar.css";
import logo from "../../assets/logo.png";
import arrow from "../../assets/arrow_icon.png";
import { useContext } from "react";
import { CoinContext } from "../../context/coinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const {setCurrency}=useContext(CoinContext)
  const currencyHandler=(e)=>{
    switch(e.target.value){
      case "usd":{
        setCurrency({name:"usd",symbol:"$"})
        break;
      }
      case "eur":{
        setCurrency({name:"eur",symbol:"₤"})
        break;
      }
      case "inr":{
        setCurrency({name:"inr",symbol:"₹"})
        break;
      }
      default:{
        setCurrency({name:"usd",symbol:"$"})
        break;
      }
    }
    }

  return (
    <div className="navbar">
      <Link to="/"><img className="logo" src={logo} alt="" /></Link>
      <ul className=" list-item">
        <Link to="/"><li>Home</li></Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select name="" id="" onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button>
          Sign Up <img src={arrow} alt="" />{" "}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
