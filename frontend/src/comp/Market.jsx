import React, { useEffect, useState } from "react";
import axios from "axios";
import apple from '../assets/apple.jpeg'
import tesla from '../assets/tesla.jpeg'
import meta from '../assets/meta.jpeg'
import nvedia from '../assets/nvedia.jpeg'
import netflix from '../assets/netfilx.jpeg'
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { FundamentalData } from "react-ts-tradingview-widgets";



export default function market() {


    const [applePrice, setApplePrice] = useState(0);
    const [teslaPrice, setTeslaPrice] = useState(0);
    const [metaPrice, setMetaPrice] = useState(0);
    const [nvediaPrice, setNvediaPrice] = useState(0);
    const [netflixPrice, setNetflixPrice] = useState(0);
    const [showAddInput, setShowAddInput] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [money, setMoney] = useState(0);


    // checking the balance
    const checkBalance = async () => {
        const res = await axios.get(`http://localhost:3000/balance`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                name: localStorage.getItem('name'),
            }
        });
        setMoney(res.data.balance);

    };

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
        checkBalance();

        const intervalId = setInterval(() => {
            fetchApplePrice();
            fetchNetflixPrice()
            fetchNvediaPrice();
            fetchTeslaPrice();
            fetchMetaPrice();
            checkBalance();
        }, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);


    const [selectedStock, setSelectedStock] = useState(null);

    const handleClick = (stock) => {
        setSelectedStock(stock);
    };

    const handleAdd = async () => {
        setShowAddInput(true);
    };
    const conform = async () => {
        // showAddInput(false);
        //APPLE
        if (selectedStock === "APPLE") {
            if (money < quantity * applePrice) {
                alert("NOT ENOUGH BALANCE");
            } else {
                try {
                    const purchaseResponse = await axios.post('http://localhost:3000/buy', {
                        quantity: quantity,
                        sharename: "APPLE",
                        name: localStorage.getItem('name'),
                        price: applePrice,
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    if (purchaseResponse.status === 200) {
                        // Purchase successful, deduct balance
                        const deductedBalance = Math.round((quantity * applePrice));

                        const balanceResponse = await axios.put('http://localhost:3000/change_balance', {
                            type: 'withdraw',
                            amount: deductedBalance,
                            name: localStorage.getItem('name'),
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                    }
                    if (purchaseResponse.status === 200) {
                        // transaction successful,
                        const res = await axios.post('http://localhost:3000/transaction', {
                            type: 'BUY',
                            quantity: quantity,
                            sharename: "apple",
                            price: applePrice,
                            name: localStorage.getItem('name'),
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                    }
                    if (purchaseResponse.status === 200) {
                        alert("Done")
                    }
                } catch (error) {
                    console.error('Error during purchase:', error);
                }
            }
        }
        //tesla
        else if (selectedStock === "TESLA") {
            if (money < quantity * teslaPrice) {
                alert("NOT ENOUGH BALANCE");
            } else {
                try {
                    const purchaseResponse = await axios.post('http://localhost:3000/buy', {
                        quantity: quantity,
                        sharename: "TESLA",
                        name: localStorage.getItem('name'),
                        price: teslaPrice,
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    if (purchaseResponse.status === 200) {
                        // Purchase successful, deduct balance
                        const deductedBalance = Math.round((quantity * teslaPrice));

                        const balanceResponse = await axios.put('http://localhost:3000/change_balance', {
                            type: 'withdraw',
                            amount: deductedBalance,
                            name: localStorage.getItem('name'),
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                    }
                    if (purchaseResponse.status === 200) {
                        // transaction successful,
                        const res = await axios.post('http://localhost:3000/transaction', {
                            type: 'BUY',
                            quantity: quantity,
                            sharename: "tesla",
                            price: teslaPrice,
                            name: localStorage.getItem('name'),
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                    }
                    if (purchaseResponse.status === 200) {
                        alert("Done")
                    }
                } catch (error) {
                    console.error('Error during purchase:', error);
                }
            }
        }
        else if (selectedStock === "META") {
            if (money < quantity * metaPrice) {
                alert("NOT ENOUGH BALANCE");
            } else {
                try {
                    const purchaseResponse = await axios.post('http://localhost:3000/buy', {
                        quantity: quantity,
                        sharename: "META",
                        name: localStorage.getItem('name'),
                        price: metaPrice,
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    if (purchaseResponse.status === 200) {
                        // Purchase successful, deduct balance
                        const deductedBalance = Math.round((quantity * metaPrice));

                        const balanceResponse = await axios.put('http://localhost:3000/change_balance', {
                            type: 'withdraw',
                            amount: deductedBalance,
                            name: localStorage.getItem('name'),
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                    }
                    if (purchaseResponse.status === 200) {
                        // transaction successful,
                        const res = await axios.post('http://localhost:3000/transaction', {
                            type: 'BUY',
                            quantity: quantity,
                            sharename: "meta",
                            price: metaPrice,
                            name: localStorage.getItem('name'),
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                    }
                    if (purchaseResponse.status === 200) {
                        alert("Done")
                    }
                } catch (error) {
                    console.error('Error during purchase:', error);
                }
            }
        }
        else if (selectedStock === "NVEDIA") {
            if (money < quantity * nvediaPrice) {
                alert("NOT ENOUGH BALANCE");
            } else {
                try {
                    const purchaseResponse = await axios.post('http://localhost:3000/buy', {
                        quantity: quantity,
                        sharename: "NVEDIA",
                        name: localStorage.getItem('name'),
                        price: nvediaPrice,
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    if (purchaseResponse.status === 200) {
                        // Purchase successful, deduct balance
                        const deductedBalance = Math.round((quantity * nvediaPrice));

                        const balanceResponse = await axios.put('http://localhost:3000/change_balance', {
                            type: 'withdraw',
                            amount: deductedBalance,
                            name: localStorage.getItem('name'),
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                    }
                    if (purchaseResponse.status === 200) {
                        // transaction successful,
                        const res = await axios.post('http://localhost:3000/transaction', {
                            type: 'BUY',
                            quantity: quantity,
                            sharename: "nvedia",
                            price: nvediaPrice,
                            name: localStorage.getItem('name'),
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                    }
                    if (purchaseResponse.status === 200) {
                        alert("Done")
                    }
                } catch (error) {
                    console.error('Error during purchase:', error);
                }
            }
        }
        else if (selectedStock === "NETFLIX") {
            if (money < quantity * netflixPrice) {
                alert("NOT ENOUGH BALANCE");
            } else {
                try {
                    const purchaseResponse = await axios.post('http://localhost:3000/buy', {
                        quantity: quantity,
                        sharename: "NETFLIX",
                        name: localStorage.getItem('name'),
                        price: netflixPrice,
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    if (purchaseResponse.status === 200) {
                        // Purchase successful, deduct balance
                        const deductedBalance = Math.round((quantity * netflixPrice));

                        const balanceResponse = await axios.put('http://localhost:3000/change_balance', {
                            type: 'withdraw',
                            amount: deductedBalance,
                            name: localStorage.getItem('name'),
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                    }
                    if (purchaseResponse.status === 200) {
                        // transaction successful,
                        const res = await axios.post('http://localhost:3000/transaction', {
                            type: 'BUY',
                            quantity: quantity,
                            sharename: "netflix",
                            price: netflixPrice,
                            name: localStorage.getItem('name'),
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                    }
                    if (purchaseResponse.status === 200) {
                        alert("Done")
                    }
                } catch (error) {
                    console.error('Error during purchase:', error);
                }
            }
        }

    };



    return (
        <div>
            <h1 className="text-6xl flex justify-center">Market</h1>
            <div className="grid grid-cols-12">
                <div className="col-span-5">
                    <div className=" ml-56 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="mb-4">
                            <h1 className="flex justify-center text-3xl font-bold leading-none text-gray-900 dark:text-white">Live Market</h1>
                        </div>
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-3 sm:py-4 hover:blur-sm hover:cursor-pointer" onClick={() => handleClick("APPLE")}>
                                    <div className="flex items-center  group  justify-center cursor-pointer relative">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={apple} alt="img" />
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                <h1 className="text-lg">APPLE</h1>
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            {`${applePrice}$`}
                                        </div>
                                    </div>
                                </li>
                                <li className="py-3 sm:py-4 hover:blur-sm hover:cursor-pointer" onClick={() => handleClick("TESLA")}>
                                    <div className="flex items-center  group  justify-center cursor-pointer relative">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={tesla} alt="img" />
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                <h1 className="text-lg">TESLA</h1>
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            {`${teslaPrice}$`}
                                        </div>
                                    </div>
                                </li>
                                <li className="py-3 sm:py-4 hover:blur-sm hover:cursor-pointer" onClick={() => handleClick("META")}>
                                    <div className="flex items-center  group  justify-center cursor-pointer relative">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={meta} alt="img" />
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                <h1 className="text-lg">META</h1>
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            {`${metaPrice}$`}
                                        </div>
                                    </div>
                                </li>
                                <li className="py-3 sm:py-4 hover:blur-sm hover:cursor-pointer" onClick={() => handleClick("NVEDIA")}>
                                    <div className="flex items-center  group  justify-center cursor-pointer relative">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={nvedia} alt="img" />
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                <h1 className="text-lg">NVEDIA</h1>
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            {`${nvediaPrice}$`}
                                        </div>
                                    </div>
                                </li>
                                <li className="py-3 sm:py-4 hover:blur-sm hover:cursor-pointer" onClick={() => handleClick("NETFLIX")}>
                                    <div className="flex items-center  group  justify-center cursor-pointer relative">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={netflix} alt="img" />
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                <h1 className="text-lg">NETFLIX</h1>
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            {`${netflixPrice}$`}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-20 ml-40 max-w-xl">
                    {selectedStock && (
                        <div>
                            {selectedStock === "APPLE" && <FundamentalData symbol="NASDAQ:AAPL" theme="dark" height={300} width="100%" />}
                            {selectedStock === "TESLA" && <FundamentalData symbol="NASDAQ:TSLA" theme="dark" height={300} width="100%"  />}
                            {selectedStock === "META" && <FundamentalData symbol="NASDAQ:META" theme="dark" height={300} width="100%"  />}
                            {selectedStock === "NVEDIA" && <FundamentalData symbol="NASDAQ:NVDA" theme="dark" height={300} width="100%"   />}
                            {selectedStock === "NETFLIX" && <FundamentalData symbol="NASDAQ:NFLX" theme="dark" height={300} width="100%"    />}
                        </div>
                    )}
                    </div>
                </div>

                <div className="col-span-7">
                    {selectedStock && (
                        <div style={{height:"700px"}} className="p-6 ml-10 mr-52 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            {selectedStock === "APPLE" && <AdvancedRealTimeChart symbol="NASDAQ:AAPL" theme="dark" autosize/>}
                            {selectedStock === "TESLA" && <AdvancedRealTimeChart symbol="NASDAQ:TSLA" theme="dark" autosize />}
                            {selectedStock === "META" && <AdvancedRealTimeChart symbol="NASDAQ:META" theme="dark" autosize />}
                            {selectedStock === "NVEDIA" && <AdvancedRealTimeChart symbol="NASDAQ:NVDA" theme="dark" autosize  />}
                            {selectedStock === "NETFLIX" && <AdvancedRealTimeChart symbol="NASDAQ:NFLX" theme="dark" autosize   />}
                        </div>
                    )}
                    {!selectedStock && (
                        <div className="p-6 ml-10 mr-52 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <p className="text-center text-gray-500">Select a stock to view the graph</p>
                        </div>
                    )}
                    <div className="flex justify-start">
                        <div>
                            <a className=" ml-10 mt-5 inline-flex items-center px-3 mr-5 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <button onClick={handleAdd}>buy</button>
                            </a>
                        </div>
                        {showAddInput && (
                            <div className=" mt-4 flex justify-center">
                                <input
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="border bg-slate-800 border-gray-300  rounded-md py-2 px-4"
                                />
                                <button className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md" onClick={conform}>OK</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
