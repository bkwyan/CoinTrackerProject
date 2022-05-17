import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    HomeContainer,
    FormWrapper,
    AddressItem,
    AddressList,
} from '../styles/HomeStyle.js';

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

    /*
    Retrieve the balance of the address that we submitted
    */
    const getBalance = (address) => {
        // Get the balance from Blockchair API
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
    Balance is returned in satoshi
    100,000,000 BT is 1 Satoshi
    */
    const addAddress = async (evt) => {
        evt.preventDefault();
        const balances = await getBalance(addressInput)
        if(balances.length !== 0){
            axios.post('http://localhost:8080/address/add', {
                address: addressInput,
                balance: balances[addressInput]/100000000
            });
            setAddressBalance({...addressBalances, [addressInput]: balances[addressInput]/100000000})
        } else{
            alert('Address was not found on the blockchain')
        }
    }

    /*
    Removes address from the database and from our local state
    */
    const removeAddress = (address) => {
        const copyValues = {...addressBalances}
        delete copyValues[address]
        setAddressBalance(copyValues);
        console.log(address);
        axios.post('http://localhost:8080/address/remove', {
            address: address,
        });
    }

    // Function to help render the address list
    const addressList = Object.keys(addressBalances).map(key => (
        <AddressItem key={key}>
            <strong>{key}</strong>: {addressBalances[key]}
            <button onClick={() => removeAddress(key)}>Delete</button>
        </AddressItem>
    ));

    useEffect(() => {
        // Retrieves the balances for the address that are available to us
        async function fetchBalances(){
            var balance = await axios.get('http://localhost:8080/address/balance')
            setAddressBalance(balance.data)
        }
        fetchBalances()
    }, []);

    return (
        <HomeContainer>
            <h1>Address List</h1>
                <AddressList>{addressList}</AddressList>
                <FormWrapper onSubmit={addAddress}>
                    <label>
                        Address:
                        <input type='text' value={addressInput} onChange={e => setAddressInput(e.target.value)}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </FormWrapper>
       </HomeContainer>
    );
}
export default Home;
