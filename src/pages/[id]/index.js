import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader } from "semantic-ui-react";
import { server } from "../../config";

export default function Note({ note }) {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting]);

  const open = () => setConfirm(true);

  const close = () => setConfirm(false);

  const handleDelete = () => {
    setIsDeleting(true);
    close();
  };

  const deleteNote = async () => {
    const noteId = router.query.id;
    try {
      const deleted = await fetch(`${server}/api/notes/${noteId}`, {
        method: "DELETE",
      });

      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="notes-container">
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <Button color="red" onClick={open}>
            Delete
          </Button>
        </>
      )}
      <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`${server}/api/notes/${params.id}`);
  const { data } = await res.json();

  return {
    props: {
      note: data,
    },
  };
};
