/**
 * The JSON object definitions used in the integration badges project.
 */

/************************************************************/

/**
 * @typedef {Object} Badge - The badge object containing full badge information.
 * @property {number} badge_id - The badge id.
 * @property {string} name - The name of the badge.
 * @property {string} researcher_summary - The summary of the badge provided for researchers.
 * @property {string} resource_provider_summary - The summary of the badge provided for RPs.
 * @property {string} graphic - The URL of the badge graphic.
 * @property {string} default_badge_access_url - The default badge access URL. If badge_access_url is
 * not available from the resource-badge model, this is used.
 * @property {string} default_badge_access_url_label - The default badge access URL label. If badge_access_url_label is
 * not available from the resource-badge model, this is used.
 * @property {Array<Badge>} prerequisites - The list of badges that are prerequisites for the current badge.
 * @property {string} verification_method - The method used to verify the badge.
 * @property {string} verification_summary - The summary of the verification method.
 */

/************************************************************/

/**
 * @typedef {Object} Institution - Contains all resources that belong to that organization.
 * @property {string} organization_name - The name of the organization.
 * @property {Array<CatalogResource>} resources - The list of resources under the organization.
 */

/**
 * @typedef {Object} CatalogResource - The single resource to display.
 * @property {number} cider_resource_id - The cider resource id of the resource.
 * @property {string} cider_type - The type of the resource.
 * @property {string} info_resourceid - The info resource id of the resource.
 * @property {string} organization_logo_url - The URL of the organization logo.
 * @property {string} organization_name - The name of the organization.
 * @property {string} organization_url - The URL of the organization.
 * @property {string} resource_description - The description of the resource.
 * @property {string} resource_descriptive_name - The descriptive name of the resource.
 * @property {Array<CatalogBadge>} badges - The available (Verified) badges for the resource. It does not contain the
 * full badge information, which is acquired through searching across the badge context list.
 */

/**
 * @typedef {Object} CatalogBadge - The available (Verified) badge for the resource. It omits comment, resource_id, and
 * badge_id when passed as a prop to the ResourceCardBadge component.
 * @property {number} badge_id - The badge id.
 * @property {string} badge_access_url - The URL to access the badge.
 * @property {string} badge_access_url_label - The label for the badge access URL.
 * @property {string} comment - The concierge comment for the current badge status.
 * @property {string} state - The current badge status.
 * @property {number} resource_id - The resource id.
 * @property {Object} badge - The badge object containing full badge information. Acquired through searching across
 * the badge context list.
 */

/************************************************************/

/**
 * @typedef {Object} Resource - Including all the details of a single resource.
 * @property {number} cider_resource_id - The cider resource id of the resource.
 * @property {string} cider_type - The type of the resource.
 * @property {string} info_resourceid - The info resource id of the resource.
 * @property {string} organization_logo_url - The URL of the organization logo.
 * @property {string} organization_name - The name of the organization.
 * @property {string} organization_url - The URL of the organization.
 * @property {string} resource_description - The description of the resource.
 * @property {string} resource_descriptive_name - The descriptive name of the resource.
 * @property {string} latest_status - The latest status of the resource.
 * @property {string} user_guide_url - The URL of the user guide for the resource.
 * @property {Array<BadgeWorkflow>} badge_status - The list of badge workflow models associated with the resource. It
 * shows the states of badges that are at least planned for the current resource.
 * @property {Array<RoadmapList>} roadmaps - The list of roadmaps associated with the resource.
 */

/**
 * @typedef {Object} BadgeWorkflow - The workflow model of a badge, similar to the CatalogBadge model.
 * @property {number} badge_id - The badge id.
 * @property {string} badge_access_url - The URL to access the badge.
 * @property {string} badge_access_url_label - The label for the badge access URL.
 * @property {string} comment - The concierge comment for the current badge status.
 * @property {string} state - The current badge status.
 * @property {Date} state_updated_at - The date when the badge status was last updated.
 * @property {string} state_updated_by - The user who last updated the badge status.
 */

/**
 * @typedef {Object} RoadmapList - The list of roadmaps associated with a resource.
 * @property {Roadmap} roadmap - The roadmap objects associated with a resource.
 */

/**
 * @typedef {Object} Roadmap - The roadmap associated with a resource that contains all the badges for that roadmap.
 * @property {number} resource_id - The resource id.
 * @property {number} roadmap_id - The roadmap id.
 */

/**
 * @typedef {Object} RoadmapBadge - The badge object associated with a roadmap, created by merging resource roadmap
 * badge info, badge full info, and badge workflow info. Created in BadgeSection.jsx and used to display badges in the
 * resource detail page.
 * @property {number} badge_id - The badge id.
 * @property {string} name - The name of the badge.
 * @property {boolean} required - True if the badge is required for the roadmap.
 * @property {string} resource_name - The name of the resource.
 * @property {string} state - The status of the badge.
 * @property {string} badge_access_url - The URL to access the badge.
 * @property {string} badge_access_url_label - The label for the badge access URL.
 */