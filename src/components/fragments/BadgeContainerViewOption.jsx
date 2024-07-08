import {ReactComponent as ListIcon} from '../../assets/img/icons/list_2.svg';
import {ReactComponent as DashboardIcon} from '../../assets/img/icons/dashboard_2.svg';

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

export default function BadgeContainerViewOption({badgeDisplay, toggleBadgeDisplay}) {
    return (
        <div style={{display: 'flex'}}>
            <BadgeContainerViewOptionButton isActive={!badgeDisplay} onClick={toggleBadgeDisplay}>
                <ListIcon style={{fill: !badgeDisplay ? 'white' : '#107180'}}/>
            </BadgeContainerViewOptionButton>
            <BadgeContainerViewOptionButton isActive={badgeDisplay} onClick={toggleBadgeDisplay}>
                <DashboardIcon style={{fill: badgeDisplay ? 'white' : '#107180'}}/>
            </BadgeContainerViewOptionButton>
        </div>
    );
}