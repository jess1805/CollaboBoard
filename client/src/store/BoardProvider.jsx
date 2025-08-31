import React, { useCallback, useReducer, useEffect } from "react";
import boardContext from "./board-context";
import { BOARD_ACTIONS, TOOL_ACTION_TYPES, TOOL_ITEMS } from "../constant";
import {
  createElement,
  isPointNearElement,
} from "../utils/element";

const boardReducer = (state, action) => {
  switch (action.type) {
    case BOARD_ACTIONS.CHANGE_TOOL: {
      return {
        ...state,
        activeToolItem: action.payload.tool,
      };
    }
    case BOARD_ACTIONS.CHANGE_ACTION_TYPE:
      return {
        ...state,
        toolActionType: action.payload.actionType,
      };
    case BOARD_ACTIONS.DRAW_DOWN: {
      const { clientX, clientY, stroke, fill, size } = action.payload;
      const newElement = createElement(
        state.elements.length,
        clientX,
        clientY,
        clientX,
        clientY,
        { type: state.activeToolItem, stroke, fill, size }
      );
      const prevElements = state.elements;
      return {
        ...state,
        toolActionType:
          state.activeToolItem === TOOL_ITEMS.TEXT
            ? TOOL_ACTION_TYPES.WRITING
            : TOOL_ACTION_TYPES.DRAWING,
        elements: [...prevElements, newElement],
      };
    }
    case BOARD_ACTIONS.DRAW_MOVE: {
      const { clientX, clientY } = action.payload;
      const newElements = [...state.elements];
      const index = state.elements.length - 1;
      
      if (index < 0) return state;
      
      const { type } = newElements[index];
      switch (type) {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.CIRCLE:
        case TOOL_ITEMS.ARROW:
          const { x1, y1, stroke, fill, size } = newElements[index];
          const newElement = createElement(index, x1, y1, clientX, clientY, {
            type: state.activeToolItem,
            stroke,
            fill,
            size,
          });
          newElements[index] = newElement;
          return {
            ...state,
            elements: newElements,
          };
        case TOOL_ITEMS.BRUSH:
          newElements[index].points = [
            ...newElements[index].points,
            { x: clientX, y: clientY },
          ];
          return {
            ...state,
            elements: newElements,
          };
        default:
          return state;
      }
    }
    case BOARD_ACTIONS.DRAW_UP: {
      const elementsCopy = [...state.elements];
      const newHistory = state.history.slice(0, state.index + 1);
      newHistory.push(elementsCopy);
      return {
        ...state,
        history: newHistory,
        index: state.index + 1,
      };
    }
    case BOARD_ACTIONS.ERASE: {
      const { clientX, clientY } = action.payload;
      let newElements = state.elements.filter((element) => {
        return !isPointNearElement(element, clientX, clientY);
      });
      const newHistory = state.history.slice(0, state.index + 1);
      newHistory.push(newElements);
      return {
        ...state,
        elements: newElements,
        history: newHistory,
        index: state.index + 1,
      };
    }
    case BOARD_ACTIONS.CHANGE_TEXT: {
      const index = state.elements.length - 1;
      const newElements = [...state.elements];
      newElements[index].text = action.payload.text;
      const newHistory = state.history.slice(0, state.index + 1);
      newHistory.push(newElements);
      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES.NONE,
        elements: newElements,
        history: newHistory,
        index: state.index + 1,
      };
    }
    case BOARD_ACTIONS.UNDO: {
      if (state.index <= 0) return state;
      return {
        ...state,
        elements: state.history[state.index - 1],
        index: state.index - 1,
      };
    }
    case BOARD_ACTIONS.REDO: {
      if (state.index >= state.history.length - 1) return state;
      return {
        ...state,
        elements: state.history[state.index + 1],
        index: state.index + 1,
      };
    }
    case BOARD_ACTIONS.SET_CANVAS_ID:
      return { ...state, canvasId: action.payload.canvasId };
    case BOARD_ACTIONS.SET_CANVAS_ELEMENTS:
      return { ...state, elements: action.payload.elements };
    case BOARD_ACTIONS.SET_HISTORY:
      return { ...state, history: [action.payload.elements], index: 0 };
    case BOARD_ACTIONS.SET_USER_LOGIN_STATUS:
      return { ...state, isUserLoggedIn: action.payload.isUserLoggedIn };
    case "SET_SOCKET": 
      return { ...state, socket: action.payload.socket };
    default:
      return state;
  }
};

const isUserLoggedIn = !!localStorage.getItem("whiteboard_user_token");

