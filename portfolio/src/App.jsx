import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { ThemeProvider } from './components/theme-provider'
import Footer from "./pages/Footer";
import ProjectView from "./pages/ProjectView";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/project/:id" element={<ProjectView />} />
          </Routes>
          <Footer/>
           <ToastContainer position="bottom-right" theme="dark" />
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
