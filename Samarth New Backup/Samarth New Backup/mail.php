<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Set recipient email address
    $to = 'info@samarthev.com';
    $from = 'mrkhushal45@gmail.com';

    // Set subject with timestamp
    $subject = 'New Contact Form Submission - ' . date('Y/m/d H:i:s');

    // Validate and sanitize form data
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
    $jobProfile = isset($_POST['jobProfile']) ? htmlspecialchars(trim($_POST['jobProfile'])) : '';
    $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';

    // Check if required fields are filled
    if (!empty($email) && !empty($phone) && !empty($name) && !empty($jobProfile) && !empty($message)) {
        // Set boundary for the email
        $boundary = md5(time());

        // Build message content
        $content = "
        <html>
        <head>
            <title>Contact Form Submission</title>
        </head>
        <body>
            <h2>Contact Form Details</h2>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Phone:</strong> $phone</p>
            <p><strong>Job Profile:</strong> $jobProfile</p>
            <p><strong>Message:</strong><br>$message</p>
        </body>
        </html>
        ";

        // Set headers
        $headers = "From: $from\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

        // Initialize email body
        $body = "--$boundary\r\n";
        $body .= "Content-Type: text/html; charset=UTF-8\r\n";
        $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $body .= $content . "\r\n";

        // Check if a file was uploaded
        if (isset($_FILES['pdfFile']) && $_FILES['pdfFile']['error'] === UPLOAD_ERR_OK) {
            // Check if the file is a PDF
            $fileType = $_FILES['pdfFile']['type'];
            if ($fileType == 'application/pdf') {
                // Read the file content
                $fileName = $_FILES['pdfFile']['name'];
                $fileData = file_get_contents($_FILES['pdfFile']['tmp_name']);
                $fileData = chunk_split(base64_encode($fileData));

                // Add file attachment to email
                $body .= "--$boundary\r\n";
                $body .= "Content-Type: application/pdf; name=\"$fileName\"\r\n";
                $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n";
                $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
                $body .= $fileData . "\r\n";
            }
        }

        // End email body with boundary
        $body .= "--$boundary--";

        // Send email using PHP mail function
        mail($to, $subject, $body, $headers);

        // Redirect to a thank-you page or similar
        header('Location: index.php'); // Replace with actual URL
        exit();
    } else {
        // Redirect if fields are not filled
        header('Location: index.php'); // Replace with actual URL
        exit();
    }
}
?>