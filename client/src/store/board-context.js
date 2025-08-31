import { createContext } from "react";

const boardContext = createContext({
  isUserLoggedIn: false,
  activeToolItem: "",
  toolActionType: "",
  elements: [],
  history: [[]],
  index: 0,
  canvasId: "",
  socket: null,
  setElements: () => {},
  boardMouseDownHandler: () => {},
  setCanvasId: () => {},
  changeToolHandler: () => {},
  boardMouseMoveHandler: () => {},
  boardMouseUpHandler: () => {},
  setUserLoginStatus: () => {},
  setHistory: () => {},
  setSocket: () => {} 
});


export default boardContext;