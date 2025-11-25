import {Link, Navigate, Outlet, Route} from "react-router-dom";
import Debug from "../../components/util/Debug.jsx";
import ResourceBadgeStatusListing from "./ResourceBadgeStatusListing.jsx";
import ConciergeDashboard from "./ConciergeDashboard.jsx";
import ConciergeRoadmaps from "./ConciergeRoadmaps.jsx";
import ConciergeRoadmapEdit from "./ConciergeRoadmapEdit.jsx";
import ConciergeBadgeEdit from "./ConciergeBadgeEdit.jsx";

export const ConciergeRouteUrls = {
    INDEX: "/concierge/dashboard",
    ROADMAPS: "/concierge/roadmaps",
    ROADMAP_NEW: "/concierge/roadmaps/new",
    ROADMAP_EDIT: "/concierge/roadmaps/:roadmapId/edit",
    BADGES: "/concierge/badges",
    BADGE_NEW: "/concierge/badges/new",
    BADGE_EDIT: "/concierge/badges/:badgeId/edit",
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
    <Route path={ConciergeRouteUrls.ROADMAPS} element={<ConciergeRoadmaps/>}/>
    <Route path={ConciergeRouteUrls.ROADMAP_EDIT} element={<ConciergeRoadmapEdit/>}/>
    <Route path={ConciergeRouteUrls.ROADMAP_NEW} element={<ConciergeRoadmapEdit/>}/>
    <Route path={ConciergeRouteUrls.BADGE_EDIT} element={<ConciergeBadgeEdit/>}/>
    <Route path={ConciergeRouteUrls.BADGE_NEW} element={<ConciergeBadgeEdit/>}/>
    <Route path={ConciergeRouteUrls.BADGE_STATUS} element={<ResourceBadgeStatusListing/>}/>

    <Route path="/concierge/*?" element={<Navigate to={ConciergeRouteUrls.INDEX} replace={true}/>}/>
</Route>
