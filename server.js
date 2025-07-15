const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'https://eduardzhuravlev.github.io' }));
app.use(express.json());

// Временное хранение в памяти (замените на MongoDB для продакшена)
let admins = [];

// Обработчик корневого пути
app.get('/', (req, res) => {
    res.send('Сервер работает. Используйте /api/admins для управления админами.');
});

// GET /api/admins
app.get('/api/admins', (req, res) => {
    res.json({ admins });
});

// POST /api/admins
app.post('/api/admins', (req, res) => {
    const { username, password } = req.body;
    if (username && password && !admins.some(a => a.username === username)) {
        admins.push({ username, password, lastLogin: new Date().toISOString() });
        res.status(201).json({ message: 'Админ добавлен' });
    } else {
        res.status(400).json({ error: 'Неверные данные или админ уже существует' });
    }
});

// DELETE /api/admins/:username
app.delete('/api/admins/:username', (req, res) => {
    const username = req.params.username;
    const index = admins.findIndex(a => a.username === username);
    if (index !== -1) {
        admins.splice(index, 1);
        res.json({ message: 'Админ удалён' });
    } else {
        res.status(404).json({ error: 'Админ не найден' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
