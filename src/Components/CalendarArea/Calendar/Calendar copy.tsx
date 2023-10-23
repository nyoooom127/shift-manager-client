// import "./Calendar.css";

// import PropTypes from "prop-types";
// import React, {
//   Component,
//   ReactNode,
//   SyntheticEvent,
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import Items from "./items/Items";
// import Sidebar from "./layout/Sidebar";
// import Columns from "./columns/Columns";
// import GroupRows from "./row/GroupRows";
// import ScrollElement from "./scroll/ScrollElement";
// import MarkerCanvas from "./markers/MarkerCanvas";
// import windowResizeDetector from "../resize-detector/window";

// import {
//   getMinUnit,
//   calculateTimeForXPosition,
//   calculateScrollCanvas,
//   getCanvasBoundariesFromVisibleTime,
//   getCanvasWidth,
//   stackTimelineItems,
// } from "./utility/calendar";
// import { _get, _length } from "./utility/generic";
// import { defaultKeys, defaultTimeSteps } from "./default-config";
// import { TimelineStateProvider } from "./timeline/TimelineStateContext";
// import { TimelineMarkersProvider } from "./markers/TimelineMarkersContext";
// import { TimelineHeadersProvider } from "./headers/HeadersContext";
// import TimelineHeaders from "./headers/TimelineHeaders";
// import DateHeader from "./headers/DateHeader";
// import { Moment } from "moment";
// import ResizeDetector from "../../../src/resize-detector/resize-detector";

// interface CalendarRequiredProps {
//   groups: any[] | object;
//   items: any[] | object;
// }

// interface CalendarDefaultedProps {
//   sidebarWidth?: number;
//   rightSidebarWidth?: number;
//   dragSnap?: number;
//   minResizeWidth?: number;
//   lineHeight?: number;
//   itemHeightRatio?: number;
//   buffer?: number;
//   minZoom?: number;
//   maxZoom?: number;
//   clickTolerance?: number;
//   canChangeGroup?: boolean;
//   canMove?: boolean;
//   canResize?: true | false | "left" | "right" | "both";
//   useResizeHandle?: boolean;
//   canSelect?: boolean;
//   stackItems?: boolean;

//   traditionalZoom?: boolean;

//   itemTouchSendsClick?: boolean;

//   className?: string;
//   style?: object;

//   keys?: {
//     groupIdKey?: string;
//     groupTitleKey?: string;
//     groupLabelKey?: string;
//     groupRightTitleKey?: string;
//     itemIdKey?: string;
//     itemTitleKey?: string;
//     itemDivTitleKey?: string;
//     itemGroupKey?: string;
//     itemTimeStartKey?: string;
//     itemTimeEndKey?: string;
//   };

//   headerRef?: Function;
//   scrollRef?: Function;

//   timeSteps?: {
//     second?: number;
//     minute?: number;
//     hour?: number;
//     day?: number;
//     month?: number;
//     year?: number;
//   };

//   onTimeChange?: Function;
// }

// interface CalendarOptionalProps {
//   horizontalLineClassNamesForGroup?: Function;

//   onItemMove?: Function;
//   onItemResize?: Function;
//   onItemClick?: Function;
//   onItemSelect?: Function;
//   onItemDeselect?: Function;
//   onCanvasClick?: Function;
//   onItemDoubleClick?: Function;
//   onItemContextMenu?: Function;
//   onCanvasDoubleClick?: Function;
//   onCanvasContextMenu?: Function;
//   onZoom?: Function;
//   onItemDrag?: Function;

//   moveResizeValidator?: Function;

//   itemRenderer?: Function;
//   groupRenderer?: Function;

//   defaultTimeStart?: Date | Moment | number;
//   defaultTimeEnd?: Date | Moment | number;

//   visibleTimeStart?: number;
//   visibleTimeEnd?: number;
//   onBoundsChange?: Function;

//   selected?: any[];

//   resizeDetector?: ResizeDetector;

//   verticalLineClassNamesForTime?: Function;

//   children?: ReactNode;
// }

// interface CalendarProps extends CalendarRequiredProps, CalendarOptionalProps, CalendarDefaultedProps {}

// interface CalendarPropsWithDefaults extends CalendarRequiredProps, CalendarOptionalProps, Required<CalendarDefaultedProps>{} 

// interface CalendarState {
//   width: number;
//   height: number;
//   visibleTimeStart: number;
//   visibleTimeEnd: number;
//   canvasTimeStart: number;
//   canvasTimeEnd: number;
//   selectedItem: string | number | null;
//   dragTime: number | null;
//   dragGroupTitle: string | null;
//   resizeTime: number | null;
//   resizingItem: any;
//   resizingEdge: any;
//   draggingItem: any;
//   newGroupOrder: number;
//   dimensionItems: any;
//   groupHeights: any[];
//   groupTops: any[];
// }

// const defaultProps: Required<CalendarDefaultedProps> = {
//   sidebarWidth: 150,
//   rightSidebarWidth: 0,
//   dragSnap: 1000 * 60 * 15, // 15min
//   minResizeWidth: 20,
//   lineHeight: 30,
//   itemHeightRatio: 0.65,
//   buffer: 3,

