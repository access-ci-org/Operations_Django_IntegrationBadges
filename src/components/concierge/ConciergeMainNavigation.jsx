import {Link, NavLink, useLocation} from "react-router-dom";
import {ConciergeRouteUrls} from "../../pages/concierge/ConciergeRoute.jsx";

export function ConciergeMainNavigation() {

    const location = useLocation();

    const pathname = location.pathname;

    const conciergeMenus = [
        {"name": "Home", "link": ConciergeRouteUrls.INDEX},
        {"name": "Roadmaps", "link": ConciergeRouteUrls.ROADMAPS},
        {"name": "Badges", "link": ConciergeRouteUrls.BADGES},
        {"name": "Badge Status", "link": ConciergeRouteUrls.BADGE_STATUS},
    ];

    const getLinkClassname = (props) => {
        const {isActive} = props;
        if (isActive) {
            return "text-decoration-none pb-2 bt-2 text-gray-900 border-bottom border-3 border-gray-900";
        } else {
            return "text-decoration-none pb-2 bt-2 text-gray-600";
        }
    }

    return <div className="w-100">
        <ul className="list-unstyled list-inline m-0 w-100 bg-white border-3 rounded-2 p-1 ps-5 pe-5">
            {conciergeMenus.map((menu, menuIndex) => {
                return <li className="list-inline-item p-3" key={menuIndex}>
                    <NavLink to={menu.link} className={getLinkClassname} end={false}>{menu.name}</NavLink>
                </li>
            })}
        </ul>
    </div>;
}
