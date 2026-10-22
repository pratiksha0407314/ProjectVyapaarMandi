import React, { useEffect, useMemo, useState } from "react";
import "./FarmerDashboard.css";

const initialCrops = [];

const initialOrders = [
  {
    id: "ORD-1024",
    crop: "Wheat",
    buyer: "Sharma Traders",
    quantity: "20 quintals",
    amount: 49000,
    status: "Pending",
  },
  {
    id: "ORD-1025",
    crop: "Mustard",
    buyer: "Rajasthan Agro",
    quantity: "10 quintals",
    amount: 56500,
    status: "Confirmed",
  },
  {
    id: "ORD-1026",
    crop: "Bajra",
    buyer: "Green Basket",
    quantity: "15 quintals",
    amount: 34500,
    status: "Pending",
  },
];

const initialDeliveries = [
  {
    id: "DEL-201",
    crop: "Mustard",
    destination: "Jaipur, Rajasthan",
    transporter: "Raj Transport",
    status: "In Transit",
    eta: "Tomorrow, 3 PM",
  },
  {
    id: "DEL-202",
    crop: "Wheat",
    destination: "Ajmer, Rajasthan",
    transporter: "Awaiting assignment",
    status: "Requested",
    eta: "Not available yet",
  },
];

const priceHistory = [
  { month: "May", wheat: 2200, mustard: 5200 },
  { month: "Jun", wheat: 2250, mustard: 5350 },
  { month: "Jul", wheat: 2320, mustard: 5300 },
  { month: "Aug", wheat: 2290, mustard: 5480 },
  { month: "Sep", wheat: 2390, mustard: 5550 },
  { month: "Oct", wheat: 2450, mustard: 5650 },
];

const weatherForecast = [
  {
    day: "Today",
    condition: "Sunny",
    temperature: 31,
    low: 21,
    rain: "0%",
  },
  {
    day: "Wed",
    condition: "Clear",
    temperature: 32,
    low: 22,
    rain: "0%",
  },
  {
    day: "Thu",
    condition: "Cloudy",
    temperature: 29,
    low: 20,
    rain: "10%",
  },
  {
    day: "Fri",
    condition: "Sunny",
    temperature: 30,
    low: 19,
    rain: "0%",
  },
  {
    day: "Sat",
    condition: "Cloudy",
    temperature: 28,
    low: 20,
    rain: "15%",
  },
];

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function readLoginName() {
  const possibleNames = [
    "fullName",
    "userName",
    "username",
    "name",
    "farmerName",
  ];

  for (const key of possibleNames) {
    const value = localStorage.getItem(key);

    if (value && value.trim()) {
      return value.trim();
    }
  }

  const email =
    localStorage.getItem("email") ||
    localStorage.getItem("userEmail") ||
    "";

  if (email.includes("@")) {
    const part = email
      .split("@")[0]
      .replace(/[._-]+/g, " ")
      .trim();

    return part.replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
  }

  return "Farmer";
}

