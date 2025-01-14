import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {Link, useLocation} from "react-router-dom";

function CustomizedBreadcrumb() {
    const location = useLocation();
    const pathSegments = location.pathname.split("/")
    const breadcrumbLinks = []

    let key = 1;
    if (pathSegments[1] && pathSegments[1].length > 0) {
        breadcrumbLinks.push(<Breadcrumb.Item key={key++} linkAs={Link} linkProps={{to: "/"}}>
            Home
        </Breadcrumb.Item>)
    }

    if (pathSegments[1] === "organizations") {
        breadcrumbLinks.push(<Breadcrumb.Item key={key++} linkAs={Link} linkProps={{to: "/organizations"}}>
            Dashboard
        </Breadcrumb.Item>)
        if (pathSegments[2]) {
            breadcrumbLinks.push(<Breadcrumb.Item key={key++} linkAs={Link}
                                                  linkProps={{to: `/organizations/${pathSegments[2]}`}}>
                {pathSegments[2]}
            </Breadcrumb.Item>)
        }
    }


    if (pathSegments[1] === "resources") {
        breadcrumbLinks.push(<Breadcrumb.Item key={key++} linkAs={Link} linkProps={{to: "/organizations"}}>
            Dashboard
        </Breadcrumb.Item>)
        if (pathSegments[2]) {
            breadcrumbLinks.push(<Breadcrumb.Item key={key++} linkAs={Link}
                                                  linkProps={{to: `/resources/${pathSegments[2]}`}}>
                {pathSegments[2]}
            </Breadcrumb.Item>)
        }
    }

    return (
        <Breadcrumb>
            {breadcrumbLinks}
        </Breadcrumb>
    );
}

export default CustomizedBreadcrumb;