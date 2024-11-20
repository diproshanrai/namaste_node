const Sequelize = require("sequelize");

const sequelize = new Sequelize("dummyDB", "root", "namastenode", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate().then(()=> {
    console.log("connection is good to go");
}).catch((err)=>{
console.error("connection failed", err)
});

module.exports = sequelize;