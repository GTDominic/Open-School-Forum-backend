module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        Titel: {
            type: Sequelize.STRING
        },
        Message: {
            type: Sequelize.TEXT
        }
    });
    return Post;
};