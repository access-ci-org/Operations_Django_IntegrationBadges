import './App.css';
import './styles/style.scss';
import ResourceCatalog from "./pages/ResourceCatalog";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResourceDetail from "./pages/ResourceDetail";
import BadgeDetail from "./pages/BadgeDetail";
import Demo from "./pages/Demo";

function App() {
    return (
        <div className={"main"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ResourceCatalog />} />
                    <Route path="/resourceDetail/:resourceId" element={<ResourceDetail />} />
                    <Route path="/resourceBadge/:resourceId/:badgeId" element={<BadgeDetail />} />

                    {process.env.NODE_ENV === "production" ? null : (
                        <Route path="/demo" element={<Demo />} />
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
