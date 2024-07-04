document.addEventListener("DOMContentLoaded", function() {
  const customAmount = document.getElementById('customAmount');
  const radioButtons = document.querySelectorAll('input[type="radio"][name="btnradio"]');
  const donateButton = document.querySelector('#donateForm button[type="submit"]');

  // Disable text field when radio button is selected
  radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
      customAmount.disabled = this.checked;
    });
  });

  // Disable radio buttons when text field has input
  customAmount.addEventListener('input', function() {
    radioButtons.forEach(radio => {
      radio.disabled = this.value.trim() !== '';
    });
  });

  // Add spinning effect to donate button on click
  donateButton.addEventListener('click', function(e) {
    e.preventDefault();

    donateButton.classList.add('spinning'); // Add spinning class
    donateButton.disabled = true; // Disable button temporarily

    var amount;

    if (customAmount.value.trim() !== '') {
      amount = customAmount.value.trim();
    } else {
      // Get value of selected radio button
      const selectedRadio = document.querySelector('input[type="radio"][name="btnradio"]:checked');
      if (selectedRadio) {
        amount = selectedRadio.value;
      } else {
        // Handle case where no radio button is selected (if needed)
        amount = '';
      }
    }

    // Validate amount
    if (!isValidAmount(amount)) {
      alert("Please enter a valid donation amount.");
      donateButton.classList.remove('spinning');
      donateButton.disabled = false;
      return;
    }

    // Function to generate a random number
    function generateRandomNumber() {
      return Math.floor(Math.random() * 1000000000); // Adjust the range as needed
    }

    var data = {
      amount: parseFloat(amount), // Convert amount to a number if needed
      merchant_reference: "SCD-" + generateRandomNumber(), // Generate random number for reference
      product: "Donation",
    };

    fetch(
      "https://leverpay-api.azurewebsites.net/api/v1/leverchain/transaction/initialize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + "7hovquqjgmt88kw15jmlhovdcaphilhincljhplr", // Use the live_secret_key
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Handle success
          // Redirect to the URL in the response
          window.location.href = data.data.authorization_url;
        } else {
          // Handle error
          alert("Donation failed: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        donateButton.classList.remove('spinning');
        donateButton.disabled = false;
      });
  });

  function isValidAmount(amount) {
    // Validate amount as a positive number with up to 2 decimal places and at least 1
    return /^\d+(\.\d{1,2})?$/.test(amount) && parseFloat(amount) >= 1;
  }
});
