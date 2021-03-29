import Head from "next/head";

const Meta = ({ title, keywords, description }) => (
  <Head>
    <meta name="keywords" content={keywords} />
    <meta name="description" content={description} />
    <title>{title}</title>
  </Head>
);

Meta.defaultProps = {
  title: "Note App",
  keywords:
    "Note app, nextjs, crud application, crud tutorial, mongodb, mongodb atlas",
  description:
    "Basic app to test the crud functionality of nextjs using mongodb",
};

export default Meta;
