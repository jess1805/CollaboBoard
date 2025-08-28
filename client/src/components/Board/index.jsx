// import { useEffect, useLayoutEffect, useRef, useState, useContext } from "react";
// import rough from "roughjs";
// import boardContext from "../../store/board-context";
// import toolboxContext from "../../store/toolbox-context";
// import { TOOL_ACTION_TYPES, TOOL_ITEMS } from "../../constant";
// import { getSocket } from "../../utils/socket";

// import classes from "./index.module.css";
// import { getSvgPathFromStroke } from "../../utils/element";
// import getStroke from "perfect-freehand";
// import axios from "axios";

// function Board({ id }) {
//   const canvasRef = useRef();
//   const textAreaRef = useRef();

//   const {
//     elements,
//     setElements,
//     boardMouseDownHandler,
//     boardMouseMoveHandler,
//     boardMouseUpHandler,
//     textAreaBlurHandler,
//     undo,
//     redo,
//     setCanvasId,
//     setHistory
//   } = useContext(boardContext);

//   const { toolboxState } = useContext(toolboxContext);

//   const [socket, setSocket] = useState(null);
//   const [isAuthorized, setIsAuthorized] = useState(true);

//   const token = localStorage.getItem("whiteboard_user_token");

  // Connect socket after login
  // useEffect(() => {
  //   if (token) {
      // 1. Create the connection with the token
      // initSocket(token); 
      // 2. Get the created socket and set it to state
//       const s = getSocket();
//       if (s) setSocket(s);
//     }
// }, [token]);

  // Join canvas and listen for events
  // useEffect(() => {
  //   if (!socket || !id) return;

  //   socket.emit("joinCanvas", { canvasId: id });

  //   socket.on("receiveDrawingUpdate", (updatedElements) => {
  //     setElements(updatedElements);
  //   });

  //   socket.on("loadCanvas", (initialElements) => {
  //     setElements(initialElements);
  //   });

  //   socket.on("unauthorized", (data) => {
  //     console.log(data.message);
  //     alert("Access Denied: You cannot edit this canvas.");
  //     setIsAuthorized(false);
  //   });

  //   return () => {
  //     socket.off("receiveDrawingUpdate");
  //     socket.off("loadCanvas");
  //     socket.off("unauthorized");
  //   };
  // }, [socket, id, setElements]);

  // Fetch initial canvas from backend
  // useEffect(() => {
  //   const fetchCanvasData = async () => {
  //     if (!id || !token) return;

  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/canvas/load/${id}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       setCanvasId(id);
  //       setElements(response.data.elements);
  //       setHistory(response.data.elements);
  //     } catch (err) {
  //       console.error("Error loading canvas:", err);
  //     }
  //   };

  //   fetchCanvasData();
  // }, [id, token, setCanvasId, setElements, setHistory]);

  // Resize canvas
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // }, []);

  // Undo / Redo keyboard shortcuts
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.ctrlKey && event.key === "z") undo();
  //     else if (event.ctrlKey && event.key === "y") redo();
  //   };

  //   document.addEventListener("keydown", handleKeyDown);
  //   return () => document.removeEventListener("keydown", handleKeyDown);
  // }, [undo, redo]);

  // Draw elements on canvas
  // useLayoutEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  //   const roughCanvas = rough.canvas(canvas);

  //   elements.forEach((element) => {
  //     switch (element.type) {
  //       case TOOL_ITEMS.LINE:
  //       case TOOL_ITEMS.RECTANGLE:
  //       case TOOL_ITEMS.CIRCLE:
  //       case TOOL_ITEMS.ARROW:
  //         roughCanvas.draw(element.roughEle);
  //         break;
  //       case TOOL_ITEMS.BRUSH:
  //         context.fillStyle = element.stroke;
  //         const path = new Path2D(getSvgPathFromStroke(getStroke(element.points)));
  //         context.fill(path);
  //         break;
  //       case TOOL_ITEMS.TEXT:
  //         context.textBaseline = "top";
  //         context.font = `${element.size}px Caveat`;
  //         context.fillStyle = element.stroke;
  //         context.fillText(element.text, element.x1, element.y1);
  //         break;
  //       default:
  //         break;
  //     }
  //   });

  //   return () => {
  //     context.clearRect(0, 0, canvas.width, canvas.height);
  //   };
  // }, [elements]);

  // Focus textarea for writing
  // useEffect(() => {
  //   const textarea = textAreaRef.current;
  //   if (textarea && toolboxState.toolActionType === TOOL_ACTION_TYPES.WRITING) {
  //     setTimeout(() => textarea.focus(), 0);
  //   }
  // }, [toolboxState.toolActionType]);

  // Mouse handlers
