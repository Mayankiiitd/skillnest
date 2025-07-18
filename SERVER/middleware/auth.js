const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

// Middleware to check if the request has a valid JWT token
exports.auth = async (req, res, next) => {
	try {
		const token =
			req.cookies?.token ||
			req.body?.token ||
			req.header("Authorization")?.replace("Bearer ", "");

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Token Missing",
			});
		}

		// Verifying token
		try {
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			req.user = decode; // Attach decoded data to request
		} catch (err) {
			return res.status(401).json({
				success: false,
				message: "Invalid Token",
			});
		}

		next();
	} catch (error) {
		console.error("Auth middleware error:", error);
		return res.status(500).json({
			success: false,
			message: "Something Went Wrong While Validating the Token",
		});
	}
};

// Middleware to check if user is Student
exports.isStudent = async (req, res, next) => {
	try {
		const userDetails = await User.findById(req.user.id);
		if (!userDetails || userDetails.accountType !== "Student") {
			return res.status(403).json({
				success: false,
				message: "Access Denied: Only Students Allowed",
			});
		}
		next();
	} catch (error) {
		console.error("isStudent error:", error);
		return res.status(500).json({
			success: false,
			message: "User Role Can't be Verified",
		});
	}
};

// Middleware to check if user is Admin
exports.isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findById(req.user.id);
		if (!userDetails || userDetails.accountType !== "Admin") {
			return res.status(403).json({
				success: false,
				message: "Access Denied: Only Admins Allowed",
			});
		}
		next();
	} catch (error) {
		console.error("isAdmin error:", error);
		return res.status(500).json({
			success: false,
			message: "User Role Can't be Verified",
		});
	}
};

// Middleware to check if user is Instructor
exports.isInstructor = async (req, res, next) => {
	try {
		const userDetails = await User.findById(req.user.id);
		if (!userDetails || userDetails.accountType !== "Instructor") {
			return res.status(403).json({
				success: false,
				message: "Access Denied: Only Instructors Allowed",
			});
		}
		next();
	} catch (error) {
		console.error("isInstructor error:", error);
		return res.status(500).json({
			success: false,
			message: "User Role Can't be Verified",
		});
	}
};
