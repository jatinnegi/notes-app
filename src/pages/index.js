import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { Button, Card } from "semantic-ui-react";
import { server } from "../config";
// import styles from "../styles/Home.module.css";

function Home({ notes }) {
  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <div className="grid wrapper">
        {notes.map((note) => (
          <div key={note._id}>
            <Card>
              <Card.Content>
                <Card.Header>
                  <Link href={`/${note._id}`}>
                    <a>{note.title}</a>
                  </Link>
                </Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Link href={`/${note._id}`}>
                  <Button primary>View</Button>
                </Link>
                <Link href={`/${note._id}/edit`}>
                  <Button secondary>Edit</Button>
                </Link>
              </Card.Content>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(`${server}/api/notes`);
  const { data } = await res.json();

  return {
    props: {
      notes: data,
    },
  };
};

export default Home;
