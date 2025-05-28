import {Link, Outlet, Route} from "react-router-dom";
import FiveStepsForNewIntegrations from "./FiveStepsForNewIntegrations.jsx";
import SelectOrgType from "./SelectOrgType.jsx";
import NewOrg from "./NewOrg.jsx";
import {useOrganizations} from "../../contexts/OrganizationsContext.jsx";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {useBadges} from "../../contexts/BadgeContext.jsx";
import {useEffect} from "react";
import CustomizedBreadcrumb from "../../components/CustomizedBreadcrumb.jsx";
import LoadingBlock from "../../components/LoadingBlock.jsx";
import ExistingOrg from "./ExistingOrg.jsx";
import WhyBecomeAnRP from "./WhyBecomeAnRP.jsx";
import HowToIntegrateResource from "./HowToIntegrateResource.jsx";
import HowToChooseRoadmap from "./HowToChooseRoadmap.jsx";

const RouterLayout = () => {

    return (
        <div className="w-100 access-operations-integration-badges ">
            <div className="w-100 bg-dark">
                <ul>
                    <li className="d-inline-block p-2"><Link className="btn btn-link" to="/">Webapp</Link></li>
                    <li className="d-inline-block p-2"><Link className="btn btn-link" to="/docs">Five Steps</Link></li>
                    <li className="d-inline-block p-2"><Link className="btn btn-link" to="/docs/select-org-type">Select Organization type</Link></li>
                    <li className="d-inline-block p-2"><Link className="btn btn-link" to="/docs/new-org">New Organization</Link></li>
                    <li className="d-inline-block p-2"><Link className="btn btn-link" to="/docs/existing-org">Existing Organisation</Link></li>
                    <li className="d-inline-block p-2"><Link className="btn btn-link" to="/docs/why-become-an-rp">Why become an RP</Link></li>
                    <li className="d-inline-block p-2"><Link className="btn btn-link" to="/docs/how-to-integrate-resource">How Do I Integrate My Resource into ACCESS</Link></li>
                    <li className="d-inline-block p-2"><Link className="btn btn-link" to="/docs/how-to-choose-roadmap">What is an Integration Roadmap and how do I choose the right one</Link></li>
                </ul>
            </div>
            <Outlet/>
        </div>
    );
};
export const DocumentationRoute = <Route path="/docs" element={<RouterLayout/>}>
    <Route path="/docs" element={<FiveStepsForNewIntegrations/>}/>
    <Route path="/docs/select-org-type" element={<SelectOrgType/>}/>
    <Route path="/docs/new-org" element={<NewOrg/>}/>
    <Route path="/docs/existing-org" element={<ExistingOrg/>}/>
    <Route path="/docs/why-become-an-rp" element={<WhyBecomeAnRP/>}/>
    <Route path="/docs/how-to-integrate-resource" element={<HowToIntegrateResource/>}/>
    <Route path="/docs/how-to-choose-roadmap" element={<HowToChooseRoadmap/>}/>
</Route>