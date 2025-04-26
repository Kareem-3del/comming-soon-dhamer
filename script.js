const renderAlert = (state = 'error') => {
  const messages = {
    error: 'Please provide a valid email',
    success: '<b>Thank you for joining Dhmaer!</b> We\'ve sent a confirmation link to your inbox with exclusive early access offers.'
  };

  return `
  <div class="alert" data-state="${state}">
    <p class="alert__content">${messages[state]}</p>
  </div>
  `;
};


const init = () => {
  const emailElement = document.querySelector('#email');
  const formElement = document.querySelector('#form');
  const alertElement = document.querySelector('[role="alert"]');
  const validationRegex = new RegExp(
    emailElement.getAttribute('pattern') || '[^@]+@[^.]+..+',
    'i'
  );
  
  emailElement.removeAttribute('required');
  emailElement.removeAttribute('pattern');
  formElement.setAttribute('novalidate', '');
  
  formElement.addEventListener('submit', evt => {
    evt.preventDefault();

    if (!validationRegex.test(emailElement.value.trim())) {
      alertElement.innerHTML = renderAlert('error');
      emailElement.setAttribute('aria-invalid', 'true');
      return;
    }

    // Save email to database (would be implemented with backend)
    formElement.parentElement.removeChild(formElement);
    alertElement.innerHTML = renderAlert('success');
    
    // Track conversion for Dhmaer
    console.log('New subscriber added to Dhmaer launch list');
  });
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);