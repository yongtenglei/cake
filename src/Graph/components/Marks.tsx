import { line, curveNatural } from 'd3'

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
}) => (
  <>
    <path
      fill="none"
      stroke="#000"
      strokeWidth={4}
      d={line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))
        .curve(curveNatural)(data)}
    ></path>
    
    {data.map((d) => (
      <circle
        className="mark"
        key={xValue(d)}
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={5}
        fill="#000"
        fillOpacity="0.7"
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>
    ))}
  </>
)
