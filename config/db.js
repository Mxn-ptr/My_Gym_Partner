const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.zsjhzsx.mongodb.net/mygymproject",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion to MongoDB successed !'))
  .catch((err) => console.log('Connexion to MongoDB failed !', err))
