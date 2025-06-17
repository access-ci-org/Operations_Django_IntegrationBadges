import {Link, Outlet, Route} from "react-router-dom";
import FiveStepsForNewIntegrations from "./FiveStepsForNewIntegrations.jsx";
import WhyBecomeAnRP from "./WhyBecomeAnRP.jsx";
import HowToIntegrateResource from "./HowToIntegrateResource.jsx";
import HowToChooseRoadmap from "./HowToChooseRoadmap.jsx";

export const DocumentationRouteUrls = {
    INDEX: "/docs",
    WHY_BECOME_AN_RP: "/docs/why-become-an-rp",
    HOW_TO_INTEGRATE_RESOURCE: "/docs/how-to-integrate-resource",
    HOW_TO_CHOOSE_ROADMAP: "/docs/how-to-choose-roadmap",
};

const RouterLayout = () => {

    return (
        <div className="row" style={{fontSize: 11}}>
            <div className="col-md-2 bg-white">
                <ul className="m-0 p-0">
                    <li className="d-inline-block p-2"><Link className="btn btn-link border-3 border-start ps-1" to="/">Integration Dashboard</Link></li>
                    <li className="d-inline-block p-2">
                        <Link className="btn btn-link border-3 border-start ps-1" to={DocumentationRouteUrls.INDEX}>Documentation</Link>

                        <ul className="m-0 p-0 ps-2">
                            <li className="d-inline-block p-2"><Link className="btn btn-link border-3 border-start ps-1" to={DocumentationRouteUrls.WHY_BECOME_AN_RP}>Why become an RP</Link></li>
                            <li className="d-inline-block p-2"><Link className="btn btn-link border-3 border-start ps-1" to={DocumentationRouteUrls.HOW_TO_INTEGRATE_RESOURCE}>How Do I Integrate My Resource into ACCESS</Link></li>
                            <li className="d-inline-block p-2"><Link className="btn btn-link border-3 border-start ps-1" to={DocumentationRouteUrls.HOW_TO_CHOOSE_ROADMAP}>What is an Integration Roadmap and how do I choose the right one</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="col">
                <Outlet/>
            </div>
        </div>
    );
};
export const DocumentationRoute = <Route path="/docs" element={<RouterLayout/>}>
    <Route path={DocumentationRouteUrls.INDEX} element={<FiveStepsForNewIntegrations/>}/>
    <Route path={DocumentationRouteUrls.WHY_BECOME_AN_RP} element={<WhyBecomeAnRP/>}/>
    <Route path={DocumentationRouteUrls.HOW_TO_INTEGRATE_RESOURCE} element={<HowToIntegrateResource/>}/>
    <Route path={DocumentationRouteUrls.HOW_TO_CHOOSE_ROADMAP} element={<HowToChooseRoadmap/>}/>
</Route>