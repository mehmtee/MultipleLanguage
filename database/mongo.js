const mongoose = require('mongoose')
class Mongo{

  constructor(){
    this.uri = "mongodb://127.0.0.1:27017/Lang";
    this.connect();
  }
  async connect(){
    try{
      const r = await mongoose.connect(this.uri);
      console.log("db bağlanıldı");
    }catch(e){
      console.log("Error !");
      console.log(e.message);
    }
  }
}

const r  = new Mongo();

module.exports =  r;