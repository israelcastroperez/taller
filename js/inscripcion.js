(function(){
  var pick=document.querySelector('.pick');
  var preEnroll=document.getElementById('pre-enroll');
  var instrumentInputs=document.querySelectorAll('input[name="instrumento"]');
  var nameInput=document.querySelector('input[name="nombre"]');
  var commentsInput=document.querySelector('textarea[name="comentarios"]');
  var selectedSlot=null;

  function updateButton(){
    preEnroll.disabled=!selectedSlot||!Array.from(instrumentInputs).some(function(input){return input.checked});
  }

  document.querySelectorAll('.slots button').forEach(function(button){
    button.addEventListener('click',function(){
      document.querySelectorAll('.slots button.sel').forEach(function(selected){selected.classList.remove('sel')});
      button.classList.add('sel');
      selectedSlot={turno:button.dataset.turno,hora:button.textContent.trim()};
      pick.textContent='Horario elegido: '+selectedSlot.turno+' · '+selectedSlot.hora+' (sábados)';
      updateButton();
    });
  });

  instrumentInputs.forEach(function(input){input.addEventListener('change',updateButton)});
  preEnroll.addEventListener('click',function(){
    var instruments=Array.from(instrumentInputs).filter(function(input){return input.checked}).map(function(input){return input.value});
    if(!selectedSlot||!instruments.length)return;
    var message='Hola, quiero inscribirme en el Taller formativo de Música Popular. Me interesa estudiar: '+instruments.join(', ')+'. Mi horario de interés es '+selectedSlot.turno+', '+selectedSlot.hora+' (sábados).';
    if(nameInput.value.trim())message+=' Mi nombre es '+nameInput.value.trim()+'.';
    if(commentsInput.value.trim())message+=' Comentarios: '+commentsInput.value.trim();
    window.open('https://wa.me/50588818170?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');
  });
})();
