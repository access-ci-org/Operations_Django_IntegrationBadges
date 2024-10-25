import ListIcon from '../../assets/img/icons/list_2.svg';
import DashboardIcon from '../../assets/img/icons/dashboard_2.svg';

/**
 * The button for the badge container view option.
 * @param {JSX.Element} children - The children to display in the button
 * @param {Function} onClick - The function to call when the button is clicked
 * @param {boolean} isActive - True if the button is active (apply styles)
 */
function BadgeContainerViewOptionButton({children, onClick, isActive}) {
    return (
        <button type="button" className="btn btn-medium switch-btn" onClick={onClick}
                style={{
                    backgroundColor: isActive ? '#107180' : 'white',
                    border: isActive ? '1px solid #107180' : 'none'
                }}>
            {children}
        </button>
    );
}

/**
 * The view option for the badge container, switching between dashboard and list view.
 * @param {boolean} badgeDisplay - The current display of the badges. True for dashboard view, False for list view.
 * @param {Function} toggleBadgeDisplay - The function to toggle the badge display
 */
export default function BadgeContainerViewOption({badgeDisplay, toggleBadgeDisplay}) {
    return (
        <div style={{display: 'flex'}}>
            <BadgeContainerViewOptionButton isActive={!badgeDisplay} onClick={toggleBadgeDisplay}>
                <img src={ListIcon} style={{fill: !badgeDisplay ? 'white' : '#107180'}}/>
            </BadgeContainerViewOptionButton>
            <BadgeContainerViewOptionButton isActive={badgeDisplay} onClick={toggleBadgeDisplay}>
                <img src={DashboardIcon} style={{fill: badgeDisplay ? 'white' : '#107180'}}/>
            </BadgeContainerViewOptionButton>
        </div>
    );
}