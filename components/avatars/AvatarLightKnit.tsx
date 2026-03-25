import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

interface Props { size?: number; }

export default function AvatarLightKnit({ size = 120 }: Props) {
    return (
        <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
            {/* Head */}
            <Circle cx="60" cy="30" r="20" fill="#FFE0BD" />
            {/* Hair */}
            <Path d="M40 25 Q42 12 60 10 Q78 12 80 25 Q75 18 60 16 Q45 18 40 25Z" fill="#8B6914" />
            {/* Eyes */}
            <Circle cx="53" cy="28" r="2.5" fill="#333" />
            <Circle cx="67" cy="28" r="2.5" fill="#333" />
            {/* Mouth */}
            <Path d="M55 35 Q60 39 65 35" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Blush */}
            <Ellipse cx="48" cy="34" rx="4" ry="2" fill="#FFB6C1" opacity={0.5} />
            <Ellipse cx="72" cy="34" rx="4" ry="2" fill="#FFB6C1" opacity={0.5} />
            {/* Cardigan Body */}
            <Path d="M38 50 L36 85 L84 85 L82 50 Q70 47 60 47 Q50 47 38 50Z" fill="#D4A07A" />
            {/* Inner shirt */}
            <Rect x="50" y="50" width="20" height="35" rx="3" fill="#F5F0E8" />
            {/* Cardigan Open Front */}
            <Path d="M50 50 L48 85 L36 85 L38 50Z" fill="#C4906A" />
            <Path d="M70 50 L72 85 L84 85 L82 50Z" fill="#C4906A" />
            {/* Knit texture lines */}
            <Path d="M38 58 Q49 60 50 58" stroke="#B8805A" strokeWidth="0.8" opacity={0.5} />
            <Path d="M38 66 Q49 68 50 66" stroke="#B8805A" strokeWidth="0.8" opacity={0.5} />
            <Path d="M70 58 Q81 60 82 58" stroke="#B8805A" strokeWidth="0.8" opacity={0.5} />
            <Path d="M70 66 Q81 68 82 66" stroke="#B8805A" strokeWidth="0.8" opacity={0.5} />
            {/* Arms */}
            <Path d="M38 55 Q28 68 26 80" stroke="#D4A07A" strokeWidth="9" strokeLinecap="round" />
            <Path d="M82 55 Q92 68 94 80" stroke="#D4A07A" strokeWidth="9" strokeLinecap="round" />
            {/* Legs */}
            <Rect x="46" y="85" width="10" height="22" rx="5" fill="#5B7DB1" />
            <Rect x="64" y="85" width="10" height="22" rx="5" fill="#5B7DB1" />
            {/* Shoes */}
            <Ellipse cx="51" cy="110" rx="7" ry="4" fill="#F5F5DC" />
            <Ellipse cx="69" cy="110" rx="7" ry="4" fill="#F5F5DC" />
        </Svg>
    );
}
