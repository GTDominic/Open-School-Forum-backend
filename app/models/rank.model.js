module.exports = (sequelize, Sequelize) => {
    const Rank = sequelize.define("rank", {
        Name: {
            type: Sequelize.STRING, allowNull: false
        },
        Display_priority: {
            type: Sequelize.INTEGER, allowNull: false
        }
    });

    return Rank;
};