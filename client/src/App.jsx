
// import React from "react";
// import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
// import Board from "./components/Board";
// import Toolbar from "./components/Toolbar";
// import Toolbox from "./components/Toolbox";
// import Sidebar from "./components/Sidebar";
// import BoardProvider from "./store/BoardProvider";
// import ToolboxProvider from "./store/ToolboxProvider";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import About from './components/About';
// import Welcome from './components/Welcome';
// import ProtectedRoute from "./components/ProtectedRoute";
// import NotFound from "./components/NotFound";
// // import NewCanvasRedirect from "./components/NewCanvasRedirect";
// import Canvases from "./components/Canvases"; // 👈 Import your new component

// function HomePage() {
//   const { id } = useParams();
//   return (
//     <ToolboxProvider>
//       <div className="app-container">
//         <Toolbar />
//         <Board id={id}/>
//         <Toolbox />
//         <Sidebar /> 
//       </div>
//     </ToolboxProvider>
//   );
// }

// function App() {
//   return (
//     <BoardProvider>
//       <Router>
//         <Routes>
//           {/* === PUBLIC ROUTES === */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/" element={<Welcome />} />

//           {/* === PROTECTED ROUTES === */}
//           <Route 
//             path="/canvases" // 👈 Add the new dashboard route
//             element={
//               <ProtectedRoute>
//                 <Canvases />
//               </ProtectedRoute>
//             } 
//           />
//           {/* <Route 
//             path="/new"
//             element={
//               <ProtectedRoute>
//                 <NewCanvasRedirect />
//               </ProtectedRoute>
//             } 
//           /> */}
//           <Route 
//             path="/:id" 
//             element={
//               <ProtectedRoute>
//                 <HomePage />
//               </ProtectedRoute>
//             } 
//           />

//           {/* === CATCH-ALL 404 ROUTE === */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//     </BoardProvider>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
// import Board from "./components/Board";
// import Toolbar from "./components/Toolbar";
// import Toolbox from "./components/Toolbox";
// import Sidebar from "./components/Sidebar";
// import BoardProvider from "./store/BoardProvider";
// import ToolboxProvider from "./store/ToolboxProvider";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import About from './components/About';
// import Welcome from './components/Welcome';
// import ProtectedRoute from "./components/ProtectedRoute";
// import NotFound from "./components/NotFound";
// import NewCanvasRedirect from "./components/NewCanvasRedirect";
// import Canvases from "./components/Canvases"; 

// function HomePage() {
//   const { id } = useParams();
//   return (
//     <ToolboxProvider>
//       <div className="app-container">
//         <Toolbar />
//         <Board id={id}/>
//         <Toolbox />
//         <Sidebar /> 
//       </div>
//     </ToolboxProvider>
//   );
// }

// function App() {
//   return (
//     <BoardProvider>
//       <Router>
//         <Routes>
//           {/* === PUBLIC ROUTES === */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/" element={<Welcome />} />

//           {/* === PROTECTED ROUTES === */}
//           <Route 
//             path="/canvases"
//             element={
//               <ProtectedRoute>
//                 <Canvases />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/new"
//             element={
//               <ProtectedRoute>
//                 <NewCanvasRedirect />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/:id" 
//             element={
//               <ProtectedRoute>
//                 <HomePage />
//               </ProtectedRoute>
//             } 
//           />

//           {/* === CATCH-ALL 404 ROUTE === */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//     </BoardProvider>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import Board from "./components/Board";
import Toolbar from "./components/Toolbar";
import Toolbox from "./components/Toolbox";
import Sidebar from "./components/Sidebar";
import BoardProvider from "./store/BoardProvider";
import ToolboxProvider from "./store/ToolboxProvider";
import Login from "./components/Login";
import Register from "./components/Register";
import About from './components/About';
import Welcome from './components/Welcome';
// --- NEW IMPORTS ---
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";


// This component remains the same
function HomePage() {
  const { id } = useParams(); // Get the dynamic id from the URL
  return (
    <ToolboxProvider>
      <div className="app-container">
        <Toolbar />
        <Board id={id}/>
        <Toolbox />
        <Sidebar /> 
      </div>
    </ToolboxProvider>
  );
}

function App() {
  return (
    <BoardProvider>
      <Router>
        <Routes>
          {/* === PUBLIC ROUTES === */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Welcome />} />

          {/* === PROTECTED ROUTE === */}
          <Route 
            path="/:id" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />

          {/* === CATCH-ALL 404 ROUTE === */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </BoardProvider>
  );
}

export default App;