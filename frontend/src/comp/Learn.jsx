import React from 'react';

const Learn = () => {
    return (
        <div className="learn-container">
            <h1 className='text-4xl text-gray-400'>Welcome to the World of Stocks!</h1>
            <p className="intro-text">Investing in stocks can be an exciting journey towards financial growth and stability. However, it's essential to understand the basics before diving in. This comprehensive guide aims to provide beginners with a solid foundation in understanding the stock market, including its mechanisms, key terminologies, strategies, and risks.</p>

            <div className="chapter">
                <h2 className='text-xl'>Chapter 1: What is the Stock Market?</h2>
                <h3>1.1 Definition and Purpose:</h3>
                <p>The stock market refers to the collection of exchanges and markets where the buying, selling, and issuance of shares of publicly-held companies take place.</p>
                <h3>1.2 Participants:</h3>
                <ul>
                    <li>Investors: Individuals or institutions who buy and sell stocks.</li>
                    <li>Companies: Entities that issue stocks to raise capital.</li>
                    <li>Stock Exchanges: Platforms where stocks are traded, such as the New York Stock Exchange (NYSE) and NASDAQ.</li>
                </ul>
                <h3>1.3 Function:</h3>
                <p>The primary function of the stock market is to facilitate the transfer of ownership of companies from one party to another and to provide companies with access to capital for growth and expansion.</p>
            </div>

            <div className="chapter">
                <h2 className='text-xl'>Chapter 2: How Does the Stock Market Work?</h2>
                <h3>2.1 Stock Issuance:</h3>
                <p>When a company decides to go public, it issues shares of stock to the public through an initial public offering (IPO) or a direct listing.</p>
                <h3>2.2 Stock Trading:</h3>
                <p>Stocks are bought and sold through stock exchanges or over-the-counter (OTC) markets. Investors place buy or sell orders through brokers or online trading platforms.</p>
                <h3>2.3 Price Determination:</h3>
                <p>Stock prices are influenced by various factors, including supply and demand, company performance, economic conditions, and investor sentiment.</p>
            </div>

            <div className='flex'>
                <h1 className='text-xl'>Some Links</h1>
                <a href="https://www.kepdf.com/english/the-intelligent-investor-pdf" target="_blank" rel="noopener noreferrer"><button className='px-5 text-blue-600 hover:underline'>Intelligent Investor</button></a>
                <a href="https://allbooksworld.com/market-wizards-by-jack-schwager/" target="_blank" rel="noopener noreferrer"><button className='px-5 text-blue-600 hover:underline'>MarketT W</button></a>
                <a href="https://zerodha.com/varsity/" target="_blank" rel="noopener noreferrer"><button className='px-5 text-blue-600 hover:underline'>MORE</button></a>
            </div>

            <div className="conclusion">
                <h2 className='text-xl'>Conclusion:</h2>
                <p>Congratulations! You've completed your first step towards understanding the stock market. Remember, investing involves risks, and it's crucial to conduct thorough research, diversify your portfolio, and consult with financial professionals before making any investment decisions. Happy investing!</p>
            </div>
        </div>
    );
};

export default Learn;
