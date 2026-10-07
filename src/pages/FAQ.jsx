
import { useState } from "react";
import {
  ChevronDown,
  Send,
  MessageSquare
} from "lucide-react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const [formData, setFormData] = useState({
    question: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      question: "What is VyapaarMandi?",
      answer:
        "VyapaarMandi is an AI-powered agricultural marketplace and supply chain platform that connects farmers, vendors and transporters through a single digital platform."
    },
    {
      question: "Who can use VyapaarMandi?",
      answer:
        "Farmers, vendors and transporters can register and use the platform. Administrators manage and monitor the overall platform."
    },
    {
      question: "What can users do on VyapaarMandi?",
      answer:
        "Farmers can list and sell crops, vendors can purchase products and manage inventory, and transporters can manage delivery requests and track deliveries."
    }
  ];

  function toggleFAQ(index) {
    setOpenIndex(
      openIndex === index ? null : index
    );
  }

  function handleChange(event) {
    const { value } = event.target;

    setFormData({
      question: value
    });

    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.question.trim()) {
      return;
    }

    setSubmitted(true);

    setFormData({
      question: ""
    });
  }

  return (
    <main className="faq-page">

      <section className="faq-hero">

        <h1>
          Frequently Asked Questions
        </h1>

        <p>
          Find answers to common questions about
          VyapaarMandi and its features.
        </p>

      </section>

      <section className="faq-container">

        <div className="faq-list">

          {faqs.map((faq, index) => (
            <div
              className={`faq-item ${
                openIndex === index
                  ? "faq-open"
                  : ""
              }`}
              key={index}
            >

              <button
                type="button"
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >

                <span>
                  {faq.question}
                </span>

                <ChevronDown
                  size={20}
                  className="faq-chevron"
                />

              </button>

              {openIndex === index && (
                <div className="faq-answer">

                  <p>
                    {faq.answer}
                  </p>

                </div>
              )}

            </div>
          ))}

        </div>

        <section className="ask-question-card">

          <div className="ask-question-heading">

            <div className="ask-question-icon">
              <MessageSquare size={23} />
            </div>

            <div>

              <h2>
                Didn't Find Your Answer?
              </h2>

              <p>
                Ask your question and we'll help you.
              </p>

            </div>

          </div>

          {submitted && (
            <div className="question-success">
              Your question has been submitted
              successfully.
            </div>
          )}

          <form
            className="question-form"
            onSubmit={handleSubmit}
          >

            <div className="question-field">

              <label htmlFor="faq-question">
                Your Question
              </label>

              <div className="question-textarea">

                <MessageSquare size={18} />

                <textarea
                  id="faq-question"
                  name="question"
                  placeholder="Type your question here..."
                  value={formData.question}
                  onChange={handleChange}
                  rows="4"
                  required
                />

              </div>

            </div>

            <button
              type="submit"
              className="ask-question-button"
            >

              <Send size={17} />

              <span>
                Submit Question
              </span>

            </button>

          </form>

        </section>

      </section>

    </main>
  );
}

export default FAQ;

