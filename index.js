const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphds = require('express-handlebars');
const todoRoutes = require('./routes/todos');

const PORT = process.env.PORT || 3000;

const app = express();

// настройка конфигураций шаблонизатора
const hbs = exphds.create({
    defaultLayout: 'main', //шаблон по умолчанию
    extname:'hbs' //меняем расширение с 'handlebars' на 'hbs'
});

app.engine('hbs', hbs.engine); // регистрируем движок в приложении
app.set('view engine', 'hbs');
app.set('views','views'); // регистрируем директорию хранения шаблонов

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use(todoRoutes);

async function start(){
    try {
        await mongoose.connect(
            'mongodb+srv://vladimir:1q2w3e4r@cluster0-ma6tv.mongodb.net/todos',
            {
            useNewUrlParser:true,
            useFindAndModify: false
        });

        app.listen(PORT,()=>{
            console.log('Server has been started...')
        });

    } catch (e) {
        console.log(e)
    }
}

start();