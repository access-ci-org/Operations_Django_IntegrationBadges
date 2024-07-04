import CatalogTitle from "./TitleSection/CatalogTitle";
import {ResourceList} from "./ResourceList/ResourceList";
import CatalogFooter from "./FooterSection/CatalogFooter";
import CatalogSearch from "./TitleSection/CatalogSearch";

export default function ResourceCatalog() {
    return (
        <div className="resource-catalog-wrapper">
            <CatalogTitle />
            <CatalogSearch />
            <ResourceList />
            <CatalogFooter />
        </div>
    );
}