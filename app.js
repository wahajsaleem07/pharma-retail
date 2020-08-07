const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const cors = require('cors')

require('./api/models/Country');

const brandRoutes = require('./api/routes/brands');
const productRoutes = require('./api/routes/product');
const lookupRoutes = require('./api/routes/lookup');
const userRoutes = require('./api/routes/user');
const branchRoutes = require('./api/routes/branch');
const productCategoriesRoutes = require('./api/routes/product-categories');
const productTypeRoutes = require('./api/routes/product-type');
const productOriginRoutes = require('./api/routes/product-origin');
const supplierRoutes = require('./api/routes/supplier');
const inventoryRoutes = require('./api/routes/inventory');

//mongoose.connect('mongodb+srv://the-medic-admin:' + process.env.MONGO_ATLAS_PW +'@the-medics-demo.nup3i.azure.mongodb.net/the-medics-demo?retryWrites=true&w=majority', {useNewUrlParser: true});

//mongoose.connect('mongodb://the-medics-db:' + process.env.MONGO_ATLAS_PW +'@the-medics-db.documents.azure.com:10255/mean-dev?ssl=true&sslverifycertificate=false');
//mongoose.connect('mongodb://the-medics-db:YxykP1zfU8eS9FPPoJyQag66WakMgxEmsoTEqewKMaTBbUgUMvPpHjTkc5nXDvBTGBacREBajJAOjLiRjkLypA==@the-medics-db.documents.azure.com:10255/?ssl=true&replicaSet=globaldb')
mongoose.connect('mongodb://the-medics-db.documents.azure.com:10255/the-medics-db?ssl=true', {
    auth: {
      user: 'the-medics-db',
      password: 'YxykP1zfU8eS9FPPoJyQag66WakMgxEmsoTEqewKMaTBbUgUMvPpHjTkc5nXDvBTGBacREBajJAOjLiRjkLypA=='
    }
  })

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH");
        return res.status(200).json({});
    }
    next();
})

//Routes
app.use('/product', productRoutes);
app.use('/lookup', lookupRoutes);
app.use('/user', userRoutes);
app.use('/branch', branchRoutes);
app.use('/brand', brandRoutes);
app.use('/product-category', productCategoriesRoutes);
app.use('/product-origin', productOriginRoutes);
app.use('/product-type', productTypeRoutes);
app.use('/supplier', supplierRoutes);
app.use('/inventory', inventoryRoutes);

//Error Handling
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
   res.status(error.status || 500);
   
   res.json({
       error: {
           message: error.message
       }
   })
});

module.exports = app;