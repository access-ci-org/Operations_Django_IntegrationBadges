import {Link, NavLink} from "react-router-dom";

export function ConciergeMainNavigation() {
    const conciergeMenus = [
        {"name": "Home", "link": "/concierge/", active: true},
        {"name": "Roadmaps", "link": "/concierge/roadmaps", active: false},
        {"name": "Badges", "link": "/concierge/badges", active: false},
        {"name": "Badge Status", "link": "/concierge/badge-status", active: false},
    ]

    const getLinkClassname = ({isActive}) => {
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
                    <NavLink to={menu.link} className={getLinkClassname} end={true}>{menu.name}</NavLink>
                </li>
            })}
        </ul>
    </div>;
}
