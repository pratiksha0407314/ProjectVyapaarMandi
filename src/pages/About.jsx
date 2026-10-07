import {
  Sprout,
  Store,
  Truck,
  ShieldCheck,
  Brain,
  ShoppingCart,
  BarChart3,
  MapPin
} from "lucide-react";

function About() {
  return (
    <main className="about-page">

      {/* Hero */}
      <section className="about-hero">

        <div className="about-hero-icon">
          <Sprout size={30} />
        </div>

        <p className="about-kicker">
          ABOUT VYAPAARMANDI
        </p>

        <h1>
          Connecting Agriculture
          <br />
          Through Technology
        </h1>

        <p className="about-hero-text">
          An AI-powered agricultural marketplace and supply
          chain platform connecting farmers, vendors,
          transporters and administrators through one
          digital ecosystem.
        </p>

      </section>

      {/* Introduction */}
      <section className="about-intro">

        <div className="about-intro-text">

          <span className="about-section-label">
            OUR PLATFORM
          </span>

          <h2>
            One Platform.
            <br />
            Multiple Stakeholders.
          </h2>

          <p>
            VyapaarMandi is designed to simplify the
            agricultural marketplace and supply chain by
            bringing different stakeholders together on
            a single digital platform.
          </p>

          <p>
            Farmers can list and sell their crops, vendors
            can discover and purchase products, and
            transporters can manage deliveries and
            transportation activities.
          </p>

        </div>

        <div className="about-role-grid">

          <div className="about-role-card">
            <div className="about-role-icon farmer-icon">
              <Sprout size={25} />
            </div>

            <h3>Farmers</h3>

            <p>
              List crops, compare prices, sell products
              and manage deliveries.
            </p>
          </div>

          <div className="about-role-card">
            <div className="about-role-icon vendor-icon">
              <Store size={25} />
            </div>

            <h3>Vendors</h3>

            <p>
              Discover products, purchase from farmers
              and manage inventory.
            </p>
          </div>

          <div className="about-role-card">
            <div className="about-role-icon transporter-icon">
              <Truck size={25} />
            </div>

            <h3>Transporters</h3>

            <p>
              Manage delivery requests and track
              transportation activities.
            </p>
          </div>

          <div className="about-role-card">
            <div className="about-role-icon admin-icon">
              <ShieldCheck size={25} />
            </div>

            <h3>Administrators</h3>

            <p>
              Monitor users, listings, platform activities
              and suspicious activity.
            </p>
          </div>

        </div>

      </section>

      {/* Features */}
      <section className="about-features">

        <div className="about-features-heading">

          <span className="about-section-label">
            WHAT WE PROVIDE
          </span>

          <h2>
            Technology That Supports
            <br />
            the Agricultural Ecosystem
          </h2>

        </div>

        <div className="about-feature-grid">

          <div className="about-feature-card">

            <div className="about-feature-icon">
              <Brain size={25} />
            </div>

            <h3>AI-Powered Insights</h3>

            <p>
              AI-based recommendations, demand insights,
              price comparison and analytics help
              stakeholders make informed decisions.
            </p>

          </div>

          <div className="about-feature-card">

            <div className="about-feature-icon">
              <ShoppingCart size={25} />
            </div>

            <h3>Digital Marketplace</h3>

            <p>
              A centralized marketplace for farmers and
              vendors to discover, list and exchange
              agricultural products.
            </p>

          </div>

          <div className="about-feature-card">

            <div className="about-feature-icon">
              <Truck size={25} />
            </div>

            <h3>Supply Chain</h3>

            <p>
              Transportation and delivery workflows help
              connect products with their destinations.
            </p>

          </div>

          <div className="about-feature-card">

            <div className="about-feature-icon">
              <BarChart3 size={25} />
            </div>

            <h3>Reports & Analytics</h3>

            <p>
              Useful reports and analytics provide
              insights into marketplace and supply chain
              activities.
            </p>

          </div>

        </div>

      </section>

      {/* Vision */}
      <section className="about-vision">

        <div className="about-vision-icon">
          <MapPin size={28} />
        </div>

        <div>

          <span className="about-section-label">
            OUR VISION
          </span>

          <h2>
            Building a Smarter Agricultural Marketplace
          </h2>

          <p>
            Our vision is to use technology and
            AI-powered solutions to make agricultural
            trading more connected, transparent and
            efficient for all stakeholders.
          </p>

        </div>

      </section>

    </main>
  );
}

export default About;