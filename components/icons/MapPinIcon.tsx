import React from 'react';
import { SvgProps, Svg, Defs, ClipPath, Path, G } from 'react-native-svg';

const MapPinIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      id="svg16938"
      width={props.width ?? 682.66669}
      height={props.height ?? 682.66669}
      viewBox="0 0 682.66669 682.66669"
      {...props}
    >
      <Defs>
        <ClipPath id="clipPath16952">
          <Path d="M 0,512 H 512 V 0 H 0 Z" id="path16950" />
        </ClipPath>
      </Defs>
      <G id="g16944" transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        <G id="g16946">
          <G id="g16948" clipPath="url(#clipPath16952)">
            <G id="g16954" transform="translate(372.0068,380.9932)">
              <Path
                d="m 0,0 c 0,-64.069 -51.938,-116.007 -116.007,-116.007 -64.068,0 -116.007,51.938 -116.007,116.007 0,64.069 51.939,116.007 116.007,116.007 C -51.938,116.007 0,64.069 0,0 Z"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path16956"
              />
            </G>
            <G id="g16958" transform="translate(190.9053,380.9932)">
              <Path
                d="M 0,0 C 0,35.951 29.144,65.095 65.095,65.095"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path16960"
              />
            </G>
            <G id="g16962" transform="translate(256,264.9863)">
              <Path
                d="M 0,0 V -249.986"
                fill="#ffffff"
                fillOpacity={1}
                fillRule="nonzero"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path16964"
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default MapPinIcon;