//   minZoom: 60 * 60 * 1000, // 1 hour
//   maxZoom: 5 * 365.24 * 86400 * 1000, // 5 years

//   clickTolerance: 3, // how many pixels can we drag for it to be still considered a click?

//   canChangeGroup: true,
//   canMove: true,
//   canResize: "right",
//   useResizeHandle: false,
//   canSelect: true,

//   stackItems: false,

//   traditionalZoom: false,

// //   horizontalLineClassNamesForGroup: null,

//   onItemMove: null,
//   onItemResize: null,
//   onItemClick: null,
//   onItemSelect: null,
//   onItemDeselect: null,
//   onItemDrag: null,
//   onCanvasClick: null,
//   onItemDoubleClick: null,
//   onItemContextMenu: null,
//   onZoom: null,

//   verticalLineClassNamesForTime: null,

//   moveResizeValidator: null,

//   dayBackground: null,

//   defaultTimeStart: null,
//   defaultTimeEnd: null,

//   itemTouchSendsClick: false,

//   style: {},
//   className: "",
//   keys: defaultKeys,
//   timeSteps: defaultTimeSteps,
//   headerRef: () => {},
//   scrollRef: () => {},

//   // if you pass in visibleTimeStart and visibleTimeEnd, you must also pass onTimeChange(visibleTimeStart, visibleTimeEnd),
//   // which needs to update the props visibleTimeStart and visibleTimeEnd to the ones passed
// //   visibleTimeStart: null,
// //   visibleTimeEnd: null,
//   onTimeChange: function (
//     visibleTimeStart: number,
//     visibleTimeEnd: number,
//     updateScrollCanvas: (
//       visibleTimeStart: number,
//       visibleTimeEnd: number
//     ) => any
//   ) {
//     updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
//   },
//   // called when the canvas area of the calendar changes
// //   onBoundsChange: null,
// //   children: null,

// //   selected: null,
// };

// // export default class ReactCalendarTimeline extends Component {
// const Calendar: React.FC<CalendarProps> = (passedProps): ReactNode => {
//   const [props, setProps] = useState<CalendarPropsWithDefaults>(
//     addDefaultProps(passedProps)
//   );
//   const selfRef = useRef<HTMLDivElement>(null);
//   const scrollComponentRef = useRef<HTMLDivElement>(null);
//   const scrollHeaderRef = useRef<HTMLDivElement>(null);
//   const [width, setWidth] = useState<number>(1000);
//   const [height, setHeight] = useState<number>(1000);
//   const [visibleTimeStart, setVisibleTimeStart] = useState<number>(0);
//   const [visibleTimeEnd, setVisibleTimeEnd] = useState<number>(0);
//   const [canvasTimeStart, setCanvasTimeStart] = useState<number>(0);
//   const [canvasTimeEnd, setCanvasTimeEnd] = useState<number>(0);
//   const [selectedItem, setSelectedItem] = useState<string | number | null>(
//     null
//   );
//   const [dragTime, setDragTime] = useState<number | null>(null);
//   const [dragGroupTitle, setDragGroupTitle] = useState<string | null>(null);
//   const [resizeTime, setResizeTime] = useState<number | null>(null);
//   const [resizingItem, setResizingItem] = useState<any>(null);
//   const [resizingEdge, setResizingEdge] = useState<any>(null);
//   const [draggingItem, setDraggingItem] = useState<any>();
//   const [newGroupOrder, setNewGroupOrder] = useState<number>(0);
//   const [dimensionItems, setDimensionItems] = useState<any>();
//   const [groupHeights, setGroupHeights] = useState<any[]>([]);
//   const [groupTops, setGroupTops] = useState<any[]>([]);
//   // const [scrollComponent, setScrollComponent] = useState<HTMLElement>();

//   // getSelected = getSelected.bind(this)
//   // hasSelectedItem = hasSelectedItem.bind(this)
//   // isItemSelected= isItemSelected.bind(this)

//   // let visibleTimeStart = null
//   // let visibleTimeEnd = null

//   useEffect(() => {
//     setProps(addDefaultProps(passedProps));
//   }, [passedProps]);

//   useEffect(() => {
//     if (props.defaultTimeStart && props.defaultTimeEnd) {
//       setVisibleTimeStart(props.defaultTimeStart.valueOf());
//       setVisibleTimeEnd(props.defaultTimeEnd.valueOf());
//     } else if (props.visibleTimeStart && props.visibleTimeEnd) {
//       setVisibleTimeStart(props.visibleTimeStart);
//       setVisibleTimeEnd(props.visibleTimeEnd);
//     } else {
//       //throwing an error because neither default or visible time props provided
//       throw new Error(
//         'You must provide either "defaultTimeStart" and "defaultTimeEnd" or "visibleTimeStart" and "visibleTimeEnd" to initialize the Timeline'
//       );
//     }

//     const [canvasTimeStart, canvasTimeEnd] = getCanvasBoundariesFromVisibleTime(
//       visibleTimeStart,
//       visibleTimeEnd,
//       props.buffer
//     );

//     setCanvasTimeStart(canvasTimeStart);
//     setCanvasTimeEnd(canvasTimeEnd);