const initialBoardState = {
  activeToolItem: TOOL_ITEMS.BRUSH,
  toolActionType: TOOL_ACTION_TYPES.NONE,
  elements: [],
  history: [[]],
  index: 0,
  canvasId: "",
  isUserLoggedIn: isUserLoggedIn,
  socket: null,
};

const BoardProvider = ({ children }) => {
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    initialBoardState
  );

  useEffect(() => {
    if (boardState.socket && boardState.toolActionType !== TOOL_ACTION_TYPES.NONE) {
      boardState.socket.emit("drawingUpdate", {
        canvasId: boardState.canvasId,
        elements: boardState.elements,
      });
    }
  }, [boardState.elements, boardState.socket, boardState.canvasId, boardState.toolActionType]);

  const changeToolHandler = (tool) => {
    dispatchBoardAction({ type: BOARD_ACTIONS.CHANGE_TOOL, payload: { tool } });
  };

  const boardMouseDownHandler = (event, toolboxState) => {
    if (boardState.toolActionType === TOOL_ACTION_TYPES.WRITING) return;
    const { clientX, clientY } = event;
    if (boardState.activeToolItem === TOOL_ITEMS.ERASER) {
      dispatchBoardAction({
        type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
        payload: { actionType: TOOL_ACTION_TYPES.ERASING },
      });
      return;
    }
    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_DOWN,
      payload: {
        clientX,
        clientY,
        stroke: toolboxState[boardState.activeToolItem]?.stroke,
        fill: toolboxState[boardState.activeToolItem]?.fill,
        size: toolboxState[boardState.activeToolItem]?.size,
      },
    });
  };

  const boardMouseMoveHandler = (event) => {
    if (boardState.toolActionType === TOOL_ACTION_TYPES.WRITING) return;
    const { clientX, clientY } = event;
    if (boardState.toolActionType === TOOL_ACTION_TYPES.DRAWING) {
      dispatchBoardAction({ type: BOARD_ACTIONS.DRAW_MOVE, payload: { clientX, clientY } });
    } else if (boardState.toolActionType === TOOL_ACTION_TYPES.ERASING) {
      dispatchBoardAction({ type: BOARD_ACTIONS.ERASE, payload: { clientX, clientY } });
    }
  };

  const boardMouseUpHandler = () => {
    if (boardState.toolActionType === TOOL_ACTION_TYPES.WRITING) return;
    if (boardState.toolActionType === TOOL_ACTION_TYPES.DRAWING) {
      dispatchBoardAction({ type: BOARD_ACTIONS.DRAW_UP });
    }
    dispatchBoardAction({
      type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
      payload: { actionType: TOOL_ACTION_TYPES.NONE },
    });
  };

  const textAreaBlurHandler = (text) => {
    dispatchBoardAction({ type: BOARD_ACTIONS.CHANGE_TEXT, payload: { text } });
  };

  const boardUndoHandler = useCallback(() => {
    dispatchBoardAction({ type: BOARD_ACTIONS.UNDO });
  }, []);

  const boardRedoHandler = useCallback(() => {
    dispatchBoardAction({ type: BOARD_ACTIONS.REDO });
  }, []);

  const setCanvasId = (canvasId) => {
    dispatchBoardAction({ type: BOARD_ACTIONS.SET_CANVAS_ID, payload: { canvasId } });
  };

  const setElements = (elements) => {
    dispatchBoardAction({ type: BOARD_ACTIONS.SET_CANVAS_ELEMENTS, payload: { elements } });
  };

  const setHistory = (elements) => {
    dispatchBoardAction({ type: BOARD_ACTIONS.SET_HISTORY, payload: { elements } });
  };

  const setUserLoginStatus = (isUserLoggedIn) => {
    dispatchBoardAction({ type: BOARD_ACTIONS.SET_USER_LOGIN_STATUS, payload: { isUserLoggedIn } });
  };
  
  const setSocket = (socket) => {
    dispatchBoardAction({ type: "SET_SOCKET", payload: { socket } });
  };

  const boardContextValue = {
    activeToolItem: boardState.activeToolItem,
    elements: boardState.elements,
    toolActionType: boardState.toolActionType,
    canvasId: boardState.canvasId,
    isUserLoggedIn: boardState.isUserLoggedIn,
    socket: boardState.socket,
    changeToolHandler,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
    textAreaBlurHandler,
    undo: boardUndoHandler,
    redo: boardRedoHandler,
    setCanvasId,
    setElements,
    setHistory,
    setUserLoginStatus,
    setSocket,
  };

  return (
    <boardContext.Provider value={boardContextValue}>
      {children}
    </boardContext.Provider>
  );
};

export default BoardProvider;

