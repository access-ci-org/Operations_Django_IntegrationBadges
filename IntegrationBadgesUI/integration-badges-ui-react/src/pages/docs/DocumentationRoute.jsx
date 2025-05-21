import {Outlet, Route} from "react-router-dom";
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

const RouterLayout = () => {

    return (
        <div className="w-100 access-operations-integration-badges">
            {/*<div className="container">*/}
            {/*    <CustomizedBreadcrumb/>*/}
            {/*</div>*/}
            <Outlet/>
        </div>
    );
};
export const DocumentationRoute = <Route path="/docs" element={<RouterLayout/>}>
    <Route path="/docs"
           element={<FiveStepsForNewIntegrations/>}/>

    <Route path="/docs/select-org-type"
           element={<SelectOrgType/>}/>
    <Route path="/docs/new-org"
           element={<NewOrg/>}/>
</Route>