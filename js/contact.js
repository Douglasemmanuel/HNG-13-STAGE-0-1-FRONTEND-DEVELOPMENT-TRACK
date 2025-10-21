const form = document.getElementById('form');

function setError(containerDiv, message) {
  const errorDiv = containerDiv.querySelector('[data-testid="test-contact-error"]') 
                || containerDiv.querySelector('[data-testid="test-contact-error-email"]');
  const successDiv = containerDiv.querySelector('[data-testid="test-contact-success"]');
  
  errorDiv.textContent = message;
  successDiv.textContent = '';

  containerDiv.classList.add('error');
  containerDiv.classList.remove('success');
}

function setSuccess(containerDiv, message = '') {
  const errorDiv = containerDiv.querySelector('[data-testid="test-contact-error"]') 
                || containerDiv.querySelector('[data-testid="test-contact-error-email"]');
  const successDiv = containerDiv.querySelector('[data-testid="test-contact-success"]');

  errorDiv.textContent = '';
  successDiv.textContent = message;

  containerDiv.classList.remove('error');
  containerDiv.classList.add('success');
}

// ✅ Email validation regex
const isValidEmail = email => {
  const res = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return res.test(String(email).toLowerCase());
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Grab all fields
  const fullnameDiv = document.querySelector('[data-testid="test-contact-name"]');
  const emailDiv = document.querySelector('[data-testid="test-contact-email"]');
  const subjectDiv = document.querySelector('[data-testid="test-contact-subject"]');
  const messageDiv = document.querySelector('[data-testid="test-contact-message"]');

  const fullname = document.getElementById('fullname').value.trim();
  const emailInput = document.getElementById('email');
  console.log('Before removal, required attribute present? ', emailInput.hasAttribute('required'));
  const email = emailInput.value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // ✅ Remove "required" attribute dynamically
  emailInput.removeAttribute('required');
  console.log('After removal, required attribute present? ', emailInput.hasAttribute('required'));

  let isValid = true;

  // Validate Fullname
  if (fullname === '') {
    setError(fullnameDiv, 'Fullname is required');
    isValid = false;
  } else {
    setSuccess(fullnameDiv, 'Looks good!');
  }

  // Validate Email
  if (email === '') {
    setError(emailDiv, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email)) {  // ✅ Fixed check
    setError(emailDiv, 'Enter a valid email');
    isValid = false;
  } else {
    setSuccess(emailDiv, 'Valid email!');
  }

  // Validate Subject
  if (subject === '') {
    setError(subjectDiv, 'Subject is required');
    isValid = false;
  } else {
    setSuccess(subjectDiv, 'All set!');
  }

  // Validate Message
  if (message === '') {
    setError(messageDiv, 'Message cannot be empty');
    isValid = false;
  } else if (message.length < 10) {
    setError(messageDiv, 'Message must be at least 10 characters');
    isValid = false;
  } else {
    setSuccess(messageDiv, 'Message ready!');
  }

  // If all valid
  if (isValid) {
    alert('Form submitted successfully!');
    form.reset();
    [fullnameDiv, emailDiv, subjectDiv, messageDiv].forEach(div => {
      div.classList.remove('error', 'success');
    });
  }
});