//     const canvasWidth = getCanvasWidth(width, props.buffer);

//     const { dimensionItems, height, groupHeights, groupTops } =
//       stackTimelineItems(
//         props.items,
//         props.groups,
//         canvasWidth,
//         canvasTimeStart,
//         canvasTimeEnd,
//         props.keys,
//         props.lineHeight,
//         props.itemHeightRatio,
//         props.stackItems,
//         draggingItem,
//         resizingItem,
//         dragTime,
//         resizingEdge,
//         resizeTime,
//         newGroupOrder
//       );

//     /* eslint-disable react/no-direct-mutation-state */
//     setDimensionItems(dimensionItems);
//     setHeight(height);
//     setGroupHeights(groupHeights);
//     setGroupTops(groupTops);

//     resize();

//     if (props.resizeDetector) {
//       props.resizeDetector.addListener();
//     }

//     windowResizeDetector.addListener();

//     return () => {
//       if (props.resizeDetector) {
//         props.resizeDetector.removeListener();
//       }

//       windowResizeDetector.removeListener(this);
//     };

//     // lastTouchDistance = null
//   }, []);
//   Calendar.contextTypes = {
//     getTimelineContext: PropTypes.func,
//   };

//   function getChildContext() {
//     return {
//       getTimelineContext: () => {
//         return getTimelineContext();
//       },
//     };
//   }

//   const getTimelineContext = () => {
//     return {
//       timelineWidth: width,
//       visibleTimeStart,
//       visibleTimeEnd,
//       canvasTimeStart,
//       canvasTimeEnd,
//     };
//   };

//   const getTimelineUnit = (): string => {
//     const { timeSteps } = props;

//     const zoom = visibleTimeEnd - visibleTimeStart;
//     const minUnit = getMinUnit(zoom, width, timeSteps);

//     return minUnit;
//   };

//   useEffect(() => {
//     const {
//       visibleTimeStart: visibleTimeStartP,
//       visibleTimeEnd: visibleTimeEndP,
//       items,
//       groups,
//     } = props;

//     const currentState: CalendarState = {
//       width,
//       height,
//       visibleTimeStart,
//       visibleTimeEnd,
//       canvasTimeStart,
//       canvasTimeEnd,
//       selectedItem,
//       dragTime,
//       dragGroupTitle,
//       resizeTime,
//       resizingItem,
//       resizingEdge,
//       draggingItem,
//       newGroupOrder,
//       dimensionItems,
//       groupHeights,
//       groupTops,
//     };

//     let derivedState: CalendarState = { ...currentState };

//     // We are a controlled component
//     if (visibleTimeStartP && visibleTimeEndP) {
//       // Get the new canvas position
//       Object.assign(
//         derivedState,
//         calculateScrollCanvas(
//           visibleTimeStartP,
//           visibleTimeEndP,
//           true,
//           items,
//           groups,
//           props,
//           currentState
//         )
//       );

//       setDimensionItems(derivedState.dimensionItems);
//       setHeight(derivedState.height);
//       setGroupHeights(derivedState.groupHeights);
//       setGroupTops(derivedState.groupTops);
//     } else {
//       // Calculate new item stack position as canvas may have changed
//       const canvasWidth = getCanvasWidth(width, props.buffer);
//       Object.assign(
//         derivedState,
//         stackTimelineItems(
//           items,
//           groups,
//           canvasWidth,
//           canvasTimeStart,
//           canvasTimeEnd,
//           props.keys,
//           props.lineHeight,
//           props.itemHeightRatio,
//           props.stackItems,
//           draggingItem,
//           resizingItem,
//           dragTime,
//           resizingEdge,
//           resizeTime,
//           newGroupOrder
//         )
//       );
//     }

//     setVisibleTimeStart(derivedState.visibleTimeStart);
//     setVisibleTimeEnd(derivedState.visibleTimeEnd);

//     // return derivedState
//   }, [props.items, props.groups]);

//   useEffect(() => {
//     // are we changing zoom? Report it!
//     if (props.onZoom) {
//       props.onZoom(getTimelineContext(), getTimelineUnit());
//     }
//   }, [visibleTimeEnd, visibleTimeStart]);

//   useEffect(() => {
//     const newZoom = visibleTimeEnd - visibleTimeStart;

//     // The bounds have changed? Report it!
//     if (props.onBoundsChange) {
//       props.onBoundsChange(canvasTimeStart, canvasTimeStart + newZoom * 3);
//     }
//   }, [visibleTimeEnd, visibleTimeStart, canvasTimeStart]);

//   useEffect(() => {
//     const newZoom = visibleTimeEnd - visibleTimeStart;

//     const scrollLeft = Math.round(
//       (width * (visibleTimeStart - canvasTimeStart)) / newZoom
//     );

//     if (scrollComponentRef.current) {
//       scrollComponentRef.current.scrollLeft = scrollLeft;
//     }

//     if (scrollHeaderRef.current) {
//       scrollHeaderRef.current.scrollLeft = scrollLeft;
//     }
//   }, [visibleTimeStart, visibleTimeEnd, canvasTimeStart, width]);

//   const resize = () => {
//     const { width: containerWidth } = selfRef.current
//       ? selfRef.current.getBoundingClientRect()
//       : { width: 0 };

