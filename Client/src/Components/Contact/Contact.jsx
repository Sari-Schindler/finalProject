import React, { useState } from 'react';
import style from './Contact.module.css'
import axios from "axios";


const ContactPage = () => {
  const [haveQuestion, setHaveQuestion] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleQuestion = () => {
    setHaveQuestion(true);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

 
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/submitForm', formData);
      if(response.status === 200) {
        alert("Your details saved. We will get back to you soon");
      }
      console.log('Form submitted successfully:', response.data);
      // Reset form and state
      setFormData({ name: '', email: '', message: '' });
      setHaveQuestion(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <>
      <header className={style.header}>
        Interested in more information?<br />
        Leave your details and we'll be back soon
      </header>
      <button className={style.questionButton} onClick={handleQuestion}>Leave Details</button>

      {haveQuestion && (
        <form className={style.contactForm} onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button className={style.submitButton} type="submit">Send</button>
        </form>
      )}
    </>
  );
};

export default ContactPage;
