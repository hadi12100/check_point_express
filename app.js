const express = require("express");
const app = express();
const path = require("path");

// Middleware to check working hours (9am to 5pm, Monday to Friday)
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  const hour = now.getHours(); // Current hour (0-23)

  // Check if it's working hours (Monday to Friday, 9am to 5pm)
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Allow the request to proceed
  } else {
    res.send("The application is available only during working hours (Monday to Friday, 9am to 5pm).");
  }
};

// Apply the middleware for all routes
app.use(checkWorkingHours);

// Middleware to serve static files (CSS, images, etc.) from the "static" folder
app.use(express.static(path.join(__dirname, "static")));  // Serve static assets from the "static" folder

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "home.html"));  // Route for the home page
});

app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "services.html"));  // Route for the services page
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "contact.html"));  // Route for the contact page
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
