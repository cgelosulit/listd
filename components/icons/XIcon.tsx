import React from 'react';
import { SvgProps, Svg, Line, Rect, G } from 'react-native-svg';

const XIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      id="Capa_1"
      width={props.width ?? 513.078}
      height={props.height ?? 513.078}
      viewBox="0 0 513.078 513.078"
      {...props}
    >
      <G>
        <Line
          x1="123.402"
          y1="70.705"
          x2="403.195"
          y2="431.569"
          fill="none"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 22}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
        />
        <Rect
          x="11"
          y="11"
          width="491.078"
          height="491.078"
          fill="none"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 22}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          opacity={0}
        />
        <Line
          x1="124.799"
          y1="432.637"
          x2="401.799"
          y2="69.637"
          fill="none"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 22}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
        />
      </G>
    </Svg>
  );
};

export default XIcon;
