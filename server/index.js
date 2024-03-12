import express, { json } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import finnhub, { CongressionalTrading } from 'finnhub';
const app = express();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

app.use(cors());
app.use(json());
const SECRET = "Umesh"


// this when we send the other req
// headers: {
//     Authorization: `Bearer ${localStorage.getItem('token')}`
// }


// user_auth

const admin_auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


app.post('/signup', async(req, res) => {
    const { name, password } = req.body;
    let user = await prisma.user.findFirst({ where: { name } });
    if (user && user.password === password) {
        // User exists and password matches, log in the user
        const token = jwt.sign({ username: user.name, role: 'user' }, SECRET, { expiresIn: '2hr' });
        return res.status(200).json({ message: 'User logged in', token });
    } else {
        // User does not exist or password does not match, create a new user
        user = await prisma.user.create({ data: { name, password } });
        const token = jwt.sign({ username: user.name, role: 'user' }, SECRET, { expiresIn: '2hr' });
        res.status(200).json({ message: 'User created and logged in', token });
    }
});

app.get('/price_a', admin_auth, async(req, res) => {
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "cnlgbppr01qk2u6r2cb0cnlgbppr01qk2u6r2cbg"
    const finnhubClient = new finnhub.DefaultApi()

    finnhubClient.quote("AAPL", (error, data, response) => {
        // console.log(data)
        res.json({ data });
    });
})
app.get('/price_t', admin_auth, async(req, res) => {
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "cnlgbppr01qk2u6r2cb0cnlgbppr01qk2u6r2cbg"
    const finnhubClient = new finnhub.DefaultApi()

    finnhubClient.quote("TSLA", (error, data, response) => {
        // console.log(data)
        res.json({ data });
    });
})
app.get('/price_m', admin_auth, async(req, res) => {
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "cnlgbppr01qk2u6r2cb0cnlgbppr01qk2u6r2cbg"
    const finnhubClient = new finnhub.DefaultApi()

    finnhubClient.quote("META", (error, data, response) => {
        // console.log(data)
        res.json({ data });
    });
})
app.get('/price_nv', admin_auth, async(req, res) => {
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "cnlgbppr01qk2u6r2cb0cnlgbppr01qk2u6r2cbg"
    const finnhubClient = new finnhub.DefaultApi()

    finnhubClient.quote("NVDA", (error, data, response) => {
        // console.log(data)
        res.json({ data });
    });
})
app.get('/price_nt', admin_auth, async(req, res) => {
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "cnlgbppr01qk2u6r2cb0cnlgbppr01qk2u6r2cbg"
    const finnhubClient = new finnhub.DefaultApi()

    finnhubClient.quote("NFLX", (error, data, response) => {
        res.json({ data });
    });
})

//news
app.get('/news', admin_auth, async(req, res) => {
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "cnlgbppr01qk2u6r2cb0cnlgbppr01qk2u6r2cbg"
    const finnhubClient = new finnhub.DefaultApi()

    finnhubClient.marketNews("general", {}, (error, data, response) => {
        res.json({ data });
    });
})



app.get('/balance', admin_auth, async(req, res) => {
    const name = req.headers.name;
    const admin = await prisma.user.findUnique({ where: { name: name } });
    if (!admin) {
        res.status(403).json({ msg: "User doesnt exist" })
    }
    const balance = admin.balance;
    res.status(202).json({ balance })
})

// add .withdraw


app.put('/change_balance', admin_auth, async(req, res) => {

    const { type, amount, name } = req.body;
    const user = await prisma.user.findUnique({ where: { name: name } });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    let updatedBalance;
    if (type === 'add') {
        updatedBalance = user.balance + amount;
    } else {
        if (user.balance < amount) {
            return res.status(400).json({ message: "Not enough balance" });
        }
        updatedBalance = user.balance - amount;
    }

    await prisma.user.update({
        where: { name: name },
        data: { balance: updatedBalance }
    });

    return res.status(200).json({ balance: updatedBalance });

});

