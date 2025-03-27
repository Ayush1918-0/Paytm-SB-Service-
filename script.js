let currentSlide = 1;
const totalSlides = 4;

function showSlide(slideIndex) {
    for (let i = 1; i <= totalSlides; i++) {
        document.getElementById(`slide${i}`).classList.add('hidden');
    }
    document.getElementById(`slide${slideIndex}`).classList.remove('hidden');
}

function nextSlide() {
    currentSlide = (currentSlide % totalSlides) + 1;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 2 + totalSlides) % totalSlides + 1;
    showSlide(currentSlide);
}

const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.remove('hidden');
  } else {
    backToTopButton.classList.add('hidden');
  }
});
backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);

    const buttons = document.querySelectorAll('.service-button');
    const form = document.getElementById('replaceSoundboxForm');
    const heading = form.querySelector('h3');
    const nextButton = document.getElementById('nextButton');
    const sendEmailButton = document.getElementById('sendEmailButton');
    const emailInput = document.getElementById('email');
    const imeiInput = document.getElementById('imei');
    const popup = document.getElementById('popup');
    let activeSession = ''; // Track the active session

    // Add event listeners for service buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            activeSession = button.textContent.trim(); // Set the active session based on the button clicked
            heading.textContent = activeSession; // Update the form heading
            form.classList.remove('hidden'); // Show the form
        });
    });

    nextButton.addEventListener('click', () => {
        // Validate the form inputs
        const email = emailInput.value.trim();
        const imei = imeiInput.value.trim();

        if (!email || !imei) {
            alert('Please fill in all the required fields (Email and IMEI) before proceeding.');
            return;
        }

        // Show the popup
        popup.classList.remove('hidden');
        popup.style.display = 'flex';

        // Hide the popup after 3 seconds
        setTimeout(() => {
            popup.classList.add('hidden');
            popup.style.display = 'none';

            // Show the appropriate message or button based on the active session
            if (activeSession === 'Replace Soundbox') {
                showMessage(
                    'The available replacement charge of the merchant is 299 Rs. This amount will be collected by the Paytm agent.'
                );
            } else if (activeSession === 'Disclose Soundbox') {
                showDiscloseMessageAndButton(email, imei);
            } else if (activeSession === 'Lifetime Plans') {
                showLifetimePlanBox();
            }
        }, 3000);
    });

    function showMessage(messageText) {
        // Check if the message already exists to avoid duplicates
        if (!document.querySelector('.message-box')) {
            // Create the message box
            const messageBox = document.createElement('div');
            messageBox.className = 'message-box';
            messageBox.textContent = messageText;

            // Append the message box below the form
            form.appendChild(messageBox);
        } else {
            // Update the existing message box with the new message
            const messageBox = document.querySelector('.message-box');
            messageBox.textContent = messageText;
        }
    }

    function showDiscloseMessageAndButton(email, imei) {
        // Show the message box
        showMessage(
            'The permanent discloser charge of the Paytm Soundbox for this merchant is 399 Rs. The payment will be collected by the Paytm agent.'
        );

        // Ensure the button is only added once
        if (!document.querySelector('.disclose-email-button')) {
            // Create the button
            const emailButton = document.createElement('button');
            emailButton.className = 'custom-button disclose-email-button mt-4';
            emailButton.textContent = 'Send Discloser Email';

            // Append the button below the message box
            form.appendChild(emailButton);

            // Add event listener for the button
            emailButton.addEventListener('click', () => {
                const subject = encodeURIComponent('Paytm Soundbox Discloser');
                const body = encodeURIComponent(
                    `Dear Merchant,\n\nWe regret to inform you that your Paytm Soundbox with IMEI No. ${imei} will be deactivated within the next 6 working hours as per your request.\n\nFor any further assistance, please contact our customer support team at 0120-4440440.\n\nThank you for your understanding.\n\nBest regards,\nPaytm Services`
                );
            
                // Open Proton Mail compose window with pre-filled details
                const protonMailUrl = `https://mail.proton.me/u/0/inbox?compose&to=${email}&subject=${subject}&body=${body}`;
                window.open(protonMailUrl, '_blank');
            });
        }
    }

    function showLifetimePlanBox() {
        // Check if the lifetime plan box already exists to avoid duplicates
        if (!document.querySelector('.lifetime-plan-box')) {
            // Create the lifetime plan box
            const lifetimeBox = document.createElement('div');
            lifetimeBox.className = 'lifetime-plan-box';
            lifetimeBox.innerHTML = `
                <p class="text-lg font-semibold mb-4">
                    The lifetime plan for the Paytm Soundbox for this merchant is 499 Rs. The payment will be collected by the Paytm agent.
                </p>
                <button id="applyOfferButton" class="custom-button">Apply Offer</button>
                <div id="promoCodeSection" class="hidden mt-4">
                    <input type="text" id="promoCodeInput" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter Promo Code" />
                    <button id="submitPromoCode" class="custom-button mt-2">Submit</button>
                    <p id="promoMessage" class="text-green-600 font-medium mt-2 hidden"></p>
                </div>
            `;
    
            // Append the lifetime plan box below the form
            const form = document.getElementById('replaceSoundboxForm');
            form.appendChild(lifetimeBox);
    
            // Add event listener for the "Apply Offer" button
            const applyOfferButton = document.getElementById('applyOfferButton');
            applyOfferButton.addEventListener('click', () => {
                const promoCodeSection = document.getElementById('promoCodeSection');
                promoCodeSection.classList.remove('hidden'); // Show the promo code input
            });
    
            // Add event listener for the "Submit" button
            const submitPromoCode = document.getElementById('submitPromoCode');
            submitPromoCode.addEventListener('click', () => {
                const promoCodeInput = document.getElementById('promoCodeInput').value.trim();
                const promoMessage = document.getElementById('promoMessage');
    
                if (promoCodeInput === 'payayu') {
                    promoMessage.textContent = 'Promo code applied! You get 100 Rs off. Final charge: 399 Rs.';
                    promoMessage.classList.remove('hidden');
                } else {
                    promoMessage.textContent = 'Invalid promo code. Final charge: 499 Rs.';
                    promoMessage.classList.remove('hidden');
                }
            });
    
            // Add the "Send Updation Email" button
            const emailButton = document.createElement('button');
            emailButton.className = 'custom-button mt-4';
            emailButton.textContent = 'Send Updation Email';
    
            // Append the button below the promo code section
            lifetimeBox.appendChild(emailButton);
    
            // Add event listener for the "Send Updation Email" button
            emailButton.addEventListener('click', () => {
                const email = document.getElementById('email').value.trim();
                const imei = document.getElementById('imei').value.trim();
            
                if (!email || !imei) {
                    alert('Please fill in all the required fields (Email and IMEI) before sending the email.');
                    return;
                }
            
                const subject = encodeURIComponent('Soundbox Lifetime Updation Plan');
                const body = encodeURIComponent(
                    `Dear Merchant,\n\nWelcome to the Lifetime Plan of Paytm Soundbox! Now you can enjoy 0 rental charges for a lifetime.\n\nYour Soundbox IMEI No. is ${imei}.\n\nFor any further assistance, please contact our customer support team at 0120-4440440.\n\nThank you for choosing Paytm Soundbox.\n\nBest regards,\nPaytm Services`
                );
            
                // Open Proton Mail compose window with pre-filled details
                const protonMailUrl = `https://mail.proton.me/u/0/inbox?compose&to=${email}&subject=${subject}&body=${body}`;
                window.open(protonMailUrl, '_blank');
            });
        }
    }
});