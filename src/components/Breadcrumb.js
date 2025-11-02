import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean); // remove empty strings

  const breadcrumbNameMap = {
    dashboard: "Dashboard",
    products: "Products",
    add: "Add",
    edit: "Edit",
    // IDs are intentionally not included here
  };

  // Only keep segments that exist in breadcrumbNameMap
  const filteredPathnames = pathnames.filter((name) => breadcrumbNameMap[name]);

  return (
    <nav className="text-gray-500 text-sm flex gap-1 mb-4">
      <Link to="/dashboard" className="hover:underline">
        Dashboard
      </Link>
      {filteredPathnames.map((name, index) => {
        const routeTo = `/${pathnames
          .slice(0, pathnames.indexOf(name) + 1)
          .join("/")}`;
        const isLast = index === filteredPathnames.length - 1;

        return (
          <span key={routeTo} className="flex items-center gap-1">
            <span>/</span>
            {isLast ? (
              <span className="font-bold">{breadcrumbNameMap[name]}</span>
            ) : (
              <Link to={routeTo} className="hover:underline">
                {breadcrumbNameMap[name]}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
