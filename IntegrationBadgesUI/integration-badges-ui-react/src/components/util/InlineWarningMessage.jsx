export default function InlineWarningMessage({showIcon=true, title="WARNING", description=""}) {
    return <p className="bg-warning-subtle border-start border-4 border-warning ps-2">
        {!!showIcon && <i className="bi bi-exclamation-triangle-fill pe-2 text-warning"></i>}
        {!!title && title + ": "}
        {description}
    </p>
}