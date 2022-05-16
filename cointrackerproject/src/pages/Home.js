import React, {useEffect, useState} from 'react';
import axios from 'axios';

/*
Requirements
Add/Remove bitcoin addresses
Synchronize bitcoin wallet transactions for the address
Retrieve the current balances and transactions for each bitcoin address

HomePage
1. Add address
2. Show Current balance for addresses added
3. Delete address

Sample Address
3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd
12xQ9k5ousS8MqNsMBqHKtjAtCuKezm2Ju
bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h
bc1q0sg9rdst255gtldsmcf8rk0764avqy2h2ksqs5

Query single address
https://api.blockchair.com/bitcoin/dashboards/address/{:address}

Query multiple address
https://api.blockchair.com/bitcoin/dashboards/addresses/{:address}₀,...,{:address}

Address balance mass check ** Extremely fast and cheap
* Returns confirmed balances only. If address hasn't been seen on the blockchain or has a zero balance,
its not shown among the results *
https://api.blockchair.com/bitcoin/addresses/balances?addresses={:comma_separated_list}


Transactions
1. Page through transactions and see how much BTC was transfered
to/from the address in question
*/


const Home = () => {

    const [addressBalances, setAddressBalance] = useState({});
    const [addressInput, setAddressInput] = useState("");

    const getBalance = (address) => {
        const data = axios({
            method: 'get',
            url:`https://api.blockchair.com/bitcoin/addresses/balances?addresses=${address}`
        })
        .then(response => response.data.data);
        return data
    }

    /*
    Adds an address to our database or in this case to the addressList
    Checks the address with Blockchair's address balance mass check endpoint
    */
    const addAddress = async (evt) => {
        evt.preventDefault();
        const balances = await getBalance(addressInput)
        console.log(balances)
        if(balances.length != 0){
            setAddressBalance({...addressBalances, [addressInput]: balances[addressInput]})
            console.log(addressBalances);
        } else{
            console.log('No balances')
        }
    }

    const removeAddress = (address) => {
        const copyValues = {...addressBalances}
        delete copyValues[address]
        setAddressBalance(copyValues);
    }

    const addressList = Object.keys(addressBalances).map(key => (
        <li key={key}>
            <strong>{key}</strong>: {addressBalances[key]}
            <button onClick={() => removeAddress(key)}>Delete</button>
        </li>
    ));

    return (
        <div>
            <h1>Home</h1>
                <form onSubmit={addAddress}>
                    <label>
                        Address:
                        <input type='text' value={addressInput} onChange={e => setAddressInput(e.target.value)}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                <ul>{addressList}</ul>
        </div>
    );
}
export default Home;
