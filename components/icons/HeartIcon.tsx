import React from 'react';
import { SvgProps, Svg, Defs, ClipPath, Path, G } from 'react-native-svg';

const HeartIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      id="svg582"
      width={props.width ?? 682.66669}
      height={props.height ?? 682.66669}
      viewBox="0 0 682.66669 682.66669"
      {...props}
    >
      <Defs>
        <ClipPath id="clipPath596">
          <Path d="M 0,512 H 512 V 0 H 0 Z" id="path594" />
        </ClipPath>
      </Defs>
      <G id="g588" transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        <G id="g590">
          <G id="g592" clipPath="url(#clipPath596)">
            <G id="g598" transform="translate(372.8906,462.4062)">
              <Path
                d="M 0,0 C -54.011,0 -99.834,-37.873 -116.891,-90.653 -133.946,-37.873 -179.771,0 -233.781,0 c -68.543,0 -123.633,-60.886 -124.108,-135.991 -0.866,-137.196 240.998,-276.821 240.998,-276.821 0,0 240.13,139.625 240.997,276.821 C 124.581,-60.886 68.542,0 0,0 Z"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path600"
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default HeartIcon;
