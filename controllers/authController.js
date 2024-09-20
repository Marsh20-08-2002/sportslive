const crypto = require("crypto");

const { promisify } = require("util");

const jwt = require("jsonwebtoken");

const User = require("./../models/userModel");

const catchAsync = require("./../utils/catchAsync");

const AppError = require("./../utils/appError");

const Email = require("./../utils/email");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  //this is one of the most insecure way and there is the security flaw watch video 129
  // const newUser = await User.create(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  //the url from the email.js is coming from here
  //willdo this 18/9/2024-------------------------------
  //   const url = `${req.protocol}://${req.get("host")}/me`;
  //   // console.log(url);
  //   await new Email(newUser, url).sendWelcome();

  //video 129

  //implementing jwt
  // const token = signToken(newUser._id);
  // createSendToken('success', 200, newUser);
  // res.status(200).json({
  //   status: 'success',
  //   token,
  //   data: {
  //     user: newUser
  //   }
  // });
  const token = signToken(newUser._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  newUser.password = undefined;

  res.status(200).json({
    status: "success",
    token,
    data: newUser, // Change from { newUser } to newUser
  });
});

//-------------------------------------------------------------------
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
  console.log(user);
});
///////---------------------------------------------------------------
exports.protect = catchAsync(async (req, res, next) => {
  //1) getting the token and check its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  // console.log(token);

  if (!token) {
    return next(
      new AppError("you are not logged in !! please login to get access", 401)
    );
  }

  //2) verification token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);

  //3)check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("THE TOKEN BELONGING TO THE USER DOES NO LONGER EXISTS", 401)
    );
  }

  //4)check if user change password after jwt was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("use recently changed password ! please login again...", 401)
    );
  }

  //the next is basically it will grant access to the protected route
  req.user = freshUser;

  // something because this is used in frontend not in backend so the res.locals use for frontend to store the user
  res.locals.user = freshUser;

  next();
});

//--------------------------------------------------------------

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //req.user we specified i.e.  we saved the logined user in tht above as req.user=fresh user
    //////this is very important ***************************
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "Sorry you do not have permission to perform this action !!!",
          403
        )
      );
    }
    next();
  };
};

///-----------------------------------------------------------------
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

////----------------------------------------------------------------
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
