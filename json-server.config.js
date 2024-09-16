import jsonServer from 'json-server';
import jwt from 'jsonwebtoken';
import 'dotenv/config'; // Carregar variáveis de ambiente

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const SECRET_KEY = process.env.SECRET_KEY;

console.log('SECRET_KEY:', SECRET_KEY); // Debug: Verificar se a chave secreta está carregada

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = router.db.get('users').value();

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const token = jwt.sign({ id: user.id }, SECRET_KEY, {
            expiresIn: '5h',
        });
        res.status(200).json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

server.get('/auth/status', (req, res) => {
    res.status(200).json({ authenticated: true, user: req.user });
});

server.post('/verify-password', (req, res) => {
    const { password } = req.body;
    const users = router.db.get('users').value();

    const user = users.find(u => u.password === password);

    if (user) {
        res.status(200).json({ valid: true });
    } else {
        res.status(401).json({ error: 'Senha incorreta' });
    }
});

const authenticateJWT = (req, res, next) => {
    const token =
        req.headers['authorization'] &&
        req.headers['authorization'].split(' ')[1];
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
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

server.get('/balance', authenticateJWT, (req, res) => {
    console.log(authenticateJWT, 'teste');
    const balance = router.db.get('balance').value();
    res.status(200).json(balance);
});

server.post('/transactions', authenticateJWT, (req, res) => {
    const { amount, type } = req.body;
    const balance = router.db.get('balance').value();

    if (balance.balance < amount) {
        res.status(400).json({ error: 'Saldo insuficiente' });
        return;
    }

    const newBalance = balance.balance - amount;
    router.db.get('balance').assign({ balance: newBalance }).write();

    const newTransaction = {
        ...req.body,
        id: Date.now(),
        description: 'Transferência',
    };
    router.db.get('transactions').push(newTransaction).write();

    res.status(200).json({
        message: 'Transação realizada com sucesso',
        newBalance,
    });
});

server.get('/transactions', authenticateJWT, (req, res) => {
    const { type, startDate, endDate, minAmount, maxAmount, sortBy } =
        req.query;
    let transactions = router.db.get('transactions').value();

    const start = startDate ? new Date(startDate + 'T00:00:00Z') : null;
    const end = endDate
        ? new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1))
        : null;

    console.log('Received filters:', {
        type,
        startDate,
        endDate,
        minAmount,
        maxAmount,
    });

    if (type) {
        transactions = transactions.filter(t => t.type === type);
    }

    if (start && end) {
        transactions = transactions.filter(
            t => new Date(t.date) >= start && new Date(t.date) <= end,
        );
    }

    if (minAmount && maxAmount) {
        transactions = transactions.filter(
            t => t.amount >= minAmount && t.amount <= maxAmount,
        );
    }

    if (sortBy) {
        transactions = transactions.sort(
            (a, b) => new Date(a.date) - new Date(b.date),
        );
        if (sortBy === 'amount') {
            transactions = transactions.sort((a, b) => a.amount - b.amount);
        }
    }

    res.json(transactions);
});

server.use(router);
server.listen(5000, () => {
    console.log('JSON Server is running on http://localhost:5000');
});
