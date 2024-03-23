import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({image, name, symbol}) => {

    const [price, setPrice] = useState(null);
    useEffect(() => {
        const getCoinPrice = async () => {
            let query = ` https://min-api.cryptocompare.com/data/price?api_key=${API_KEY}&fsym=${symbol}&tsyms=USD`;
            const response = await fetch(query);

            const json = await response.json();
            setPrice(json);
        }
        getCoinPrice().catch(console.error);

    }, [symbol]);


    return (
        <div>
          {price ? ( // rendering only if API call actually returned us data
            <li key={symbol} className="main-list">
                <img className="icons" src={`https://www.cryptocompare.com${image}`} alt={`Small icon for ${name} crypto coin`}></img>
                {name} <span className="tab">${price.USD} USD</span>
            </li>
          ) : 
          null
          }
        </div>
      );
}
export default CoinInfo