module.exports = (sequelize, Sequelize) => {
    const Rank = sequelize.define("rank", {
        Name: {
            type: Sequelize.STRING, allowNull: false
        },
        Display_priority: {
            type: Sequelize.INTEGER, allowNull: false   //1 reserved for categories
        },
        On_register: {
            type: Sequelize.BOOLEAN, allowNull: false   //true if rank can be choosed on start
        }
    });

    return Rank;
};