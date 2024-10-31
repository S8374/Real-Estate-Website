import { Link, useNavigate } from 'react-router-dom';
import './Error.css'
const ErrorPage = () => {
    const nav = useNavigate() ;
    const handelBack = () => {
        nav(-1);
    }
    return (
        <div>
            <section className="error-page-area text-center">
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h1>404</h1>
                    <h2>Opp............s</h2>
                    <h2>Sorry Page Was Not Found!</h2>
                  
                    <Link onClick={handelBack} className="btn btn-theme effect btn-md" href="#">Back To Home</Link>
                  
                </div>
            </div>
        </div>
    </section>
        </div>
    );
};

export default ErrorPage;