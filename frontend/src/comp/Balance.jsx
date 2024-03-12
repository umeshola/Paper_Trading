import { useEffect, useState } from "react";
import both from '../assets/both.jpg'
import axios from 'axios'
import apple from '../assets/apple.jpeg';
import tesla from '../assets/tesla.jpeg';
import meta from '../assets/meta.jpeg';
import nvedia from '../assets/nvedia.jpeg';
import netflix from '../assets/netfilx.jpeg';

export default function Balance() {
    const [money, setMoney] = useState(0);
    const [showWithdrawInput, setShowWithdrawInput] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [showAddInput, setShowAddInput] = useState(false);
    const [addAmount, setAddAmount] = useState(0);
    //news
    const [new1, setNews1] = useState("");
    const [img1, setImg1] = useState("");

    const [new2, setNews2] = useState("");
    const [img2, setImg2] = useState("");

    const [new3, setNews3] = useState("");
    const [img3, setImg3] = useState("");

    const [new4, setNews4] = useState("");
    const [img4, setImg4] = useState("");

    const [new5, setNews5] = useState("");
    const [img5, setImg5] = useState("");

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:3000/get_transactions', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    name: localStorage.getItem('name'),
                }
            });
            setTransactions(res.data.reverse());
        } catch (error) {
            console.error("Error fetching user transactions:", error);
        }
    }





    //news
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
        checkBalance();
        const news = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/news`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });


                const newsWithImages = res.data.data.filter(item => item.image !== '');
                // Select the first five entries from the filtered array
                const topFiveNewsWithImages = newsWithImages.slice(0, 5);

                // Extracting news headlines and images
                const headlines = topFiveNewsWithImages.map(item => item.headline);
                const images = topFiveNewsWithImages.map(item => item.image);

                // Set state variables for news headlines and images
                setNews1(headlines[0]);
                setImg1(images[0]);
                setNews2(headlines[1]);
                setImg2(images[1]);
                setNews3(headlines[2]);
                setImg3(images[2]);
                setNews4(headlines[3]);
                setImg4(images[3]);
                setNews5(headlines[4]);
                setImg5(images[4]);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        news()

        const intervalId = setInterval(() => {
            news()
        }, 600000);

        return () => {
            clearInterval(intervalId);
        };

    }, []);

    const handleAdd = async () => {
        setShowAddInput(true);
    };
    const confirmAddition = async () => {
        const parsedAddAmount = parseInt(addAmount, 10);
        const res = await axios.put('http://localhost:3000/change_balance', {
            type: 'add',
            amount: parsedAddAmount,
            name: localStorage.getItem('name'),
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        checkBalance();
        setShowAddInput(false);
        setAddAmount(0);
    };

    const handleWithdraw = () => {
        setShowWithdrawInput(true);
    };

    const confirmWithdrawal = async () => {
        const parsedWithdrawAmount = parseInt(withdrawAmount, 10);
        const res = await axios.put('http://localhost:3000/change_balance', {
            type: 'withdraw',
            amount: parsedWithdrawAmount,
            name: localStorage.getItem('name'),
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        checkBalance();
        setShowWithdrawInput(false);
        setWithdrawAmount(0);
    };

    return (
        <div>
            <h1 className="text-6xl flex justify-center mb-20">Balance</h1>
            <div className="grid grid-cols-12">
                <div className="col-span-4">
                    <div className="max-w-sm ml-56 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-2xl flex justify-center font-bold tracking-tight text-gray-900 dark:text-white">Balance</h5>
                        <p className="text-2xl flex justify-center font-normal text-gray-700 dark:text-gray-400">{money}$</p>
                        <div className="flex justify-center mt-10">
                            <a className="inline-flex items-center px-3 mr-5 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <button onClick={handleAdd}>Add</button>
                            </a>
                            <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <button onClick={handleWithdraw}>Withdraw</button>
                            </a>
                        </div>
                        {showAddInput && (
                            <div className="mt-4 flex justify-center">
                                <input
                                    value={addAmount}
                                    onChange={(e) => setAddAmount(e.target.value)}
                                    className="border bg-slate-800 border-gray-300  rounded-md py-2 px-4"
                                />
                                <button className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md" onClick={confirmAddition}>OK</button>
                            </div>
                        )}
                        {showWithdrawInput && (
                            <div className="mt-4 flex justify-center">
                                <input
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    className="border bg-slate-800 border-gray-300  rounded-md py-2 px-4"
                                />
                                <button className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md" onClick={confirmWithdrawal}>OK</button>
                            </div>
                        )}
                    </div>

                    <div className="ml-56 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="mb-4">
                            <h1 className="flex justify-center text-3xl font-bold leading-none text-gray-900 dark:text-white">Recent Transaction</h1>
                        </div>
                        <div className="flow-root overflow-y-auto max-h-80">
                            {transactions.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400">NO TRANSACTION YET</p>}
                            {transactions.length > 0 && (
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {transactions.map((transaction, index) => (
                                        <li key={index} className="py-3 sm:py-4">
                                            <div className="flex items-center ">
                                                <div className="flex-shrink-0">
                                                    <img className="w-8 h-8 rounded-full" src={getStockImage(transaction.stockname)} alt={`${transaction.stockname} image`} />
                                                </div>
                                                <div className="flex-1 min-w-0 ms-4">
                                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        {new Date(transaction.time).toLocaleString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: '2-digit',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit',
                                                        })}
                                                    </p>
                                                    <p className={`text-md font-semibold truncate ${transaction.type === 'SELL' ? 'text-red-500 dark:text-red-500' : 'text-green-500 dark:text-green-500'}`}>
                                                        {transaction.quantity}
                                                    </p>
                                                </div>
                                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    ${transaction.srockprice}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-span-8">
                    <div style={{maxHeight:"660px"}} className="overflow-y-auto ml-10 lg:ml-56 mr-32 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-2xl flex justify-center font-bold tracking-tight text-gray-900 dark:text-white">News</h5>
                        <div className="flex items-center">
                            <img className="w-36 grayscale h-28 rounded-l-3xl" src={img1} alt="img" />
                            <p className="ml-4 text-pretty text-2xl ">{new1}</p>
                        </div>
                        <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <div className="flex items-center">
                            <img className="w-36 grayscale h-28 rounded-l-3xl" src={img2} alt="img" />
                            <p className="ml-4 text-pretty text-2xl ">{new2}</p>
                        </div>
                        <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <div className="flex items-center">
                            <img className="w-36 grayscale h-28 rounded-l-3xl" src={img3} alt="img" />
                            <p className="ml-4 text-pretty text-2xl ">{new3}</p>
                        </div>
                        <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <div className="flex items-center">
                            <img className="w-36 grayscale h-28 rounded-l-3xl" src={img4} alt="img" />
                            <p className="ml-4 text-pretty text-2xl ">{new4}</p>
                        </div>
                        <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <div className="flex items-center">
                            <img className="w-36 grayscale h-28 rounded-l-3xl" src={img5} alt="img" />
                            <p className="ml-4 text-pretty text-2xl ">{new5}</p>
                        </div>
                        <div className="flex justify-center mt-10">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


function getStockImage(stockname) {
    switch (stockname.toLowerCase()) {
        case 'apple':
            return apple;
        case 'tesla':
            return tesla;
        case 'meta':
            return meta;
        case 'nvedia':
            return nvedia;
        case 'netflix':
            return netflix;
        default:
            return ''; // You can provide a default image here if needed
    }
}