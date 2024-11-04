import './App.css';
import './styles/style.scss';
import ResourceCatalog from "./pages/ResourceCatalog";
import { createMemoryRouter, RouterProvider, Outlet} from 'react-router-dom';
import ResourceDetail from "./pages/ResourceDetail";
import BadgeDetail from "./pages/BadgeDetail";
import axios from "axios";
import {BadgeProvider} from "./contexts/BadgeContext";
import {ResourcesProvider} from "./contexts/ResourcesContext";
import BreadCrumb from "./components/fragments/BreadCrumb";

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
    <div className="access-operations-integration-badges">
        <BreadCrumb/>
        <Outlet/>
    </div>
  );
};


const router = createMemoryRouter([
  {
    path: '/',
    element: <RouterLayout/>,
      children: [
          {
            path: '/',
            element: <ResourceCatalog/>,
          },
          {
            path: '/resourceDetail/:resourceId',
            element: <ResourceDetail/>,
          },
          {
            path: '/resourceBadge/:resourceId/:badgeId',
            element: <BadgeDetail/>,
          }
      ]
  }
]);

function App() {
    // if (!oauthSignIn()) {
    //     return null;
    // }

    return (
        <ResourcesProvider>
            <BadgeProvider>
                <div className={"main"}>
                    <RouterProvider router={router} element={RouterLayout} />
                </div>
            </BadgeProvider>
        </ResourcesProvider>
    );
}

export default App;
