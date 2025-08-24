// src/App.tsx
import Scene from './components/Scene';
import { Link, Element } from 'react-scroll';

function App() {

    return (
        <>
            {/* Wrap the header in an Element component */}
            <Element name="header">
                {/* 1. Canvas 3D luôn nằm ở lớp nền */}
                <div className="scene-background">
                    <Scene />
                </div>

                {/* 2. Header chiếm toàn bộ màn hình đầu tiên */}
                <header>
                    <span className="hi-color">Hi, Welcome To My Digital Space</span>
                    <h1>My name William Li</h1>
                    <h3>a programmer specializing in web technology</h3>
                    {/* This is the scroll-down link using react-scroll */}
                    <Link to="blog-content" smooth={true} duration={500} className="pull-down">
                        WHO AM I ↓
                    </Link>
                    <p className="header-caption"></p>
                </header>
            </Element>


            {/* The main content wrapped in the Element component */}
            <Element name="blog-content">
            <main id="blog-content" className="blog-content">
                <section >
                    <h3 >Short Bio</h3>
                    <ul>
                        <li>Who Am I: William Li (Vietnamese: Lê Thanh Nghĩa)</li>
                        <li>Born: May 14, 1997, Ngô Gia Tự Street,
                            <a href="https://vi.wikipedia.org/wiki/B%C3%ACnh_%C4%90%E1%BB%8Bnh_(ph%C6%B0%E1%BB%9Dng)"> Bình Định Ward</a>,
                            <a href="https://vi.wikipedia.org/wiki/Gia_Lai"> Gia Lai Province</a>,
                            <a href="https://en.wikipedia.org/wiki/Vietnam"> Việt Nam</a>
                        </li>
                        <li>Nationality: <a href="https://en.wikipedia.org/wiki/Vietnamese_people">Vietnamese</a></li>
                    </ul>
                </section>
                <section>
                    <h3>Technical Skills</h3>
                    <ul>
                        <li>Human language: <mark>Vietnamese</mark>, <mark>English</mark></li>
                        <li>Programming language: <mark>Typescript</mark></li>
                        <li>Frameworks/Libraries: <mark>Next.js, React.js, Node.js, Express.js, Zustand, TanStack Query, Redux Toolkit</mark></li>
                        <li>Styling: <mark>CSS, SCSS/Sass, Tailwind CSS, Material-UI, Styled-components</mark></li>
                        <li>Databases: <mark>MongoDB, PostgreSQL, MySQL</mark> </li>
                        <li>API: <mark>RESTful API, GraphQL</mark></li>
                        <li>Testing: <mark>Jest, React Testing Library, Cypress</mark></li>
                        <li>Deployment: <mark>Vercel, Netlify, Docker</mark></li>
                    </ul>
                </section>
                <section>
                    <h3>Contact</h3>
                    <ul>
                        <li>Links: Reach out to me at X@Y, where X=williamli.sci and Y=gmail.com.</li>
                        <li><a href="https://williamlisci.github.io/blog">My Blog</a></li>
                    </ul>
                </section>
                <section>
                    <h3>Blessed are those who have not seen and yet believe</h3>
                    <ul>
                        <li><a href="https://www.youtube.com/watch?v=anWRa7TiXvw">Tìm trật tự trong sự hỗn loạn</a></li>
                        <li><a href="https://youtu.be/faaJcXPs-Rc?si=JPxBHxS0kWdGP_Ln">Does Love Exist?</a></li>
                    </ul>
                </section>

                {/* The scroll-up link */}
                <Link to="header" smooth={true} duration={500} className="pull-up">
                    Pull Up
                </Link>
            </main>
            </Element>
        </>
    );
}

export default App;
