import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

interface Props { size?: number; }

export default function AvatarHeavyOuter({ size = 120 }: Props) {
    return (
        <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
            {/* Head */}
            <Circle cx="60" cy="30" r="20" fill="#FFE0BD" />
            {/* Eyes */}
            <Circle cx="53" cy="28" r="2.5" fill="#333" />
            <Circle cx="67" cy="28" r="2.5" fill="#333" />
            {/* Mouth */}
            <Path d="M55 35 Q60 40 65 35" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Blush */}
            <Ellipse cx="48" cy="34" rx="4" ry="2" fill="#FFB6C1" opacity={0.5} />
            <Ellipse cx="72" cy="34" rx="4" ry="2" fill="#FFB6C1" opacity={0.5} />
            {/* Padded Jacket Body */}
            <Path d="M35 50 Q33 55 30 70 Q28 80 35 85 L45 88 L60 90 L75 88 L85 85 Q92 80 90 70 Q87 55 85 50 Q80 48 60 48 Q40 48 35 50Z" fill="#3D5A80" />
            {/* Puffy segments */}
            <Path d="M35 55 Q60 58 85 55" stroke="#2B4162" strokeWidth="1" opacity={0.4} />
            <Path d="M33 65 Q60 68 87 65" stroke="#2B4162" strokeWidth="1" opacity={0.4} />
            <Path d="M32 75 Q60 78 88 75" stroke="#2B4162" strokeWidth="1" opacity={0.4} />
            {/* Collar / Hood */}
            <Path d="M42 48 Q50 42 60 43 Q70 42 78 48 Q72 44 60 45 Q48 44 42 48Z" fill="#2B4162" />
            {/* Zipper */}
            <Rect x="58" y="50" width="4" height="38" rx="2" fill="#A0C4FF" opacity={0.6} />
            {/* Arms */}
            <Path d="M35 55 Q25 65 22 78" stroke="#3D5A80" strokeWidth="10" strokeLinecap="round" />
            <Path d="M85 55 Q95 65 98 78" stroke="#3D5A80" strokeWidth="10" strokeLinecap="round" />
            {/* Legs */}
            <Rect x="45" y="88" width="10" height="20" rx="5" fill="#4A4A4A" />
            <Rect x="65" y="88" width="10" height="20" rx="5" fill="#4A4A4A" />
            {/* Shoes */}
            <Ellipse cx="50" cy="110" rx="8" ry="4" fill="#2B2B2B" />
            <Ellipse cx="70" cy="110" rx="8" ry="4" fill="#2B2B2B" />
            {/* Hat */}
            <Path d="M40 18 Q45 5 60 4 Q75 5 80 18" fill="#3D5A80" />
            <Rect x="38" y="17" width="44" height="5" rx="2" fill="#2B4162" />
        </Svg>
    );
}
