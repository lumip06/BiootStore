
import './App.css';
import BiootNavbar from "./components/BiootNavbar";
import Footer from "./components/Footer";

import BookFilter from "./components/BookFilter";
import BooksArea from "./components/BooksArea";
import './styles/MainPage.css'
function Home() {
    return (
        <div className="Home">

            <div class=" row row  ">
                <BiootNavbar/>
                <div><h1 style={{padding:"100px"}}>Welcome to BiootStore!</h1></div>

                <div  id="content-area" >

                    <div class="col">
                        <BookFilter/>
                    </div>
                    <div class="col">
                        <BooksArea/>
                    </div>
                </div></div>



            <Footer/>

        </div>
    );
}


export default Home;
