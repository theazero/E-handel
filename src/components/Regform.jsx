import React, { useState } from 'react';

const RegForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validering: För att kontrollera att alla fält är ifyllda
    if (!firstName || !lastName || !email || !message) {
      setErrorMessage('Alla fält måste fyllas i.');
      setSuccessMessage('');
      return;
    }

    try {
      // Skicka data till API
      const requestBody = { 
        name: `${firstName} ${lastName}`, 
        email, 
        message 
      };

      console.log('Request Body:', requestBody); // för att kontrollera vad som skickas till API

      const response = await fetch('https://js2-ecommerce-api.vercel.app/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      console.log('Response:', response); 

      if (response.ok) {
        setSuccessMessage('Meddelandet har skickats! Vi hör av oss inom kort!');
        setErrorMessage('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setMessage('');
      } else {
        const errorText = await response.text(); 
        console.error('API Error:', errorText);
        setErrorMessage('Ett fel uppstod: ' + errorText);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setErrorMessage('Kunde inte ansluta till servern. Försök igen senare.');
      setSuccessMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form space-y-1">
      <h2 className="send-message">Skicka gärna ett meddelande till oss!</h2>

      <div className="form-group">
        <label className="form-label" htmlFor="firstName">
          Förnamn
        </label>
        <input
          className="form-control"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          autoComplete="given-name"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="lastName">
          Efternamn
        </label>
        <input
          className="form-control"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          autoComplete="family-name"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">
          E-post
        </label>
        <input
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">
          Meddelande
        </label>
        <textarea
          className="form-control"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="5"
          autoComplete="off"
          required
        />
      </div>

      <button className="form-btn" type="submit">
        Skicka
      </button>

      {errorMessage && (
        <p className="errormessage" style={{ color: 'red' }}>
          {errorMessage}
        </p>
      )}

      {successMessage && (
        <p className="errormessage" style={{ color: 'green' }}>
          {successMessage}
        </p>
      )}
    </form>
  );
};

export default RegForm;
