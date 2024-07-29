require('dotenv/config')

const mongoose = require('mongoose')
const app = require('./app')


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`listening to ${process.env.PORT} and running in ${process.env.NODE_ENV} mode`);
    })
}).catch(err => {
    console.log(err);
})