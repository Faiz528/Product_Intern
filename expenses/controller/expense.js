const Expense = require("../../model/expense");
const jwt = require('jsonwebtoken');
const User = require('../../model/user');


exports.Featured = async (req, res) => {
  try {
      // Query the database to find products with featured field set to true
      const featuredProducts = await Expense.find({ featured: true });

      // Return the fetched featured products as a response
      res.json(featuredProducts);
  } catch (error) {
      console.error('Error fetching featured products:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};
exports.PostExpense = async (req, res, next) => {
  try {
    const {productId, name, price, featured, rating, company } = req.body;
    const token = req.header('Authorisation');
    const userid = jwt.verify(token, 'secret').id;
    console.log(userid);

    const newExpense = new Expense({
      productId: productId,
      name: name,
      price: price,
      rating: rating,
      featured: featured,
      company : company
    });

    const result = await newExpense.save();

    console.log(result);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.GetExpense = async (req, res, next) => {
  try {
    const result = await Expense.find();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};






exports.DeleteExpense = async (req, res, next) => {
  try {
    console.log(req.params._id)
    const user = await Expense.findById(req.params.id);
    const result = await user.deleteOne();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.EditExpense = async (req, res, next) => {
  try {
    const user = await Expense.findById(req.params.id);
    console.log(user)
    console.log("happy");
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.UpdateExpense = async (req, res, next) => {
  try {
    console.log(req.body);
    const data = await Expense.findById(req.params.id);
    console.log(data)
    data.productId = req.body.productId;
    data.name = req.body.name;
    data.price = req.body.price
    data.rating = req.body.rating
    data.company= req.body.company
    await data.save();
    res.json(data);
    console.log(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};




