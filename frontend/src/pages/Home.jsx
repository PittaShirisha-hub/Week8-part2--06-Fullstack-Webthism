import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err));
  }, []);

  const scrollToServices = () => {
    document
      .querySelector(".services-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Book Premium Beauty & Wellness Services
          </h1>

          <p>
            Trusted Professionals • Instant Booking •
            Secure Experience
          </p>

          <button
            className="hero-btn"
            onClick={scrollToServices}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* SERVICES */}
      <div className="container services-section">
        <h1 className="page-title">
          Featured Services
        </h1>

        <div className="service-grid">
          {services.map((service) => (
            <div
              className="service-card"
              key={service._id}
            >
              <img
                src={service.image}
                alt={service.title}
              />

              <div className="service-body">
                <h2>{service.title}</h2>

                <p>{service.description}</p>

                <span>
                  ⏰ {service.duration}
                </span>

                <h3>
                  ₹{service.price}
                </h3>

                <Link
                  to="/booking"
                  state={{ service }}
                >
                  <button className="btn">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h1>
          What Our Customers Say
        </h1>

        <div className="testimonial-grid">
          <div className="testimonial-card">
            <h3>⭐⭐⭐⭐⭐</h3>

            <p>
              Amazing service experience and
              hassle-free booking process.
            </p>

            <h4>- Shankar</h4>
          </div>

          <div className="testimonial-card">
            <h3>⭐⭐⭐⭐⭐</h3>

            <p>
              Professional staff and excellent
              customer support.
            </p>

            <h4>- Shivani</h4>
          </div>

          <div className="testimonial-card">
            <h3>⭐⭐⭐⭐⭐</h3>

            <p>
              Best booking platform I've used.
              Highly recommended.
            </p>

            <h4>- Shirisha</h4>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h2>ServiceHub</h2>

        <p>
          Professional Service Booking Platform
        </p>

        <p>
          📧 support@servicehub.com
        </p>

        <p>
          📞 +91 9876543210
        </p>

        <p>
          © 2026 All Rights Reserved
        </p>
      </footer>
    </>
  );
}

export default Home;