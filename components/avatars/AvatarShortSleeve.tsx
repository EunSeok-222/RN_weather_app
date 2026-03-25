import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

interface Props { size?: number; }

export default function AvatarShortSleeve({ size = 120 }: Props) {
    return (
        <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
            {/* Head */}
            <Circle cx="60" cy="30" r="20" fill="#FFE0BD" />
            {/* Hair */}
            <Path d="M40 25 Q42 12 60 10 Q78 12 80 25 Q75 18 60 16 Q45 18 40 25Z" fill="#6B4226" />
            {/* Eyes */}
            <Circle cx="53" cy="28" r="2.5" fill="#333" />
            <Circle cx="67" cy="28" r="2.5" fill="#333" />
            {/* Smile */}
            <Path d="M54 35 Q60 40 66 35" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Blush */}
            <Ellipse cx="48" cy="34" rx="4" ry="2" fill="#FFB6C1" opacity={0.5} />
            <Ellipse cx="72" cy="34" rx="4" ry="2" fill="#FFB6C1" opacity={0.5} />
            {/* T-Shirt Body */}
            <Path d="M40 50 L38 85 L82 85 L80 50 Q70 47 60 47 Q50 47 40 50Z" fill="#FF6B6B" />
            {/* Collar */}
            <Path d="M50 48 Q55 52 60 50 Q65 52 70 48 Q66 46 60 46 Q54 46 50 48Z" fill="#E55A5A" />
            {/* Short sleeves */}
            <Path d="M40 50 L32 55 Q30 62 35 65 L40 62Z" fill="#FF6B6B" />
            <Path d="M80 50 L88 55 Q90 62 85 65 L80 62Z" fill="#FF6B6B" />
            {/* Sleeve hems */}
            <Path d="M35 65 L40 62" stroke="#E55A5A" strokeWidth="1" />
            <Path d="M85 65 L80 62" stroke="#E55A5A" strokeWidth="1" />
            {/* Design on shirt */}
            <Circle cx="60" cy="68" r="6" fill="#FFE066" opacity={0.7} />
            {/* Bare arms */}
            <Path d="M35 65 Q28 72 26 82" stroke="#FFE0BD" strokeWidth="7" strokeLinecap="round" />
            <Path d="M85 65 Q92 72 94 82" stroke="#FFE0BD" strokeWidth="7" strokeLinecap="round" />
            {/* Hands */}
            <Circle cx="26" cy="84" r="4" fill="#FFE0BD" />
            <Circle cx="94" cy="84" r="4" fill="#FFE0BD" />
            {/* Shorts */}
            <Rect x="42" y="85" width="36" height="14" rx="4" fill="#4A90D9" />
            <Path d="M60 85 L60 99" stroke="#3A7BC8" strokeWidth="1" />
            {/* Legs */}
            <Rect x="46" y="99" width="10" height="10" rx="5" fill="#FFE0BD" />
            <Rect x="64" y="99" width="10" height="10" rx="5" fill="#FFE0BD" />
            {/* Shoes */}
            <Ellipse cx="51" cy="112" rx="8" ry="4" fill="#E8E8E8" />
            <Ellipse cx="69" cy="112" rx="8" ry="4" fill="#E8E8E8" />
        </Svg>
    );
}
