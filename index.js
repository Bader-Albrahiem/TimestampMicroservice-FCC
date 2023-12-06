const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Views/index.html");
});

app.get("/api/:date?", (req, res) => {
  const date = req.params.date;
  let result = {};

  if (!date) {
    const currentDate = new Date();
    res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString(),
    });
    return;
  }
  if (!isNaN(date)) {
    const unixTimestamp = parseInt(date);
    result = {
      unix: unixTimestamp,
      utc: new Date(unixTimestamp).toUTCString(),
    };
  } else {
    const dateObject = new Date(date);
    if (dateObject.toString() === "Invalid Date") {
      result = { error: "Invalid Date" };
    } else {
      result = {
        unix: dateObject.getTime(),
        utc: dateObject.toUTCString(),
      };
    }
  }

  res.json(result);
});
app.listen(port, () => {
  console.log(`Server is running in port: ${port}`);
});
