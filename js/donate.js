document.getElementById("donateForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var amount = document.querySelector('input[name="btnradio"]:checked').value;

  // Function to generate a random number
  function generateRandomNumber() {
    return Math.floor(Math.random() * 1000000000); // Adjust the range as needed
  }

  var data = {
    amount: amount, //10
    merchant_reference: "SCD-" + generateRandomNumber(), // Generate random number for reference
    product: "Donation",
  };

  fetch(
    "https://leverpay-api.azurewebsites.net/api/v1/leverchain/transaction/initialize",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + "7hovquqjgmt88kw15jmlhovdcaphilhincljhplr", //Used the live_secret_key
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
