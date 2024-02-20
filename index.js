const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use((req,res,next) => {
    req.requestTime = Date.now();
    console.log(req.method,req.path);
    next();
})

app.use('/dogs', (req,res,next) => {
    console.log('犬ーー');
    next();
});

const verifyPassword = ((req,res,next) => {
    const {password} = req.query;
    if (password === 'supersecret'){
        return next();
    }
    res.send('パスワードが必要です。');
});

// app.use((req,res,next) => {
//     console.log('初めてのミドルウェア');
//     next();
// });

app.get('/', (req,res) => {
    console.log(`リクエスト時刻：${req.requestTime}`);
    res.send('ホームページ');
});

app.get('/dogs', (req,res) => {
    console.log(`リクエスト時刻：${req.requestTime}`);
    res.send('わんわん');
});

app.get('/secret',verifyPassword, (req,res) => {
    res.send('ここは秘密のページです。');
});

app.use((req,res) => {
    res.status(404).send('ページが見つかりません');
});

app.listen(3000,() => {
    console.log('localhost:3000で待受中');
});