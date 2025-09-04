import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { connectToDB, db } from "./db.js";
import { ObjectId } from "mongodb";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// store OTPs temporarily (for demo; in production use Redis or DB)
const otps = {};

// ✅ Mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // app password
  },
});

// 📌 Helper: send OTP
async function sendOtpEmail(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
  console.log("📩 OTP sent to:", email);
}


app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate MongoDB ObjectId
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Don’t send password back
    const { Password, ...userWithoutPassword } = user;

    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 📌 Signup
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = db.collection("users");
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await users.insertOne({ email, password: hashedPassword });

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Error signing up" });
  }
});

// 📌 Signin
// app.post("/signin", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const users = db.collection("users");
//     const user = await users.findOne({ email });

//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     // ✅ Return user id as string
//     res.json({ message: "Signin successful", userId: user._id.toString() });
//   } catch (err) {
//     res.status(500).json({ message: "Error signing in" });
//   }
// });


app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.collection("users").findOne({ email});
    if (!user) return res.status(404).json({ error: "Email not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Ensure user object retains capitalized fields
    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: "Login failed" });
  }
});

// 📌 Request OTP for password reset
app.post("/changepassword", async (req, res) => {
  try {
    const { email } = req.body;
    const users = db.collection("users");
    const user = await users.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 min expiry
    otps[email] = { code: otp, expiresAt };

    await sendOtpEmail(email, otp);

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Error sending OTP" });
  }
});

// 📌 Verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const record = otps[email];

  if (!record) return res.status(400).json({ message: "No OTP found" });

  if (Date.now() > record.expiresAt) {
    delete otps[email];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (record.code !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  res.json({ message: "OTP verified successfully" });
});

// 📌 Reset password
app.put("/changepassword", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const users = db.collection("users");
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await users.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    delete otps[email];
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error changing password" });
  }
});


// ✅ Get top 10 latest reviews
app.get("/reviews", async (req, res) => {
  try {
    const reviews = await db
      .collection("reviews")
      .find({})
      .sort({ createdAt: -1 }) // newest first
      .limit(10)
      .toArray();

    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.post("/review/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { quote, stars, position, workplace } = req.body;

    // ✅ Validate input
    if (!quote) return res.status(400).json({ error: "Review text is required" });
    if (!stars || stars < 1 || stars > 5) {
      return res.status(400).json({ error: "Stars rating must be between 1 and 5" });
    }

    // ✅ Validate ObjectId format
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    // ✅ Check if user exists
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
    if (!user) return res.status(404).json({ error: "User not found" });

    // ✅ Build review object
    const review = {
      quote,
      stars,
      initials: user.fullname ? user.fullname[0].toUpperCase() : "U",
      name: user.fullname || "Anonymous",
      position: position || user.Position || "User",
      workplace: workplace || user.Workplace || "Unknown",
      userId: new ObjectId(userId),
      createdAt: new Date(),
    };

    // ✅ Insert review
    const result = await db.collection("reviews").insertOne(review);

    res.status(201).json({
      message: "Review added successfully",
      reviewId: result.insertedId,
      review,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, mobileNumber, subject, message } = req.body;

    if (!firstName || !lastName || !email || !mobileNumber || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const collection = db.collection('contacts');
    const result = await collection.insertOne({ firstName, lastName, email, mobileNumber, subject, message });

    res.status(200).json({ 
      message: 'Contact information saved successfully.', 
      id: result.insertedId 
    });
  } catch (error) {
    console.error('Error saving contact data:', error);
    res.status(500).json({ error: 'Failed to save contact information.' });
  }
});



// ✅ Start server
const PORT = process.env.PORT || 8000;
connectToDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
