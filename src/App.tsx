// src/App.tsx
import Scene from './components/Scene';

function App() {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
            <Scene />
            <div style={{
                position: 'absolute',
                bottom: 20,
                left: 20,
                color: '#fff',
                fontFamily: 'Arial',
                fontSize: '16px'
            }}>
                <p>@WilliamLi</p>
                <p>Lissajous curves Demo</p>
            </div>
        </div>
    );
}

export default App;
