import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  `mysql://avnadmin:AVNS_TToFYD07zvFZ9k5bBhc@quiz-app-moazhazem2211-b44b.j.aivencloud.com:25926/defaultdb`
);

const db = async () => {
  try {
    await sequelize.sync({ alter: false, force: false });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default db;
