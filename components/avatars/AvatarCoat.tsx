import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

interface Props { size?: number; }

export default function AvatarCoat({ size = 120 }: Props) {
    return (
        <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
            {/* Head */}
            <Circle cx="60" cy="30" r="20" fill="#FFE0BD" />
            {/* Hair */}
            <Path d="M40 25 Q42 12 60 10 Q78 12 80 25 Q75 18 60 16 Q45 18 40 25Z" fill="#5C3D2E" />
            {/* Eyes */}
            <Circle cx="53" cy="28" r="2.5" fill="#333" />
            <Circle cx="67" cy="28" r="2.5" fill="#333" />
            {/* Mouth */}
            <Path d="M55 35 Q60 39 65 35" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Blush */}
            <Ellipse cx="48" cy="34" rx="4" ry="2" fill="#FFB6C1" opacity={0.5} />
            <Ellipse cx="72" cy="34" rx="4" ry="2" fill="#FFB6C1" opacity={0.5} />
            {/* Coat Body */}
            <Path d="M38 50 L34 90 L50 92 L55 70 L60 92 L65 70 L70 92 L86 90 L82 50 Q70 47 60 47 Q50 47 38 50Z" fill="#8B4513" />
            {/* Coat Collar */}
            <Path d="M42 50 Q50 45 60 45 Q70 45 78 50 L75 55 Q68 50 60 50 Q52 50 45 55Z" fill="#A0522D" />
            {/* Coat lapels */}
            <Path d="M55 50 L52 70 L58 70Z" fill="#A0522D" opacity={0.7} />
            <Path d="M65 50 L68 70 L62 70Z" fill="#A0522D" opacity={0.7} />
            {/* Buttons */}
            <Circle cx="60" cy="60" r="2" fill="#D4A574" />
            <Circle cx="60" cy="72" r="2" fill="#D4A574" />
            <Circle cx="60" cy="84" r="2" fill="#D4A574" />
            {/* Arms */}
            <Path d="M38 55 Q28 68 25 80" stroke="#8B4513" strokeWidth="9" strokeLinecap="round" />
            <Path d="M82 55 Q92 68 95 80" stroke="#8B4513" strokeWidth="9" strokeLinecap="round" />
            {/* Legs */}
            <Rect x="46" y="90" width="10" height="18" rx="5" fill="#4A4A4A" />
            <Rect x="64" y="90" width="10" height="18" rx="5" fill="#4A4A4A" />
            {/* Shoes */}
            <Ellipse cx="51" cy="110" rx="7" ry="4" fill="#2B2B2B" />
            <Ellipse cx="69" cy="110" rx="7" ry="4" fill="#2B2B2B" />
            {/* Scarf */}
            <Path d="M48 48 Q55 52 60 50 Q65 52 72 48 Q68 55 60 53 Q52 55 48 48Z" fill="#C41E3A" />
            <Path d="M55 53 L53 65 L58 65Z" fill="#C41E3A" />
        </Svg>
    );
}
