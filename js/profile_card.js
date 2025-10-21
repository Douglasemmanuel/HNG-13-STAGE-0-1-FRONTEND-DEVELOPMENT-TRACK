

setInterval(()=>{
    document.querySelector('[data-testid="test-user-time"]').textContent = Date.now();
}, 1000) ;


function showCurrentTime() {
  const clock = document.querySelector('[data-testid="test-user-time"]');
  const now = new Date();
  const timeString = now.toLocaleTimeString(); // e.g. "10:35:22 AM"
  clock.textContent = timeString;
}

// Run once at load
showCurrentTime();

// Update every second
setInterval(showCurrentTime, 1000);



// the Contact me  function


