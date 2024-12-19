import './App.scss';
import './styles/style.scss';
import "bootstrap-icons/font/bootstrap-icons.min.css"
import ResourceCatalog from "./pages/ResourceCatalog";
import {createMemoryRouter, RouterProvider, Outlet, Route, Routes, BrowserRouter} from 'react-router-dom';
import ResourceDetail from "./pages/ResourceDetail";
import BadgeDetail from "./pages/BadgeDetail";
import axios from "axios";
import {BadgeProvider} from "./contexts/BadgeContext";
import {ResourcesProvider} from "./contexts/ResourcesContext";
import BreadCrumb from "./components/fragments/BreadCrumb";
import NewResource from "./pages/NewResource";
import IntegrationDashboard from "./pages/IntegrationDashboard";
import {OrganizationsProvider} from "./contexts/OrganizationsContext";
import Organization from "./pages/Organization";

// Setting the default baseURL
// axios.defaults.baseURL = "http://127.0.0.1:8000/wh2/integration_badges/v1";
axios.defaults.baseURL = "https://opsapi3.access-ci.org/wh2/integration_badges/v1/"

// define the workflow states
export const workflow_states = {
    NOT_PLANNED: "Not Planned",
    PLANNED: "Planned",
    TASK_COMPLETED: "Task Completed",
    VERIFICATION_FAILED: "Verification Failed",
    VERIFIED: "Verified",
    DEPRECATED: "Deprecated"
};


const RouterLayout = () => {
    return (
        <div className="p-2 access-operations-integration-badges">
            <BreadCrumb/>
            <Outlet/>
        </div>
    );
};

function App() {
    // if (!oauthSignIn()) {
    //     return null;
    // }

    return (
        <ResourcesProvider>
            <BadgeProvider>
                <OrganizationsProvider>
                    <div className="container">
                        <div className="row">
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<RouterLayout/>}>
                                        <Route index element={<IntegrationDashboard/>}/>
                                        <Route path="/organizations" element={<IntegrationDashboard/>}/>
                                        <Route path="/organizations/:organizationId" element={<Organization/>}/>
                                        <Route path="/organizations-new" element={<NewResource/>}/>


                                        <Route path="/resources/:resourceId" element={<Organization/>}/>
                                        <Route path="/resources/:resourceId/badges/:badgeId" element={<Organization/>}/>

                                    </Route>
                                </Routes>
                            </BrowserRouter>
                        </div>
                    </div>
                </OrganizationsProvider>
            </BadgeProvider>
        </ResourcesProvider>
    );
}

export default App;
