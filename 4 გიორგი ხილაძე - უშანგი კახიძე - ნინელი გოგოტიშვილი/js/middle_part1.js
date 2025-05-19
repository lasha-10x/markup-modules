
      document.addEventListener('DOMContentLoaded', function() {  
  const visaCards = document.querySelectorAll('.visa-card');  
  let currentCard = 0;  

  visaCards[currentCard].classList.add('active');  

  function nextSlide() {  
      visaCards[currentCard].classList.remove('active');  

     
      currentCard = (currentCard + 1) % visaCards.length;  

   
      visaCards[currentCard].classList.add('active');  
  }  


  setInterval(nextSlide, 3500);  
});