//     let width = containerWidth - props.sidebarWidth - props.rightSidebarWidth;
//     const canvasWidth = getCanvasWidth(width, props.buffer);
//     const { dimensionItems, height, groupHeights, groupTops } =
//       stackTimelineItems(
//         props.items,
//         props.groups,
//         canvasWidth,
//         canvasTimeStart,
//         canvasTimeEnd,
//         props.keys,
//         props.lineHeight,
//         props.itemHeightRatio,
//         props.stackItems,
//         draggingItem,
//         resizingItem,
//         dragTime,
//         resizingEdge,
//         resizeTime,
//         newGroupOrder
//       );

//     // this is needed by dragItem since it uses pageY from the drag events
//     // if this was in the context of the scrollElement, this would not be necessary

//     setWidth(width);
//     setDimensionItems(dimensionItems);
//     setHeight(height);
//     setGroupHeights(groupHeights);
//     setGroupTops(groupTops);

//     //initial scroll left is the buffer - 1 (1 is visible area) divided by 2 (2 is the buffer split on the right and left of the timeline)
//     const scrollLeft = width * ((props.buffer - 1) / 2);

//     if (scrollComponentRef.current) {
//       scrollComponentRef.current.scrollLeft = scrollLeft;
//     }

//     if (scrollHeaderRef.current) {
//       scrollHeaderRef.current.scrollLeft = scrollLeft;
//     }
//   };

//   const onScroll = (scrollX: number) => {
//     // const width = width;

//     // const canvasTimeStart = canvasTimeStart;

//     const zoom = visibleTimeEnd - visibleTimeStart;

//     const visibleTimeStartL = canvasTimeStart + (zoom * scrollX) / width;

//     if (
//       visibleTimeStart !== visibleTimeStartL ||
//       visibleTimeEnd !== visibleTimeStartL + zoom
//     ) {
//       props.onTimeChange(
//         visibleTimeStartL,
//         visibleTimeStartL + zoom,
//         updateScrollCanvas,
//         getTimelineUnit()
//       );
//     }
//   };

//   // called when the visible time changes
//   const updateScrollCanvas = (
//     visibleTimeStart: number,
//     visibleTimeEnd: number,
//     forceUpdateDimensions: boolean,
//     items = props.items,
//     groups = props.groups
//   ) => {
//     const currentState: CalendarState = {
//       width,
//       height,
//       visibleTimeStart,
//       visibleTimeEnd,
//       canvasTimeStart,
//       canvasTimeEnd,
//       selectedItem,
//       dragTime,
//       dragGroupTitle,
//       resizeTime,
//       resizingItem,
//       resizingEdge,
//       draggingItem,
//       newGroupOrder,
//       dimensionItems,
//       groupHeights,
//       groupTops,
//     };

//     let derivedState: CalendarState = { ...currentState };

//     Object.assign(
//       derivedState,
//       calculateScrollCanvas(
//         visibleTimeStart,
//         visibleTimeEnd,
//         forceUpdateDimensions,
//         items,
//         groups,
//         props,
//         currentState
//       )
//     );

//     setDimensionItems(derivedState.dimensionItems);
//     setHeight(derivedState.height);
//     setGroupHeights(derivedState.groupHeights);
//     setGroupTops(derivedState.groupTops);
//   };

//   const handleWheelZoom = (
//     speed: number,
//     xPosition: number,
//     deltaY: number
//   ) => {
//     changeZoom(1.0 + (speed * deltaY) / 500, xPosition / width);
//   };

//   const changeZoom = (scale: number, offset: number = 0.5) => {
//     const { minZoom, maxZoom } = props;
//     const oldZoom = visibleTimeEnd - visibleTimeStart;
//     const newZoom = Math.min(
//       Math.max(Math.round(oldZoom * scale), minZoom || 0),
//       maxZoom || 0
//     ); // min 1 min, max 20 years
//     const newVisibleTimeStart = Math.round(
//       visibleTimeStart + (oldZoom - newZoom) * offset
//     );
//       props.onTimeChange(
//         newVisibleTimeStart,
//         newVisibleTimeStart + newZoom,
//         updateScrollCanvas,
//         getTimelineUnit()
//       );
//   };

//   const showPeriod = (
//     from: Date | Moment | number,
//     to: Date | Moment | number
//   ) => {
//     let visibleTimeStart = from.valueOf();
//     let visibleTimeEnd = to.valueOf();

//     let zoom = visibleTimeEnd - visibleTimeStart;
//     // can't zoom in more than to show one hour
//     if (zoom < props.minZoom) {
//       return;
//     }

//       props.onTimeChange(
//         visibleTimeStart,
//         visibleTimeStart + zoom,
//         updateScrollCanvas,
//         getTimelineUnit()
//       );
//   };

//   const selectItem = (item, clickType, e) => {
//     if (
//       isItemSelected(item) ||
//       (props.itemTouchSendsClick && clickType === "touch")
//     ) {
//       if (item && props.onItemClick) {
//         const time = timeFromItemEvent(e);
//         props.onItemClick(item, e, time);
//       }
//     } else {
//       setState({ selectedItem: item });
//       if (item && props.onItemSelect) {
//         const time = timeFromItemEvent(e);
//         props.onItemSelect(item, e, time);
//       } else if (item === null && props.onItemDeselect) {
//         props.onItemDeselect(e); // this isnt in the docs. Is this function even used?
//       }
//     }
//   };