//   const handleMouseDown = (event) => {
//     if (!isAuthorized) return;
//     boardMouseDownHandler(event, toolboxState);
//   };

//   const handleMouseMove = (event) => {
//     if (!isAuthorized) return;
//     boardMouseMoveHandler(event);
//     if (socket) socket.emit("drawingUpdate", { canvasId: id, elements });
//   };

//   const handleMouseUp = () => {
//     if (!isAuthorized) return;
//     boardMouseUpHandler();
//     if (socket) socket.emit("drawingUpdate", { canvasId: id, elements });
//   };

//   return (
//     <>
//       {toolboxState.toolActionType === TOOL_ACTION_TYPES.WRITING && elements.length > 0 && (
//         <textarea
//           ref={textAreaRef}
//           className={classes.textElementBox}
//           style={{
//             top: elements[elements.length - 1].y1,
//             left: elements[elements.length - 1].x1,
//             fontSize: `${elements[elements.length - 1]?.size}px`,
//             color: elements[elements.length - 1]?.stroke,
//           }}
//           onBlur={(e) => textAreaBlurHandler(e.target.value)}
//         />
//       )}
//       <canvas
//         ref={canvasRef}
//         id="canvas"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       />
//     </>
//   );
// }

// export default Board;

// import { useEffect, useLayoutEffect, useRef, useState, useContext } from "react";
// import rough from "roughjs";
// import boardContext from "../../store/board-context";
// import toolboxContext from "../../store/toolbox-context";
// import { TOOL_ACTION_TYPES, TOOL_ITEMS } from "../../constant";
// import { initSocket, getSocket } from "../../utils/socket"; // Make sure to import initSocket

// import classes from "./index.module.css";
// import { getSvgPathFromStroke } from "../../utils/element";
// import getStroke from "perfect-freehand";

// function Board({ id }) {
//   const canvasRef = useRef();
//   const textAreaRef = useRef();

