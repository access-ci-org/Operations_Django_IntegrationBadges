import {Link, Outlet, Route, useLocation} from "react-router-dom";
import Debug from "../../components/Debug.jsx";
import ResourceBadgeStatusListing from "./ResourceBadgeStatusListing.jsx";
import ConciergeDashboard from "./ConciergeDashboard.jsx";

export const ConciergeRouteUrls = {
    INDEX: "/concierge",
    BADGE_STATUS: "/concierge/badge-status",
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
    <Route path={ConciergeRouteUrls.INDEX} element={<ConciergeDashboard/>}/>
    <Route path={ConciergeRouteUrls.BADGE_STATUS} element={<ResourceBadgeStatusListing/>}/>
</Route>
