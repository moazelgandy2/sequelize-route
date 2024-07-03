import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(`mysql://root:root@localhost:3306/sequelize`);

const db = async () => {
  try {
    await sequelize.sync({ alter: false, force: false });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default db;
