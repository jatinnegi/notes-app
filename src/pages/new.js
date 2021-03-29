import fetch from "isomorphic-unfetch";
import { useState } from "react";
import { Button, Form, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function New() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ title: null, description: null });
  const router = useRouter();

  const { title, description } = formData;

  const createNote = async () => {
    try {
      const res = await fetch(`/api/notes`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.status !== 201) {
        const { errors } = await res.json();
        let errorObject = {};
        errors.map((error) => {
          errorObject[error.param] = error.msg;
        });
        setErrors(errorObject);
        setIsSubmitting(false);
      } else router.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    createNote();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <h1>Create Note</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              error={
                errors.title
                  ? { content: errors.title, pointing: "below" }
                  : null
              }
              label="Title"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChange}
            />
            <Form.TextArea
              error={
                errors.description
                  ? { content: errors.description, pointing: "below" }
                  : null
              }
              label="Description"
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleChange}
            ></Form.TextArea>
            <Button type="submit">Create Note</Button>
          </Form>
        )}
      </div>
    </div>
  );
}
