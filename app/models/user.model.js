module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        Username: {
            type: Sequelize.STRING, allowNull: false
        },
        FirstName: {
            type: Sequelize.STRING, allowNull: false
        },
        LastName: {
            type: Sequelize.STRING, allowNull: false
        },
        Email: {
            type: Sequelize.STRING, allowNull: false
        },
        Password: {
            type: Sequelize.STRING, allowNull: false
        }
    });

    return User;
};