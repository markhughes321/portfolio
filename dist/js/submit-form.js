document.getElementById("contact-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
  };

  try {
      const response = await fetch('https://form-handler-markhughesqa.netlify.app/.netlify/functions/submit-form', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
      });

      if (response.ok) {
          alert("Message sent successfully!");
      } else {
          alert("Error sending message. Please try again.");
      }
  } catch (error) {
      console.error("Error:", error);
      alert("Error sending message. Please try again.");
  }
});
