import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

interface Props { size?: number; }

export default function AvatarJacket({ size = 120 }: Props) {
    return (
        <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
            {/* Head */}
            <Circle cx="60" cy="30" r="20" fill="#FFE0BD" />
            {/* Hair */}
            <Path d="M40 25 Q42 12 60 10 Q78 12 80 25 Q75 18 60 16 Q45 18 40 25Z" fill="#3E2723" />
            {/* Eyes */}
            <Circle cx="53" cy="28" r="2.5" fill="#333" />
            <Circle cx="67" cy="28" r="2.5" fill="#333" />
            {/* Mouth */}
            <Path d="M55 35 Q60 39 65 35" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Blush */}
            <Ellipse cx="48" cy="34" rx="4" ry="2" fill="#FFB6C1" opacity={0.5} />
            <Ellipse cx="72" cy="34" rx="4" ry="2" fill="#FFB6C1" opacity={0.5} />
            {/* Trench Coat / Jacket Body */}
            <Path d="M38 50 L36 88 L84 88 L82 50 Q70 47 60 47 Q50 47 38 50Z" fill="#6B8E6B" />
            {/* Collar */}
            <Path d="M42 50 L50 58 L60 52 L70 58 L78 50 Q70 46 60 46 Q50 46 42 50Z" fill="#5A7D5A" />
            {/* Belt */}
            <Rect x="36" y="72" width="48" height="4" rx="2" fill="#8B7355" />
            <Rect x="57" y="70" width="6" height="8" rx="2" fill="#A0855C" />
            {/* Pockets */}
            <Rect x="40" y="62" width="14" height="8" rx="3" fill="#5A7D5A" opacity={0.7} />
            <Rect x="66" y="62" width="14" height="8" rx="3" fill="#5A7D5A" opacity={0.7} />
            {/* Arms */}
            <Path d="M38 55 Q28 68 26 80" stroke="#6B8E6B" strokeWidth="9" strokeLinecap="round" />
            <Path d="M82 55 Q92 68 94 80" stroke="#6B8E6B" strokeWidth="9" strokeLinecap="round" />
            {/* Legs */}
            <Rect x="46" y="88" width="10" height="20" rx="5" fill="#3E3E3E" />
            <Rect x="64" y="88" width="10" height="20" rx="5" fill="#3E3E3E" />
            {/* Shoes */}
            <Ellipse cx="51" cy="110" rx="7" ry="4" fill="#2B2B2B" />
            <Ellipse cx="69" cy="110" rx="7" ry="4" fill="#2B2B2B" />
        </Svg>
    );
}
