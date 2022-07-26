import tinycolor from 'tinycolor2';
import uniqueId from 'lodash.uniqueid';

import glyphs from './glyphs';


const VIEWBOX = {
  WIDTH: 40,
  HEIGHT: 48,
};

const ICON = {
  WIDTH: VIEWBOX.WIDTH,
  HEIGHT: VIEWBOX.HEIGHT,
  X_OFFSET: 0,
};

const FOLD = {
  HEIGHT: 12,
};

const LABEL_HEIGHT = 14;

export const FileIcon = ({
  color = 'whitesmoke',
  extension,
  fold = true,
  foldColor,
  glyphColor,
  gradientColor = 'white',
  gradientOpacity = 0.25,
  labelColor,
  labelTextColor = 'white',
  labelUppercase = false,
  radius = 4,
  type,
}) => {
  const UNIQUE_ID = uniqueId();
  return (

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VIEWBOX.WIDTH} ${VIEWBOX.HEIGHT}`}
      width="100%"
      style={{ maxWidth: '100%' }}
    >
      <defs>
        <clipPath id={`pageRadius${UNIQUE_ID}`}>
          <rect
            x={ICON.X_OFFSET}
            y="0"
            rx={radius}
            ry={radius}
            width={ICON.WIDTH}
            height={ICON.HEIGHT}
          />
        </clipPath>

        <clipPath id="foldCrop">
          <rect
            width={ICON.WIDTH}
            height={FOLD.HEIGHT}
            transform={`rotate(-45 0 ${FOLD.HEIGHT})`}
          />
        </clipPath>
        <linearGradient
          x1="100%"
          y1="0%"
          y2="100%"
          id={`pageGradient${UNIQUE_ID}`}
        >
          <stop
            stop-color={gradientColor}
            stop-opacity={gradientOpacity}
            offset="0%"
          />
          <stop stop-color={gradientColor} stop-opacity="0" offset="66.67%" />
        </linearGradient>
      </defs>

      <g id="file" clip-path={`url(#pageRadius${UNIQUE_ID})`}>
        {fold ? (
          <>
            <path
              d={`M${ICON.X_OFFSET} 0 h ${ICON.WIDTH - FOLD.HEIGHT} L ${ICON.WIDTH + ICON.X_OFFSET
                } ${FOLD.HEIGHT} v ${ICON.HEIGHT - FOLD.HEIGHT} H ${ICON.X_OFFSET
                } Z`}
              fill={color}
            />
            <path
              d={`M${ICON.X_OFFSET} 0 h ${ICON.WIDTH - FOLD.HEIGHT} L ${ICON.WIDTH + ICON.X_OFFSET
                } ${FOLD.HEIGHT} v ${ICON.HEIGHT - FOLD.HEIGHT} H ${ICON.X_OFFSET
                } Z`}
              fill={`url(#pageGradient${UNIQUE_ID})`}
            />
          </>
        ) : (
          <>
            <rect
              x={ICON.X_OFFSET}
              y="0"
              width={ICON.WIDTH}
              height={ICON.HEIGHT}
              fill={color}
            />
            <rect
              x={ICON.X_OFFSET}
              y="0"
              width={ICON.WIDTH}
              height={ICON.HEIGHT}
              fill={`url(#pageGradient${UNIQUE_ID})`}
            />
          </>
        )}
      </g>

      {fold && (
        <g transform={`translate(28 ${FOLD.HEIGHT}) rotate(-90)`}>
          <rect
            width={ICON.WIDTH}
            height={ICON.HEIGHT}
            fill={foldColor || tinycolor(color).darken(10).toString()}
            rx={radius}
            ry={radius}
            clip-path="url(#foldCrop)"
          />
        </g>
      )}

      {extension && (
        <>
          <g id="label">
            <rect
              fill={labelColor || tinycolor(color).darken(30).toString()}
              x={ICON.X_OFFSET}
              y={ICON.HEIGHT - LABEL_HEIGHT}
              width={ICON.WIDTH}
              height={LABEL_HEIGHT}
              clip-path={`url(#pageRadius${UNIQUE_ID})`}
            />
          </g>
          <g id="labelText" transform={`translate(${ICON.X_OFFSET} 34)`}>
            <text
              x={ICON.WIDTH / 2}
              y="10"
              font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
              font-size="9"
              fill={labelTextColor}
              text-anchor="middle"
              style={{
                'font-weight': 'bold',
                'text-align': 'center',
                'pointer-events': 'none',
                'text-transform': labelUppercase ? 'uppercase' : 'none',
                'user-select': 'none',
              }}
            >
              {extension}
            </text>
          </g>
        </>
      )}

      {type && (
        <g
          transform={`translate(-4 ${!extension ? 6 : 0})`}
          fill={glyphColor || tinycolor(color).darken(15).toString()}
        >
          {glyphs[type]()}
        </g>
      )}
    </svg>
  );
};

export default FileIcon;
