import React from 'react';
import {
  SvgProps,
  Svg,
  Defs,
  ClipPath,
  Path,
  G,
  Rect,
  Mask,
} from 'react-native-svg';

const MessengerIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      id="svg879"
      width={props.width ?? 682.66669}
      height={props.height ?? 682.66669}
      viewBox="0 0 682.66669 682.66669"
      {...props}
    >
      <Defs>
        <ClipPath id="clipPath893">
          <Path d="M 0,512 H 512 V 0 H 0 Z" id="path891" />
        </ClipPath>
      </Defs>
      <Mask id="custom">
        <Rect id="bg" x="0" y="0" width="100%" height="100%" fill="white" />
        <G transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
          <Path
            transform="matrix(1,0,0,1,281,256)"
            d="m 0,0 c 0,-13.807 -11.193,-25 -25,-25 -13.807,0 -25,11.193 -25,25 0,13.807 11.193,25 25,25 C -11.193,25 0,13.807 0,0"
            fill={props.color ?? '#ffffff'}
            fillOpacity={1}
            fillRule="nonzero"
            stroke="none"
            id="path901"
          />
          <Path
            transform="matrix(1,0,0,1,381,256)"
            d="m 0,0 c 0,-13.807 -11.193,-25 -25,-25 -13.807,0 -25,11.193 -25,25 0,13.807 11.193,25 25,25 C -11.193,25 0,13.807 0,0"
            fill={props.color ?? '#ffffff'}
            fillOpacity={1}
            fillRule="nonzero"
            stroke="none"
            id="path905"
          />
          <Path
            transform="matrix(1,0,0,1,181,256)"
            d="m 0,0 c 0,-13.807 -11.193,-25 -25,-25 -13.807,0 -25,11.193 -25,25 0,13.807 11.193,25 25,25 C -11.193,25 0,13.807 0,0"
            fill={props.color ?? '#ffffff'}
            fillOpacity={1}
            fillRule="nonzero"
            stroke="none"
            id="path909"
          />
        </G>
      </Mask>
      <G mask="url(#custom)">
        <G id="g885" transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
          <G id="g887">
            <G id="g889" clipPath="url(#clipPath893)">
              <G id="g895" transform="translate(256,492)">
                <Path
                  d="m 0,0 c -130.339,0 -236,-105.661 -236,-236 0,-45.885 13.109,-88.702 35.766,-124.937 L -236,-472 l 111.063,35.766 C -88.702,-458.891 -45.885,-472 0,-472 c 130.339,0 236,105.661 236,236 C 236,-105.661 130.339,0 0,0 Z"
                  fill="none"
                  stroke={props.color ?? '#000000'}
                  strokeWidth={props.strokeWidth ?? 40}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit={10}
                  strokeDasharray="none"
                  strokeOpacity={1}
                  id="path897"
                />
              </G>
              <G id="g899" transform="translate(281,256)">
                <Path
                  d="m 0,0 c 0,-13.807 -11.193,-25 -25,-25 -13.807,0 -25,11.193 -25,25 0,13.807 11.193,25 25,25 C -11.193,25 0,13.807 0,0"
                  fill={props.color ?? '#000000'}
                  fillOpacity={1}
                  fillRule="nonzero"
                  stroke="none"
                  id="path901"
                />
              </G>
              <G id="g903" transform="translate(381,256)">
                <Path
                  d="m 0,0 c 0,-13.807 -11.193,-25 -25,-25 -13.807,0 -25,11.193 -25,25 0,13.807 11.193,25 25,25 C -11.193,25 0,13.807 0,0"
                  fill={props.color ?? '#000000'}
                  fillOpacity={1}
                  fillRule="nonzero"
                  stroke="none"
                  id="path905"
                />
              </G>
              <G id="g907" transform="translate(181,256)">
                <Path
                  d="m 0,0 c 0,-13.807 -11.193,-25 -25,-25 -13.807,0 -25,11.193 -25,25 0,13.807 11.193,25 25,25 C -11.193,25 0,13.807 0,0"
                  fill={props.color ?? '#000000'}
                  fillOpacity={1}
                  fillRule="nonzero"
                  stroke="none"
                  id="path909"
                />
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default MessengerIcon;