function PriceChart() {
  const chart = useMemo(() => {
    const width = 620;
    const height = 255;
    const left = 54;
    const right = 20;
    const top = 22;
    const bottom = 38;
    const min = 2000;
    const max = 6000;

    const x = (index) =>
      left +
      (index * (width - left - right)) /
        (priceHistory.length - 1);

    const y = (value) =>
      top +
      ((max - value) * (height - top - bottom)) /
        (max - min);

    const line = (key) =>
      priceHistory
        .map(
          (item, index) =>
            `${index === 0 ? "M" : "L"} ${x(index)} ${y(
              item[key]
            )}`
        )
        .join(" ");

    return {
      width,
      height,
      left,
      right,
      x,
      y,
      line,
    };
  }, []);

  return (
    <div className="price-chart-wrap">
      <div className="chart-legend">
        <span>
          <i className="legend-dot wheat-dot" /> Wheat
        </span>

        <span>
          <i className="legend-dot mustard-dot" /> Mustard
        </span>
      </div>

      <svg
        className="price-chart"
        viewBox={`0 0 ${chart.width} ${chart.height}`}
        role="img"
        aria-label="Sample wheat and mustard prices from May to October"
      >
        {[2000, 3000, 4000, 5000, 6000].map((value) => (
          <g key={value}>
            <line
              x1={chart.left}
              x2={chart.width - chart.right}
              y1={chart.y(value)}
              y2={chart.y(value)}
              className="chart-gridline"
            />

            <text
              x={chart.left - 10}
              y={chart.y(value) + 4}
              textAnchor="end"
              className="chart-label"
            >
              {value.toLocaleString("en-IN")}
            </text>
          </g>
        ))}

        <path
          d={chart.line("wheat")}
          className="chart-line wheat-line"
        />

        <path
          d={chart.line("mustard")}
          className="chart-line mustard-line"
        />

        {priceHistory.map((item, index) => (
          <g key={item.month}>
            <circle
              cx={chart.x(index)}
              cy={chart.y(item.wheat)}
              r="4"
              className="wheat-point"
            />

            <circle
              cx={chart.x(index)}
              cy={chart.y(item.mustard)}
              r="4"
              className="mustard-point"
            />

            <text
              x={chart.x(index)}
              y={chart.height - 12}
              textAnchor="middle"
              className="chart-label"
            >
              {item.month}
            </text>
          </g>
        ))}
      </svg>

      <p className="chart-note">
        Sample prices in ₹ per quintal. These are illustrative
        figures, not live mandi prices.
      </p>
    </div>
  );
}

