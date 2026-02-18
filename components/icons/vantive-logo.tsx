export const VantiveLogo = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
    >
        <style>{`
      .bg { fill: #8B4513; }
      .fg { fill: #F9F7F2; }
      @media (prefers-color-scheme: dark) {
        .bg { fill: #D4976A; }
        .fg { fill: #0A0A0F; }
      }
    `}</style>
        <circle cx="256" cy="256" r="256" className="bg" />
        <polygon
            points="116,130 256,450 396,130 320,130 256,300 192,130"
            className="fg"
        />
    </svg>
);
