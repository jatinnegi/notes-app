import Meta from "./Meta";
import Navbar from "./Navbar";

const Layout = ({ children }) => (
  <>
    <Meta />
    <Navbar />
    {children}
  </>
);

export default Layout;
