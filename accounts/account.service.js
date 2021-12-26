const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

module.exports = {
  authenticate,
  register,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate({ email, password }) {
  const account = await db.Account.findOne({ email });

  if (
    !account ||
    !bcrypt.compareSync(password, account.passwordHash)
  ) {
    throw "Email or password is incorrect";
  }

  // authentication successful so generate jwt and refresh tokens
  const jwtToken = generateJwtToken(account);

  // return basic details and tokens
  return {
    ...basicDetails(account),
    jwtToken,
  };
}

async function register(params, origin) {
  // validate
  if (await db.Account.findOne({ email: params.email })) {
    // send already registered error in email to prevent account enumeration
    throw "User is already Registered";
  }

  // create account object
  const account = new db.Account(params);

  // hash password
  account.passwordHash = hash(params.password);

  // save account
  await account.save();

}

async function getById(id) {
  const account = await getAccount(id);
  return basicDetails(account);
}

async function create(params) {
  // validate
  if (await db.Account.findOne({ email: params.email })) {
    throw 'Email "' + params.email + '" is already registered';
  }

  const account = new db.Account(params);

  // hash password
  account.passwordHash = hash(params.password);

  // save account
  await account.save();

  return basicDetails(account);
}

async function update(id, params) {
  const account = await getAccount(id);

  // validate (if email was changed)
  if (
    params.email &&
    account.email !== params.email &&
    (await db.Account.findOne({ email: params.email }))
  ) {
    throw 'Email "' + params.email + '" is already taken';
  }

  // hash password if it was entered
  if (params.password) {
    params.passwordHash = hash(params.password);
  }

  // copy params to account and save
  Object.assign(account, params);
  account.updated = Date.now();
  await account.save();

  return basicDetails(account);
}

async function _delete(id) {
  const account = await getAccount(id);
  await account.remove();
}

async function getAccount(id) {
  if (!db.isValidId(id)) throw "Account not found";
  const account = await db.Account.findById(id);
  if (!account) throw "Account not found";
  return account;
}

function hash(password) {
  return bcrypt.hashSync(password, 10);
}

function generateJwtToken(account) {
  // create a jwt token containing the account id that expires in 15 minutes
  return jwt.sign({ sub: account.id, id: account.id }, config.secret, {
    expiresIn: "2d",
  });
}

function basicDetails(account) {
  const {
    id,
    firstName,
    lastName,
    email,
    createdAt,
    updatedAt,
    picture,
  } = account;
  return {
    id,
    firstName,
    lastName,
    email,
    createdAt,
    updatedAt,
    picture,
  };
}