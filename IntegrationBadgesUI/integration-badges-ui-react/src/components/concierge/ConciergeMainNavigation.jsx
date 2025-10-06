import {Link} from "react-router-dom";

export function ConciergeMainNavigation() {
    const conciergeMenus = [
        {"name": "Home", "link": "/concierge/", active: true},
        {"name": "Roadmaps", "link": "/concierge/", active: false},
        {"name": "Badges", "link": "/concierge/", active: false},
        {"name": "Badge Status", "link": "/concierge/", active: false},
    ]
    return <div className="w-100">
        <ul className="list-unstyled list-inline m-0 w-100 bg-white border-3 rounded-2 p-1 ps-5 pe-5">
            {conciergeMenus.map((menu, menuIndex) => {
                let linkClassname = "text-gray-600";
                if (menu.active) linkClassname = "text-gray-900 border-bottom border-3 border-gray-900";

                return <li className="list-inline-item p-3" key={menuIndex}>
                    <Link to={menu.link} className={`text-decoration-none pb-2 bt-2 ${linkClassname}`}>
                        {menu.name}</Link>
                </li>
            })}
        </ul>
    </div>;
}
