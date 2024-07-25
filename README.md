# Paper Trading App

Paper Trading App is a web application that allows users to practice trading stocks and cryptocurrencies without using real money. It provides a simulated trading environment where users can buy and sell virtual assets, track their portfolio, and analyze their performance.

## Features

- **User Authentication**: Users can sign up and log in to the platform securely.
- **Paper Trading**: Users can trade virtual stocks and cryptocurrencies with simulated funds.
- **Portfolio Management**: Users can view their current holdings, including the quantity of assets owned and their current value.
- **Transaction History**: Users can access a history of their past transactions to track their trading activity.
- **Real-time Market Data**: The app provides real-time market data for stocks and cryptocurrencies, allowing users to make informed trading decisions.
- **News Feed**: Users can access the latest news related to the financial markets to stay updated.
- **Balance Management**: Users can manage their virtual balance and deposit or withdraw simulated funds.

## Technologies Used

- **Frontend**: React.js, Redux, HTML, CSS
- **Backend**: Node.js, Express.js, JWT for authentication
- **Database**: PostgreSQL
- **API Integration**: Finnhub API for real-time market data and news
- **Deployment**: Heroku for backend, Netlify for frontend

## Getting Started

1. Clone the repository
2. Install dependencies for both frontend and backend
3. Set up environment variables

   - Create a `.env` file in the `server` directory.
   - Add necessary environment variables (e.g., database connection string, API keys).
   - Example:
     ```
     PORT=3000
     DATABASE_URL=your-database-connection-string
     FINNHUB_API_KEY=your-finnhub-api-key
     ```

4. Start the backend server
5. Start the frontend development server
6. . Access the application in your browser at `http://localhost:3000`
