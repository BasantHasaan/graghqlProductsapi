module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      seller: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {},
  );
  Product.associate = (models) => {
    Product.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Product;
};
