import initMiddleware from "./init-middleware";
import { check, validationResult } from "express-validator/check";

export default function validateMiddleware(validations, validationResult) {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
}

export const noteValidation = initMiddleware(
  validateMiddleware(
    [
      check("title", "Title should be between 1-40 characters").isLength({
        min: 1,
        max: 40,
      }),
      check(
        "description",
        "Description should be between 1-200 characters"
      ).isLength({ min: 1, max: 200 }),
    ],
    validationResult
  )
);
