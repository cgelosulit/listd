import React from 'react';
import { SvgProps, Svg, Defs, ClipPath, Path, G } from 'react-native-svg';

const SearchIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      id="svg1713"
      width={props.width ?? 682.66669}
      height={props.height ?? 682.66669}
      viewBox="0 0 682.66669 682.66669"
      {...props}
    >
      <Defs>
        <ClipPath id="clipPath1727">
          <Path d="M 0,512 H 512 V 0 H 0 Z" id="path1725" />
        </ClipPath>
      </Defs>
      <G id="g1719" transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        <G id="g1721">
          <G id="g1723" clipPath="url(#clipPath1727)">
            <G id="g1729" transform="translate(492,332)">
              <Path
                d="m 0,0 c 0,88.366 -71.635,160 -160,160 -88.365,0 -160,-71.634 -160,-160 0,-88.366 71.635,-160 160,-160 88.365,0 160,71.634 160,160 z"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 40}
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path1731"
              />
            </G>
            <G id="g1733" transform="translate(31.7158,88.2842)">
              <Path
                d="m 0,0 c -15.621,-15.621 -15.621,-40.947 0,-56.568 15.621,-15.621 40.947,-15.621 56.568,0 l 74.427,74.426 c 15.621,15.621 15.621,40.948 0,56.568 v 0.001 c -15.621,15.62 -40.948,15.62 -56.568,0 z"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 40}
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path1735"
              />
            </G>
            <G id="g1737" transform="translate(218.8633,218.8628)">
              <Path
                d="M 0,0 -56.152,-56.152"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 40}
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path1739"
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default SearchIcon;
