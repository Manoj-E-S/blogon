import './HomePage.css'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import About from '../../components/Main/About/About'
import Signup from '../../components/Main/Auth/Signup/Signup'
import Login from '../../components/Main/Auth/Login/Login'
import BlogList from '../../components/Main/Blogs/BlogList'
import BlogDetail from '../../components/Main/Blogs/BlogDetail/BlogDetail'
import CreateBlog from '../../components/Main/Blogs/CreateBlog/CreateBlog'
import EditBlog from '../../components/Main/Blogs/EditBlog/EditBlog'

type HomePageProps = {
  whichMain: string;
}

function HomePage({ whichMain }: HomePageProps) {

  if(localStorage.getItem("loggedIn") === "true") {      
    setTimeout(() => {
      localStorage.clear();
    }, 3600000);
  }
  
  return (
    <>
      <Navbar />
      <div className="MainContainer">
        {
          (whichMain === "Login") ? (
            <Login />
          ) : (whichMain === "Signup") ? (
            <Signup />
          ) : (whichMain === "BlogList") ? (
            <BlogList />
          ) : (whichMain === "BlogDetail") ? (
            <BlogDetail />
          ) : (whichMain === "CreateBlog") ? (
            <CreateBlog />
          ) : (whichMain === "EditBlog") ? (
            <EditBlog />
          ) : (
            <About />
          )
        }
      </div>
      <Footer />
    </>
  )
}

export default HomePage
