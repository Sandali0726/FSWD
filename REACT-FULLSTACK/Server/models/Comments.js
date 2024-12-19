module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define("Comments", {
      commentBody: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return comments;
  };