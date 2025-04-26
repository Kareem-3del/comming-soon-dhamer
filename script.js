const renderAlert = (state = 'error') => {
  const messages = {
    error: 'Please provide a valid email',
    success: '<b>Thank you for joining Dhmaer!</b> We\'ve sent a confirmation to your inbox with exclusive early access offers.'
  };

  return `
  <div class="alert" data-state="${state}">
    <p class="alert__content">${messages[state]}</p>
  </div>
  `;
};


const init = () => {
  const emailElement = document.querySelector('#email');
  const professionalElement = document.querySelector('#professional');
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

    // Prepare email data for submission to info@dhamer.co
    const emailData = {
      email: emailElement.value.trim(),
      professional: professionalElement.checked ? 'Yes' : 'No'
    };
    
    console.log('Sending to info@dhamer.co:', emailData);
    
    // In a real implementation, you would send this data to a server
    // For demonstration purposes, we'll just show the success message

    formElement.parentElement.removeChild(formElement);
    alertElement.innerHTML = renderAlert('success');
    
    // Track conversion for Dhmaer
    console.log('New subscriber added to Dhmaer launch list', emailData);
  });
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);