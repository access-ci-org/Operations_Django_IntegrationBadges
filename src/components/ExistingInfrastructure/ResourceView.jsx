import PageTitle from "./ResourceList/PageTitle";
import {ResourceList} from "./ResourceList/ResourceList";
import LinkPanel from "./ResourceList/LinkPanel";
import SearchSection from "./ResourceList/SearchSection";

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