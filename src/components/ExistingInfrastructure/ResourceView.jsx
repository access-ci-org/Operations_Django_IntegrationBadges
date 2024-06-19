import PageTitle from "./PageTitle";
import {ResourceList} from "./ResourceList/ResourceList";
import LinkPanel from "./LinkPanel";
import SearchSection from "./SearchSection";

export default function ResourceView() {
    return (
        <div>
            <PageTitle />
            <SearchSection />
            <ResourceList />
            <LinkPanel />
        </div>
    );
}