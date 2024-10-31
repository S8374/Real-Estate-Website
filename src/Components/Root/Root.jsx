import { Outlet } from "react-router-dom";
import Header from "../Pages/Header/Header";
import Footer from "../Pages/Footer/Footer";
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
        <div className="bg-white">

            <Header></Header>
            <div >
                <Outlet></Outlet>

                <Footer></Footer>
            </div>


        </div>
    );
};

export default Root;