import './App.scss';
import './styles/style.scss';
import "bootstrap-icons/font/bootstrap-icons.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Outlet, Route, Routes, BrowserRouter} from 'react-router-dom';
import axios from "axios";
import {BadgeProvider} from "./contexts/BadgeContext";
import {ResourcesProvider} from "./contexts/ResourcesContext";
import NewResource from "./pages/NewResource";
import IntegrationDashboard from "./pages/IntegrationDashboard";
import {OrganizationsProvider} from "./contexts/OrganizationsContext";
import Organization from "./pages/Organization";
import Home from "./pages/Home";

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
        <div className="w-100 access-operations-integration-badges">
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
                    <div className="w-100 pt-3">
                        <div className="w-100">
                            <BrowserRouter basename={window.SETTINGS.PUBLIC_URL}>
                                <Routes>
                                    <Route path="/" element={<RouterLayout/>}>
                                        <Route index element={<Home/>}/>
                                        <Route path="/organizations" element={<IntegrationDashboard/>}/>
                                        <Route path="/organizations/:organizationId" element={<Organization/>}/>
                                        <Route path="/organizations/new" element={<NewResource/>}/>


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
