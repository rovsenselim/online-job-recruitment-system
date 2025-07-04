import React from "react";
import "./ContactInfo.css";

const ContactInfo = () => {
    return (
        <section className="contact-section">
            <div className="background-overlay"></div>

            <h1 className="contact-title">Get in Touch</h1>

            <div className="contact-content">
                <div className="contact-info">
                    <div className="info-card">
                        <i className="fas fa-map-marker-alt icon"></i>
                        <h3>Address</h3>
                        <p>Azərbaycan Texniki Universiteti, Bakı, Azərbaycan</p>
                    </div>
                    <div className="info-card">
                        <i className="fas fa-phone icon"></i>
                        <h3>Phone</h3>
                        <p>+994 12 123 45 67</p>
                    </div>
                    <div className="info-card">
                        <i className="fas fa-envelope icon"></i>
                        <h3>Email</h3>
                        <p>contact@hireconnect.az</p>
                    </div>
                </div>

                <form
                    className="contact-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        alert("Message sent! (demo)");
                    }}
                >
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <input type="text" placeholder="Subject" required />
                    <textarea rows="5" placeholder="Message" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>

            <div className="map-wrapper">
                <iframe
                    title="AzTU Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.217485697862!2d49.82417091526238!3d40.37278497936956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40306399de4b13d3%3A0x44e1eacec944e93e!2sAzerbaijan%20Technical%20University!5e0!3m2!1sen!2s!4v1697525092332!5m2!1sen!2s"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </section>
    );
};

export default ContactInfo;
