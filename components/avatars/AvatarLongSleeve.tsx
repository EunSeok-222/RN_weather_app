import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

interface Props { size?: number; }

export default function AvatarLongSleeve({ size = 120 }: Props) {
    return (
        <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
            {/* Head */}
            <Circle cx="60" cy="30" r="20" fill="#FFE0BD" />
            {/* Hair */}
            <Path d="M40 25 Q42 12 60 10 Q78 12 80 25 Q75 18 60 16 Q45 18 40 25Z" fill="#2C1810" />
            {/* Eyes */}
            <Circle cx="53" cy="28" r="2.5" fill="#333" />
            <Circle cx="67" cy="28" r="2.5" fill="#333" />
            {/* Mouth */}
            <Path d="M55 35 Q60 39 65 35" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Blush */}
            <Ellipse cx="48" cy="34" rx="4" ry="2" fill="#FFB6C1" opacity={0.5} />
            <Ellipse cx="72" cy="34" rx="4" ry="2" fill="#FFB6C1" opacity={0.5} />
            {/* Long Sleeve Shirt Body */}
            <Path d="M40 50 L38 85 L82 85 L80 50 Q70 47 60 47 Q50 47 40 50Z" fill="#4A90D9" />
            {/* Collar */}
            <Path d="M50 48 Q55 52 60 50 Q65 52 70 48 Q65 46 60 46 Q55 46 50 48Z" fill="#3A7BC8" />
            {/* Shirt stripes */}
            <Path d="M40 60 L80 60" stroke="#3A7BC8" strokeWidth="1.5" opacity={0.4} />
            <Path d="M39 70 L81 70" stroke="#3A7BC8" strokeWidth="1.5" opacity={0.4} />
            {/* Arms (long sleeves) */}
            <Path d="M40 55 Q30 65 27 80" stroke="#4A90D9" strokeWidth="8" strokeLinecap="round" />
            <Path d="M80 55 Q90 65 93 80" stroke="#4A90D9" strokeWidth="8" strokeLinecap="round" />
            {/* Sleeve cuffs */}
            <Circle cx="27" cy="80" r="4" fill="#3A7BC8" />
            <Circle cx="93" cy="80" r="4" fill="#3A7BC8" />
            {/* Hands */}
            <Circle cx="27" cy="84" r="4" fill="#FFE0BD" />
            <Circle cx="93" cy="84" r="4" fill="#FFE0BD" />
            {/* Legs */}
            <Rect x="46" y="85" width="10" height="22" rx="5" fill="#5B7DB1" />
            <Rect x="64" y="85" width="10" height="22" rx="5" fill="#5B7DB1" />
            {/* Shoes */}
            <Ellipse cx="51" cy="110" rx="7" ry="4" fill="#D4A07A" />
            <Ellipse cx="69" cy="110" rx="7" ry="4" fill="#D4A07A" />
        </Svg>
    );
}
