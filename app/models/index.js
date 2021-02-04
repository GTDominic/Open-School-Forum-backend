const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// initializing user models
db.user = require("./user.model.js")(sequelize, Sequelize);
db.rank = require("./rank.model.js")(sequelize, Sequelize);
db.user_ranks = require("./user_ranks.model")(sequelize, Sequelize);
db.thread = require("./thread.model")(sequelize, Sequelize);

// link user and rank as Many-To-Many
db.user.belongsToMany(db.rank, { through: 'user_ranks'});
db.rank.belongsToMany(db.user, { through: 'user_ranks'});

// link user and thread
db.user.hasMany(db.thread);
db.thread.belongsTo(db.user);

module.exports = db;
