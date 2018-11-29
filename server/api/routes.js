const express = require("express");
const router = express.Router();

router.post("/process", function(req, res) {
  let path = require("path");
  let fs = require("fs");

  let timestamp = Date.now();
  let data_url = req.body.params["original"];

  let buffer = Buffer.from(data_url.substring(28), "base64");
  let pathname = path.join(__dirname, "../python/kb/buffer", timestamp + ".pdf");

  fs.writeFile(pathname, buffer, function (err) {
    if (err) return res.status(500).json(err).end();

    const spawn = require("child_process").spawn;
    const ls = spawn("python", [__dirname + "/../python/script.py", timestamp, "arg2"]);
    ls.stdout._handle.setBlocking(true);

    let output = "";
    ls.stdout.on("data", (data) => {
      output += `${data}`;
    });
    
    ls.stderr.on('data', (data) => {
      console.log(`${data}`);
    });
    
    ls.on("exit", (code, signal) => {
      if (code || signal) {
        return res.status(500).json("Internal Server Error").end();
      } else {
        return res.status(200).json(output.replace(/\n$/, "")).end();
      }
    });
  });
});

module.exports = router;