function WeatherCard() {
  return (
    <section className="fd-panel weather-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">WEATHER OVERVIEW</p>
          <h2>Weather &amp; forecast</h2>
          <p className="muted">
            Sample conditions for a Rajasthan farm
          </p>
        </div>

        <span className="weather-symbol" aria-hidden="true">
          ☀
        </span>
      </div>

      <div className="weather-current">
        <div>
          <span className="weather-temp">31°</span>
          <p className="weather-condition">Sunny and warm</p>
          <p className="muted small">
            Demo reading · Not live weather
          </p>
        </div>

        <div className="weather-metrics">
          <div>
            <span>Humidity</span>
            <strong>42%</strong>
          </div>

          <div>
            <span>Wind</span>
            <strong>12 km/h</strong>
          </div>

          <div>
            <span>Rain chance</span>
            <strong>0%</strong>
          </div>
        </div>
      </div>

      <div className="forecast-grid">
        {weatherForecast.map((day) => (
          <div className="forecast-day" key={day.day}>
            <span className="forecast-name">{day.day}</span>

            <span
              className="forecast-symbol"
              aria-hidden="true"
            >
              {day.condition === "Sunny"
                ? "☀"
                : day.condition === "Clear"
                ? "◉"
                : "☁"}
            </span>

            <span className="forecast-condition">
              {day.condition}
            </span>

            <strong>{day.temperature}°</strong>

            <span className="muted small">
              {day.low}° low
            </span>

            <span className="rain-chance">
              {day.rain} rain
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatusBadge({ status }) {
  const className = status
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <span className={`status-badge status-${className}`}>
      {status}
    </span>
  );
}

function CropTable({ crops }) {
  if (!crops.length) {
    return (
      <div className="empty-state">
        No crop listings to display. Add a crop or adjust your
        search.
      </div>
    );
  }

  return (
    <div className="table-scroll">
      <table className="fd-table">
        <thead>
          <tr>
            <th>Crop name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Sample price</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {crops.map((crop) => (
            <tr key={crop.id}>
              <td>
                <strong>{crop.name}</strong>
              </td>

              <td>{crop.category}</td>

              <td>
                {crop.quantity} {crop.unit}
              </td>

              <td>
                {money(crop.price)}{" "}
                <span className="muted small">/ qtl</span>
              </td>

              <td>
                <StatusBadge status={crop.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DeliveryList({ deliveries, onTrack }) {
  if (!deliveries.length) {
    return (
      <div className="empty-state">
        No delivery requests yet. Select “Request Transport” to
        create one.
      </div>
    );
  }

  return (
    <div className="delivery-list">
      {deliveries.map((delivery) => (
        <article className="delivery-card" key={delivery.id}>
          <div className="delivery-main">
            <div className="delivery-id">{delivery.id}</div>

            <h3>{delivery.crop} delivery</h3>

            <p className="muted">{delivery.destination}</p>

            <div className="delivery-meta">
              <span>
                Transporter: {delivery.transporter}
              </span>

              <span>ETA: {delivery.eta}</span>
            </div>
          </div>

          <div className="delivery-actions">
            <StatusBadge status={delivery.status} />

            <button
              className="fd-button fd-button-secondary"
              onClick={() => onTrack(delivery)}
            >
              Track delivery
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function FarmerDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [farmerName, setFarmerName] = useState(readLoginName);

  const [email, setEmail] = useState(
    () =>
      localStorage.getItem("email") ||
      localStorage.getItem("userEmail") ||
      ""
  );

  const [accountOpen, setAccountOpen] = useState(false);

  // Start with no sample crop listings.
  // Load previously added crops from localStorage, if available.
  const [crops, setCrops] = useState(() => {
    try {
      const savedCrops = localStorage.getItem(
        "vyapaarMandiFarmerCrops"
      );

      return savedCrops
        ? JSON.parse(savedCrops)
        : initialCrops;
    } catch {
      return initialCrops;
    }
  });

  // Save crop listings in this browser.
  useEffect(() => {
    localStorage.setItem(
      "vyapaarMandiFarmerCrops",
      JSON.stringify(crops)
    );
  }, [crops]);

  const [orders] = useState(initialOrders);

  const [deliveries, setDeliveries] = useState(
    initialDeliveries
  );

  const [transportOpen, setTransportOpen] = useState(false);
  const [cropOpen, setCropOpen] = useState(false);

  const [cropForm, setCropForm] = useState({
    name: "",
    category: "Grains",
    quantity: "",
    price: "",
    description: "",
  });

  const [selectedDelivery, setSelectedDelivery] =
    useState(null);

  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");

  const [transportForm, setTransportForm] = useState({
    crop: "Wheat",
    quantity: "",
    destination: "",
    pickupDate: "",
    notes: "",
  });

  const firstLetter = (email || farmerName || "F")
    .trim()
    .charAt(0)
    .toUpperCase();

  const totalQuantity = crops.reduce(
    (sum, crop) => sum + Number(crop.quantity || 0),
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const activeDeliveries = deliveries.filter(
    (delivery) =>
      delivery.status === "In Transit" ||
      delivery.status === "Requested"
  ).length;

  const filteredCrops = crops.filter((crop) =>
    `${crop.name} ${crop.category} ${crop.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function showPage(page) {
    setActivePage(page);
    setNotice("");
  }

  function submitTransportRequest(event) {
    event.preventDefault();

    if (
      !transportForm.quantity ||
      Number(transportForm.quantity) <= 0 ||
      !transportForm.destination.trim()
    ) {
      setNotice(
        "Please enter a valid quantity and destination."
      );
      return;
    }

    const newDelivery = {
      id: `DEL-${203 + deliveries.length}`,
      crop: transportForm.crop,
      destination: transportForm.destination.trim(),
      transporter: "Awaiting assignment",
      status: "Requested",
      eta: "Pending transporter confirmation",
      quantity: `${transportForm.quantity} quintals`,
      pickupDate:
        transportForm.pickupDate || "Not selected",
      notes: transportForm.notes.trim(),
    };

    setDeliveries((previous) => [
      newDelivery,
      ...previous,
    ]);

    setTransportOpen(false);

    setTransportForm({
      crop: "Wheat",
      quantity: "",
      destination: "",
      pickupDate: "",
      notes: "",
    });

    setActivePage("Track Delivery");

    setNotice(
      "Demo transport request added. No real transporter has been contacted."
    );
  }

  // Add Crop form submission.
  function submitCrop(event) {
    event.preventDefault();

    const name = cropForm.name.trim();
    const quantity = Number(cropForm.quantity);
    const price = Number(cropForm.price);

    if (
      !name ||
      !Number.isFinite(quantity) ||
      quantity <= 0 ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      setNotice(
        "Please enter a crop name, a valid quantity, and a valid price."
      );
      return;
    }

    const newCrop = {
      id: Date.now(),
      name,
      category: cropForm.category,
      quantity,
      unit: "quintals",
      price,
      status: "Active",
      description: cropForm.description.trim(),
    };

    setCrops((previous) => [
      ...previous,
      newCrop,
    ]);

    setCropForm({
      name: "",
      category: "Grains",
      quantity: "",
      price: "",
      description: "",
    });

    setCropOpen(false);
    setActivePage("My Crop Listings");

    setNotice(`${name} added to your crop listings.`);
  }

  const navItems = [
    "Dashboard",
    "My Crop Listings",
    "Compare Prices",
    "Price Forecasting",
    "Pending Orders",
    "Request Transport",
    "Track Delivery",
    "Market Insights",
    "Support",
  ];

  return (
    <div className="farmer-app">
      <header className="farmer-topbar">
        <button
          className="brand-button"
          onClick={() => showPage("Dashboard")}
          aria-label="Go to dashboard"
        >
          <span className="farmer-brand">
            <span className="brand-vyapaar">Vyapaar</span>
            <span className="brand-mandi">Mandi</span>
          </span>
        </button>

        <div className="topbar-right">
          <span className="role-label">Farmer Portal</span>

          <div className="account-wrap">
            <button
              className="account-avatar"
              onClick={() =>
                setAccountOpen((open) => !open)
              }
              aria-label="Open account information"
              aria-expanded={accountOpen}
            >
              {firstLetter}
            </button>

            {accountOpen && (
              <div className="account-popover">
                <p className="eyebrow">YOUR ACCOUNT</p>

                <strong>Farmer account</strong>

                <label
                  className="form-label"
                  htmlFor="farmer-name-input"
                >
                  Login name
                </label>

                <input
                  id="farmer-name-input"
                  className="fd-input"
                  value={farmerName}
                  onChange={(event) =>
                    setFarmerName(event.target.value)
                  }
                  placeholder="Enter your login name"
                />

                <label
                  className="form-label account-email-label"
                  htmlFor="account-email-input"
                >
                  Email
                </label>

                <input
                  id="account-email-input"
                  type="email"
                  className="fd-input"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="Enter your email"
                />

                <button
                  className="fd-button fd-button-primary full-width account-save"
                  onClick={() => {
                    localStorage.setItem(
                      "farmerName",
                      farmerName
                    );

                    localStorage.setItem(
                      "name",
                      farmerName
                    );

                    if (email) {
                      localStorage.setItem("email", email);
                      localStorage.setItem(
                        "userEmail",
                        email
                      );
                    }

                    setAccountOpen(false);
                    setNotice(
                      "Account details updated."
                    );
                  }}
                >
                  Save account details
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="farmer-dashboard-layout">
        <aside className="farmer-sidebar">
          <div className="sidebar-label">WORKSPACE</div>

          <nav
            className="farmer-nav"
            aria-label="Farmer dashboard navigation"
          >
            {navItems.map((item) => (
              <button
                key={item}
                className={`farmer-nav-item ${
                  activePage === item ? "active" : ""
                }`}
                onClick={() => {
                  if (item === "Request Transport") {
                    setTransportOpen(true);
                  } else {
                    showPage(item);
                  }
                }}
              >
                <span>{item}</span>

                {item === "Pending Orders" &&
                  pendingOrders > 0 && (
                    <span className="nav-count">
                      {pendingOrders}
                    </span>
                  )}
              </button>
            ))}
          </nav>

          <div className="sidebar-help">
            <p className="eyebrow">NEED HELP?</p>

            <p>
              Need assistance with your crop listings or
              delivery?
            </p>

            <button
              className="text-button"
              onClick={() => showPage("Support")}
            >
              Visit support →
            </button>
          </div>

          <p className="sidebar-version">
            VyapaarMandi · Demo dashboard
          </p>
        </aside>

        <main className="farmer-main-content">
          <div className="page-topline">
            <div>
              <p className="eyebrow">
                FARMER WORKSPACE /{" "}
                {activePage.toUpperCase()}
              </p>

              <h1>
                {activePage === "Dashboard"
                  ? `Good day, ${farmerName || "Farmer"}!`
                  : activePage}
              </h1>

              <p className="page-subtitle">
                {activePage === "Dashboard"
                  ? "Manage your crops, follow market prices, and organise deliveries."
                  : `Manage your ${activePage.toLowerCase()} in one place.`}
              </p>
            </div>

            <div className="page-actions">
              <button
                className="fd-button fd-button-secondary"
                onClick={() => setTransportOpen(true)}
              >
                Request Transport
              </button>

              <button
                className="fd-button fd-button-primary"
                onClick={() => setCropOpen(true)}
              >
                + Add Crop
              </button>
            </div>
          </div>

          {notice && (
            <div className="notice-banner" role="status">
              <span>{notice}</span>

              <button
                onClick={() => setNotice("")}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          )}

          {activePage === "Dashboard" && (
            <>
              <section
                className="farmer-stat-grid"
                aria-label="Dashboard summary"
              >
                <article className="farmer-stat-card">
                  <div className="stat-top">
                    <span>Total Crop Listings</span>
                    <span className="stat-accent green" />
                  </div>

                  <strong className="stat-value">
                    {crops.length}
                  </strong>
                </article>

                <article className="farmer-stat-card">
                  <div className="stat-top">
                    <span>Crop Quantity</span>
                    <span className="stat-accent blue" />
                  </div>

                  <strong className="stat-value quantity-value">
                    {totalQuantity}
                    <span className="quantity-unit">qtl</span>
                  </strong>
                </article>

                <article className="farmer-stat-card">
                  <div className="stat-top">
                    <span>Pending Orders</span>
                    <span className="stat-accent orange" />
                  </div>

                  <strong className="stat-value">
                    {pendingOrders}
                  </strong>
                </article>

                <article className="farmer-stat-card">
                  <div className="stat-top">
                    <span>Active Deliveries</span>
                    <span className="stat-accent purple" />
                  </div>

                  <strong className="stat-value">
                    {activeDeliveries}
                  </strong>
                </article>
              </section>

              <section className="fd-panel">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">
                      MARKET PERFORMANCE
                    </p>

                    <h2>Crop price trends</h2>

                    <p className="muted">
                      Wheat and mustard · Last six months
                    </p>
                  </div>

                  <button
                    className="fd-button fd-button-secondary"
                    onClick={() =>
                      showPage("Price Forecasting")
                    }
                  >
                    View forecast
                  </button>
                </div>

                <PriceChart />
              </section>

              <WeatherCard />

              <section className="fd-panel">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">YOUR INVENTORY</p>
                    <h2>Recent crop listings</h2>
                  </div>

                  <button
                    className="text-button"
                    onClick={() =>
                      showPage("My Crop Listings")
                    }
                  >
                    View all →
                  </button>
                </div>

                <CropTable crops={crops.slice(0, 4)} />
              </section>

              <section className="fd-panel">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">LOGISTICS</p>
                    <h2>Delivery overview</h2>
                  </div>

                  <button
                    className="text-button"
                    onClick={() => showPage("Track Delivery")}
                  >
                    Track deliveries →
                  </button>
                </div>

                <DeliveryList
                  deliveries={deliveries.slice(0, 2)}
                  onTrack={setSelectedDelivery}
                />
              </section>
            </>
          )}

          {activePage === "My Crop Listings" && (
            <section className="fd-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">
                    INVENTORY MANAGEMENT
                  </p>

                  <h2>My crop listings</h2>
                </div>

                <div className="page-actions">
                  <span className="count-pill">
                    {crops.length} listings
                  </span>

                  <button
                    className="fd-button fd-button-primary"
                    onClick={() => setCropOpen(true)}
                  >
                    + Add Crop
                  </button>
                </div>
              </div>

              <input
                className="fd-input search-input"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search crop, category or status..."
                aria-label="Search crop listings"
              />

              <CropTable crops={filteredCrops} />
            </section>
          )}

          {activePage === "Compare Prices" && (
            <section className="fd-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">MARKET RATES</p>
                  <h2>Compare crop prices</h2>
                </div>
              </div>

              <p className="muted">
                Sample indicative prices. Actual mandi prices
                vary by location, grade and date.
              </p>

              <div className="comparison-grid">
                {crops.map((crop) => (
                  <article
                    className="comparison-card"
                    key={crop.id}
                  >
                    <span className="comparison-category">
                      {crop.category}
                    </span>

                    <h3>{crop.name}</h3>

                    <strong>
                      {money(crop.price)}{" "}
                      <small>/ quintal</small>
                    </strong>

                    <p className="muted small">
                      Sample reference price
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {activePage === "Price Forecasting" && (
            <>
              <section className="fd-panel">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">PRICE ANALYSIS</p>
                    <h2>Historical price trends</h2>
                  </div>
                </div>

                <PriceChart />
              </section>

              <div className="info-banner">
                These are illustrative sample values, not an
                AI prediction. Connect a verified market-price
                API and forecasting model for real forecasts.
              </div>
            </>
          )}

          {activePage === "Pending Orders" && (
            <section className="fd-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">ORDER MANAGEMENT</p>
                  <h2>Pending and recent orders</h2>
                </div>

                <span className="count-pill">
                  {orders.length} orders
                </span>
              </div>

              <div className="table-scroll">
                <table className="fd-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Crop</th>
                      <th>Buyer</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.crop}</td>
                        <td>{order.buyer}</td>
                        <td>{order.quantity}</td>
                        <td>{money(order.amount)}</td>
                        <td>
                          <StatusBadge status={order.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activePage === "Track Delivery" && (
            <section className="fd-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">
                    TRANSPORT &amp; LOGISTICS
                  </p>

                  <h2>Track your deliveries</h2>

                  <p className="muted">
                    Review sample requests, transporters and
                    estimated arrival times.
                  </p>
                </div>

                <button
                  className="fd-button fd-button-primary"
                  onClick={() => setTransportOpen(true)}
                >
                  Request Transport
                </button>
              </div>

              <DeliveryList
                deliveries={deliveries}
                onTrack={setSelectedDelivery}
              />
            </section>
          )}

          {activePage === "Market Insights" && (
            <>
              <section className="farmer-stat-grid">
                <article className="farmer-stat-card">
                  <div className="stat-top">
                    <span>Highest Sample Price</span>
                    <span className="stat-accent green" />
                  </div>

                  <strong className="stat-value">
                    ₹7,200
                  </strong>
                </article>

                <article className="farmer-stat-card">
                  <div className="stat-top">
                    <span>Wheat Sample Price</span>
                    <span className="stat-accent blue" />
                  </div>

                  <strong className="stat-value">
                    ₹2,450
                  </strong>
                </article>
              </section>

              <section className="fd-panel">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">
                      MARKET OBSERVATIONS
                    </p>

                    <h2>Sample market insights</h2>
                  </div>
                </div>

                <ul className="insight-list">
                  <li>
                    <strong>Wheat:</strong> The illustrative
                    series trends upward toward October.
                  </li>

                  <li>
                    <strong>Mustard:</strong> Sample prices
                    increase overall, with a small mid-period
                    dip.
                  </li>

                  <li>
                    <strong>Before selling:</strong> Check local
                    mandi rates, crop quality requirements and
                    transport costs.
                  </li>
                </ul>
              </section>
            </>
          )}

          {activePage === "Support" && (
            <section className="fd-panel support-panel">
              <p className="eyebrow">HELP CENTRE</p>

              <h2>How can we help?</h2>

              <p className="muted">
                Help topics for crop listings, orders, transport
                and market prices.
              </p>

              <div className="support-grid">
                <article>
                  <h3>Crop listings</h3>
                  <p>List crops and update available quantities.</p>
                </article>

                <article>
                  <h3>Orders</h3>
                  <p>Review buyer orders and their current status.</p>
                </article>

                <article>
                  <h3>Transportation</h3>
                  <p>
                    Submit transport requests and follow delivery
                    progress.
                  </p>
                </article>

                <article>
                  <h3>Market prices</h3>
                  <p>
                    Compare sample rates and check current local
                    prices.
                  </p>
                </article>
              </div>
            </section>
          )}

          <footer className="farmer-footer">
            <span>© 2026 VyapaarMandi</span>
            <span>
              Connecting farmers, vendors and transporters
            </span>
            <span>Demo data</span>
          </footer>
        </main>
      </div>

      {/* ADD CROP MODAL */}
      {cropOpen && (
        <div
          className="fd-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setCropOpen(false);
            }
          }}
        >
          <section
            className="fd-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="crop-title"
          >
            <div className="modal-heading">
              <div>
                <p className="eyebrow">
                  INVENTORY MANAGEMENT
                </p>

                <h2 id="crop-title">Add crop listing</h2>

                <p className="muted">
                  Enter details for the crop you want to list.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setCropOpen(false)}
                aria-label="Close crop form"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={submitCrop}
              className="transport-form"
            >
              <label className="form-label">
                Crop name

                <input
                  className="fd-input"
                  required
                  value={cropForm.name}
                  onChange={(event) =>
                    setCropForm({
                      ...cropForm,
                      name: event.target.value,
                    })
                  }
                  placeholder="e.g. Wheat, Rice, Tomato"
                />
              </label>

              <label className="form-label">
                Category

                <select
                  className="fd-input"
                  value={cropForm.category}
                  onChange={(event) =>
                    setCropForm({
                      ...cropForm,
                      category: event.target.value,
                    })
                  }
                >
                  <option>Grains</option>
                  <option>Pulses</option>
                  <option>Oilseeds</option>
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Cash crop</option>
                  <option>Millets</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="form-label">
                Available quantity (quintals)

                <input
                  className="fd-input"
                  type="number"
                  min="0.01"
                  step="0.01"
                  required
                  value={cropForm.quantity}
                  onChange={(event) =>
                    setCropForm({
                      ...cropForm,
                      quantity: event.target.value,
                    })
                  }
                  placeholder="Enter quantity"
                />
              </label>

              <label className="form-label">
                Price per quintal (₹)

                <input
                  className="fd-input"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={cropForm.price}
                  onChange={(event) =>
                    setCropForm({
                      ...cropForm,
                      price: event.target.value,
                    })
                  }
                  placeholder="Enter your asking price"
                />
              </label>

              <label className="form-label form-full">
                Description (optional)

                <textarea
                  className="fd-input"
                  rows="3"
                  value={cropForm.description}
                  onChange={(event) =>
                    setCropForm({
                      ...cropForm,
                      description: event.target.value,
                    })
                  }
                  placeholder="Crop quality, harvest date, or other details"
                />
              </label>

              <div className="modal-actions form-full">
                <button
                  type="button"
                  className="fd-button fd-button-secondary"
                  onClick={() => setCropOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="fd-button fd-button-primary"
                >
                  Save Crop
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* REQUEST TRANSPORT MODAL */}
      {transportOpen && (
        <div
          className="fd-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setTransportOpen(false);
            }
          }}
        >
          <section
            className="fd-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="transport-title"
          >
            <div className="modal-heading">
              <div>
                <p className="eyebrow">LOGISTICS</p>

                <h2 id="transport-title">Request transport</h2>

                <p className="muted">
                  Create a demo request for your crop delivery.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setTransportOpen(false)}
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={submitTransportRequest}
              className="transport-form"
            >
              <label className="form-label">
                Crop

                <select
                  className="fd-input"
                  value={transportForm.crop}
                  onChange={(event) =>
                    setTransportForm({
                      ...transportForm,
                      crop: event.target.value,
                    })
                  }
                >
                  {crops.map((crop) => (
                    <option key={crop.id} value={crop.name}>
                      {crop.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-label">
                Quantity (quintals)

                <input
                  className="fd-input"
                  type="number"
                  min="1"
                  required
                  value={transportForm.quantity}
                  onChange={(event) =>
                    setTransportForm({
                      ...transportForm,
                      quantity: event.target.value,
                    })
                  }
                  placeholder="e.g. 20"
                />
              </label>

              <label className="form-label">
                Delivery destination

                <input
                  className="fd-input"
                  required
                  value={transportForm.destination}
                  onChange={(event) =>
                    setTransportForm({
                      ...transportForm,
                      destination: event.target.value,
                    })
                  }
                  placeholder="City, mandi or buyer address"
                />
              </label>

              <label className="form-label">
                Preferred pickup date

                <input
                  className="fd-input"
                  type="date"
                  value={transportForm.pickupDate}
                  onChange={(event) =>
                    setTransportForm({
                      ...transportForm,
                      pickupDate: event.target.value,
                    })
                  }
                />
              </label>

              <label className="form-label form-full">
                Additional notes

                <textarea
                  className="fd-input"
                  rows="3"
                  value={transportForm.notes}
                  onChange={(event) =>
                    setTransportForm({
                      ...transportForm,
                      notes: event.target.value,
                    })
                  }
                  placeholder="Pickup details or special handling..."
                />
              </label>

              <div className="form-full modal-disclaimer">
                Demo only: this saves the request in the page
                state and does not contact a real transporter.
              </div>

              <div className="modal-actions form-full">
                <button
                  type="button"
                  className="fd-button fd-button-secondary"
                  onClick={() => setTransportOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="fd-button fd-button-primary"
                >
                  Submit request
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* DELIVERY TRACKING MODAL */}
      {selectedDelivery && (
        <div
          className="fd-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedDelivery(null);
            }
          }}
        >
          <section
            className="fd-modal tracking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tracking-title"
          >
            <div className="modal-heading">
              <div>
                <p className="eyebrow">DELIVERY DETAILS</p>

                <h2 id="tracking-title">
                  {selectedDelivery.id}
                </h2>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedDelivery(null)}
                aria-label="Close tracking details"
              >
                ×
              </button>
            </div>

            <div className="tracking-details">
              <div>
                <span>Crop</span>
                <strong>{selectedDelivery.crop}</strong>
              </div>

              <div>
                <span>Destination</span>
                <strong>{selectedDelivery.destination}</strong>
              </div>

              <div>
                <span>Transporter</span>
                <strong>{selectedDelivery.transporter}</strong>
              </div>

              <div>
                <span>Current status</span>
                <StatusBadge
                  status={selectedDelivery.status}
                />
              </div>

              <div>
                <span>Estimated arrival</span>
                <strong>{selectedDelivery.eta}</strong>
              </div>

              {selectedDelivery.quantity && (
                <div>
                  <span>Quantity</span>
                  <strong>{selectedDelivery.quantity}</strong>
                </div>
              )}
            </div>

            <div className="info-banner">
              {selectedDelivery.status === "In Transit"
                ? "This is a sample delivery status. Live GPS tracking needs transporter and location data from your backend."
                : "This demo request is waiting for transporter assignment. A real application should update the status from the backend."}
            </div>

            <button
              className="fd-button fd-button-primary full-width"
              onClick={() => setSelectedDelivery(null)}
            >
              Close details
            </button>
          </section>
        </div>
      )}
    </div>
  );
}