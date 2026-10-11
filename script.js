const resizeArtwork=()=>{const width=document.querySelector('.container').clientWidth; document.documentElement.style.setProperty('--vehicle-scale',Math.min(width/695,.9));document.documentElement.style.setProperty('--wordmark-scale',width/1200);};
resizeArtwork();window.addEventListener('resize',resizeArtwork);
// Figma Hero Slider component 37:905: Slide 1, Slide 2, Slide 3.
const slides = [
  {
    image: 'image.png',
    alt: 'An electric vehicle with its hood open on a desert road',
    title: 'A New Era of<br>Electric Energy.',
    text: 'Meet our latest battery innovation, designed to bring smarter energy<br class="desktop-break"> technology to the next generation of electric driving.',
    label: 'Discover VOLTRA ONE',
    href: 'product.html'
  },
  {
    image: 'hero-slide-2.png',
    alt: 'VOLTRA V1 electric SUV beside a lake in the mountains',
    title: 'Every road is<br>yours to explore.',
    text: 'Explore the VOLTRA V1, an electric SUV<br class="desktop-break"> with bold design and comfort.',
    label: 'Discover VOLTRA V1',
    href: '#vehicles'
  },
  {
    image: 'hero-slide-3.png',
    alt: 'An electric sedan in front of a traditional Korean stone gate',
    title: 'Progress Powered<br>by Purpose.',
    text: 'VOLTRA ONE reflects our vision of electric mobility where smarter technology and responsible energy use move forward together.',
    label: 'Discover Our Vision',
    href: '#about'
  }
];
let currentSlide = 0;
const hero = document.querySelector('.hero');
const changeSlide = direction => {
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  const slide = slides[currentSlide];
  const image = document.querySelector('#hero-image');
  hero.dataset.slide = String(currentSlide + 1);
  image.src = 'assets/' + slide.image;
  image.alt = slide.alt;
  document.querySelector('.hero-content h1').innerHTML = slide.title;
  document.querySelector('.hero-content p').innerHTML = slide.text;
  const link = document.querySelector('.hero-content a');
  link.textContent = slide.label;
  link.href = slide.href;
};
if (hero) {
  changeSlide(0);
  document.querySelector('.previous').addEventListener('click',()=>changeSlide(-1));
  document.querySelector('.next').addEventListener('click',()=>changeSlide(1));
}
const dialog=document.querySelector('#detail-dialog');
const details={
about:['Driven by Innovation. Powered by Purpose.','At VOLTRA, we believe the future of mobility starts with better energy. We combine smart design and battery technology for a more efficient driving experience.'],
battery:['Meet VOLTRA ONE','Our latest step toward more thoughtful electric mobility. Designed for efficient energy use, with intelligent energy management, integrated thermal control, and reliability at its core.'],
vehicles:['Designed to Move You Forward.','Discover the VOLTRA V1: bold design, intelligent technology, and everyday versatility. Connect with us to learn more about our all-electric vehicles.'],
sustainability:['A Better Way, for Everyone.','From the way we approach electric mobility to the technologies we develop, we’re committed to making thoughtful choices that support a cleaner tomorrow.'],
privacy:['Privacy Policy','This is a VOLTRA concept website. It has no analytics, tracking cookies, account system, or data submission. Contact links open your email application.'],
terms:['Terms of Service','VOLTRA is a concept project. Vehicles and technologies shown here are design concepts. The driving simulation is illustrative and does not represent verified vehicle specifications.'],
social:['Connect with VOLTRA','Official social profiles have not been provided for this concept project.']
};
const openDialog=kind=>{const content=document.querySelector('#dialog-content'); if(kind==='simulation'){content.innerHTML='<h2 id="dialog-title">Explore electric driving.</h2><p>Adjust your journey to explore how driving conditions can affect energy use. This is an illustrative simulation; figures are not VOLTRA vehicle specifications.</p><div class="simulation-controls"><label>Battery charge: <output id="charge-output">80%</output><input id="charge" type="range" min="10" max="100" value="80"></label><label>Driving speed: <output id="speed-output">80 km/h</output><input id="speed" type="range" min="30" max="130" value="80"></label></div><div class="simulation-result"><strong id="range-output"></strong><br>Illustrative driving range</div>';const update=()=>{const charge=Number(content.querySelector('#charge').value),speed=Number(content.querySelector('#speed').value);content.querySelector('#charge-output').textContent=charge+'%';content.querySelector('#speed-output').textContent=speed+' km/h';content.querySelector('#range-output').textContent=Math.round(500*charge/100/(1+Math.max(0,speed-60)*.008))+' km';};content.querySelectorAll('input').forEach(input=>input.addEventListener('input',update));update();}else{const [title,description]=details[kind]||details.about;content.innerHTML='<h2 id="dialog-title">'+title+'</h2><p>'+description+'</p>';if(['battery','vehicles','social'].includes(kind))content.innerHTML+='';}dialog.showModal();};
document.querySelectorAll('[data-dialog]').forEach(button=>button.addEventListener('click',()=>openDialog(button.dataset.dialog)));
document.querySelectorAll('[data-info]').forEach(button=>button.addEventListener('click',()=>openDialog(button.dataset.info)));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
