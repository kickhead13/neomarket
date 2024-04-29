import sys
import smtplib, ssl
import random
import os

port = 465  # For SSL
password = os.environ["EMAIL_PASSWORD"]

# Create a secure SSL context
context = ssl.create_default_context()

with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
	server.login("tremore.games2003@gmail.com", password)
	sender_email = os.environ["EMAIL_ACCOUNT"]
	receiver_email = sys.argv[1]
	message = f"Subject: Your e-mail authentification code is\n\n{sys.argv[2]}"
	server.sendmail(sender_email, receiver_email, message)
    # TODO: Send email here