import React, { Suspense } from "react";
import Scene from "./components/Scene";
import { Element, Link as ScrollLink } from "react-scroll";
import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import ChineseTranslate from "./components/ChineseTranslate";

const PostList = React.lazy(() => import("./components/PostList"));
const PostDetails = React.lazy(() => import("./components/PostDetails"));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-black text-white relative overflow-hidden">
              <Element name="header">
                <div className="absolute inset-0 z-0">
                  <Scene />
                </div>

                <header className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6 pointer-events-none">
                  <span className="text-cyan-400 text-xl tracking-widest">
                    Hi, Welcome To My Digital Space
                  </span>
                  <h1 className="text-5xl md:text-6xl font-bold mt-4">
                    My name William Li
                  </h1>
                  <h3 className="text-xl md:text-2xl mt-3 text-gray-300">
                    a person interested in studying nuclear physics
                  </h3>

                  <ScrollLink
                    to="blog-content"
                    smooth
                    duration={500}
                    className="pointer-events-auto mt-12 text-cyan-400 hover:text-white text-lg cursor-pointer transition-colors"
                  >
                    WHO AM I ↓
                  </ScrollLink>

                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 pointer-events-auto">
                    <ChineseTranslate />
                  </div>
                </header>
              </Element>

              <Element name="blog-content">
                <main
                  id="blog-content"
                  className="relative z-10 h-screen overflow-y-auto snap-y snap-mandatory overscroll-y-contain"
                >
                  <div className="min-h-screen py-20 px-6 max-w-4xl mx-auto">
                    <section className="mb-16">
                      <h3 className="text-2xl font-semibold mb-6">Short Bio</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>
                          Who Am I: William Li (Vietnamese: Lê Thanh Nghĩa)
                        </li>
                        <li>
                          Born: May 14, 1997, Ngô Gia Tự Street,{" "}
                          <a
                            href="https://vi.wikipedia.org/wiki/B%C3%ACnh_%C4%90%E1%BB%8Bnh_(ph%C6%B0%E1%BB%9Dng)"
                            className="text-cyan-400 hover:underline"
                          >
                            Bình Định Ward
                          </a>
                          ,{" "}
                          <a
                            href="https://vi.wikipedia.org/wiki/Gia_Lai"
                            className="text-cyan-400 hover:underline"
                          >
                            Gia Lai Province
                          </a>
                          ,{" "}
                          <a
                            href="https://en.wikipedia.org/wiki/Vietnam"
                            className="text-cyan-400 hover:underline"
                          >
                            Việt Nam
                          </a>
                        </li>
                        <li>
                          Nationality:{" "}
                          <a
                            href="https://en.wikipedia.org/wiki/Vietnamese_people"
                            className="text-cyan-400 hover:underline"
                          >
                            Vietnamese
                          </a>
                        </li>
                      </ul>
                    </section>

                    <section className="mb-16">
                      <h3 className="text-2xl font-semibold mb-6">
                        Technical Skills
                      </h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>
                          Human language:{" "}
                          <mark className="bg-cyan-900 text-cyan-300 px-1">
                            Vietnamese
                          </mark>
                          ,{" "}
                          <mark className="bg-cyan-900 text-cyan-300 px-1">
                            English
                          </mark>
                        </li>
                        <li>
                          Programming language:{" "}
                          <mark className="bg-cyan-900 text-cyan-300 px-1">
                            Python
                          </mark>
                          ,{" "}
                          <mark className="bg-cyan-900 text-cyan-300 px-1">
                            C#
                          </mark>
                        </li>
                      </ul>
                    </section>

                    <section className="mb-16">
                      <h3 className="text-2xl font-semibold mb-6">Contact</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>
                          Links: Reach out to me at X@Y, where X=williamli.sci
                          and Y=gmail.com.
                        </li>
                        <li>
                          <Link
                            to="/blog"
                            className="text-cyan-400 hover:underline"
                          >
                            My Blog
                          </Link>
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-2xl font-semibold mb-6">
                        Blessed are those who have not seen and yet believe
                      </h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>
                          <a
                            href="https://www.youtube.com/watch?v=anWRa7TiXvw"
                            className="text-cyan-400 hover:underline"
                          >
                            Tìm trật tự trong sự hỗn loạn?
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://youtu.be/2gL0LE6xiyo?si=pw4sJ0p1SPExkWOz"
                            className="text-cyan-400 hover:underline"
                          >
                            Tìm biên giới của vũ trụ?
                          </a>
                        </li>
                      </ul>
                    </section>

                    <ScrollLink
                      to="header"
                      smooth
                      duration={500}
                      className="block mt-auto mb-0 text-center text-cyan-400 hover:text-white cursor-pointer transition-colors text-lg"
                    >
                      Pull Up ↑
                    </ScrollLink>
                  </div>
                  <small className="block text-center text-gray-500 py-6 border-t border-zinc-900">
                    ©2023-2026. This website was created by William and AI LLM.
                  </small>
                </main>
              </Element>
            </div>
          }
        />

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
