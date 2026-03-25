import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

interface Props { size?: number; }

export default function AvatarHoodie({ size = 120 }: Props) {
    return (
        <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
            {/* Head */}
            <Circle cx="60" cy="30" r="20" fill="#FFE0BD" />
            {/* Hair */}
            <Path d="M40 25 Q42 12 60 10 Q78 12 80 25 Q75 18 60 16 Q45 18 40 25Z" fill="#4A3728" />
            {/* Eyes */}
            <Circle cx="53" cy="28" r="2.5" fill="#333" />
            <Circle cx="67" cy="28" r="2.5" fill="#333" />
            {/* Mouth */}
            <Path d="M55 35 Q60 39 65 35" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Blush */}
            <Ellipse cx="48" cy="34" rx="4" ry="2" fill="#FFB6C1" opacity={0.5} />
            <Ellipse cx="72" cy="34" rx="4" ry="2" fill="#FFB6C1" opacity={0.5} />
            {/* Hoodie Body */}
            <Path d="M36 50 L34 88 L86 88 L84 50 Q70 47 60 47 Q50 47 36 50Z" fill="#7B68AE" />
            {/* Hood */}
            <Path d="M40 50 Q38 42 45 40 Q55 38 60 40 Q65 38 75 40 Q82 42 80 50 Q72 46 60 45 Q48 46 40 50Z" fill="#6A5A9E" />
            {/* Kangaroo Pocket */}
            <Path d="M44 68 L44 80 Q44 83 47 83 L73 83 Q76 83 76 80 L76 68 Q60 72 44 68Z" fill="#6A5A9E" />
            {/* Pocket opening */}
            <Path d="M48 72 Q60 75 72 72" stroke="#5D4E8E" strokeWidth="1.5" fill="none" />
            {/* Hood strings */}
            <Path d="M55 50 L54 62" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" />
            <Path d="M65 50 L66 62" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" />
            {/* Arms */}
            <Path d="M36 55 Q26 68 24 80" stroke="#7B68AE" strokeWidth="9" strokeLinecap="round" />
            <Path d="M84 55 Q94 68 96 80" stroke="#7B68AE" strokeWidth="9" strokeLinecap="round" />
            {/* Legs */}
            <Rect x="46" y="88" width="10" height="20" rx="5" fill="#3E3E3E" />
            <Rect x="64" y="88" width="10" height="20" rx="5" fill="#3E3E3E" />
            {/* Shoes */}
            <Ellipse cx="51" cy="110" rx="8" ry="4" fill="#E8E8E8" />
            <Ellipse cx="69" cy="110" rx="8" ry="4" fill="#E8E8E8" />
        </Svg>
    );
}
