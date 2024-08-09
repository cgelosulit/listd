import React from 'react';
import { SvgProps, Svg, Defs, ClipPath, Path, G } from 'react-native-svg';

const PropertySearchIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      id="svg864"
      width={props.width ?? 682.66669}
      height={props.height ?? 682.66669}
      viewBox="0 0 682.66669 682.66669"
      {...props}
    >
      <Defs>
        <ClipPath id="clipPath878">
          <Path d="M 0,512 H 512 V 0 H 0 Z" id="path876" />
        </ClipPath>
      </Defs>
      <G id="g870" transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        <G id="g872">
          <G id="g874" clipPath="url(#clipPath878)">
            <G id="g880" transform="translate(497.0015,329.3481)">
              <Path
                d="m 0,0 c 0,-92.595 -75.057,-167.661 -167.652,-167.661 -92.515,0 -167.661,74.968 -167.661,167.661 0,92.595 75.066,167.652 167.661,167.652 C -75.057,167.652 0,92.595 0,0 Z"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path882"
              />
            </G>
            <G id="g884" transform="translate(194.4775,134.8691)">
              <Path
                d="m 0,0 -112.316,-112.316 c -10.07,-10.071 -26.38,-10.071 -36.44,0 l -23.17,23.17 c -10.07,10.06 -10.07,26.37 0,36.439 L -59.61,59.61 Z"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path886"
              />
            </G>
            <G id="g888" transform="translate(414.0957,371.5527)">
              <Path
                d="M 0,0 V -117.464 H -169.502 V 0"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path890"
              />
            </G>
            <G id="g892" transform="translate(329.3447,424.5986)">
              <Path
                d="m 0,0 -46.669,-29.211 -65.512,-41.003"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path894"
              />
            </G>
            <G id="g896" transform="translate(441.5254,354.3848)">
              <Path
                d="m 0,0 -65.511,41.003 -46.67,29.211"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path896"
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default PropertySearchIcon;
