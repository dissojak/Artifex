import React, { useState } from 'react';
import './Faqs.css';
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        {question}
        <span className="faq-toggle">{isOpen ? '⌄' : '>'}</span>
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const FAQs = ({ faqs }) => {
  return (
    <div className="faqs">
      <h1 style={{fontFamily:'Dubai-Bold',fontSize:'56px' }}>FAQs</h1>
      <p>Find Answers To Common Questions About Our Artist Marketplace.</p>
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

// Usage of FAQs component with your FAQ data
const Faqs = () => {
  const faqData = [
    { question: 'How to Join ?', answer: 'To join our artist marketplace, simply sign up on our website and complete the registration process. Once approved, you can start showcasing and selling your artwork.' },
    { question: 'How to Sell?', answer: 'To sell your artwork on our marketplace, create a seller profile and upload high-quality images of your artwork. Set your prices and provide detailed descriptions. Once a buyer purchases your artwork, you will be notified to arrange shipping or delivery.' },
    { question: 'How to Buy?', answer: 'To buy artwork on our marketplace, browse through the available listings and select the artwork you wish to purchase. Add it to your cart and proceed to checkout. Follow the payment instructions to complete your purchase.' },
    { question: 'How to Contact?', answer: 'If you have any questions or need assistance, you can contact our support team through the contact form on our website. We will get back to you as soon as possible.' },
    { question: 'How to Resolve issues?', answer: 'If you encounter any issues with your purchase or sale, please reach out to our support team. We will work with you to resolve the problem and ensure a satisfactory outcome.' },
    // ... other faq items
  ];

  return (
    <div className="app">
      <FAQs faqs={faqData} />
    </div>
  );
};

export default Faqs;