//   const doubleClickItem = (item, e) => {
//     if (props.onItemDoubleClick) {
//       const time = timeFromItemEvent(e);
//       props.onItemDoubleClick(item, e, time);
//     }
//   };

//   const contextMenuClickItem = (item, e) => {
//     if (props.onItemContextMenu) {
//       const time = timeFromItemEvent(e);
//       props.onItemContextMenu(item, e, time);
//     }
//   };

//   // TODO: this is very similar to timeFromItemEvent, aside from which element to get offsets
//   // from.  Look to consolidate the logic for determining coordinate to time
//   // as well as generalizing how we get time from click on the canvas
//   const getTimeFromRowClickEvent = (e) => {
//     const { dragSnap, buffer } = props;
//     const { width, canvasTimeStart, canvasTimeEnd } = state;
//     // this gives us distance from left of row element, so event is in
//     // context of the row element, not client or page
//     const { offsetX } = e.nativeEvent;

//     let time = calculateTimeForXPosition(
//       canvasTimeStart,

//       canvasTimeEnd,
//       getCanvasWidth(width, buffer),
//       offsetX
//     );
//     time = Math.floor(time / dragSnap) * dragSnap;

//     return time;
//   };

//   const timeFromItemEvent = (e) => {
//     const { width, visibleTimeStart, visibleTimeEnd } = state;
//     const { dragSnap } = props;

//     const scrollComponent = scrollComponent;
//     const { left: scrollX } = scrollComponent.getBoundingClientRect();

//     const xRelativeToTimeline = e.clientX - scrollX;

//     const relativeItemPosition = xRelativeToTimeline / width;
//     const zoom = visibleTimeEnd - visibleTimeStart;
//     const timeOffset = relativeItemPosition * zoom;

//     let time = Math.round(visibleTimeStart + timeOffset);
//     time = Math.floor(time / dragSnap) * dragSnap;

//     return time;
//   };

//   const dragItem = (item, dragTime, newGroupOrder) => {
//     let newGroup = props.groups[newGroupOrder];
//     const keys = props.keys;

//     setState({
//       draggingItem: item,
//       dragTime: dragTime,
//       newGroupOrder: newGroupOrder,
//       dragGroupTitle: newGroup ? _get(newGroup, keys.groupLabelKey) : "",
//     });

//     updatingItem({
//       eventType: "move",
//       itemId: item,
//       time: dragTime,
//       newGroupOrder,
//     });
//   };

//   const dropItem = (item, dragTime, newGroupOrder) => {
//     setState({ draggingItem: null, dragTime: null, dragGroupTitle: null });
//     if (props.onItemMove) {
//       props.onItemMove(item, dragTime, newGroupOrder);
//     }
//   };

//   const updateResizingItem = (item, resizeTime, edge) => {
//     setState({
//       resizingItem: item,
//       resizingEdge: edge,
//       resizeTime: resizeTime,
//     });

//     updatingItem({
//       eventType: "resize",
//       itemId: item,
//       time: resizeTime,
//       edge,
//     });
//   };

//   const resizedItem = (item, resizeTime, edge, timeDelta) => {
//     setState({ resizingItem: null, resizingEdge: null, resizeTime: null });
//     if (props.onItemResize && timeDelta !== 0) {
//       props.onItemResize(item, resizeTime, edge);
//     }
//   };

//   const updatingItem = ({ eventType, itemId, time, edge, newGroupOrder }) => {
//     if (props.onItemDrag) {
//       props.onItemDrag({ eventType, itemId, time, edge, newGroupOrder });
//     }
//   };

//   function columns(
//     canvasTimeStart,
//     canvasTimeEnd,
//     canvasWidth,
//     minUnit,
//     timeSteps,
//     height
//   ) {
//     return (
//       <Columns
//         canvasTimeStart={canvasTimeStart}
//         canvasTimeEnd={canvasTimeEnd}
//         canvasWidth={canvasWidth}
//         lineCount={_length(props.groups)}
//         minUnit={minUnit}
//         timeSteps={timeSteps}
//         height={height}
//         verticalLineClassNamesForTime={props.verticalLineClassNamesForTime}
//       />
//     );
//   }

//   const handleRowClick = (e, rowIndex) => {
//     // shouldnt this be handled by the user, as far as when to deselect an item?
//     if (hasSelectedItem()) {
//       selectItem(null);
//     }

//     if (props.onCanvasClick == null) return;

//     const time = getTimeFromRowClickEvent(e);
//     const groupId = _get(props.groups[rowIndex], props.keys.groupIdKey);
//     props.onCanvasClick(groupId, time, e);
//   };

//   const handleRowDoubleClick = (e, rowIndex) => {
//     if (props.onCanvasDoubleClick == null) return;

//     const time = getTimeFromRowClickEvent(e);
//     const groupId = _get(props.groups[rowIndex], props.keys.groupIdKey);
//     props.onCanvasDoubleClick(groupId, time, e);
//   };