//   const {
//     elements,
//     setElements,
//     boardMouseDownHandler,
//     boardMouseMoveHandler,
//     boardMouseUpHandler,
//     textAreaBlurHandler,
//     undo,
//     redo,
//     setCanvasId,
    // setSocket, // 👈 Get the new function from context
  // } = useContext(boardContext);

  // const { toolboxState } = useContext(toolboxContext);

  // const [socket, setLocalSocket] = useState(null); // Renamed to avoid confusion
  // const [isAuthorized, setIsAuthorized] = useState(true);

  // This useEffect now correctly initializes the socket and passes it to the context
  // useEffect(() => {
  //   const token = localStorage.getItem("whiteboard_user_token");
  //   if (token) {
  //     initSocket(token); // Initialize the socket with the token
  //     const s = getSocket();
  //     if (s) {
  //       setLocalSocket(s);
  //       setSocket(s); // 👈 Pass the socket to the context ("the Brain")
  //     }
  //   }
  // }, [setSocket]); // Dependency on setSocket

  // This useEffect now correctly sets the canvas ID in our global state
  // useEffect(() => {
  //   if (id) {
  //     setCanvasId(id);
  //   }
  // }, [id, setCanvasId]);


  // Join canvas and listen for events
  // useEffect(() => {
  //   if (!socket || !id) return;

  //   socket.emit("joinCanvas", { canvasId: id });

  //   socket.on("receiveDrawingUpdate", (updatedElements) => {
  //     setElements(updatedElements);
  //   });

  //   socket.on("loadCanvas", (initialElements) => {
  //     setElements(initialElements);
  //   });

    // Corrected event name from "unauthorized" to "authError"
  //   socket.on("authError", (data) => {
  //     console.log(data.message);
  //     alert("Access Denied: You cannot edit this canvas.");
  //     setIsAuthorized(false);
  //   });

  //   return () => {
  //     socket.off("receiveDrawingUpdate");
  //     socket.off("loadCanvas");
  //     socket.off("authError");
  //   };
  // }, [socket, id, setElements]);


  // The redundant axios useEffect for fetching data has been completely REMOVED.


  // Resize canvas
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // }, []);

  // Undo / Redo keyboard shortcuts
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if ((event.ctrlKey || event.metaKey) && event.key === "z") undo();
  //     else if ((event.ctrlKey || event.metaKey) && event.key === "y") redo();
  //   };

  //   document.addEventListener("keydown", handleKeyDown);
  //   return () => document.removeEventListener("keydown", handleKeyDown);
  // }, [undo, redo]);

  // Draw elements on canvas
  // useLayoutEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  //   const roughCanvas = rough.canvas(canvas);

  //   elements.forEach((element) => {
  //     switch (element.type) {
  //       case TOOL_ITEMS.LINE:
  //       case TOOL_ITEMS.RECTANGLE:
  //       case TOOL_ITEMS.CIRCLE:
  //       case TOOL_ITEMS.ARROW:
  //         roughCanvas.draw(element.roughEle);
  //         break;
  //       case TOOL_ITEMS.BRUSH:
  //         if (element.points && element.points.length > 0) {
  //           context.fillStyle = element.stroke;
  //           const path = new Path2D(getSvgPathFromStroke(getStroke(element.points)));
  //           context.fill(path);
  //         }
  //         break;
  //       case TOOL_ITEMS.TEXT:
  //         context.textBaseline = "top";
  //         context.font = `${element.size}px Caveat`;
  //         context.fillStyle = element.stroke;
  //         context.fillText(element.text, element.x1, element.y1);
  //         break;
  //       default:
  //         break;
  //     }
  //   });

  // }, [elements]);

  // Focus textarea for writing
  // useEffect(() => {
  //   const textarea = textAreaRef.current;
  //   if (textarea && toolboxState.toolActionType === TOOL_ACTION_TYPES.WRITING) {
  //     setTimeout(() => textarea.focus(), 0);
  //   }
  // }, [toolboxState.toolActionType]);

  // Mouse handlers no longer emit socket events
//   const handleMouseDown = (event) => {
//     if (!isAuthorized) return;
//     boardMouseDownHandler(event, toolboxState);
//   };

//   const handleMouseMove = (event) => {
//     if (!isAuthorized) return;
//     boardMouseMoveHandler(event);
//   };

//   const handleMouseUp = () => {
//     if (!isAuthorized) return;
//     boardMouseUpHandler();
//   };

//   return (
//     <>
//       {toolboxState.toolActionType === TOOL_ACTION_TYPES.WRITING && elements.length > 0 && (
//         <textarea
//           ref={textAreaRef}
//           className={classes.textElementBox}
//           style={{
//             top: elements[elements.length - 1].y1,
//             left: elements[elements.length - 1].x1,
//             fontSize: `${elements[elements.length - 1]?.size}px`,
//             color: elements[elements.length - 1]?.stroke,
//           }}
//           onBlur={(e) => textAreaBlurHandler(e.target.value)}
//         />
//       )}
//       <canvas
//         ref={canvasRef}
//         id="canvas"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       />
//     </>
//   );
// }

// export default Board;

import { useEffect, useLayoutEffect, useRef, useState, useContext } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import toolboxContext from "../../store/toolbox-context";
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from "../../constant";
import { getSocket } from "../../utils/socket";

import classes from "./index.module.css";
import { getSvgPathFromStroke } from "../../utils/element";
import getStroke from "perfect-freehand";
import axios from "axios";

