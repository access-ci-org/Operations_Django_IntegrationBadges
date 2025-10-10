import {Link, Navigate, Outlet, Route} from "react-router-dom";
import Debug from "../../components/Debug.jsx";
import ResourceBadgeStatusListing from "./ResourceBadgeStatusListing.jsx";
import ConciergeDashboard from "./ConciergeDashboard.jsx";
import ConciergeRoadmaps from "./ConciergeRoadmaps.jsx";
import ConciergeRoadmapNew from "./roadmap-edit/ConciergeRoadmapNew.jsx";
import ConciergeRoadmapReviewAndEdit from "./roadmap-edit/ConciergeRoadmapReviewAndEdit.jsx";
import ConciergeRoadmapAssociateBadges from "./roadmap-edit/ConciergeRoadmapAssociateBadges.jsx";

export const ConciergeRouteUrls = {
    INDEX: "/concierge/dashboard",
    ROADMAPS: "/concierge/roadmaps",
    ROADMAP_EDIT: "/concierge/roadmaps/:roadmapId/edit",
    ROADMAP_ASSOCIATE_BADGES: "/concierge/roadmaps/:roadmapId/associate-badges",
    ROADMAP_NEW: "/concierge/roadmaps/new",
    BADGES: "/concierge/badges",
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
    <Route path={ConciergeRouteUrls.ROADMAP_EDIT} element={<ConciergeRoadmapReviewAndEdit/>}/>
    <Route path={ConciergeRouteUrls.ROADMAP_ASSOCIATE_BADGES} element={<ConciergeRoadmapAssociateBadges/>}/>
    <Route path={ConciergeRouteUrls.ROADMAP_NEW} element={<ConciergeRoadmapNew/>}/>
    <Route path={ConciergeRouteUrls.BADGE_STATUS} element={<ResourceBadgeStatusListing/>}/>

    <Route path="/concierge/*?" element={<Navigate to={ConciergeRouteUrls.INDEX} replace={true}/>}/>
</Route>
