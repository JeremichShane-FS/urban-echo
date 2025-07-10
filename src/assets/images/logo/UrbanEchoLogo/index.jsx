/**
 * @fileoverview Urban Echo brand logo SVG component with urban skyline and sound wave elements
 * Renders the complete Urban Echo logo featuring an urban skyline silhouette with sound wave patterns
 * Provides scalable vector graphics for brand identity across all application interfaces and marketing materials
 *
 * Urban Echo brand logo component with urban cityscape and sound wave design
 * @component
 * @returns {JSX.Element} SVG logo with urban skyline, sound waves, and brand text
 *
 * @example
 * // Display logo in header navigation
 * <UrbanEchoLogo />
 */
const UrbanEchoLogo = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" aria-hidden="true">
      {/* Urban skyline silhouette */}
      <path
        d="M5,25 L9,25 L9,18 L13,18 L13,22 L17,22 L17,16 L21,16 L21,20 
              L25,20 L25,15 L29,15 L29,19 L33,19 L33,14 L37,14 L37,23 
              L41,23 L41,18 L45,18 L45,23 L49,23"
        fill="none"
        stroke="#4A90A7"
        strokeWidth="1.2"
      />

      {/* Sound wave patterns */}
      <path d="M5,30 Q27,27 49,30" fill="none" stroke="#E67E22" strokeWidth="1.2" />
      <path d="M5,33 Q27,30 49,33" fill="none" stroke="#E67E22" strokeWidth="0.9" opacity="0.7" />
      <path d="M5,36 Q27,33 49,36" fill="none" stroke="#E67E22" strokeWidth="0.6" opacity="0.4" />

      {/* Brand text */}
      <text
        x="55"
        y="18"
        fontFamily="Arial, sans-serif"
        fontSize="10"
        fontWeight="bold"
        fill="#F7F7F7">
        URBAN
      </text>
      <text
        x="55"
        y="30"
        fontFamily="Arial, sans-serif"
        fontSize="10"
        fontWeight="bold"
        fill="#E67E22">
        ECHO
      </text>
    </svg>
  );
};

export default UrbanEchoLogo;

UrbanEchoLogo.displayName = "UrbanEchoLogo";
