import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { About } from './components/About';
import { ContentList } from './components/ContentList';
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MainPage } from "./components/MainPage";
import { NewContent } from './components/NewContent';
import { NewCourse } from './components/NewCourse';

function App() {
  return (
    <Router>
      <Header />
        <div className="container mt-4">
        <Routes>
              <Route exact path='/' element={< MainPage />}></Route>
              <Route exact path='/course/:id' element={< ContentList />}></Route>
              <Route exact path='/content/new/:id' element={< NewContent />}></Route>
              <Route exact path='/course/new' element={< NewCourse />}></Route>
              <Route exact path='/about' element={< About />}></Route>
       </Routes>
        <Footer />
       </div>
    </Router>
);
}

export default App;
