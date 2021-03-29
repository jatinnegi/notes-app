import dbConnect from "../../../utils/dbConnect";
import Note from "../../../models/Note.model";

import { noteValidation } from "../../../middlewares/validate-middleware";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const notes = await Note.find({});

        res.status(200).json({ success: true, data: notes });
      } catch (err) {
        console.log(err.message);
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        await noteValidation(req, res);

        const { title, description } = req.body;

        let note = await Note.findOne({ title: title });
        if (note) {
          return res.status(400).json({
            success: false,
            errors: [{ param: "title", msg: "Title is already taken" }],
          });
        }

        note = new Note({
          title,
          description,
        });

        await note.save();

        res.status(201).json({ success: true, data: note });
      } catch (err) {
        console.log(err.message);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
  }
};
