import { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/coinContext'
import { Link } from 'react-router-dom'
const Home = () => {

    const {allCoin,currnecy}=useContext(CoinContext)
    const [displaycoin,SetdisplayCoin]=useState([])
    const [inputs,setInputs]=useState("")

    const inputHadler=(e)=>{
        setInputs(e.target.value)
        if(e.target.value===""){
            SetdisplayCoin(allCoin)
        }
    }

    const searchHandle=async(e)=>{
        e.preventDefault()
        const coins=await allCoin.filter((item)=>{
            return item.name.toLowerCase().includes(inputs.toLowerCase())})
            SetdisplayCoin(coins)
    }

    useEffect(()=>{
        SetdisplayCoin(allCoin)
    },[allCoin])

  return (
    <div className='home'>
        <div className="hero">
            <h1>Largest <br /> Crypto MarketPlace</h1>
            <p>Welcome to world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
            <form className=' forms' onSubmit={searchHandle}>

                <input type="text" value={inputs} placeholder='Search crypto' onChange={inputHadler} required list='coinlist'/>
                <datalist id='coinlist'>{allCoin.map((item,index)=>(
                    <option key={index} value={item.name}/>
                ))}</datalist>

                <button type='submit'>Search</button>
            </form>
        </div>
        <div className="crypto-table">
            <div className="table-layout">
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p style={{textAlign:'center'}}>24H Change</p>
                <p className='market-cap'>Market Cap</p>
            </div>
            {displaycoin.slice(0,10).map((item,index)=>(
                <Link to={`/coin/${item.id}`} className='table-layout' key={index}>
                    <p>{item.market_cap_rank}</p>
                    <div>
                        <img src={item.image} alt="" />
                        <p>{item.name +" - " +item.symbol}</p>
                    </div>
                    <p>{currnecy.symbol}{item.current_price}</p>
                    <p className={item.price_change_percentage_24h>0?"green":"red"}>{Math.floor(item.price_change_percentage_24h*100)/100} %</p>
                    <p className='market-cap'>{currnecy.symbol} {item.market_cap}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Home