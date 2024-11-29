const passwordValidator = require('password-validator');

const schema = new passwordValidator();

schema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().symbols(1)
  .has().not().spaces();

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  
  if (!schema.validate(password)) {
    return res.status(400).json({
      message: 'Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and symbols'
    });
  }
  
  next();
};

module.exports = validatePassword; 