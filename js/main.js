(function(){
  // barra de progreso
  var bar=document.querySelector('.progress');
  addEventListener('scroll',function(){
    var h=document.documentElement;
    bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
  },{passive:true});

  // notas musicales flotantes
  var box=document.querySelector('.notes'),sym=['♪','♫','♩','♬'];
  for(var i=0;i<14;i++){
    var s=document.createElement('span');
    s.textContent=sym[i%4];
    s.style.left=(Math.random()*100)+'%';
    s.style.fontSize=(18+Math.random()*26)+'px';
    s.style.animationDuration=(6+Math.random()*8)+'s';
    s.style.animationDelay=(-Math.random()*10)+'s';
    box.appendChild(s);
  }

  // aparición al hacer scroll
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
  },{threshold:.15});
  document.querySelectorAll('.reveal').forEach(function(el,i){el.style.transitionDelay=(i%3)*80+'ms';io.observe(el)});

  // mostrar la descripción de cada contenido del perfil
  var profileDialog=document.querySelector('.profile-dialog');
  if(profileDialog){
    var profileTitle=profileDialog.querySelector('#profile-dialog-title');
    var profileDescription=profileDialog.querySelector('.profile-dialog-description');
    document.querySelectorAll('.profile-item[data-description]').forEach(function(item){
      item.addEventListener('click',function(){
        profileTitle.textContent=item.textContent;
        profileDescription.textContent=item.dataset.description;
        profileDialog.showModal();
      });
    });
  }

  // cuenta regresiva (7 de noviembre de 2026)
  var cd=document.getElementById('countdown'),target=new Date(2026,10,7,8,0,0);
  function tick(){
    var d=target-new Date();
    if(d<=0){cd.textContent='¡El taller ya comenzó!';return}
    var days=Math.floor(d/864e5),hrs=Math.floor(d%864e5/36e5);
    cd.textContent='Faltan '+days+' día'+(days===1?'':'s')+' y '+hrs+' h';
  }
  if(cd){tick();setInterval(tick,60000)}

  // selector de horarios
  var pick=document.querySelector('.pick'),preEnroll=document.getElementById('pre-enroll'),selectedSlot=null;
  document.querySelectorAll('.slots button').forEach(function(b){
    b.addEventListener('click',function(){
      document.querySelectorAll('.slots button.sel').forEach(function(x){x.classList.remove('sel')});
      b.classList.add('sel');
      selectedSlot={turno:b.dataset.turno,hora:b.textContent.trim()};
      preEnroll.disabled=false;
      pick.textContent='Horario elegido: '+b.dataset.turno+' · '+b.textContent+' (sábados)';
    });
  });
  if(preEnroll)preEnroll.addEventListener('click',function(){
    if(!selectedSlot)return;
    var message='Hola, quiero preinscribirme en el Taller formativo de Música Popular. Mi horario de interés es '+selectedSlot.turno+', '+selectedSlot.hora+' (sábados).';
    window.open('https://wa.me/50588818170?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');
  });

  // copiar dirección
  var dir=document.getElementById('dir'),toast=document.querySelector('.toast');
  if(dir)dir.addEventListener('click',function(){
    var t=dir.dataset.text;
    (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){msg('Dirección copiada')},function(){msg('No se pudo copiar')});
  });
  function msg(t){if(!toast)return;toast.textContent=t;toast.classList.add('show');setTimeout(function(){toast.classList.remove('show')},2000)}

  // modo claro/oscuro
  var btn=document.querySelector('.theme-btn'),root=document.documentElement;
  btn.addEventListener('click',function(){
    var dark=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
    root.dataset.theme=dark?'light':'dark';
    btn.textContent=dark?'🌙':'☀️';
  });

  // efecto parallax suave en la portada
  var figs=document.querySelectorAll('.hero figure');
  figs.forEach(function(f){
    f.addEventListener('mousemove',function(e){
      var r=f.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      f.querySelector('img').style.transform='scale(1.1) translate('+(-x*14)+'px,'+(-y*10)+'px)';
    });
    f.addEventListener('mouseleave',function(){f.querySelector('img').style.transform=''});
  });
})();
