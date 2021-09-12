const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/checkAuth');

const resolvers = {
  Query: {
    async user(root, { id }, { models }) {
      return models.User.findByPk(id);
    },
    async allProducts(root, args, { models }) {
      return models.Product.findAll(
        args.orderBy
          ? {
            order: [['price', args.orderBy.price]],
          }
          : {},
      );
    },
    async product(root, { id }, { models }) {
      return models.Product.findByPk(id);
    },
    async login(root, { email, password }, { models }) {
      const userExist = await models.User.findOne({ where: { email } });
      if (!userExist) {
        throw new Error('user not found');
      }
      const isEqual = await bcrypt.compare(password, userExist.password);
      if (!isEqual) {
        throw new Error('password inCorrect');
      }
      const token = jwt.sign({ userId: userExist.id }, 'myToken', {
        expiresIn: '1h',
      });
      return { userId: userExist.id, token, tokenExpiration: 1 };
    },
  },
  Mutation: {
    async createUser(root, { name, email, password }, { models }) {
      return models.User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      });
    },
    async createProduct(root, { name, price, seller }, { models, req }) {
      if (!verifyToken(req)) {
        throw new Error('not Auth');
      }
      return models.Product.create({
        userId: req.userId,
        name,
        price,
        seller,
      });
    },
  },
  User: {
    async products(user) {
      return user.getProducts();
    },
  },
  Product: {
    async user(product) {
      return product.getUser();
    },
  },
};

module.exports = resolvers;
