import { createContext, useEffect } from "react";
import { useState } from "react";


export const CoinContext=createContext();

const CoinContextProvider=(props)=>{

    const [allCoin,setAllcoin]=useState([])
    const [currnecy,setCurrency]=useState({
        name:"usd",
        symbol:"$"
    })

     //FETCH COIN DATA..
    const fetchCoin=async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-SGqMK6UEiEes9bskoZNmCk9p'}
        };
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currnecy.name}`, options)
            .then(response => response.json())
            .then(response => setAllcoin(response))
            .catch(err => console.error(err));
    }
    useEffect(()=>{
        fetchCoin();
    },[currnecy])


    const contextValue={
        allCoin,setCurrency,currnecy
    }

    return(
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}


export default CoinContextProvider