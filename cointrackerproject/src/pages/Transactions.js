import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Transactions = ({getGlobalAddresses}) => {

    const [addresses, setAddresses] = useState(['3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd', 'bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h', 'bc1q0sg9rdst255gtldsmcf8rk0764avqy2h2ksqs5']);
    const [transactions, setTransactions] = useState([]);

    const getTransactions = async (address) => {
        const transactions = await axios({
            method: 'get',
            url:`https://api.blockchair.com/bitcoin/dashboards/address/${address}?limit=10&transaction_details=true`
        })
        .then(response => response.data.data[address].transactions);
        setTransactions(transactions);
        axios.post('http://localhost:8080/address/addTransactions', {
            address: address,
            transactions: transactions
        });
    }

    const addressList = addresses.map((address) => 
        <li key={address} onClick={() => getTransactions(address)}>{address}</li>
    );

    const transactionList = transactions.map((transaction) => 
        <li key={transaction.balance_change}>{transaction.balance_change/100000000}</li>
    );

    useEffect(() => {
        async function fetchAddresses(){
            var addresses = await axios.get('http://localhost:8080/address')
            setAddresses(addresses.data)
        }
        fetchAddresses()
    }, []);

    return (
        <div>
            <h1>Transactions</h1>
            <ul>{addressList}</ul>
            <ul>{transactionList}</ul>
        </div>
    );
}
export default Transactions;
