 document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', () => {
                const faqItem = button.parentElement;
                const answer = button.nextElementSibling;
                const icon = button.querySelector('.icon');
                const isOpen = faqItem.classList.contains('faq-active');

                // SVGs
                const plusSVG = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12H18" stroke="#020202" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 18V6" stroke="#020202" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
                const minusSVG = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12H18" stroke="#020202" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;

                // Close all
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('faq-active');
                    item.querySelector('.faq-answer').style.maxHeight = null;
                    item.querySelector('.icon').innerHTML = plusSVG;
                });

                // Open if not already open
                if (!isOpen) {
                    faqItem.classList.add('faq-active');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    icon.innerHTML = minusSVG;
                }
            });
        });