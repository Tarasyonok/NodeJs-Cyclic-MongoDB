require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
//const Book = require('./models/books');

const taskSchema = new Schema({
    text: String,
});

let Task = mongoose.model('task', taskSchema);

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);
const connectDB = async ()=> {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
/*
app.get('/', (req, res) => {
    res.send({title: 'Books'});
});


app.get('/add-note', async (req, res) => {
    try {
        await Book.insertMany([
            {
                title: "Songs Of Anarchy",
                body: "Body text goes here...",
            },
            {
                title: "Games of Thrones",
                body: "Body text goes here...",
            }
        ]);
        res.send("Data added!");
    } catch (error) {
        console.log("err", + error);
    }
})

app.get('/books', async (req, res) => {
    const book = await Book.find();
    if (book) {
        res.json(book);
    } else {
        res.send("Something went wrong.");
    }
});
*/
app.get(`/`, async function (req, res) {
    let tasks = await Task.find();
    res.render(`index`, {tasks: tasks});
});

app.get(`/create-task`, async function (req, res) {
    let text = req.query.text;
    let task = new Task({
        text: text
    });
    await task.save();
    res.redirect(`back`);
});


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
});