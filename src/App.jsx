import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import GenerateContentPage from "./pages/GenerateContentPage";
import ContentPreviewPage from "./pages/ContentPreviewPage";
import EditContentPage from "./pages/EditContentPage";
import PresentationPreviewPage from "./pages/PresentationPreviewPage";
import PosterTestPage from "./pages/PosterTestPage";
import PosterGeneratorPage from "./pages/PosterGeneratorPage";
import PosterPreviewPage from "./components/poster/PosterPreviewPage/PosterPreviewPage";
import BlogPreviewPage from "./components/blog/Blog-Preview-Page/BlogPreviewPage";
import PresentationEditorPage from "./pages/PresentationEditorPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="generate/content" element={<GenerateContentPage/>} />
        <Route path="/preview/content" element={<ContentPreviewPage/>} />
         <Route path="/generate/poster" element={<PosterGeneratorPage />} />
        <Route path="/preview/poster" element={<PosterPreviewPage />} />
        <Route path="preview/presentation" element={<PresentationPreviewPage />} />
        <Route path="edit/content" element={<EditContentPage/>} />
        <Route path="test/poster" element={<PosterTestPage />} />
        <Route path="/preview/blog" element={<BlogPreviewPage/>} />
        <Route path="/editor/presentation" element={<PresentationEditorPage />} />
      </Routes>
    </>
  );
}

export default App;
