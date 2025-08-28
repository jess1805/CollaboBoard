import { createContext } from "react";

const boardContext = createContext({
  isUserLoggedIn: false,
  activeToolItem: "",
  toolActionType: "",
  elements: [],
  history: [[]],
  index: 0,
  canvasId: "",
  socket: null, // 👈 Add this
  setElements: () => {},
  boardMouseDownHandler: () => {},
  setCanvasId: () => {},
  changeToolHandler: () => {},
  boardMouseMoveHandler: () => {},
  boardMouseUpHandler: () => {},
  setUserLoginStatus: () => {},
  setHistory: () => {},
  setSocket: () => {} // 👈 Add this
});


export default boardContext;