app.get('/get_transactions', admin_auth, async(req, res) => {
    const name = req.headers.name;
    try {
        const userTransactions = await prisma.user.findUnique({
            where: { name: name },
            include: { transaction: true } // Including all transactions associated with the user
        });

        if (!userTransactions) {
            return res.status(404).json({ message: "User not found" });
        }

        if (userTransactions.transaction.length === 0) {
            return res.status(200).json({ message: "No transactions yet" });
        }

        return res.status(200).json(userTransactions.transaction);
    } catch (error) {
        console.error("Error fetching user transactions:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
// add a tranasction
app.post('/transaction', admin_auth, async(req, res) => {
    const { quantity, sharename, name, price, type } = req.body;
    const qua = Number(quantity);
    const user = await prisma.user.findUnique({ where: { name: name } });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const data = await prisma.transaction.create({
        data: {
            stockname: sharename,
            srockprice: price,
            quantity: qua,
            time: new Date(),
            username: name,
            type: type,
        }
    });
    await prisma.user.update({
        where: { name: name },
        data: {
            transaction: {
                connect: { id: data.id } // Connect the transaction entry to the user
            }
        }
    });
    return res.status(200).json({ message: "Transaction Completed" });
})


// get all stock
app.get('/all_stock', admin_auth, async(req, res) => {
        const name = req.headers.name;
        try {
            const user = await prisma.user.findUnique({
                where: { name: name },
                include: { bought: true } // Including all transactions associated with the user
            });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (user.bought.length === 0) {
                return res.status(200).json({ message: "No bought yet" });
            }

            return res.status(200).json(user.bought);
        } catch (error) {
            console.error("Error fetching user transactions:", error);
            return res.status(500).json({ message: "Internal server error" });
        }

    })
    // sell
app.put('/sell', admin_auth, async(req, res) => {
    const { quantity, sharename, name } = req.body;
    const qua = Number(quantity);
    try {
        const user = await prisma.user.findUnique({
            where: { name: name },
            include: { bought: true }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the bought entry with the given sharename
        const boughtEntry = user.bought.find(entry => entry.stockname === sharename);

        if (!boughtEntry) {
            return res.status(404).json({ message: "Stock not found in user's portfolio" });
        }

        // Update the quantity of the bought entry
        const updatedQuantity = boughtEntry.quantity - qua;

        // If quantity becomes zero, remove the entry from the bought array
        if (updatedQuantity === 0) {
            await prisma.bought.delete({
                where: { id: boughtEntry.id }
            });
        } else {
            await prisma.bought.update({
                where: { id: boughtEntry.id },
                data: { quantity: updatedQuantity }
            });
        }

        return res.status(200).json({ message: "Sold successfully" });
    } catch (error) {
        console.error("Error selling stock:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

//buy
app.post('/buy', admin_auth, async(req, res) => {
    const { quantity, sharename, name, price } = req.body;
    const qua = Number(quantity);

    try {
        const user = await prisma.user.findUnique({
            where: { name: name },
            include: { bought: true } // Include the user's bought stocks
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user already has bought stocks with the given stockname
        const existingStock = user.bought.find(stock => stock.stockname === sharename);

        if (existingStock) {
            // Update existing entry with new quantity and calculate new average price
            const updatedQuantity = existingStock.quantity + qua;
            const updatedPrice = ((existingStock.stockprice * existingStock.quantity) + (price * qua)) / updatedQuantity;

            await prisma.bought.update({
                where: { id: existingStock.id },
                data: {
                    quantity: updatedQuantity,
                    stockprice: updatedPrice,
                    time: new Date(),
                }
            });
        } else {
            // Create a new entry
            await prisma.bought.create({
                data: {
                    stockname: sharename,
                    stockprice: price,
                    quantity: qua,
                    time: new Date(),
                    username: name
                }
            });
        }

        // Fetch updated bought array after the operation
        const updatedUser = await prisma.user.findUnique({
            where: { name: name },
            include: { bought: true } // Include the user's bought stocks
        });

        return res.status(200).json({ bought: updatedUser.bought });
    } catch (error) {
        console.error("Error during buy operation:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});