import { useEffect, useLayoutEffect, useRef, useState, useContext, useCallback } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import toolboxContext from "../../store/toolbox-context";
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from "../../constant";
import { getSocket, initSocket } from "../../utils/socket";
import classes from "./index.module.css";
import { getSvgPathFromStroke } from "../../utils/element";
import getStroke from "perfect-freehand";
import axios from "axios";

function Board({ id }) {
  const canvasRef = useRef();
  const textAreaRef = useRef();
  const fetchedCanvasIds = useRef(new Set()); 

  const {
    elements,
    setElements,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
    textAreaBlurHandler,
    undo,
    redo,
  } = useContext(boardContext);

  const { toolboxState } = useContext(toolboxContext);

  const [socket, setSocket] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(true);

  const token = localStorage.getItem("whiteboard_user_token");

 
  useEffect(() => {
    if (token && !socket) {
      initSocket(token); 
      const s = getSocket();
      if (s) setSocket(s);
    }
  }, [token, socket]);


  useEffect(() => {
    if (!socket || !id) return;

    let isSubscribed = true;

    socket.emit("joinCanvas", { canvasId: id });

    const handleReceiveUpdate = (updatedElements) => {
      if (isSubscribed) setElements(updatedElements);
    };

    const handleLoadCanvas = (initialElements) => {
      if (isSubscribed) setElements(initialElements);
    };

    const handleUnauthorized = (data) => {
      console.log(data.message);
      alert("Access Denied: You cannot edit this canvas.");
      if (isSubscribed) setIsAuthorized(false);
    };

    socket.on("receiveDrawingUpdate", handleReceiveUpdate);
    socket.on("loadCanvas", handleLoadCanvas);
    socket.on("unauthorized", handleUnauthorized);

    return () => {
      isSubscribed = false;
      socket.off("receiveDrawingUpdate", handleReceiveUpdate);
      socket.off("loadCanvas", handleLoadCanvas);
      socket.off("unauthorized", handleUnauthorized);
    };
  }, [socket, id]); 

  
  useEffect(() => {
    const fetchCanvasData = async () => {
      if (!id || !token || fetchedCanvasIds.current.has(id)) return;

      fetchedCanvasIds.current.add(id); 

      try {
        const response = await axios.get(`http://localhost:5000/api/canvas/load/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setElements(response.data.elements || []);
      } catch (err) {
        console.error("Error loading canvas:", err);
        fetchedCanvasIds.current.delete(id); 
      }
    };

    fetchCanvasData();
  }, [id, token]); 


  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, []);


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "z") undo();
      else if (event.ctrlKey && event.key === "y") redo();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);


  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      switch (element.type) {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.CIRCLE:
        case TOOL_ITEMS.ARROW:
          if (element.roughEle) roughCanvas.draw(element.roughEle);
          break;
        case TOOL_ITEMS.BRUSH:
          if (element.points && element.points.length > 0) {
            context.fillStyle = element.stroke;
            const path = new Path2D(getSvgPathFromStroke(getStroke(element.points)));
            context.fill(path);
          }
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
  }, [elements]);


  useEffect(() => {
    const textarea = textAreaRef.current;
    if (textarea && toolboxState.toolActionType === TOOL_ACTION_TYPES.WRITING) {
      setTimeout(() => textarea.focus(), 0);
    }
  }, [toolboxState.toolActionType]);


  const emitDrawingUpdate = useCallback(
    debounce(() => {
      if (socket && id) {
        socket.emit("drawingUpdate", { canvasId: id, elements });
      }
    }, 50), 
    [socket, id, elements]
  );


  const handleMouseDown = (event) => {
    if (!isAuthorized) return;
    boardMouseDownHandler(event, toolboxState);
  };

  const handleMouseMove = (event) => {
    if (!isAuthorized) return;
    boardMouseMoveHandler(event);
    emitDrawingUpdate(); 
  };

  const handleMouseUp = () => {
    if (!isAuthorized) return;
    boardMouseUpHandler();
    emitDrawingUpdate(); 
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


function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default Board;
