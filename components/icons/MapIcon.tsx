import React from 'react';
import { SvgProps } from 'react-native-svg';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';

const MapIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      id="svg381"
      width={props.width ?? 682.66669}
      height={props.height ?? 682.66669}
      viewBox="0 0 682.66669 682.66669"
      {...props}
    >
      <Defs>
        <ClipPath id="clipPath395">
          <Path d="M 0,512 H 512 V 0 H 0 Z" id="path393" />
        </ClipPath>
        <ClipPath id="clipPath411">
          <Path d="M 0,512 H 512 V 0 H 0 Z" id="path409" />
        </ClipPath>
      </Defs>
      <G id="g387" transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        <G id="g389">
          <G id="g391" clipPath="url(#clipPath395)">
            <G id="g397" transform="translate(237,365.542)">
              <Path
                d="M 0,0 -213.5,-213.5"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 40}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path399"
              />
            </G>
          </G>
        </G>
        <G id="g401" transform="translate(128,251.542)">
          <Path
            d="M 0,0 132,-131.542"
            fill="none"
            stroke={props.color ?? '#000000'}
            strokeWidth={props.strokeWidth ?? 40}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeDasharray="none"
            strokeOpacity={1}
            id="path403"
          />
        </G>
        <G id="g405">
          <G id="g407" clipPath="url(#clipPath411)">
            <G id="g413" transform="translate(480,423.5)">
              <Path
                d="m 0,0 -150,-150.5 -215,215"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 40}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path415"
              />
            </G>
            <G id="g417" transform="translate(409.4053,20)">
              <Path
                d="m 0,0 c -28.974,45.624 -77.354,71.066 -77.405,123.433 0.051,43.933 35.847,80.567 80,80.567 44.152,0 79.949,-36.634 80,-80.567 C 82.544,71.066 34.163,45.624 5.189,0 Z"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 40}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path419"
              />
            </G>
            <G id="g421" transform="translate(392,144)">
              <Path
                d="m 0,0 c 0,-11.046 8.954,-20 20,-20 11.046,0 20,8.954 20,20 C 40,11.046 31.046,20 20,20 8.954,20 0,11.046 0,0"
                fill={props.color ?? '#000000'}
                fillOpacity={1}
                fillRule="nonzero"
                stroke="none"
                id="path423"
              />
            </G>
            <G id="g425" transform="translate(310,20)">
              <Path
                d="m 0,0 h -230 c -33.137,0 -60,26.863 -60,60 v 352 c 0,33.137 26.863,60 60,60 h 352 c 33.137,0 60,-26.863 60,-60 V 255"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 40}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path427"
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default MapIcon;