//   const handleScrollContextMenu = (e, rowIndex) => {
//     if (props.onCanvasContextMenu == null) return;

//     const timePosition = getTimeFromRowClickEvent(e);

//     const groupId = _get(props.groups[rowIndex], props.keys.groupIdKey);

//     if (props.onCanvasContextMenu) {
//       e.preventDefault();
//       props.onCanvasContextMenu(groupId, timePosition, e);
//     }
//   };

//   //   function rows(canvasWidth, groupHeights, groups) {
//   //     return (
//   //       <GroupRows
//   //         groups={groups}
//   //         canvasWidth={canvasWidth}
//   //         lineCount={_length(props.groups)}
//   //         groupHeights={groupHeights}
//   //         clickTolerance={props.clickTolerance}
//   //         onRowClick={handleRowClick}
//   //         onRowDoubleClick={handleRowDoubleClick}
//   //         horizontalLineClassNamesForGroup={
//   //           props.horizontalLineClassNamesForGroup
//   //         }
//   //         onRowContextClick={handleScrollContextMenu}
//   //       />
//   //     )
//   //   }

//   //   function items(
//   //     canvasTimeStart,
//   //     zoom,
//   //     canvasTimeEnd,
//   //     canvasWidth,
//   //     minUnit,
//   //     dimensionItems,
//   //     groupHeights,
//   //     groupTops
//   //   ) {
//   //     return (
//   //       <Items
//   //         canvasTimeStart={canvasTimeStart}
//   //         canvasTimeEnd={canvasTimeEnd}
//   //         canvasWidth={canvasWidth}
//   //         dimensionItems={dimensionItems}
//   //         groupTops={groupTops}
//   //         items={props.items}
//   //         groups={props.groups}
//   //         keys={props.keys}
//   //         selectedItem={state.selectedItem}
//   //         dragSnap={props.dragSnap}
//   //         minResizeWidth={props.minResizeWidth}
//   //         canChangeGroup={props.canChangeGroup}
//   //         canMove={props.canMove}
//   //         canResize={props.canResize}
//   //         useResizeHandle={props.useResizeHandle}
//   //         canSelect={props.canSelect}
//   //         moveResizeValidator={props.moveResizeValidator}
//   //         itemSelect={selectItem}
//   //         itemDrag={dragItem}
//   //         itemDrop={dropItem}
//   //         onItemDoubleClick={doubleClickItem}
//   //         onItemContextMenu={props.onItemContextMenu ? contextMenuClickItem : undefined}
//   //         itemResizing={resizingItem}
//   //         itemResized={resizedItem}
//   //         itemRenderer={props.itemRenderer}
//   //         selected={props.selected}
//   //         scrollRef={scrollComponent}
//   //       />
//   //     )
//   //   }

//   const handleHeaderRef = (el) => {
//     scrollHeaderRef = el;
//     props.headerRef(el);
//   };

//   function sidebar(height, groupHeights) {
//     const { sidebarWidth } = props;
//     return (
//       sidebarWidth && (
//         <Sidebar
//           groups={props.groups}
//           groupRenderer={props.groupRenderer}
//           keys={props.keys}
//           width={sidebarWidth}
//           groupHeights={groupHeights}
//           height={height}
//         />
//       )
//     );
//   }

//   function rightSidebar(height, groupHeights) {
//     const { rightSidebarWidth } = props;
//     return (
//       rightSidebarWidth && (
//         <Sidebar
//           groups={props.groups}
//           keys={props.keys}
//           groupRenderer={props.groupRenderer}
//           isRightSidebar
//           width={rightSidebarWidth}
//           groupHeights={groupHeights}
//           height={height}
//         />
//       )
//     );
//   }

//   /**
//    * check if child of type TimelineHeader
//    * refer to for explanation https://github.com/gaearon/react-hot-loader#checking-element-types
//    */
//   const isTimelineHeader = (child) => {
//     if (child.type === undefined) return false;
//     return child.type.secretKey === TimelineHeaders.secretKey;
//   };

//   function childrenWithProps(canvasWidth: number, minUnit: string) {
//     if (!props.children) {
//       return null;
//     }

//     // convert to an array and remove the nulls
//     const childArray = Array.isArray(props.children)
//       ? props.children.filter((c) => c)
//       : [props.children];

//     const childProps = {
//       canvasTimeStart,
//       canvasTimeEnd,
//       canvasWidth,
//       visibleTimeStart: visibleTimeStart,
//       visibleTimeEnd: visibleTimeEnd,
//       dimensionItems,
//       items: props.items,
//       groups: props.groups,
//       keys: props.keys,
//       groupHeights: groupHeights,
//       groupTops: groupTops,
//       selected: getSelected(),
//       height: height,
//       minUnit: minUnit,
//       timeSteps: props.timeSteps,
//     };

//     return React.Children.map(childArray, (child) => {
//       if (!isTimelineHeader(child)) {
//         return React.cloneElement(child as React.ReactSVGElement, childProps);
//       } else {
//         return null;
//       }
//     });
//   }

