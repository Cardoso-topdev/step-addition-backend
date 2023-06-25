module.exports = (sequelize, Sequelize) => {
  const Entries = sequelize.define("entries", {
    firstNumber: {
      type: Sequelize.STRING
    },
    secondNumber: {
      type: Sequelize.STRING
    },
    steps: {
      type: Sequelize.TEXT
    }
  });

  return Entries;
};