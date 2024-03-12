import React, { useEffect, useState } from "react";
import axios from 'axios';

import apple from '../assets/apple.jpeg';
import tesla from '../assets/tesla.jpeg';
import meta from '../assets/meta.jpeg';
import nvedia from '../assets/nvedia.jpeg';
import netflix from '../assets/netfilx.jpeg';
import { MiniChart } from "react-ts-tradingview-widgets";

export default function Portfolio() {
    const [stocks, setStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [sellQuantity, setSellQuantity] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [applePrice, setApplePrice] = useState(0);
    const [teslaPrice, setTeslaPrice] = useState(0);
    const [metaPrice, setMetaPrice] = useState(0);
    const [nvediaPrice, setNvediaPrice] = useState(0);
    const [netflixPrice, setNetflixPrice] = useState(0);

    useEffect(() => {
        const fetchApplePrice = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/price_a`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setApplePrice(res.data.data.c)
                // console.log(res.data.data)
            } catch (error) {
                console.error('Error fetching Apple price:', error);
            }
        };

        const fetchTeslaPrice = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/price_t`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setTeslaPrice(res.data.data.c)
                // console.log(res.data.data)
            } catch (error) {
                console.error('Error fetching Tesla price:', error);
            }
        };
        const fetchMetaPrice = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/price_m`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setMetaPrice(res.data.data.c)
                //   console.log(res.data.data)
            } catch (error) {
                console.error('Error fetching meta price:', error);
            }
        };
        const fetchNvediaPrice = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/price_nv`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setNvediaPrice(res.data.data.c)
                //   console.log(res.data.data)
            } catch (error) {
                console.error('Error fetching nvidia price:', error);
            }
        };
        const fetchNetflixPrice = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/price_nt`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setNetflixPrice(res.data.data.c)
                //   console.log(res.data.data)
            } catch (error) {
                console.error('Error fetching netflix price:', error);
            }
        };
        fetchNetflixPrice()
        fetchNvediaPrice();
        fetchMetaPrice();
        fetchApplePrice();
        fetchTeslaPrice();

        const intervalId = setInterval(() => {
            fetchApplePrice();
            fetchNetflixPrice()
            fetchNvediaPrice();
            fetchTeslaPrice();
            fetchMetaPrice();
        }, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);



    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:3000/all_stock', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    name: localStorage.getItem('name'),
                }
            });
            setStocks(res.data);
        } catch (error) {
            console.error("Error fetching user transactions:", error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const getStockImage = (stockName) => {
        switch (stockName.toUpperCase()) {
            case "APPLE":
                return apple;
            case "TESLA":
                return tesla;
            case "META":
                return meta;
            case "NVEDIA":
                return nvedia;
            case "NETFLIX":
                return netflix;
            default:
                return null;
        }
    };

    const handleStockClick = (stock) => {
        setSelectedStock(stock);
    };

    const handleSell = async () => {
        if (parseInt(sellQuantity) > selectedStock.quantity) {
            alert("You can't sell more shares than you have.");
            return; // Stop further execution
        }
        try {
            const res = await axios.put('http://localhost:3000/sell', {
                quantity: sellQuantity,
                sharename: selectedStock.stockname,
                name: localStorage.getItem('name'),
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (res.status === 200) {
                // Call change_balance API to update balance
                if (selectedStock.stockname === "APPLE") {
                    const withdrawAmount = applePrice * parseInt(sellQuantity);
                    const parsedWithdrawAmount = parseInt(withdrawAmount, 10);
                    const res = await axios.put('http://localhost:3000/change_balance', {
                        type: 'add',
                        amount: parsedWithdrawAmount,
                        name: localStorage.getItem('name'),
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                }
                else if (selectedStock.stockname === "TESLA") {

                    const withdrawAmount = teslaPrice * parseInt(sellQuantity);
                    const parsedWithdrawAmount = parseInt(withdrawAmount, 10);
                    const res = await axios.put('http://localhost:3000/change_balance', {
                        type: 'add',
                        amount: parsedWithdrawAmount,
                        name: localStorage.getItem('name'),
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                }
                else if (selectedStock.stockname === "META") {
                    const withdrawAmount = metaPrice * parseInt(sellQuantity);
                    const parsedWithdrawAmount = parseInt(withdrawAmount, 10);
                    const res = await axios.put('http://localhost:3000/change_balance', {
                        type: 'add',
                        amount: parsedWithdrawAmount,
                        name: localStorage.getItem('name'),
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                }
                else if (selectedStock.stockname === "NETFLIX") {
                    const withdrawAmount = netflixPrice * parseInt(sellQuantity);
                    const parsedWithdrawAmount = parseInt(withdrawAmount, 10);
                    const res = await axios.put('http://localhost:3000/change_balance', {
                        type: 'add',
                        amount: parsedWithdrawAmount,
                        name: localStorage.getItem('name'),
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                }
                else if (selectedStock.stockname === "NVEDIA") {
                    const withdrawAmount = nvediaPrice * parseInt(sellQuantity);
                    const parsedWithdrawAmount = parseInt(withdrawAmount, 10);
                    const res = await axios.put('http://localhost:3000/change_balance', {
                        type: 'add',
                        amount: parsedWithdrawAmount,
                        name: localStorage.getItem('name'),
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                }

                // Refresh stock data after successful sell
            }
            if (res.status === 200) {
                // transaction successful,
                if (selectedStock.stockname === "APPLE") {
                    const res = await axios.post('http://localhost:3000/transaction', {
                        type: 'SELL',
                        quantity: sellQuantity,
                        sharename: selectedStock.stockname,
                        price: applePrice,
                        name: localStorage.getItem('name'),
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                }
                else if (selectedStock.stockname === "TESLA") {
                    const res = await axios.post('http://localhost:3000/transaction', {
                        type: 'SELL',
                        quantity: sellQuantity,
                        sharename: selectedStock.stockname,
                        price: teslaPrice,
                        name: localStorage.getItem('name'),
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                }
                else if (selectedStock.stockname === "META") {
                    const res = await axios.post('http://localhost:3000/transaction', {
                        type: 'SELL',
                        quantity: sellQuantity,
                        sharename: selectedStock.stockname,
                        price: metaPrice,
                        name: localStorage.getItem('name'),
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                }
                else if (selectedStock.stockname === "NVEDIA") {
                    const res = await axios.post('http://localhost:3000/transaction', {
                        type: 'SELL',
                        quantity: sellQuantity,
                        sharename: selectedStock.stockname,
                        price: nvediaPrice,
                        name: localStorage.getItem('name'),
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                }
                else if (selectedStock.stockname === "NETFLIX") {
                    const res = await axios.post('http://localhost:3000/transaction', {
                        type: 'SELL',
                        quantity: sellQuantity,
                        sharename: selectedStock.stockname,
                        price: netflixPrice,
                        name: localStorage.getItem('name'),
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                }

            }
            getData();
            setSelectedStock(null);
            setSellQuantity('');
            setErrorMessage('');
        } catch (error) {
            console.error("Error selling stock:", error);
            setErrorMessage('Error selling stock');
        }
    };
    return (
        <div>
            <h1 className="text-6xl flex justify-center">Portfolio</h1>
            <div className="grid grid-cols-12">
                <div className="col-span-5">
                    <div className="ml-56 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="mb-4">
                            <h1 className="flex justify-center text-3xl font-bold leading-none text-gray-900 dark:text-white">ALL STOCKs</h1>
                        </div>
                        <div className="flow-root">
                            {stocks.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400">NO STOCKS YET</p>}
                            {stocks.length > 0 && (
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {stocks.map((stock, index) => (
                                        <li key={index} className="py-3 sm:py-4" onClick={() => handleStockClick(stock)}>
                                            <div className="hover:blur-sm hover:cursor-pointer">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <img className="w-8 h-8 rounded-full" src={getStockImage(stock.stockname)} alt={`${stock.stockname} image`} />
                                                    </div>
                                                    <div className="flex-1 min-w-0 ms-4">
                                                        <p className="text-lg font-bold text-gray-400 truncate dark:text-gray-500">
                                                            {stock.quantity}
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        ${stock.stockprice}
                                                    </div>
                                                </div>
                                            </div>
                                            {selectedStock && selectedStock.stockname === stock.stockname && (
                                                <div className="mt-3">
                                                    <input
                                                        className="form-input p-2 bg-slate-800 block w-full "
                                                        placeholder="Quantity"
                                                        value={sellQuantity}
                                                        onChange={(e) => setSellQuantity(e.target.value)}
                                                    />
                                                    <button
                                                        className="mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150"
                                                        onClick={handleSell}
                                                    >
                                                        Sell
                                                    </button>
                                                    {errorMessage && (
                                                        <p className="mt-2 text-red-600">{errorMessage}</p>
                                                    )}
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-span-7">
                    <div className="p-6 ml-10 mr-52 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        {selectedStock && (
                            <>
                                {selectedStock.stockname === "APPLE" && <MiniChart colorTheme="dark" symbol="NASDAQ:AAPL" width="100%" />}
                                {selectedStock.stockname === "TESLA" && <MiniChart colorTheme="dark" symbol="NASDAQ:TSLA" width="100%" />}
                                {selectedStock.stockname === "META" && <MiniChart colorTheme="dark" symbol="NASDAQ:META" width="100%" />}
                                {selectedStock.stockname === "NVEDIA" && <MiniChart colorTheme="dark" symbol="NASDAQ:NVDA" width="100%" />}
                                {selectedStock.stockname === "NETFLIX" && <MiniChart colorTheme="dark" symbol="NASDAQ:NFLX" width="100%" />}
                            </>
                        )}
                        <div className="p-6 mr-56 bg-white border border-gray-200 rounded-lg shadow dark:bg-black dark:border-gray-700">
                            <h1 className="text-2xl text-green-200">
                                {selectedStock && (
                                    <>
                                        {selectedStock.stockname === "APPLE" && (
                                            <span style={{ color: (parseFloat(applePrice - selectedStock.stockprice) >= 0 ? 'green' : 'red') }}>
                                                {((applePrice - selectedStock.stockprice) / selectedStock.stockprice * 100).toFixed(2)}%
                                            </span>
                                        )}
                                        {selectedStock.stockname === "TESLA" && (
                                            <span style={{ color: (parseFloat(teslaPrice - selectedStock.stockprice) >= 0 ? 'green' : 'red') }}>
                                                {((teslaPrice - selectedStock.stockprice) / selectedStock.stockprice * 100).toFixed(2)}%
                                            </span>
                                        )}
                                        {selectedStock.stockname === "META" && (
                                            <span style={{ color: (parseFloat(metaPrice - selectedStock.stockprice) >= 0 ? 'green' : 'red') }}>
                                                {((metaPrice - selectedStock.stockprice) / selectedStock.stockprice * 100).toFixed(2)}%
                                            </span>
                                        )}
                                        {selectedStock.stockname === "NVEDIA" && (
                                            <span style={{ color: (parseFloat(nvediaPrice - selectedStock.stockprice) >= 0 ? 'green' : 'red') }}>
                                                {((nvediaPrice - selectedStock.stockprice) / selectedStock.stockprice * 100).toFixed(2)}%
                                            </span>
                                        )}
                                        {selectedStock.stockname === "NETFLIX" && (
                                            <span style={{ color: (parseFloat(netflixPrice - selectedStock.stockprice) >= 0 ? 'green' : 'red') }}>
                                                {((netflixPrice - selectedStock.stockprice) / selectedStock.stockprice * 100).toFixed(2)}%
                                            </span>
                                        )}
                                    </>
                                )
                                }
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
