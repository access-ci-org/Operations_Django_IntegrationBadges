import './App.css';
import './styles/style.scss';
import ResourceView from "./components/ExistingInfrastructure/ResourceView";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResourceDetail from "./components/ExistingInfrastructure/ResourceDetail/ResourceDetail";

function App() {
    return (
        <div className={"main"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ResourceView />} />
                    <Route path="/resourceDetail/:resourceId" element={<ResourceDetail />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
