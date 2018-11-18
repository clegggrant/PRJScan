const express = require("express");
const router = express.Router();

router.post("/process", function(req, res) {
  let text = req.body.params["original"];

  const spawn = require("child_process").spawn;
  const ls = spawn("python", [__dirname + "/../python/script.py", text, "arg2"]);
  ls.stdout._handle.setBlocking(true)

  let output = "";
  ls.stdout.on("data", (data) => {
    output += `${data}`;
  });

  ls.stderr.on('data', (data) => {
    console.log(`${data}`)
  });

  ls.on("exit", (code, signal) => {
    if (code || signal) {
      return res.status(500).json("Internal Server Error").end();
    } else {
      return res.status(200).json(output.replace(/\n$/, "")).end();
    }
  });
});

module.exports = router;
