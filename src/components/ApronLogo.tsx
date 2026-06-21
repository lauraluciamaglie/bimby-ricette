import React from 'react';
import Svg, { Rect, Path, Circle } from 'react-native-svg';
import { colors } from '@/theme/theme';

/**
 * Logo del brand: grembiule da cucina bianco su sfondo turchese.
 * Usato come marchio in-app e come base per generare l'icona dell'app
 * (vedi scripts/generate-icon.js, che renderizza lo stesso disegno in PNG).
 */
export function ApronLogo({
  size = 96,
  rounded = true,
  background = colors.primary,
}: {
  size?: number;
  rounded?: boolean;
  background?: string;
}) {
  const r = rounded ? 220 : 0;
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024">
      <Rect x={0} y={0} width={1024} height={1024} rx={r} ry={r} fill={background} />
      {/* Laccetto del collo */}
      <Path
        d="M512 250 C 470 250 452 286 452 320 L 452 360 L 572 360 L 572 320 C 572 286 554 250 512 250 Z"
        fill="#FFFFFF"
      />
      {/* Corpo del grembiule */}
      <Path
        d="M452 360 C 380 372 372 470 372 560 L 372 740 C 372 770 392 790 422 790 L 602 790 C 632 790 652 770 652 740 L 652 560 C 652 470 644 372 572 360 Z"
        fill="#FFFFFF"
      />
      {/* Tasca centrale */}
      <Rect x={452} y={560} width={120} height={110} rx={14} fill={background} opacity={0.18} />
      {/* Lacci in vita */}
      <Path d="M372 470 C 320 480 290 500 270 520" stroke="#FFFFFF" strokeWidth={26} strokeLinecap="round" fill="none" />
      <Path d="M652 470 C 704 480 734 500 754 520" stroke="#FFFFFF" strokeWidth={26} strokeLinecap="round" fill="none" />
      <Circle cx={512} cy={320} r={10} fill={background} opacity={0.18} />
    </Svg>
  );
}
