import { useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { CoinContext } from '../../context/coinContext'
import Linechart from '../../components/linechart/Linechart'

const Coin = () => {
  const {id}=useParams()
  const [coindata,setCoindata]=useState();
  const [historicaldata,setHistoricaldata]=useState();


  const {allCoin,currnecy}=useContext(CoinContext)


  const fetchCoinData=async()=>{
    const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-SGqMK6UEiEes9bskoZNmCk9p'}
};

fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
  .then(response => response.json())
  .then(response =>setCoindata(response))
  .catch(err => console.error(err));
  }

  const fetchHistoricalData=async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-SGqMK6UEiEes9bskoZNmCk9p'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currnecy.name}&days=10&interval=daily`, options)
      .then(response => response.json())
      .then(response => setHistoricaldata(response))
      .catch(err => console.error(err));
  }

  useEffect(()=>{
    fetchCoinData()
    fetchHistoricalData();
  },[currnecy])

  if(coindata && historicaldata){
  return (
    <div className='coin'>
      <div className='coinname'>
        <img src={coindata.image.large} alt="" />
        <p><b>{coindata.name}{coindata.symbol.toUpperCase()}</b></p>
      </div>

      <div className="coinchart">
        <Linechart historicaldata={historicaldata}/>
      </div>

      <div className="coininfo">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coindata.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Currency Price</li>
          <li>{currnecy.symbol} {coindata.market_data.current_price[currnecy.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour High</li>
          <li>{currnecy.symbol} {coindata.market_data.high_24h[currnecy.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour Low</li>
          <li>{currnecy.symbol} {coindata.market_data.low_24h[currnecy.name].toLocaleString()}</li>
        </ul>
      </div>
    </div>
  )
}else{
  <div className="spiner">
    <div className="spin"></div>
  </div>
}
}

export default Coin