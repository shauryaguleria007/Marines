import React from 'react'
import { useNotificationContext } from '../context/notificationContext'
export const Footer = () => {
    const { ref } = useNotificationContext()
    return <>
        <footer className="foot" style={{marginTop:"10px"}}>
            <div className="row primary">
                <div className="column about">
                    <h3>Connect</h3>
                    <p>
                        <a
                            href="https://www.google.com/maps/place/Clement+Town,+Dehradun,+Uttarakhand+248002/@30.2681914,77.9905414,14z/data=!3m1!4b1!4m6!3m5!1s0x39092befa7608ead:0xe723fed2168f7a8d!8m2!3d30.2685607!4d78.0071039!16zL20vMGYxOXB2?entry=ttu">
                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                            Clement Town, DEHRADUN</a>
                    </p>
                    <div className="social">
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-linkedin"></i>
                        <i className="fab fa-instagram"></i>
                    </div>
                </div>

                <div className="column link">
                    <h3>Links</h3>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#team">Team</a></li>
                        <li><a href="#blogs">Blogs</a></li>
                        <li><a href="#support">Support</a></li>
                    </ul>
                </div>

                <div className="column subscribe">
                    <h3>Newsletter</h3>
                    <div>
                        <input type="email" placeholder="Your email id here" />
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>
        </footer>
        <footer>
            <div className="row copyright">
                <div className="footer-menu">

                    <a href="">Home</a>
                    <a href="">F.A.Q</a>
                    <a href="">Cookies Policy</a>
                    <a href="">Terms Of Service</a>
                    <a href="">Support</a>

                </div>
                <p>Copyright &copy; 2023</p>
            </div>

        </footer>
    </>
}
