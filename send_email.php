<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Compose email
    $to = 'oludarepatrick@gmail.com';
    $headers = "From: $name <$email>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html;charset=UTF-8\r\n";
    $email_body = "
        <html>
        <head>
            <title>$subject</title>
        </head>
        <body>
            <p><b>Name:</b> $name</p>
            <p><b>Email:</b> $email</p>
            <p><b>Subject:</b> $subject</p>
            <p><b>Message:</b><br>$message</p>
        </body>
        </html>
    ";

    // Send email
    if (mail($to, $subject, $email_body, $headers)) {
        echo '<script>alert("Your message has been sent successfully."); window.location.href = "contact_form.php";</script>';
    } else {
        echo '<script>alert("Failed to send your message. Please try again later."); window.location.href = "contact_form.php";</script>';
    }
}
?>
