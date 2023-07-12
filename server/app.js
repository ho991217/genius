import express from "express";
import cors from "cors";
import multer from "multer";
import { spawn } from "child_process";

import { PythonShell } from "python-shell";

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "uploads/");
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname);
   },
});

const upload = multer({
   storage,
});

const app = express();

app.use(cors());

app.post("/upload", upload.single("file"), (req, res) => {
   // console.log(req.file);
   // const result = spawn("python3.10", ["./script.py", req.file.path]);

   // result.stdout.on("data", (data) => {
   //    console.log(data.toString());
   //    // res.send(data.toString());
   // });

   // result.stderr.on("data", (data) => {
   //    console.error(data.toString());
   // });
   let pyshell = new PythonShell("script.py", {
      pythonPath: "python3.10",
      args: [req.file.path],
   });

   pyshell.on("message", function (message) {
      res.send(JSON.stringify(message));
   });

   pyshell.end(function (err, code, signal) {
      if (err) throw err;
      console.log("The exit code was: " + code);
      console.log("The exit signal was: " + signal);
      console.log("finished");
   });
});

app.listen(8000, () => {
   console.log("Server running on port 8000");
});
