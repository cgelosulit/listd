import React from 'react';
import { SvgProps, Svg, Defs, ClipPath, Path, G } from 'react-native-svg';

const HomePageIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      id="svg1089"
      width={props.width ?? 682.66669}
      height={props.height ?? 682.66669}
      viewBox="0 0 682.66669 682.66669"
      {...props}
    >
      <Defs>
        <ClipPath id="clipPath1103">
          <Path d="M 0,512 H 512 V 0 H 0 Z" id="path1101" />
        </ClipPath>
      </Defs>
      <G id="g1095" transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        <G id="g1097">
          <G id="g1099" clipPath="url(#clipPath1103)">
            <G id="g1105" transform="translate(20,332.0356)">
              <Path
                d="M 0,0 213.004,152.733 C 219.508,157.312 227.44,160 236,160 c 8.56,0 16.492,-2.688 22.996,-7.267 L 472,0"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 40}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path1107"
              />
            </G>
            <G id="g1109" transform="translate(278.9956,384.77)">
              <Path
                d="M 0,0 C -6.504,4.578 -14.436,7.266 -22.996,7.266 -31.555,7.266 -39.487,4.578 -45.991,0 l -156.027,-112.631 c -10.644,-7.492 -16.978,-19.694 -16.978,-32.71 v -179.393 c 0,-22.092 17.909,-40 40,-40 h 116 v 80 c 0,22.091 17.909,40 40,40 22.092,0 40,-17.909 40,-40 v -80 h 116 c 22.092,0 40,17.908 40,40 v 179.393 c 0,13.016 -6.333,25.218 -16.977,32.71 z"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 40}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path1111"
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default HomePageIcon;
