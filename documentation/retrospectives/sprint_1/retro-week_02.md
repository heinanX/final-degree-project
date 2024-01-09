# Date: 01-08-2023

# RETROSPECTIVE 2

**Last week's sprint** focused on creating CRUD operations for products, orders, tags, and categories. I also integrated a payment method using Stripe.

**A minor challenge** was integrating the payment method. I had initially estimated it to take 2 days, but it ended up taking 2 1/2 days instead. I initially thought I only had to connect the checkout to Stripe if I used it as a method. However, as I did that, I realized that to fully utilize the Stripe method, I had to create users and products in Stripe too. This required adding middlewares to the product and customer functions.

**I added some functions** because, while writing my code, I realized I had forgotten about an authorization and authentication middleware.

**I made an addition to my project board** by introducing a section titled 'In Need of Review.' This will serve as a space for reminders where I have to edit my code, but it's not critical.

**My miscalculation of integrating the payment method** set me back half a day, but I also lost half a day Friday because of work and an interview for an internship. So going into the new sprint I'm slightly behind schedule. However, I believe that if I try to speed things along by planning ahead [concerning the frontend part] I should be able to catch up.