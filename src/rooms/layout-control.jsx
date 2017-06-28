import React from "react";
import { connect } from "react-redux";
import * as M from "./meta";
import * as Obj from "../utils/object";
import * as Tables from "../tables/meta";
import { TableSVG } from "../tables/table-svg";
import * as R from "ramda";
import Measure from "react-measure";
import { Removable } from "../components/layout";
import {
  ReactSVGPanZoom,
  TOOL_NONE,
  TOOL_PAN,
  fitSelection,
  zoomOnViewerCenter,
  fitToViewer,
  setPointOnViewerCenter,
} from "react-svg-pan-zoom";
import wood_pattern from "../images/wood_pattern.png";

const scaleUp = x => 100 * x;
const roomId = R.path(["room", "id"]);
const svgDim = x => ({
  width: R.pathOr(0, ["svg", "SVGWidth"], x),
  height: R.pathOr(0, ["svg", "SVGHeight"], x),
});
const roomDim = room => ({
  width: R.pathOr(0, ["room", "length"])(room),
  height: R.pathOr(0, ["room", "width"])(room),
});
const fitSelectionOnCenter = (value, { x, y, width, height }, margin) => {
  const fitted = fitSelection(
    value,
    x - margin,
    y - margin,
    width + margin,
    height + margin,
  );
  const centered = setPointOnViewerCenter(
    fitted,
    width / 2,
    height / 2,
    fitted.a,
  );
  return centered;
};

class Room extends React.Component {
  state = {
    svg: null,
    tool: TOOL_PAN,
    componentDimensions: { width: 0, height: 0 },
  };
  static defaultProps = {
    room: undefined,
    tables: [],
  };
  componentWillReceiveProps(nextProps) {
    const { width, height } = R.pipe(roomDim, R.map(scaleUp))(nextProps);
    const viewerStateTransform =
      roomId(this.props) != roomId(nextProps)
        ? x => fitSelectionOnCenter(x, { x: 0, y: 0, width, height }, 50)
        : x => x;
    this.setState(state => ({
      svg: viewerStateTransform({
        ...state.svg,
        SVGWidth: width,
        SVGHeight: height,
      }),
    }));
  }
  render() {
    const roomIdValue = roomId(this.props);
    return (
      <Measure
        onMeasure={({ width, height }) =>
          this.setState({ componentDimensions: { width, height } })}
      >
        <div style={{ flex: "1", position: "relative" }}>
          <ReactSVGPanZoom
            style={{ position: "absolute", top: 0, left: 0 }}
            {...this.state.componentDimensions}
            detectAutoPan={false}
            background="transparent"
            SVGBackground="url(#img1)"
            onMouseUp={({ x, y }) =>
              roomIdValue && this.props.mouseUp(roomIdValue, { x, y })}
            onMouseMove={e => {}}
            onMouseDown={e => {}}
            value={this.state.svg}
            onChangeValue={svg => this.setState({ svg })}
            tool={this.state.tool}
            onChangeTool={tool => this.setState({ tool })}
          >
            <svg width={0} height={0}>
              <defs>
                <pattern
                  id="img1"
                  patternUnits="userSpaceOnUse"
                  width="203"
                  height="317"
                >
                  <image
                    xlinkHref={wood_pattern}
                    x="0"
                    y="0"
                    width="203"
                    height="317"
                  />
                </pattern>
              </defs>
              <g>
                {Obj.mapToArray((table, key) =>
                  <TableSVG key={key} table={table} scaleFactor={100} />,
                )(this.props.tables)}
              </g>
            </svg>
          </ReactSVGPanZoom>
        </div>
      </Measure>
    );
  }
}

const getRoomWithTables = state => {
  const room = M.getSelectedRoom(state);
  return {
    room,
    tables: room ? R.pipe(Tables.all, Tables.inRoom(room.id))(state) : [],
  };
};
export default connect(
  getRoomWithTables,
  R.pick(["mouseUp", "mouseDown", "mouseMove"], Tables),
)(Room);
