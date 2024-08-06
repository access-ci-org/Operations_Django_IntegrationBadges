import './App.css';
import './styles/style.scss';
import ResourceCatalog from "./pages/ResourceCatalog";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResourceDetail from "./pages/ResourceDetail";
import BadgeDetail from "./pages/BadgeDetail";
import Demo from "./pages/Demo";
import axios from "axios";
import {BadgeProvider} from "./contexts/BadgeContext";
import {ResourcesProvider} from "./contexts/ResourcesContext";
import BreadCrumb from "./components/fragments/BreadCrumb";

// Setting the default baseURL
axios.defaults.baseURL = "http://127.0.0.1:8000/wh2/integration_badges/v1";

// define the workflow states
export const workflow_states = {
    NOT_PLANNED: "Not Planned",
    PLANNED: "Planned",
    TASK_COMPLETED: "Task Completed",
    VERIFICATION_FAILED: "Verification Failed",
    VERIFIED: "Verified",
    DEPRECATED: "Deprecated"
};

function App() {
    return (
        <ResourcesProvider>
            <BadgeProvider>
                <div className={"main"}>
                    <BrowserRouter>
                        <BreadCrumb/>
                        <Routes>
                            <Route path="/" element={<ResourceCatalog/>}/>
                            <Route path="/resourceDetail/:resourceId" element={<ResourceDetail/>}/>
                            <Route path="/resourceBadge/:resourceId/:badgeId" element={<BadgeDetail/>}/>

                            {process.env.NODE_ENV === "production" ? null : (
                                <Route path="/demo" element={<Demo/>}/>
                            )}
                        </Routes>
                    </BrowserRouter>
                </div>
            </BadgeProvider>
        </ResourcesProvider>
    );
}

export default App;
