import ExclamationIcon from '../../assets/img/icons/patch-exclamation.svg';
import BookmarkIcon from '../../assets/img/icons/bookmark-x.svg';

/**
 * The component that displays an empty page with a message and an icon.
 * @param {string} text - The message to display on the empty page.
 * @param {Object} style - Optional style object for the empty page wrapper.
 * @param {Boolean} task - Optional flag to indicate if the empty page is for tasks. In case of tasks,
 * the icon will be a bookmark icon.
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