function Board({ id }) {
  const canvasRef = useRef();
  const textAreaRef = useRef();

  const {
    elements,
    setElements,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
    textAreaBlurHandler,
    undo,
    redo,
    setCanvasId,
    setHistory
  } = useContext(boardContext);

  const { toolboxState } = useContext(toolboxContext);

  const [socket, setSocket] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(true);

  const token = localStorage.getItem("whiteboard_user_token");

  // Connect socket after login
  useEffect(() => {
    if (token) {
      // 1. Create the connection with the token
      initSocket(token); 
      // 2. Get the created socket and set it to state
      const s = getSocket();
      if (s) setSocket(s);
    }
}, [token]);

  // Join canvas and listen for events
  useEffect(() => {
    if (!socket || !id) return;

    socket.emit("joinCanvas", { canvasId: id });

    socket.on("receiveDrawingUpdate", (updatedElements) => {
      setElements(updatedElements);
    });

    socket.on("loadCanvas", (initialElements) => {
      setElements(initialElements);
    });

    socket.on("unauthorized", (data) => {
      console.log(data.message);
      alert("Access Denied: You cannot edit this canvas.");
      setIsAuthorized(false);
    });

    return () => {
      socket.off("receiveDrawingUpdate");
      socket.off("loadCanvas");
      socket.off("unauthorized");
    };
  }, [socket, id, setElements]);

  // Fetch initial canvas from backend
  useEffect(() => {
    const fetchCanvasData = async () => {
      if (!id || !token) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/canvas/load/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCanvasId(id);
        setElements(response.data.elements);
        setHistory(response.data.elements);
      } catch (err) {
        console.error("Error loading canvas:", err);
      }
    };

    fetchCanvasData();
  }, [id, token, setCanvasId, setElements, setHistory]);

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  // Undo / Redo keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "z") undo();
      else if (event.ctrlKey && event.key === "y") redo();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  // Draw elements on canvas
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      switch (element.type) {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.CIRCLE:
        case TOOL_ITEMS.ARROW:
          roughCanvas.draw(element.roughEle);
          break;
        case TOOL_ITEMS.BRUSH:
          context.fillStyle = element.stroke;
          const path = new Path2D(getSvgPathFromStroke(getStroke(element.points)));
          context.fill(path);
          break;
        case TOOL_ITEMS.TEXT:
          context.textBaseline = "top";
          context.font = `${element.size}px Caveat`;
          context.fillStyle = element.stroke;
          context.fillText(element.text, element.x1, element.y1);
          break;
        default:
          break;
      }
    });

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

  // Focus textarea for writing
  useEffect(() => {
    const textarea = textAreaRef.current;
    if (textarea && toolboxState.toolActionType === TOOL_ACTION_TYPES.WRITING) {
      setTimeout(() => textarea.focus(), 0);
    }
  }, [toolboxState.toolActionType]);

  // Mouse handlers
  const handleMouseDown = (event) => {
    if (!isAuthorized) return;
    boardMouseDownHandler(event, toolboxState);
  };

  const handleMouseMove = (event) => {
    if (!isAuthorized) return;
    boardMouseMoveHandler(event);
    if (socket) socket.emit("drawingUpdate", { canvasId: id, elements });
  };

  const handleMouseUp = () => {
    if (!isAuthorized) return;
    boardMouseUpHandler();
    if (socket) socket.emit("drawingUpdate", { canvasId: id, elements });
  };

  return (
    <>
      {toolboxState.toolActionType === TOOL_ACTION_TYPES.WRITING && elements.length > 0 && (
        <textarea
          ref={textAreaRef}
          className={classes.textElementBox}
          style={{
            top: elements[elements.length - 1].y1,
            left: elements[elements.length - 1].x1,
            fontSize: `${elements[elements.length - 1]?.size}px`,
            color: elements[elements.length - 1]?.stroke,
          }}
          onBlur={(e) => textAreaBlurHandler(e.target.value)}
        />
      )}
      <canvas
        ref={canvasRef}
        id="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </>
  );
}

export default Board;