document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        company: document.getElementById("company").value
    };

    try {
        const response = await fetch('https://form-handler-markhughesqa.netlify.app/.netlify/functions/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const responseData = await response.json(); // Parse JSON response

        if (response.ok) {
            document.getElementById("contact-form").reset(); // Clear form fields
            document.getElementById("form-message").innerText = responseData.message; // Display success message
            setTimeout(() => {
                document.getElementById("form-message").innerText = ''; // Clear success message after 5 seconds
            }, 5000);
        } else {
            document.getElementById("form-message").innerText = "Error sending message. Please try again."; // Display error message
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("form-message").innerText = "Error sending message. Please try again."; // Display error message
    }
});