//   const renderHeaders = () => {
//     if (props.children) {
//       let headerRenderer;
//       React.Children.map(props.children, (child) => {
//         if (isTimelineHeader(child)) {
//           headerRenderer = child;
//         }
//       });
//       if (headerRenderer) {
//         return headerRenderer;
//       }
//     }
//     return (
//       <TimelineHeaders>
//         <DateHeader unit="primaryHeader" />
//         <DateHeader />
//       </TimelineHeaders>
//     );
//   };

//   function getSelected() {
//     return selectedItem && !props.selected
//       ? [selectedItem]
//       : props.selected || [];
//   }

//   function hasSelectedItem() {
//     if (!Array.isArray(props.selected)) return !!selectedItem;
//     return props.selected.length > 0;
//   }

//   function isItemSelected(itemId: any) {
//     const selectedItems = getSelected();
//     return selectedItems.some((i) => i === itemId);
//   }
//   //   const getScrollElementRef = (el: HTMLElement) => {
//   //     el.ref
//   //     props.scrollRef && props.scrollRef(el)
//   //     setScrollComponent(el);
//   //   }

//   // const {
//   //   items,
//   //   groups,
//   //   sidebarWidth,
//   //   rightSidebarWidth,
//   //   timeSteps,
//   //   traditionalZoom,
//   //   buffer,
//   // } = props
//   // const {
//   //   draggingItem,
//   //   resizingItem,
//   //   width,
//   //   visibleTimeStart,
//   //   visibleTimeEnd,
//   //   canvasTimeStart,
//   //   canvasTimeEnd
//   // } = state
//   // let { dimensionItems, height, groupHeights, groupTops } = state

//   const zoom = visibleTimeEnd - visibleTimeStart;
//   const canvasWidth = getCanvasWidth(width, props.buffer);
//   const minUnit = getMinUnit(zoom, width, props.timeSteps);

//   const isInteractingWithItem = !!draggingItem || !!resizingItem;

//   if (isInteractingWithItem) {
//     const stackResults = stackTimelineItems(
//       props.items,
//       props.groups,
//       canvasWidth,
//       canvasTimeStart,
//       canvasTimeEnd,
//       props.keys,
//       props.lineHeight,
//       props.itemHeightRatio,
//       props.stackItems,
//       draggingItem,
//       resizingItem,
//       dragTime,
//       resizingEdge,
//       resizeTime,
//       newGroupOrder
//     );
//     setDimensionItems(stackResults.dimensionItems);
//     setHeight(stackResults.height);
//     setGroupHeights(stackResults.groupHeights);
//     setGroupTops(stackResults.groupTops);
//   }

//   const outerComponentStyle = {
//     height: `${height}px`,
//   };

//   return (
//     <TimelineStateProvider
//       visibleTimeStart={visibleTimeStart}
//       visibleTimeEnd={visibleTimeEnd}
//       canvasTimeStart={canvasTimeStart}
//       canvasTimeEnd={canvasTimeEnd}
//       canvasWidth={canvasWidth}
//       showPeriod={showPeriod}
//       timelineUnit={minUnit}
//       timelineWidth={width}
//     >
//       <TimelineMarkersProvider>
//         <TimelineHeadersProvider
//           registerScroll={handleHeaderRef}
//           timeSteps={props.timeSteps}
//           leftSidebarWidth={props.sidebarWidth}
//           rightSidebarWidth={props.rightSidebarWidth}
//         >
//           <div
//             style={props.style}
//             ref={selfRef}
//             className={`react-calendar-timeline ${props.className}`}
//           >
//             {renderHeaders()}
//             <div style={outerComponentStyle} className="rct-outer">
//               {props.sidebarWidth && props.sidebarWidth > 0 ? (
//                 <Sidebar
//                   groups={props.groups}
//                   groupRenderer={props.groupRenderer}
//                   keys={props.keys}
//                   width={props.sidebarWidth}
//                   groupHeights={groupHeights}
//                   height={height}
//                 />
//               ) : null}
//               <ScrollElement
//                 scrollRef={scrollComponentRef}
//                 width={width}
//                 height={height}
//                 onZoom={changeZoom}
//                 onWheelZoom={handleWheelZoom}
//                 traditionalZoom={props.traditionalZoom}
//                 onScroll={onScroll}
//                 isInteractingWithItem={isInteractingWithItem}
//               >
//                 <MarkerCanvas>
//                   {columns(
//                     canvasTimeStart,
//                     canvasTimeEnd,
//                     canvasWidth,
//                     minUnit,
//                     props.timeSteps,
//                     height
//                   )}
//                   <GroupRows
//                     groups={props.groups}
//                     canvasWidth={canvasWidth}
//                     lineCount={_length(props.groups)}
//                     groupHeights={groupHeights}
//                     clickTolerance={props.clickTolerance}
//                     onRowClick={handleRowClick}
//                     onRowDoubleClick={handleRowDoubleClick}
//                     horizontalLineClassNamesForGroup={
//                       props.horizontalLineClassNamesForGroup
//                     }
//                     onRowContextClick={handleScrollContextMenu}
//                   />
//                   <Items
//                     canvasTimeStart={canvasTimeStart}
//                     canvasTimeEnd={canvasTimeEnd}
//                     canvasWidth={canvasWidth}
//                     dimensionItems={dimensionItems}
//                     groupTops={groupTops}
//                     items={props.items}
//                     groups={props.groups}
//                     keys={props.keys}
//                     selectedItem={selectedItem}
//                     dragSnap={props.dragSnap}
//                     minResizeWidth={props.minResizeWidth}
//                     canChangeGroup={props.canChangeGroup}
//                     canMove={props.canMove}
//                     canResize={props.canResize}
//                     useResizeHandle={props.useResizeHandle}
//                     canSelect={props.canSelect}
//                     moveResizeValidator={props.moveResizeValidator}
//                     itemSelect={selectItem}
//                     itemDrag={dragItem}
//                     itemDrop={dropItem}
//                     onItemDoubleClick={doubleClickItem}
//                     onItemContextMenu={
//                       props.onItemContextMenu ? contextMenuClickItem : undefined
//                     }
//                     itemResizing={updateResizingItem}
//                     itemResized={resizedItem}
//                     itemRenderer={props.itemRenderer}
//                     selected={props.selected}
//                     scrollRef={scrollComponentRef}
//                   />
//                   {childrenWithProps(canvasWidth, minUnit)}
//                 </MarkerCanvas>
//               </ScrollElement>
//               {props.rightSidebarWidth && props.rightSidebarWidth > 0
//                 ? rightSidebar(height, groupHeights)
//                 : null}
//             </div>
//           </div>
//         </TimelineHeadersProvider>
//       </TimelineMarkersProvider>
//     </TimelineStateProvider>
//   );
// };

