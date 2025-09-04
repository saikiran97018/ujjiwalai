import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../layout/Section";
import { api } from "../actions/api";

const Contact = ({ user }) => {
  const navigate = useNavigate();

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Check if user is logged in
    if (!user) {
      return navigate("/signin");
    }

    // ✅ Basic validation
    if (!firstName || !lastName || !email || !mobileNumber || !subject || !message) {
      return alert("Please fill in all fields.");
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${api}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          mobileNumber,
          subject,
          message,

        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Message sent successfully!");
        // reset form
        setFirstName("");
        setLastName("");
        setEmail("");
        setMobileNumber("");
        setSubject("");
        setMessage("");
      } else {
        alert(data.error || "❌ Failed to send message.");
      }
    } catch (err) {
      console.error("Error sending contact message:", err);
      alert("❌ Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section
      className="bg-white"
      title="Contact Us"
      subtitle="Have questions? Get in touch with our team"
    >
      <div className="grid md:grid-cols-2 gap-12">
        {/* ✅ Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Mobile Number</label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-secondary text-white font-medium py-3 px-6 rounded-lg shadow disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* ✅ Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-map-marker-alt text-primary"></i>
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">
                    2-70 Gorlepeta village, Ranasthalam Mandalam, Srikakulam
                    district
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-phone-alt text-primary"></i>
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">7013222647</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-envelope text-primary"></i>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">
                    <a
                      href="mailto:ujjwalai369@gmail.com"
                      className="text-primary underline"
                    >
                      ujjwalai369@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Support Hours</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Visit our{" "}
              <a href="#" className="text-primary underline">
                Help Center
              </a>{" "}
              or{" "}
              <a href="#" className="text-primary underline">
                FAQ
              </a>{" "}
              for quick answers to common questions.
            </p>
            <button className="bg-indigo-100 text-primary font-medium py-2 px-4 rounded-lg">
              Browse Help Center
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
