import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "Who can donate blood?",
      answer:
        "Anyone aged 18-65, weighing at least 50kg, and in good health can donate blood.",
    },
    {
      question: "How often can I donate blood?",
      answer:
        "You can donate whole blood every 56 days or double red cells every 112 days.",
    },
    {
      question: "Is donating blood safe?",
      answer:
        "Yes, donating blood is completely safe. Sterile equipment is used for every donor.",
    },
    {
      question: "What should I do before donating blood?",
      answer:
        "Drink plenty of water, eat a healthy meal, and avoid alcohol before donating.",
    },
    {
      question: "How long does the blood donation process take?",
      answer:
        "The entire process, including registration and recovery, takes about an hour. The actual donation lasts 10-15 minutes.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-red-600 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
