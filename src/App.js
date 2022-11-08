import './App.css';
import AppBody from './components/body-app/AppBody';

function App() {
    return (
        <div className="App">
            <header className="header">
                <h3 className="App-heading">Todo<span>APP</span></h3>
            </header>
            <main className="main">
                <AppBody />
            </main>
            <footer className="footer">
                <p className="text-auth">@QuangBui</p>
            </footer>
        </div>
    );
}

export default App;