// Calendar.defaultProps = defaultProps;

// // function Calendar(props: CalendarProps): JSX.Element {
// //     return (
// //         <div className="Calendar">

// //         </div>
// //     );
// // }

// const addDefaultProps = ({
//   groups,
//   items,
//   sidebarWidth = 150,
//   rightSidebarWidth = 0,
//   dragSnap = 1000 * 60 * 15, // 15min,
//   minResizeWidth = 20,
//   lineHeight = 30,
//   itemHeightRatio = 0.65,
//   buffer = 3,
//   minZoom = 60 * 60 * 1000, // 1 hour
//   maxZoom = 5 * 365.24 * 86400 * 1000, // 5 years
//   clickTolerance = 3, // how many pixels can we drag for it to be still considered a click?
//   canChangeGroup = true,
//   canMove = true,
//   canResize = "right",
//   useResizeHandle = false,
//   canSelect = true,
//   stackItems = false,
//   traditionalZoom = false,
//   itemTouchSendsClick = false,
//   style = {},
//   className = "",
//   keys = defaultKeys,
//   timeSteps = defaultTimeSteps,
//   headerRef = () => {},
//   scrollRef = () => {},
//   onTimeChange = function (
//     visibleTimeStart: number,
//     visibleTimeEnd: number,
//     updateScrollCanvas: (
//       visibleTimeStart: number,
//       visibleTimeEnd: number
//     ) => any
//   ) {
//     updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
//   },
//   children,
//   horizontalLineClassNamesForGroup,
//   onItemMove,
//   onItemResize,
//   onItemClick,
//   onItemSelect,
//   onItemDeselect,
//   onCanvasClick,
//   onItemDoubleClick,
//   onItemContextMenu,
//   onCanvasDoubleClick,
//   onCanvasContextMenu,
//   onZoom,
//   onItemDrag,
//   moveResizeValidator,
//   itemRenderer,
//   groupRenderer,
//   defaultTimeStart,
//   defaultTimeEnd,
//   visibleTimeStart,
//   visibleTimeEnd,
//   onBoundsChange,
//   selected,
//   resizeDetector,
//   verticalLineClassNamesForTime,
// }: CalendarProps): CalendarPropsWithDefaults => {
//   return {
//     groups,
//     items,
//     sidebarWidth,
//     rightSidebarWidth,
//     dragSnap,
//     minResizeWidth,
//     lineHeight,
//     itemHeightRatio,
//     buffer,
//     minZoom,
//     maxZoom,
//     clickTolerance,
//     canChangeGroup,
//     canMove,
//     canResize,
//     useResizeHandle,
//     canSelect,
//     stackItems,
//     traditionalZoom,
//     itemTouchSendsClick,
//     style,
//     className,
//     keys,
//     timeSteps,
//     headerRef,
//     scrollRef,
//     onTimeChange,
//     children,
//     horizontalLineClassNamesForGroup,
//     onItemMove,
//     onItemResize,
//     onItemClick,
//     onItemSelect,
//     onItemDeselect,
//     onCanvasClick,
//     onItemDoubleClick,
//     onItemContextMenu,
//     onCanvasDoubleClick,
//     onCanvasContextMenu,
//     onZoom,
//     onItemDrag,
//     moveResizeValidator,
//     itemRenderer,
//     groupRenderer,
//     defaultTimeStart,
//     defaultTimeEnd,
//     visibleTimeStart,
//     visibleTimeEnd,
//     onBoundsChange,
//     selected,
//     resizeDetector,
//     verticalLineClassNamesForTime,
//   };
// };

// export default Calendar;

export {}