export default function AgentSidebarItem({
    title,
    description,
    time,
    status,
    active = false,
    onClick
}) {
    const getStatusIcon = () => {
        if (status === "running") {
            return (
                <svg className="animate-spin" width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
                    <path d="M14 8a6 6 0 00-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        }
        if (status === "in-queue") {
            return (
                <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 13.9766C4.70117 13.9766 2.02344 11.2988 2.02344 8C2.02344 4.70117 4.70117 2.02344 8 2.02344C11.2988 2.02344 13.9766 4.70117 13.9766 8C13.9766 11.2988 11.2988 13.9766 8 13.9766ZM8 12.9805C10.7539 12.9805 12.9805 10.7539 12.9805 8C12.9805 5.24609 10.7539 3.01953 8 3.01953C5.24609 3.01953 3.01953 5.24609 3.01953 8C3.01953 10.7539 5.24609 12.9805 8 12.9805ZM7.35547 10.7832C7.16211 10.7832 7.00391 10.7012 6.85742 10.5078L5.42773 8.75C5.3457 8.63867 5.29297 8.51562 5.29297 8.38672C5.29297 8.12891 5.49219 7.92383 5.74414 7.92383C5.9082 7.92383 6.03711 7.9707 6.17773 8.1582L7.33203 9.65234L9.76367 5.75C9.875 5.58008 10.0215 5.48633 10.168 5.48633C10.4141 5.48633 10.6484 5.65625 10.6484 5.91992C10.6484 6.04883 10.5723 6.17773 10.5078 6.29492L7.83008 10.5078C7.71289 10.6895 7.54883 10.7832 7.35547 10.7832Z" />
                </svg>
            );
        }
        return (
            <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor">
                <path d="M6.5 12.5L2 8L6.5 3.5M13.5 12.5L9 8L13.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
        );
    };

    const getStatusBadge = () => {
        if (status === "running") {
            return <span className="text-green-400/70 text-xs">Running</span>;
        }
        if (status === "in-queue") {
            return <span className="text-yellow-400/70 text-xs">In Queue</span>;
        }
        return null;
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={`agent-sidebar__row flex w-full items-start gap-2 border-0 px-3 py-2.5 text-left transition-colors cursor-pointer group`}
            tabIndex={-1}
            style={{
                paddingLeft: "calc(2px + 0.75rem)",
                outline: "none",
                backgroundColor: active ? 'var(--border-subtle)' : 'transparent',
                color: active ? 'var(--text-primary)' : 'var(--text-primary)',
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = 'var(--border-subtle)' }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = 'transparent' }}
        >
            {/* Icon */}
            <div
                className="flex h-4 w-4 items-center justify-center"
                style={{ transform: "translateZ(0px)" }}
            >
                {getStatusIcon()}
            </div>

            {/* Content */}
            <div className="flex min-w-0 flex-1 flex-col gap-px text-lg">
                <div className="flex items-start justify-between gap-2">
                    <div className="truncate" style={{ color: active ? 'var(--text-primary)' : 'var(--text-primary)' }}>{title}</div>
                    <div className="type-product-sm shrink-0 flex items-center gap-1">
                        {getStatusBadge()}
                        {status === "done" && (
                            <span className="opacity-50" style={{ color: active ? 'var(--text-muted)' : 'var(--text-muted)' }}>{time}</span>
                        )}
                    </div>
                </div>

                <div className="type-product-sm flex items-center gap-1" style={{ color: active ? 'var(--text-muted)' : 'var(--text-muted)', opacity: 0.7 }}>
                    <span className="flex min-w-0 items-center gap-1">
                        <span className="min-w-0 flex-1 truncate">
                            {description}
                        </span>
                    </span>
                </div>
            </div>
        </button>
    );
};
