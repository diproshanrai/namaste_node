const { DataTypes} = require("sequelize");
const sequelize = require("../utils/sequelize");

const User = sequelize.define("User", {
    firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    middleName: {
        type: DataTypes.STRING,
        allwNull:true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    }
});

module.exports = User;