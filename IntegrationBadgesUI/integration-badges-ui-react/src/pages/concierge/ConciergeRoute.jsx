import {Link, Outlet, Route, useLocation} from "react-router-dom";
import Debug from "../../components/Debug.jsx";
import ResourceBadgeStatusListing from "./ResourceBadgeStatusListing.jsx";

export const ConciergeRouteUrls = {
    INDEX: "/concierge",
    WHY_BECOME_AN_RP: "/docs/why-become-an-rp",
    HOW_TO_INTEGRATE_RESOURCE: "/docs/how-to-integrate-resource",
    HOW_TO_CHOOSE_ROADMAP: "/docs/how-to-choose-roadmap",
    ROADMAPS: "/docs/roadmaps",
    BADGES: "/docs/badges",
};

const RouterLayout = () => {
    return (
        <div className="row">
            <Debug>
                <div className="col-md-2 bg-white" style={{fontSize: 11}}>
                    <ul className="m-0 p-0">
                        <li className="d-inline-block p-2">
                            <Link className="btn btn-link border-3 border-start ps-1" to="/">
                                Integration Dashboard</Link></li>
                        <li className="d-inline-block p-2">
                            <Link className="btn btn-link border-3 border-start ps-1"
                                  to={ConciergeRouteUrls.INDEX}>Concierge</Link>
                        </li>
                    </ul>
                </div>
            </Debug>
            <div className="col">
                <Outlet/>
            </div>
        </div>
    );
};
export const ConciergeRoute = <Route path="/concierge" element={<RouterLayout/>}>
    <Route path={ConciergeRouteUrls.INDEX} element={<ResourceBadgeStatusListing/>}/>
</Route>
