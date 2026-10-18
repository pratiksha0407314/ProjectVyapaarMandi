
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About Vyapaar Mandi</h1>
      </header>

      <main className="about-container">
        <section className="about-intro">
          <p>
            Vyapaar Mandi is an AI-powered agricultural marketplace designed
            to connect farmers, vendors, and transporters on a single platform.
            It aims to make agricultural trading simpler, more organized, and
            more transparent. Farmers can list their crops, compare mandi
            prices, access weather information, and connect with vendors to
            sell their produce. Vendors can manage their inventory, purchase
            crops from farmers, monitor stock levels, track orders, and view
            revenue information. Transporters can view delivery requests,
            update delivery statuses, and coordinate the movement of
            agricultural goods. The platform also aims to provide AI-based
            assistance, market insights, price forecasts, recommendations,
            and multilingual support to help users make informed decisions.
            By bringing these activities together, Vyapaar Mandi aims to
            reduce information gaps and improve coordination throughout the
            agricultural supply chain.
          </p>
        </section>

        <section className="about-section">
          <h2>Who We Serve</h2>

          <div className="user-box farmer-box">
            <h3>Farmer</h3>
            <p>
              Farmers can list their crops, compare mandi prices, check
              weather information, and connect with vendors to sell their
              produce.
            </p>
          </div>

          <div className="user-box vendor-box">
            <h3>Vendor</h3>
            <p>
              Vendors can purchase crops from farmers, manage inventory,
              track orders, monitor stock levels and view revenue information.
            </p>
          </div>

          <div className="user-box transporter-box">
            <h3>Transporter</h3>
            <p>
              Transporters can view delivery requests, update delivery
              statuses, and coordinate the transportation of agricultural
              goods.
            </p>
          </div>
        </section>

        <section className="about-vision">
          <h2>Our Vision</h2>
          <p>
            Our vision is to make agricultural trading more organized,
            accessible, and efficient through technology. We aim to reduce
            information gaps, support better decision-making, and improve
            coordination between farmers, vendors, and transporters for a
            more connected agricultural supply chain.
          </p>
        </section>
      </main>
    </div>
  );
}

export default About;
