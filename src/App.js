import './App.css';
import './styles/style.scss';
import ResourceCatalog from "./components/ExistingInfrastructure/ResourceCatalog/ResourceCatalog";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResourceDetail from "./components/ExistingInfrastructure/ResourceDetail/ResourceDetail";
import BadgeDetail from "./components/ExistingInfrastructure/BadgeDetail/BadgeDetail";

function App() {
    return (
        <div className={"main"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ResourceCatalog />} />
                    <Route path="/resourceDetail/:resourceId" element={<ResourceDetail />} />
                    <Route path="/resourceBadge/:resourceId/:badgeId" element={<BadgeDetail />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
