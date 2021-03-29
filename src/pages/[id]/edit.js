import fetch from "isomorphic-unfetch";
import { useState } from "react";
import { Button, Form, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import getBaseURL from "../../utils/getBaseUrl";

export default function Edit({ note }) {
  const [formData, setFormData] = useState({
    title: note.title ? note.title : "",
    description: note.description ? note.description : "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ title: null, description: null });
  const router = useRouter();

  const { title, description } = formData;

  const editNote = async () => {
    try {
      const res = await fetch(`/api/notes/${router.query.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 400) {
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
    editNote();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <h1>Edit Note</h1>
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
            <Button type="submit">Edit Note</Button>
          </Form>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ req, params }) => {
  const res = await fetch(`${getBaseURL(req)}/api/notes/${params.id}`);
  const { data } = await res.json();

  return {
    props: {
      note: data,
    },
  };
};
