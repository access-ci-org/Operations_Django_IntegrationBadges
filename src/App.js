import './App.css';
import './styles/style.scss';
import ResearcherView from "./components/ResearcherView/ResearcherView";
import RPView from "./components/RPView/RPView";

function App() {
    return (
        <div className={"main"}>
            <ResearcherView />
            {/*<RPView />*/}
        </div>
    );
}

export default App;
