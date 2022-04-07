import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from './Coin';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => {
        setCoins(response.data);
        console.log(response.data);
      }).catch(error => console.log(error))
  }, []);

  const handleChange = (event) => {
    console.log('change : ', event.target.value);
    setSearch(event.target.value);
  };

  const filteredCoins = coins.filter(coin => {
    return coin.name.toLowerCase().includes(search.toLowerCase())
  }
  );

  return (
    <div className="App">
      <div className='coin-app'>
        <div className='coin-search'>
          <h1 className='coin-text'>currency</h1>
          <form>
            <input type='text' placeholder='Search' className='coin-input' onChange={handleChange} />
          </form>
        </div>
        {
          filteredCoins.map(coin => {
            return (<Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />)
          })
        }

      </div>
    </div>
  );
}

export default App;
