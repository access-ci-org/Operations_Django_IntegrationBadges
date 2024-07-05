import CatalogTitle from "../components/resourceCatalog/titleSection/CatalogTitle";
import {ResourceList} from "../components/resourceCatalog/resourceList/ResourceList";
import CatalogFooter from "../components/resourceCatalog/footerSection/CatalogFooter";
import CatalogSearch from "../components/resourceCatalog/titleSection/CatalogSearch";

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