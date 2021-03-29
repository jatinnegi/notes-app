import dbConnect from "../../../utils/dbConnect";
import Note from "../../../models/Note.model";
import { noteValidation } from "../../../middlewares/validate-middleware";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const note = await Note.findById(id);

        if (!note) {
          return res
            .status(400)
            .json({ success: false, error: "No note found" });
        }
        res.status(200).json({ success: true, data: note });
      } catch (err) {
        console.log(err.message);
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        await noteValidation(req, res);
        const { title } = req.body;
        if (title) {
          const note = await Note.findOne({ title });

          if (note && note.title === title && note.id.toString() !== id) {
            return res
              .status(400)
              .json({
                success: false,
                errors: [{ param: "title", msg: "Title is already taken" }],
              });
          }
        }

        const note = await Note.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!note) {
          return res
            .status(400)
            .json({ success: false, error: "No note found" });
        }

        res.status(200).json({ success: true, data: note });
      } catch (err) {
        console.log(err.message);
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const note = await Note.findByIdAndDelete(id);

        if (!note) {
          return res
            .status(400)
            .json({ success: false, error: "No note found" });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (err) {
        console.log(err.message);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
