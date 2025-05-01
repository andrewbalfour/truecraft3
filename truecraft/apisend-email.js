export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { name, email, phone, message } = req.body;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'leads@truecraft.com',
      to: 'your@email.com',
      subject: 'New Roofing Lead',
      html: `<strong>Name:</strong> ${name}<br>
             <strong>Email:</strong> ${email}<br>
             <strong>Phone:</strong> ${phone}<br>
             <strong>Message:</strong><br>${message}`
    })
  });

  if (!response.ok) return res.status(500).send('Email failed');
  return res.status(200).json({ success: true });
}
