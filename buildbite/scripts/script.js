        document.querySelectorAll('.faq-question').forEach((btn) => {
            btn.addEventListener('click', () => {
                const item = btn.parentElement;

                // Collapse others
                document.querySelectorAll('.faq-item').forEach((el) => {
                    if (el !== item) el.classList.remove('active');
                });

                // Toggle current
                item.classList.toggle('active');
            });
        });