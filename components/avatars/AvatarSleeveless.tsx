import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

interface Props { size?: number; }

export default function AvatarSleeveless({ size = 120 }: Props) {
    return (
        <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
            {/* Head */}
            <Circle cx="60" cy="30" r="20" fill="#FFE0BD" />
            {/* Hair */}
            <Path d="M40 25 Q42 10 60 8 Q78 10 80 25 Q75 16 60 14 Q45 16 40 25Z" fill="#C4A882" />
            {/* Sunglasses */}
            <Rect x="46" y="24" width="12" height="8" rx="4" fill="#333" opacity={0.8} />
            <Rect x="62" y="24" width="12" height="8" rx="4" fill="#333" opacity={0.8} />
            <Path d="M58 28 L62 28" stroke="#333" strokeWidth="1.5" />
            {/* Bridge */}
            <Path d="M44 28 L46 28" stroke="#333" strokeWidth="1" />
            <Path d="M74 28 L76 28" stroke="#333" strokeWidth="1" />
            {/* Smile */}
            <Path d="M54 36 Q60 41 66 36" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Tank Top Body */}
            <Path d="M44 50 L42 85 L78 85 L76 50 Q68 47 60 47 Q52 47 44 50Z" fill="#F0F0F0" />
            {/* Tank straps */}
            <Rect x="48" y="44" width="8" height="8" rx="2" fill="#F0F0F0" />
            <Rect x="64" y="44" width="8" height="8" rx="2" fill="#F0F0F0" />
            {/* Tank neck */}
            <Path d="M56 48 Q60 52 64 48" stroke="#E0E0E0" strokeWidth="1" fill="none" />
            {/* Bare arms */}
            <Path d="M44 52 Q32 62 28 78" stroke="#FFE0BD" strokeWidth="8" strokeLinecap="round" />
            <Path d="M76 52 Q88 62 92 78" stroke="#FFE0BD" strokeWidth="8" strokeLinecap="round" />
            {/* Hands */}
            <Circle cx="28" cy="80" r="4" fill="#FFE0BD" />
            <Circle cx="92" cy="80" r="4" fill="#FFE0BD" />
            {/* Shorts */}
            <Rect x="42" y="85" width="36" height="12" rx="4" fill="#6BC5B0" />
            <Path d="M60 85 L60 97" stroke="#5AB5A0" strokeWidth="1" />
            {/* Legs */}
            <Rect x="46" y="97" width="10" height="12" rx="5" fill="#FFE0BD" />
            <Rect x="64" y="97" width="10" height="12" rx="5" fill="#FFE0BD" />
            {/* Sandals */}
            <Ellipse cx="51" cy="112" rx="8" ry="3" fill="#D4A07A" />
            <Path d="M47 112 L51 108 L55 112" stroke="#C49060" strokeWidth="1.5" fill="none" />
            <Ellipse cx="69" cy="112" rx="8" ry="3" fill="#D4A07A" />
            <Path d="M65 112 L69 108 L73 112" stroke="#C49060" strokeWidth="1.5" fill="none" />
        </Svg>
    );
}
