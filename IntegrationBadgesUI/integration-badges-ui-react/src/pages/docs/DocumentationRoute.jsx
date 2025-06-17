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
        <div className="w-100 access-operations-integration-badges" style={{fontSize: 12}}>
            <div className="w-100 bg-dark">
                <ul>
                    <li className="d-inline-block p-2"><Link className="btn btn-link" to="/">Webapp</Link></li>
                    <li className="d-inline-block p-2"><Link className="btn btn-link" to={DocumentationRouteUrls.INDEX}>Five Steps</Link></li>
                    <li className="d-inline-block p-2"><Link className="btn btn-link" to={DocumentationRouteUrls.WHY_BECOME_AN_RP}>Why become an RP</Link></li>
                    <li className="d-inline-block p-2"><Link className="btn btn-link" to={DocumentationRouteUrls.HOW_TO_INTEGRATE_RESOURCE}>How Do I Integrate My Resource into ACCESS</Link></li>
                    <li className="d-inline-block p-2"><Link className="btn btn-link" to={DocumentationRouteUrls.HOW_TO_CHOOSE_ROADMAP}>What is an Integration Roadmap and how do I choose the right one</Link></li>
                </ul>
            </div>
            <Outlet/>
        </div>
    );
};
export const DocumentationRoute = <Route path="/docs" element={<RouterLayout/>}>
    <Route path={DocumentationRouteUrls.INDEX} element={<FiveStepsForNewIntegrations/>}/>
    <Route path={DocumentationRouteUrls.WHY_BECOME_AN_RP} element={<WhyBecomeAnRP/>}/>
    <Route path={DocumentationRouteUrls.HOW_TO_INTEGRATE_RESOURCE} element={<HowToIntegrateResource/>}/>
    <Route path={DocumentationRouteUrls.HOW_TO_CHOOSE_ROADMAP} element={<HowToChooseRoadmap/>}/>
</Route>