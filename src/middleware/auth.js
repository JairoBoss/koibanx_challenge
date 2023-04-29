require("dotenv").config();

const unauthorized = {
  statusCode: 401,
  message: "Unauthorized",
};

exports.verifyUserToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).send(unauthorized);

  try {
    token = token.split(" ")[1];

    if (!token) return res.status(401).send(unauthorized);

    const verifiedUser = typeof token === "string";

    if (!verifiedUser)
      return res.status(401).send({ statusCode: 403, message: "Forbidden" });

    next();
  } catch (error) {
    res.status(400).send(unauthorized);
  }
};
