module.exports = (sequelize, Sequelize) => {
    const Thread = sequelize.define("thread", {
        Titel: {
            type: Sequelize.STRING
        }
    });

    return Thread;
}