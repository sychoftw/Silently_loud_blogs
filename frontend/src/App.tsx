
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SignUp } from './pages/Signup'
import { SignIn} from './pages/Signin'
import { Blogs } from './pages/Blogs'
import { Blog } from './pages/Blog'
import { Publish } from './pages/Publish'



function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/signin' element={<SignIn></SignIn>}></Route>
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/blog/:id" element={<Blog/>} />
        <Route path="/publish" element={<Publish/>} />

      </Routes>
    </BrowserRouter>

    </div>
  )
   
}

export default App
