const let urunler = JSON.parse(localStorage.getItem("urunler")) || [
  { ad: "Type C USB Kablo", stok: 100, hareketler: [] },
  { ad: "Lightning USB Kablo", stok: 100, hareketler: [] },
  { ad: "Micro USB Kablo", stok: 100, hareketler: [] },
  { ad: "Type C - Type C Kablo", stok: 100, hareketler: [] },
  { ad: "Kulaklık", stok: 100, hareketler: [] },
  { ad: "Lightning - Type C Kablo", stok: 100, hareketler: [] },
  { ad: "Type C Başlık", stok: 100, hareketler: [] },
  { ad: "Lightning Başlık", stok: 100, hareketler: [] },
  { ad: "Micro Başlık", stok: 100, hareketler: [] }
];

let seciliIndex = -1;

function listele() {
  const liste = document.getElementById("urunListesi");
  liste.innerHTML = "";

  let toplam = 0;
  let dusuk = 0;

  urunler.forEach((u, i) => {
    toplam += u.stok;
    if (u.stok <= 10) dusuk++;

    liste.innerHTML += `
      <div class="urun" onclick="urunAc(${i})">
        <div>
          <h3>${u.ad}</h3>
          <div class="stok">Stok : ${u.stok}</div>
        </div>
      </div>
    `;
  });

  document.getElementById("toplamUrun").innerText = urunler.length;
  document.getElementById("toplamStok").innerText = toplam;
  document.getElementById("dusukStok").innerText = dusuk;
}

function urunAc(index) {
  seciliIndex = index;

  document.getElementById("urunAdi").innerText =
    urunler[index].ad;

  document.getElementById("urunStok").innerText =
    urunler[index].stok;

  hareketleriGoster();

  document.getElementById("urunModal").style.display = "block";
}

function kapatModal() {
  document.getElementById("urunModal").style.display = "none";
}

function hareketleriGoster() {

  const liste = document.getElementById("hareketler");
  liste.innerHTML = "";

  urunler[seciliIndex].hareketler.forEach(h => {
    liste.innerHTML += `<li>${h}</li>`;
  });

}

function stokEkle() {

  let adet = prompt("Kaç adet eklenecek?");

  if (!adet) return;

  adet = Number(adet);

  urunler[seciliIndex].stok += adet;
  kaydet();
urunler[seciliIndex].hareketler.unshift(
  urunler[seciliIndex].hareketler.unshift(
    "+" + adet + " stok eklendi"
  );

  urunAc(seciliIndex);
  listele();

}

function satisYap() {

  document.getElementById("satisModal").style.display = "block";

}

function satisiKaydet() {

  const adet =
    Number(document.getElementById("adet").value);

  const musteri =
    document.getElementById("musteriAdi").value;

  if (adet > urunler[seciliIndex].stok) {

    alert("Yeterli stok yok");

    return;

  }

  urunler[seciliIndex].stok -= adet;
kaydet();
  urunler[seciliIndex].hareketler.unshift(
    "-" + adet + " " + musteri
  );

  document.getElementById("satisModal").style.display = "none";

  kapatModal();

  listele();

}

function anaSayfa(){}

function urunlerMenu(){}

function musteriler(){}

function siparisler(){}

function ayarlar(){}

document
.getElementById("arama")
.addEventListener("keyup", function(){

const kelime=this.value.toLowerCase();

const kartlar=document.querySelectorAll(".urun");

kartlar.forEach((k,i)=>{

if(urunler[i].ad.toLowerCase().includes(kelime))
k.style.display="flex";
else
k.style.display="none";

});

});
function kaydet(){

localStorage.setItem(
"urunler",
JSON.stringify(urunler)
);

}
listele();
