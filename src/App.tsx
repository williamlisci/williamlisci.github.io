import Scene from './components/Scene';
import { Link as ScrollLink, Element } from 'react-scroll';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import styles from './assets/css/Home.module.css';

function App() {
    return (
        <Router>
            <Routes>
                {/* Route cho trang chủ */}
                <Route
                    path="/"
                    element={
                        <div className={styles.homePage}>
                            <Element name="header">
                                <div className={styles.sceneBackground}>
                                    <Scene />
                                </div>
                                <header className={styles.homeHeader}>
                                    <span className={styles.hiColor}>Hi, Welcome To My Digital Space</span>
                                    <h1>My name William Li</h1>
                                    <h3>a programmer specializing in web technology</h3>
                                    <ScrollLink to="blog-content" smooth={true} duration={500} className={styles.pullDown}>
                                        WHO AM I ↓
                                    </ScrollLink>
                                    <p className={styles.headerCaption}>凤凰涅槃 浴火重生</p>
                                </header>
                            </Element>
                            <Element name="blog-content">
                                <main id="blog-content" className={styles.blogContent}>
                                    <section>
                                        <h3>Short Bio</h3>
                                        <ul>
                                            <li>Who Am I: William Li (Vietnamese: Lê Thanh Nghĩa)</li>
                                            <li>
                                                Born: May 14, 1997, Ngô Gia Tự Street,
                                                <a href="https://vi.wikipedia.org/wiki/B%C3%ACnh_%C4%90%E1%BB%8Bnh_(ph%C6%B0%E1%BB%9Dng)">
                                                    Bình Định Ward
                                                </a>,
                                                <a href="https://vi.wikipedia.org/wiki/Gia_Lai"> Gia Lai Province</a>,
                                                <a href="https://en.wikipedia.org/wiki/Vietnam"> Việt Nam</a>
                                            </li>
                                            <li>
                                                Nationality: <a href="https://en.wikipedia.org/wiki/Vietnamese_people">Vietnamese</a>
                                            </li>
                                        </ul>
                                    </section>
                                    <section>
                                        <h3>Technical Skills</h3>
                                        <ul>
                                            <li>Human language: <mark>Vietnamese</mark>, <mark>English</mark></li>
                                            <li>Programming language: <mark>Typescript</mark></li>
                                            <li>Tech Stack: <mark>Tailwind CSS, React, Next.js, Prisma, Docker, shadcn-ui, zustand, Zod, Jest</mark></li>
                                        </ul>
                                    </section>
                                    <section>
                                        <h3>Contact</h3>
                                        <ul>
                                            <li>Links: Reach out to me at X@Y, where X=williamli.sci and Y=gmail.com.</li>
                                            <li><Link to="/blog">My Blog</Link></li>
                                        </ul>
                                    </section>
                                    <section>
                                        <h3>Blessed are those who have not seen and yet believe</h3>
                                        <ul>
                                            <li><a href="https://www.youtube.com/watch?v=anWRa7TiXvw">Tìm trật tự trong sự hỗn loạn</a></li>
                                            <li><a href="https://youtu.be/faaJcXPs-Rc?si=JPxBHxS0kWdGP_Ln">Does Love Exist?</a></li>
                                        </ul>
                                    </section>
                                    <ScrollLink to="header" smooth={true} duration={500} className={styles.pullUp}>
                                        Pull Up ↑
                                    </ScrollLink>
                                </main>
                            </Element>
                        </div>
                    }
                />
                {/* Route cho blog, sẽ hiển thị khi đường dẫn là /blog */}
                <Route
                    path="/blog/*"
                    element={
                        <main id="blog-content" >
                            <Routes>
                                {/* Route cho danh sách bài viết blog */}
                                <Route path="/" element={<PostList />} />
                                {/* Route cho từng bài viết blog */}
                                <Route path="posts/:slug" element={<PostDetails />} />
                                {/* Route điều hướng nếu truy cập sai đường dẫn */}
                                <Route path="*" element={<Navigate to="/blog" />} />
                            </Routes>
                        </main>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
