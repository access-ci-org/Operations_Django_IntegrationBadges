import {ReactComponent as ExclamationIcon} from '../../assets/img/icons/patch-exclamation.svg';
import {ReactComponent as BookmarkIcon} from '../../assets/img/icons/bookmark-x.svg';

/**
 * The component that
 * @param {string} text - The message to display on the empty page.
 * @param {Object} style - Optional style object for the empty page wrapper.
 * @param {Boolean} task - Optional flag to indicate if the empty page is for tasks.
 */
export default function EmptyPage({text, style, task}) {
    return (
        <div className="empty-page-wrapper" style={style}>
            {task ?
                <BookmarkIcon className="empty-page-icon" style={{width: '40px', height: '40px'}}/> :
                <ExclamationIcon className="empty-page-icon" style={{width: '40px', height: '40px'}}/>
            }
            <p>{text}</p>
        </div>
    );
}