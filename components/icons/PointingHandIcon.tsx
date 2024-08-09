import React from 'react';
import { SvgProps, Svg, Path, G, Line } from 'react-native-svg';

const PointingHandIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      id="Capa_1"
      width={props.width ?? 512}
      height={props.height ?? 512}
      viewBox="0 0 512 512"
      {...props}
    >
      <G>
        <Path
          d="M228.575,158.958c0-15.704,12.841-28.573,28.544-28.573c15.732,0,28.573,12.869,28.573,28.573
            c0-15.704,12.869-28.573,28.573-28.573c15.704,0,28.573,12.869,28.573,28.573v21.741c0-15.704,12.841-28.544,28.544-28.544
            c15.732,0,28.573,12.841,28.573,28.544V309.9c0,29.933-14.91,82.827-34.384,105.872"
          fill="none"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 20}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
        />
        <Path
          d="M171.43,283.481V38.573C171.43,22.841,184.299,10,200.003,10s28.573,12.841,28.573,28.573v120.385"
          fill="none"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 20}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
        />
        <Path
          d="M181.663,415.772c-5.584-41.527-69.618-73.132-69.618-128.067v-37.133 M145.635,208.988h25.795"
          fill="none"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 20}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
        />
        <Line
          x1="228.575"
          y1="158.958"
          x2="228.575"
          y2="207.883"
          fill="none"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 20}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
        />
        <Line
          x1="285.692"
          y1="158.958"
          x2="285.692"
          y2="207.883"
          fill="none"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 20}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
        />
        <Line
          x1="342.838"
          y1="180.699"
          x2="342.838"
          y2="207.883"
          fill="none"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 20}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
        />
        <Path
          d="M392.471,432.212v53.347c0,9.042-7.37,16.441-16.412,16.441H171.175c-9.042,0-16.412-7.398-16.412-16.441v-53.347
            c0-9.042,7.37-16.441,16.412-16.441h204.884C385.101,415.772,392.471,423.17,392.471,432.212L392.471,432.212z"
          fill="none"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 20}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
        />
        <Line
          x1="200.201"
          y1="415.772"
          x2="365.571"
          y2="415.772"
          fill="none"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 20}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
        />
        <Line
          x1="206.097"
          y1="458.886"
          x2="206.154"
          y2="458.886"
          fill="none"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 20}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
        />
        <Path
          d="M171.43,208.988h-32.995c-14.513,0-26.39,11.877-26.39,26.39v26.39"
          fill="none"
          stroke={props.color ?? '#000000'}
          strokeWidth={props.strokeWidth ?? 20}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
        />
      </G>
    </Svg>
  );
};

export default PointingHandIcon;
