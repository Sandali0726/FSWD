const Posts = require('./Posts');  // Adjust the path if necessary

module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes", {
     
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Likes
        , {onDelete: 'cascade', 

        });
    };
  
    return Likes;
  };