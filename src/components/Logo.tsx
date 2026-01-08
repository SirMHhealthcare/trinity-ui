interface LogoProps {
  className?: string;
}

const Logo = ({ className = "h-14 w-auto" }: LogoProps) => {
  return (
    <svg
      viewBox="0 0 200 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Curved "Healing Naturally" text */}
      <defs>
        <path
          id="curve"
          d="M 30 45 Q 100 10 170 45"
          fill="transparent"
        />
      </defs>
      <text
        className="fill-muted-foreground"
        fontSize="10"
        fontFamily="serif"
        fontStyle="italic"
      >
        <textPath href="#curve" startOffset="50%" textAnchor="middle">
          Healing Naturally
        </textPath>
      </text>

      {/* Three leaves */}
      <g transform="translate(100, 48)">
        {/* Center leaf */}
        <path
          d="M 0 -25 C 12 -20 15 -5 0 5 C -15 -5 -12 -20 0 -25"
          className="fill-primary"
        />
        {/* Left leaf */}
        <path
          d="M -18 -15 C -8 -18 -2 -8 -10 2 C -25 -2 -25 -12 -18 -15"
          className="fill-primary"
        />
        {/* Right leaf */}
        <path
          d="M 18 -15 C 8 -18 2 -8 10 2 C 25 -2 25 -12 18 -15"
          className="fill-primary"
        />
      </g>

      {/* TRINITY text */}
      <text
        x="100"
        y="72"
        textAnchor="middle"
        className="fill-primary"
        fontSize="20"
        fontFamily="serif"
        fontWeight="600"
        letterSpacing="3"
      >
        TRINITY
      </text>

      {/* Decorative line */}
      <line
        x1="45"
        y1="78"
        x2="155"
        y2="78"
        className="stroke-destructive"
        strokeWidth="1"
      />

      {/* HOMEOPATHY text */}
      <text
        x="100"
        y="92"
        textAnchor="middle"
        className="fill-destructive"
        fontSize="12"
        fontFamily="serif"
        letterSpacing="4"
      >
        HOMEOPATHY
      </text>
    </svg>
  );
};

export default Logo;
