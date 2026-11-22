import React, { Suspense } from "react";
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";

// Chỉ code-split các route blog (nội dung phụ, không phải ai cũng ghé) —
// Home vẫn import thẳng vì là trang đích chính, không nên trì hoãn tải.
const PostList = React.lazy(() => import("./components/PostList"));
const PostDetails = React.lazy(() => import("./components/PostDetails"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/blog/*"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen bg-black text-white flex items-center justify-center">
                  Loading…
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="posts/:slug" element={<PostDetails />} />
                <Route path="*" element={<Navigate to="/blog" />} />
              </Routes>
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
