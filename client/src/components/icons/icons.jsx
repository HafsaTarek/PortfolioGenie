/**
 * Centralized, lightweight inline SVG icons.
 * Kept dependency-free (no icon package) so the project has zero runtime
 * icon-library cost. All icons inherit color via `currentColor` and accept
 * a `size` prop so they stay crisp at any scale (resolution independent).
 */

const base = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  'aria-hidden': true,
  focusable: 'false',
});

export function SparkleIcon({ size = 20, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M12 2.5l1.8 4.6 4.7 1.9-4.7 1.9-1.8 4.6-1.8-4.6-4.7-1.9 4.7-1.9L12 2.5z"
        fill="currentColor"
      />
      <path
        d="M19 14l.9 2.3L22 17l-2.1.8L19 20l-.9-2.2L16 17l2.1-.7L19 14z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ChevronDownIcon({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MenuIcon({ size = 22, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M3 6h18M3 12h18M3 18h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon({ size = 22, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RefreshIcon({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M3.5 12a8.5 8.5 0 0 1 14.4-6.1M20.5 12a8.5 8.5 0 0 1-14.4 6.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 3.5v4.2h-4.2M6 20.5v-4.2h4.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TrashIcon({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M4 7h16M9.5 7V4.8c0-.4.4-.8.8-.8h3.4c.4 0 .8.4.8.8V7M7 7l.7 12.3c0 .6.5 1 1 1h6.6c.5 0 1-.4 1-1L17 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PencilIcon({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M15.7 4.3a1.7 1.7 0 0 1 2.4 2.4L7.5 17.3 4 18.3l1-3.5L15.7 4.3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldIcon({ size = 18, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon({ size = 18, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M19 19l-3.6-3.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BoltIcon({ size = 18, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <path
        d="M13 2.5L4.8 13.2h5.4L9.5 21.5 19 9.6h-5.6L13 2.5z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CheckCircleIcon({ size = 16, ...props }) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8.5 12.2l2.3 2.3 4.7-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DotIcon({ size = 8, ...props }) {
  return (
    <svg {...base(size)} {...props} viewBox="0 0 8 8">
      <circle cx="4" cy="4" r="4" fill="currentColor" />
    </svg>
  );
}
