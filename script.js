const burger=document.getElementById('burger');
const nav=document.getElementById('mainNav');
burger.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target);}})
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const progressBar=document.getElementById('progressBar');
window.addEventListener('scroll',()=>{
  const h=document.documentElement;
  progressBar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
});

const cursor=document.getElementById('cursorGlow');
window.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';});

document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item=btn.parentElement;
    document.querySelectorAll('.faq-item').forEach(i=>{if(i!==item)i.classList.remove('active')});
    item.classList.toggle('active');
  });
});

const lightbox=document.getElementById('lightbox');
const lightboxContent=document.getElementById('lightboxContent');
document.querySelectorAll('.gallery-item').forEach(btn=>{
  btn.addEventListener('click',()=>{
    lightboxContent.innerHTML='<img src="'+btn.dataset.src+'">';
    lightbox.classList.add('active');
  });
});
document.getElementById('lightboxClose').addEventListener('click',()=>lightbox.classList.remove('active'));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.classList.remove('active')});

document.getElementById('year').textContent=new Date().getFullYear();



(() => {
    const header = document.getElementById("siteHeader");
    const burger = document.getElementById("burger");
    const mainNav = document.getElementById("mainNav");

    if (!header || !burger || !mainNav) return;

    function setMenu(open) {
        mainNav.classList.toggle("is-open", open);
        burger.setAttribute("aria-expanded", String(open));
        burger.setAttribute(
            "aria-label",
            open ? "إغلاق القائمة" : "فتح القائمة"
        );
    }

    burger.addEventListener("click", () => {
        const isOpen = burger.getAttribute("aria-expanded") === "true";
        setMenu(!isOpen);
    });

    // إغلاق القائمة بعد اختيار أحد الروابط
    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => setMenu(false));
    });

    // إغلاق القائمة عند الضغط خارج الهيدر
    document.addEventListener("click", event => {
        if (!header.contains(event.target)) {
            setMenu(false);
        }
    });

    // إغلاق القائمة بزر Escape
    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            burger.getAttribute("aria-expanded") === "true"
        ) {
            setMenu(false);
            burger.focus();
        }
    });

    // إعادة ضبط القائمة عند الانتقال لحجم الكمبيوتر
    const mobileQuery = window.matchMedia("(max-width: 900px)");

    mobileQuery.addEventListener("change", () => {
        setMenu(false);
    });
})();
