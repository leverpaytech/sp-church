document.getElementById("donateForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    var amount = document.getElementById('amount').value.trim(); // Fetch amount from input field
  
    // Validate amount (ensure it's a valid number, etc.)
    if (!isValidAmount(amount)) {
      alert("Please enter a valid donation amount.");
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
      });
  });
  
  function isValidAmount(amount) {
    return /^\d+(\.\d{1,2})?$/.test(amount); // Validate amount as a positive number with up to 2 decimal places
  }
  