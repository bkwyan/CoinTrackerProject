import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    TransactionContainer,
    TransactionHeader,
    TransactionContentContainer,
    TransactionAddressWrapper,
    TransactionListWrapper,
    AddressList,
    TransactionList,
    AddressListHeader,
    TransactionListHeader,
} from '../styles/TransactionStyle.js';

const Transactions = ({getGlobalAddresses}) => {

    const [addresses, setAddresses] = useState(['3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd', 'bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h', 'bc1q0sg9rdst255gtldsmcf8rk0764avqy2h2ksqs5']);
    const [transactions, setTransactions] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");

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
        <li key={address} onClick={() => {
            getTransactions(address)
            setSelectedAddress(address)
        }}>
        {address}
        </li>
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
        <TransactionContainer>
            <TransactionHeader>Transactions</TransactionHeader>
            <TransactionContentContainer>
                <TransactionAddressWrapper>
                    <AddressListHeader>List of Addresses</AddressListHeader>
                    <AddressList>{addressList}</AddressList>
                </TransactionAddressWrapper>
                <TransactionListWrapper>
                    {selectedAddress.length > 0 &&
                        <TransactionListHeader>List of Transactions for {selectedAddress}</TransactionListHeader>
                    }
                    <TransactionList>{transactionList}</TransactionList>
                </TransactionListWrapper>
            </TransactionContentContainer>
        </TransactionContainer>
    );
}
export default Transactions;
