const sequelize = require("./src/utils/sequelize");
const User = require("./src/models/User");

User.sync().then(async()=>{
    
const newUser = await User.create({
    firstName: "kabin",
    middleName: "",
    lastName: "Karki",
    email: "msnn@gm.com",
   
})

newUser.name = "lovin";
await newUser.save();

// console.log("New User ", newUser.toJSON() )

const find = await User.findAll();
console.log("All User", JSON.stringify(find, null, 2))

}).catch((err)=>{
    console.error("failed to create table", err.message)
})



// const sequelize = require('./sequelize');
// const User = require('./user'); // Import User model

// sequelize.sync({ force: true }) // Sync the database (force: true drops and recreates tables)
//     .then(async () => {
//         console.log('Tables created successfully!');

//         // Create a new user
//         const newUser = await User.create({
//             firstName: 'Rabin',
//             lastName: 'Gurung',
//             email: 'rabin@example.com',
//         });


//         // Retrieve all users
//         const users = await User.findAll();
//         console.log('All Users:', JSON.stringify(users, null, 2));
//     })
//     .catch(err => {
//         console.error('Failed to sync:', err.message);
//     });