import { Link } from "react-router-dom";

function Admin() {
  return (
    <div className="admin-header">
      <Link to="/Inventory">Inventory</Link>&nbsp;&nbsp;
      <Link to="/Orders">Orders</Link>&nbsp;&nbsp;
      <Link to="/Sales">Sales</Link>&nbsp;&nbsp;
      <Link to="/Insights">Insights</Link>&nbsp;&nbsp;
    </div>
  );
}

export default Admin;
