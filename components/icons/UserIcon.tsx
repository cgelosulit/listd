import React from 'react';
import { SvgProps, Svg, Defs, ClipPath, Path, G } from 'react-native-svg';

const UserIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      id="svg354"
      width={props.width ?? 682.66669}
      height={props.height ?? 682.66669}
      viewBox="0 0 682.66669 682.66669"
      {...props}
    >
      <Defs>
        <ClipPath id="clipPath368">
          <Path d="M 0,512 H 512 V 0 H 0 Z" id="path366" />
        </ClipPath>
      </Defs>
      <G id="g360" transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        <G id="g362">
          <G id="g364" clipPath="url(#clipPath368)">
            <G id="g370" transform="translate(497,256)">
              <Path
                d="m 0,0 c 0,-133.101 -107.9,-241 -241,-241 -133.103,0 -241,107.899 -241,241 0,133.103 107.897,241 241,241 C -107.9,241 0,133.103 0,0 Z"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path372"
              />
            </G>
            <G id="g374" transform="translate(352.4004,288.1338)">
              <Path
                d="m 0,0 c 0,-53.24 -43.158,-96.4 -96.4,-96.4 -53.244,0 -96.401,43.16 -96.401,96.4 0,53.239 43.157,96.399 96.401,96.399 C -43.158,96.399 0,53.239 0,0 Z"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path376"
              />
            </G>
            <G id="g378" transform="translate(112.2129,62.5752)">
              <Path
                d="m 0,0 c 7.71,72.602 69.142,129.158 143.787,129.158 74.647,0 136.078,-56.56 143.785,-129.16"
                fill="none"
                stroke={props.color ?? '#000000'}
                strokeWidth={props.strokeWidth ?? 30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeDasharray="none"
                strokeOpacity={1}
                id="path380"
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default UserIcon;
