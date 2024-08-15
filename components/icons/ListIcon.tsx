import React from 'react';
import {
  SvgProps,
  Svg,
  Defs,
  ClipPath,
  Path,
  G,
  Line,
  Circle,
} from 'react-native-svg';

const ListIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      id="Capa_1"
      width={props.width ?? 512}
      height={props.height ?? 512}
      viewBox="0 0 512 512"
      {...props}
    >
      <Defs>
        <ClipPath id="clipPath">
          <Path d="M 0,512 H 512 V 0 H 0 Z" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clipPath)">
        <Line
          x1="191.733"
          y1="79.267"
          x2="497"
          y2="79.267"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 30}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          fill="none"
        />
        <Line
          x1="191.733"
          y1="256"
          x2="497"
          y2="256"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 30}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          fill="none"
        />
        <Line
          x1="191.733"
          y1="432.733"
          x2="497"
          y2="432.733"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 30}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          fill="none"
        />
        <Circle
          cx="63.2"
          cy="79.267"
          r="48.2"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 30}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          fill="none"
        />
        <Circle
          cx="63.2"
          cy="256"
          r="48.2"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 30}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          fill="none"
        />
        <Circle
          cx="63.2"
          cy="432.733"
          r="48.2"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 30}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          fill="none"
        />
      </G>
    </Svg>
  );
};

export default ListIcon;
