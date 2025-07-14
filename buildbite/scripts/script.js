document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isActive = item.classList.contains('active');

    // Collapse all
    document.querySelectorAll('.faq-item').forEach((el) => {
      const ans = el.querySelector('.faq-answer');
      el.classList.remove('active');
      ans.style.maxHeight = null;
      ans.style.paddingBottom = null;
    });

    // Expand the clicked one only if it wasn't already open
    if (!isActive) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      answer.style.paddingBottom = '16px';
    }
  });
});
