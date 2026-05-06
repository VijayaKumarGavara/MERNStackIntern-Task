const User = require("../models/User");
const { Parser } = require("json2csv");

// Create User
exports.createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, mobile, gender, status, location } =
      req.body;

    const user = await User.create({
      firstName,
      lastName,
      email,
      mobile,
      gender,
      status,
      location,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Users with Pagination
exports.getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();
    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get Single User
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Update User
exports.updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, mobile, gender, status, location } =
      req.body;

    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, mobile, gender, status, location },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Search Users
exports.searchUsers = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const users = await User.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { mobile: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    next(error);
  }
};

// Export Users to CSV
exports.exportUsersToCSV = async (req, res, next) => {
  try {
    const users = await User.find().lean();

    if (users.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No users to export",
      });
    }

    const fields = [
      "_id",
      "firstName",
      "lastName",
      "email",
      "mobile",
      "gender",
      "status",
      "location",
      "createdAt",
    ];
    const parser = new Parser({ fields });
    const csv = parser.parse(users);

    res.header("Content-Type", "text/csv");
    res.header("Content-Disposition", "attachment; filename=users.csv");
    res.send(csv);
  } catch (error) {
    next(error);
  }
};
