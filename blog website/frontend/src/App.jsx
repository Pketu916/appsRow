import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import BlogList from "./components/BlogList";
import AdminBlogPage from "./admin/AdminBlogPage";
import store from "./store";
import { Provider } from 'react-redux';

function App() {
  // return <BlogList />;
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/admin" element={<AdminBlogPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
