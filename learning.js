/* Lapisan belajar CSS: semua metadata topik berada di LEARNING_DATA. */
(function () {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };
  const main = $('main');
  const originalSections = main ? $$(':scope > section', main) : [];
  const dependencySection = originalSections[0];
  if (!main || !dependencySection) return;

  const topic = (property, level, target, requires, dependsOn, changes, related, why, effect, commonMistake, whenToUse, browserNote = '') => ({
    property,
    level,
    requires,
    dependsOn,
    changes,
    related,
    why,
    effect,
    commonMistake,
    whenToUse,
    target,
    browserNote
  });

  const mentorText = (text) => String(text)
    .replace(/containing block/gi, 'kotak acuan posisi')
    .replace(/stacking context/gi, 'kelompok lapisan')
    .replace(/stacking/gi, 'urutan depan-belakang')
    .replace(/ancestor terdekat yang sesuai/gi, 'elemen induk terdekat yang bisa jadi patokan')
    .replace(/ancestor/gi, 'elemen induk')
    .replace(/cross[- ]axis/gi, 'sumbu silang')
    .replace(/main[- ]axis/gi, 'sumbu utama')
    .replace(/flex formatting context/gi, 'mode layout Flexbox')
    .replace(/grid formatting context/gi, 'mode layout Grid')
    .replace(/grid context/gi, 'mode Grid')
    .replace(/flex context/gi, 'mode Flexbox')
    .replace(/formatting context/gi, 'mode layout')
    .replace(/flex container/gi, 'wadah Flexbox')
    .replace(/grid container/gi, 'wadah Grid')
    .replace(/flex item/gi, 'item Flexbox')
    .replace(/grid item/gi, 'item Grid')
    .replace(/flex line/gi, 'baris Flexbox')
    .replace(/grid lines/gi, 'garis pembatas kolom/baris Grid')
    .replace(/grid line/gi, 'garis pembatas Grid')
    .replace(/grid tracks/gi, 'jalur kolom/baris Grid')
    .replace(/tracks/gi, 'jalur kolom/baris')
    .replace(/track/gi, 'jalur')
    .replace(/line box/gi, 'baris teks')
    .replace(/inline-axis/gi, 'arah mendatar (inline)')
    .replace(/block-axis/gi, 'arah tegak (block)')
    .replace(/writing mode/gi, 'arah tulisan')
    .replace(/subtree/gi, 'bagian anak elemen')
    .replace(/declaration/gi, 'aturan CSS')
    .replace(/cascade/gi, 'urutan penentuan aturan CSS')
    .replace(/shorthand/gi, 'cara singkat menulis beberapa nilai')
    .replace(/constraint/gi, 'batas ukuran')
    .replace(/intrinsic/gi, 'alami dari isi')
    .replace(/fallback/gi, 'nilai cadangan')
    .replace(/progressive enhancement/gi, 'fitur tambahan bertahap')
    .replace(/\bprerequisites?\b/gi, 'syarat awal')
    .replace(/\beffects?\b/gi, 'efek')
    .replace(/viewport/gi, 'area layar browser')
    .replace(/layout komponen reusable/gi, 'tata letak komponen yang dipakai ulang')
    .replace(/block container/gi, 'wadah block')
    .replace(/\bcontainer\b/gi, (word, offset, source) => {
      const next = source.slice(offset + word.length).trimStart().toLowerCase();
      return source[offset - 1] === '@' || next.startsWith('queries') || next.startsWith('-') ? word : 'wadah';
    })
    .replace(/\bparent\b/gi, 'elemen induk')
    .replace(/\bchild\b/gi, 'elemen anak')
    .replace(/\blayout\b/gi, 'tata letak')
    .replace(/positioned/gi, 'yang diberi position')
    .replace(/semantic/gi, 'makna')
    .replace(/semantik/gi, 'makna')
    .replace(/mempengaruhi/gi, 'mengubah')
    .replace(/\bproperty\b/gi, 'properti')
    .replace(/CSS properti/gi, 'properti CSS')
    .replace(/button properti/gi, 'properti tombol')
    .replace(/context/gi, 'konteks');

  const LEARNING_DATA = [
    topic('dependency map', 'fundamental', { section: 0 }, ['Elemen HTML yang mau ditata'], ['Pilih model layout dan properti yang sesuai'], ['Urutan belajar dari syarat ke hasil'], ['display', 'cascade'], 'Tidak semua properti bekerja pada setiap elemen. Beberapa perlu mode tertentu lebih dulu.', 'Peta ini menunjukkan apa yang perlu disiapkan sebelum sebuah properti memberi efek.', 'Langsung memakai properti tanpa mengecek syaratnya.', 'Buka peta ini saat bingung harus mempelajari apa lebih dulu.'),
    topic('selector & cascade', 'fundamental', { section: 1 }, ['Elemen HTML yang mau diubah'], ['Selector cocok dengan elemen dan nilai CSS valid'], ['Elemen yang dipilih dan aturan yang dipakai'], ['specificity', 'inheritance'], 'Selector menunjuk elemen. Kalau beberapa aturan cocok, browser memilih aturan yang dipakai.', 'Misalnya, jika dua aturan memberi warna berbeda pada tombol yang sama, browser memilih satu warna untuk ditampilkan.', 'Mengira aturan yang ditulis paling akhir selalu menang. Selector yang lebih kuat atau sumber aturan juga bisa menentukan hasil.', 'Gunakan untuk menjawab: “Kenapa elemen ini memakai warna atau ukuran tersebut?”'),
    topic('box model', 'fundamental', { section: 2 }, ['Elemen yang tampil di halaman'], ['Ukuran isi, ruang di dalam, garis tepi, dan jarak luar'], ['Ukuran total dan jarak di sekitar elemen'], ['width', 'height', 'margin', 'padding'], 'Ukuran elemen bukan hanya isi. Ruang di dalam dan garis tepinya ikut menambah ukuran.', 'width dan height menentukan ukuran isi atau kotak, tergantung nilai box-sizing.', 'Mengira width selalu sama dengan lebar total yang terlihat.', 'Gunakan saat elemen tampak lebih besar atau jaraknya berbeda dari yang diharapkan.'),
    topic('display', 'layout', { section: 3, heading: 'flex' }, ['Elemen HTML'], ['Pilih cara elemen disusun: block, inline, flex, atau grid'], ['Cara elemen tampil dan cara anak-anaknya disusun'], ['flex-direction', 'grid-template-columns'], 'display memberi tahu browser bagaimana sebuah elemen ikut dalam susunan halaman.', 'Contohnya, display: flex menyusun anak dalam satu arah; display: grid menyusunnya dalam baris dan kolom.', 'Mengatur properti Flexbox atau Grid sebelum memilih display yang sesuai.', 'Pilih display saat ingin menentukan cara anak-anak suatu elemen disusun.'),
    topic('display: flex', 'flexbox', { section: 3, heading: 'flex' }, ['Elemen yang akan menjadi pembungkus'], ['Tambahkan display: flex'], ['Anak langsung mulai mengikuti aturan Flexbox'], ['flex-direction', 'flex-wrap'], 'Properti Flexbox bekerja setelah pembungkus diberi display: flex.', 'Anak langsung tersusun sebagai item Flexbox dan bisa diatur arahnya, jaraknya, atau posisinya.', 'Mengatur flex-wrap atau justify-content pada elemen yang belum memakai display: flex.', 'Aktifkan ini dulu sebelum mencoba properti Flexbox lainnya.'),
    topic('display: grid', 'grid', { section: 3, heading: 'grid' }, ['Elemen yang akan menjadi pembungkus'], ['Tambahkan display: grid'], ['Anak langsung mulai mengikuti aturan Grid'], ['grid-template-columns', 'grid-template-rows'], 'Properti Grid bekerja pada pembungkus yang memakai display: grid.', 'Anak langsung menjadi item Grid yang bisa ditempatkan pada baris dan kolom.', 'Mengatur grid-column atau grid-row sebelum pembungkus memakai display: grid.', 'Aktifkan ini dulu sebelum mengatur baris, kolom, dan posisi item Grid.'),
    topic('block', 'layout', { section: 3, heading: 'block' }, ['Elemen HTML'], ['display: block'], ['Elemen mulai di baris baru dan mengambil ruang yang tersedia'], ['inline', 'inline-block'], 'Elemen block biasanya mulai pada baris baru.', 'Elemen block seperti bagian atau paragraf tersusun satu di bawah yang lain.', 'Mengira semua elemen block selalu selebar layar; lebar tetap mengikuti ruang dan aturan yang diberikan.', 'Gunakan untuk bagian halaman yang ingin ditampilkan sebagai blok tersendiri.'),
    topic('inline', 'layout', { section: 3, heading: 'inline' }, ['Elemen HTML'], ['display: inline'], ['Elemen mengalir bersama teks'], ['block', 'inline-block'], 'Elemen inline tetap berada di dalam baris teks, seperti kata di dalam kalimat.', 'Teks dan elemen inline mengalir bersama. width dan height biasanya tidak mengatur ukurannya seperti pada block.', 'Mengharapkan width dan height bekerja sama seperti pada elemen block.', 'Gunakan untuk bagian kecil di dalam teks, seperti kata yang diberi warna.'),
    topic('color', 'fundamental', { section: 4 }, ['Elemen yang terlihat di halaman'], ['Nilai warna CSS yang valid'], ['Warna teks, latar, dan transparansi'], ['background', 'currentColor'], 'Properti seperti color dan background-color menerima nilai warna.', 'Warna yang dipilih langsung terlihat pada teks atau latar elemen.', 'opacity membuat seluruh elemen tembus pandang, sedangkan warna dengan alpha hanya membuat warna itu tembus pandang.', 'Gunakan warna untuk membedakan bagian, memberi penekanan, atau menunjukkan status.'),
    topic('typography & text', 'typography', { section: 5, heading: 'white-space' }, ['Teks di dalam elemen'], ['Ukuran huruf, jarak baris, dan ruang yang tersedia'], ['Bentuk teks, jarak, dan cara teks pindah atau terpotong'], ['font-size', 'line-height', 'text-overflow'], 'Aturan teks mengubah cara huruf terlihat dan mengisi baris.', 'Teks bisa berubah ukuran, jarak antarbaris, dan cara membungkusnya.', 'Memakai text-overflow saja tanpa mengatur white-space dan overflow.', 'Gunakan untuk membuat teks mudah dibaca dan menangani label yang terlalu panjang.'),
    topic('CSS units & sizing', 'responsive', { section: 6, heading: 'aspect-ratio' }, ['Elemen yang ingin diukur'], ['Pilih satuan ukuran dan batas minimum/maksimum'], ['Lebar, tinggi, dan perbandingan ukuran elemen'], ['minmax()', 'clamp()'], 'Satuan seperti %, rem, dan vw menghitung ukuran dari acuan yang berbeda.', 'Ukuran elemen mengikuti nilai yang ditulis dan bisa dibatasi dengan min-width, max-width, atau clamp().', 'Mengira %, rem, dan vw selalu dihitung dari ukuran yang sama.', 'Gunakan satuan yang sesuai agar ukuran tetap pas di layar dan wadah yang berbeda.'),
    topic('border & outline', 'layout', { section: 7, heading: 'outline' }, ['Elemen yang ingin diberi garis tepi'], ['Pilih warna, bentuk, dan ketebalan garis'], ['Garis di sekeliling elemen'], ['box-shadow', 'focus-visible'], 'border ikut menambah ukuran kotak; outline digambar di luarnya.', 'border memberi batas tetap, sedangkan outline bisa menonjolkan elemen tanpa menggeser isi di sekitarnya.', 'Menggunakan outline saat ingin garis ikut dihitung sebagai bagian ukuran elemen.', 'Gunakan border sebagai tepi kotak dan outline untuk menandai fokus keyboard.'),
    topic('background & shadow', 'advanced', { section: 8, heading: 'background-size: cover' }, ['elemen dengan area gambar'], ['ukuran area dan image source'], ['lapisan visual di belakang konten'], ['background-position', 'border-radius'], 'Background dirender dalam area elemen dan dapat memiliki beberapa layer.', 'Gambar atau warna mengisi latar sesuai ukuran/posisi.', 'Mengira cover selalu menampilkan seluruh gambar; sebagian dapat ter-crop.', 'Gunakan untuk dekorasi dan tekstur yang tidak membawa makna konten utama.'),
    topic('overflow', 'layout', { section: 9 }, ['Elemen yang berisi konten'], ['Isi lebih besar dari ruang yang disediakan'], ['Isi yang meluber tetap terlihat, terpotong, atau bisa di-scroll'], ['text-overflow', 'scroll'], 'Masalah overflow muncul saat isi tidak muat di dalam kotaknya.', 'Dengan overflow, kamu bisa membiarkan isi terlihat, memotongnya, atau menyediakan scroll.', 'Mengira hidden dan clip selalu punya perilaku scroll yang sama.', 'Gunakan untuk membatasi isi dalam komponen atau memberi area scroll.'),
    topic('float & clear', 'layout', { section: 10 }, ['block element dan konten sekitarnya'], ['float membentuk aliran di sekitarnya'], ['aliran teks dan posisi elemen clear'], ['display', 'flow-root'], 'float mengeluarkan kotak dari aliran normal untuk aliran sekeliling.', 'Teks dapat mengalir di samping elemen; clear melewati float.', 'Menggunakan float sebagai pilihan default untuk layout aplikasi modern.', 'Gunakan terutama untuk teks mengalir di sekitar ilustrasi; pertimbangkan Flexbox/Grid untuk layout.'),
    topic('position', 'position', { section: 11, heading: 'absolute' }, ['Elemen yang ingin diposisikan'], ['Pilih position dan tentukan elemen yang menjadi patokan'], ['Letak elemen di halaman dan hubungannya dengan elemen lain'], ['inset', 'z-index', 'transform'], 'position menentukan apakah elemen tetap di tempat, bisa digeser, atau ditempatkan terhadap kotak acuan.', 'Dengan position: absolute, elemen keluar dari susunan biasa dan diletakkan relatif ke kotak acuan.', 'Mengira position: absolute selalu memakai elemen pembungkus yang tepat di luarnya sebagai patokan.', 'Gunakan untuk badge, label, atau overlay yang perlu menempel pada bagian tertentu.'),
    topic('flex-direction', 'flexbox', { section: 12, heading: 'row' }, ['display: flex'], ['Pilih row atau column'], ['Arah susunan item dan arah sumbu utama'], ['justify-content', 'align-items'], 'flex-direction menentukan item disusun mendatar atau menurun.', 'row menyusun item dari kiri ke kanan; column menyusunnya dari atas ke bawah pada halaman ini.', 'Mengira justify-content selalu mengatur arah mendatar. Arah ikut berubah saat flex-direction berubah.', 'Pilih ini dulu untuk menentukan arah susunan item Flexbox.'),
    topic('justify-content (Flexbox)', 'flexbox', { section: 13, heading: 'center' }, ['display: flex'], ['Ada ruang kosong di arah susunan item'], ['Posisi atau jarak antaritem sepanjang arah susunan'], ['flex-direction', 'gap'], 'justify-content mengatur ruang di sepanjang arah yang ditentukan flex-direction.', 'Item bisa dirapatkan, dipusatkan, atau diberi jarak di antara satu sama lain.', 'Mengharapkan item berpindah saat sudah memenuhi seluruh ruang.', 'Gunakan untuk mengatur posisi atau jarak antaritem Flexbox.'),
    topic('align-items (Flexbox)', 'flexbox', { section: 14, heading: 'center' }, ['display: flex'], ['Item punya ruang untuk bergerak melintang terhadap arah susunan'], ['Posisi item di dalam baris atau kolom Flexbox'], ['align-self', 'align-content'], 'align-items mengatur posisi item melintang terhadap arah susunannya.', 'Item bisa dirapatkan ke awal, tengah, atau akhir; nilai stretch bisa membuatnya memenuhi ruang.', 'Mengira align-items mengatur jarak antarbaris Flexbox.', 'Gunakan untuk merapikan posisi item di dalam baris atau kolom Flexbox.'),
    topic('flex-wrap', 'flexbox', { section: 15, heading: 'wrap' }, ['display: flex'], ['Item tidak muat dalam satu baris, atau pilih wrap-reverse'], ['Apakah item tetap satu baris atau pindah ke baris berikutnya'], ['align-content', 'flex-direction'], 'flex-wrap baru berlaku setelah display: flex aktif.', 'Dengan wrap, item yang tidak muat pindah ke baris berikutnya. Tanpa wrap, item tetap satu baris.', 'Mengira flex-wrap bekerja tanpa display: flex, atau item akan pindah walau masih muat.', 'Gunakan saat item perlu pindah ke baris berikutnya pada layar sempit.'),
    topic('align-content (Flexbox)', 'flexbox', { section: 16, heading: 'center' }, ['display: flex', 'flex-wrap: wrap'], ['Ada lebih dari satu baris dan masih ada ruang kosong'], ['Posisi atau jarak antarbaris Flexbox'], ['align-items', 'flex-wrap'], 'align-content mengatur kumpulan baris, bukan posisi item di dalam satu baris.', 'Beberapa baris bisa dirapatkan, dipusatkan, atau diberi jarak.', 'Menggunakannya saat item hanya membentuk satu baris.', 'Gunakan saat Flexbox punya beberapa baris dan ada ruang yang bisa dibagi.'),
    topic('flex item properties', 'flexbox', { section: 17, heading: 'flex-grow' }, ['item menjadi anak langsung flex container'], ['basis, ruang tersedia, dan faktor grow/shrink'], ['ukuran, alignment individu, atau urutan visual item'], ['flex-basis', 'flex-shrink', 'align-self', 'order'], 'Property item mengatur bagaimana setiap item merespons ruang container.', 'Item dapat tumbuh, menyusut, bergeser sendiri, atau berubah urutan visual.', 'Mengira order mengubah urutan DOM atau akses keyboard.', 'Gunakan untuk mengatur respons ukuran dan posisi item Flexbox.'),
    topic('grid-template-columns', 'grid', { section: 18, heading: 'grid-template-columns: 1fr 2fr 1fr' }, ['display: grid'], ['Tentukan berapa kolom dan seberapa lebar masing-masing'], ['Jumlah dan lebar kolom Grid'], ['grid-template-rows', 'gap'], 'grid-template-columns menentukan jumlah dan lebar kolom.', 'Misalnya, 1fr 2fr 1fr membuat kolom tengah mendapat ruang dua kali lebih banyak dari kolom di sisi, jika ruang memungkinkan.', 'Mengira fr adalah ukuran tetap seperti px. Lebarnya juga dipengaruhi ruang yang tersedia dan ukuran isi.', 'Gunakan untuk membuat kolom yang ukurannya tetap, fleksibel, atau gabungan keduanya.'),
    topic('grid-template-rows', 'grid', { section: 22, heading: 'center' }, ['display: grid'], ['ukuran track dan ruang block-axis'], ['jumlah dan ukuran track baris eksplisit'], ['grid-template-columns', 'align-content'], 'grid-template-rows mendefinisikan track baris; intrinsic sizing tetap ikut algoritme Grid.', 'Baris membentuk dimensi block-axis pada grid.', 'Mengira setiap baris harus memiliki tinggi tetap.', 'Gunakan ketika struktur baris perlu didefinisikan eksplisit.'),
    topic('grid-template-areas', 'grid', { section: 25, heading: 'grid-template-areas' }, ['display: grid'], ['nama area dan dimensi matriks valid'], ['peta penempatan bernama'], ['grid-area', 'grid-template-columns'], 'String area menyatakan peta cell; nama yang sama membentuk satu area persegi panjang.', 'Layout terbaca sebagai susunan area bernama.', 'Menggunakan nama area dengan bentuk tidak valid atau tidak cocok dengan item.', 'Gunakan untuk layout bernama yang mudah dipahami.'),
    topic('gap (Flexbox)', 'flexbox', { section: 17, heading: 'gap' }, ['display: flex'], ['Ada item yang perlu diberi jarak'], ['Jarak kosong di antara item atau baris'], ['margin', 'flex-wrap'], 'gap menambahkan jarak di antara item Flexbox.', 'Semua item mendapat jarak yang sama tanpa menambah jarak di sisi luar pembungkus.', 'Mengira gap juga menambah jarak di pinggir pembungkus.', 'Gunakan untuk memberi jarak yang rata di antara item.'),
    topic('gap (Grid)', 'grid', { section: 18, heading: 'grid-template-columns: 1fr 2fr 1fr' }, ['display: grid'], ['Kolom atau baris Grid sudah dibuat'], ['Jarak antarbaris dan antarkolom'], ['grid-template-columns', 'grid-template-rows'], 'gap membuat jarak di antara baris dan kolom Grid.', 'Kotak-kotak Grid terpisah dengan jarak yang konsisten.', 'Mengira gap memperlebar kolom atau menambah ruang di pinggir Grid.', 'Gunakan untuk mengatur jarak antarbagian Grid.'),
    topic('justify-items', 'grid', { section: 19, heading: 'center' }, ['display: grid'], ['ukuran cell lebih besar dari item'], ['alignment item dalam cell pada inline axis'], ['justify-self', 'justify-content'], 'Property ini mengatur isi cell, bukan keseluruhan grid.', 'Item berpindah atau stretch di dalam cell.', 'Mengira grid track ikut bergerak.', 'Gunakan sebagai alignment default seluruh grid item.'),
    topic('align-items (Grid)', 'grid', { section: 20, heading: 'center' }, ['display: grid'], ['ukuran cell lebih besar dari item'], ['alignment item di dalam cell pada block axis'], ['align-self', 'align-content'], 'Alignment item berlaku di dalam cell dan berbeda dari alignment track.', 'Isi cell berada di start, center, end, atau stretch.', 'Mengira item akan tampak berpindah jika track tidak menyisakan ruang.', 'Gunakan untuk alignment default vertikal/logis item Grid.'),
    topic('justify-content (Grid)', 'grid', { section: 21, heading: 'center' }, ['display: grid'], ['grid lebih kecil daripada content box pada inline axis'], ['posisi atau ruang antar seluruh track grid'], ['justify-items', 'gap'], 'Property ini mengatur grid track sebagai satu kumpulan.', 'Track bergeser atau terdistribusi dalam content box.', 'Mengharapkan efek jika track sudah mengisi seluruh lebar container.', 'Gunakan ketika kumpulan track tidak memenuhi container.'),
    topic('align-content (Grid)', 'grid', { section: 22, heading: 'center' }, ['display: grid'], ['grid lebih kecil daripada content box pada block axis'], ['posisi atau distribusi seluruh track baris'], ['align-items', 'grid-template-rows'], 'align-content menyelaraskan track grid, bukan item dalam cell.', 'Seluruh kumpulan baris bergerak atau mendapat ruang ekstra.', 'Mengira property ini mengubah posisi isi cell.', 'Gunakan ketika grid tidak mengisi tinggi container.'),
    topic('place-items & place-content', 'grid', { section: 23, heading: 'place-items: center' }, ['display: grid'], ['place-items = align-items + justify-items; place-content = align-content + justify-content'], ['dua sumbu alignment sekaligus'], ['align-items', 'justify-items', 'align-content', 'justify-content'], 'Shorthand menerapkan alignment pada pasangan sumbu.', 'Item atau kumpulan track terselaraskan dalam kedua sumbu.', 'Mencampur place-items dengan place-content yang mengatur target berbeda.', 'Gunakan untuk menyingkat nilai alignment dua sumbu.'),
    topic('grid-column & grid-row', 'grid', { section: 24, heading: 'grid-column: span 2' }, ['Item berada di dalam elemen dengan display: grid'], ['Garis kolom dan baris tersedia'], ['Kolom dan baris yang ditempati item'], ['grid-area', 'grid-template-columns'], 'grid-column dan grid-row menentukan batas item memakai garis Grid.', 'Item bisa menempati beberapa kotak Grid sekaligus.', 'Memakai span pada elemen biasa yang bukan item Grid.', 'Gunakan untuk menempatkan item atau membuatnya membentang di beberapa kolom/baris.'),
    topic('grid-column', 'grid', { section: 24, heading: 'grid-column: span 2' }, ['Item di dalam elemen dengan display: grid'], ['Garis kolom pada Grid'], ['Kolom tempat item mulai dan berakhir'], ['grid-row', 'grid-area'], 'grid-column memilih garis kolom tempat item mulai dan berakhir.', 'Item bisa menempati satu kolom atau membentang ke beberapa kolom.', 'Mengatur grid-column pada elemen yang bukan item Grid.', 'Gunakan untuk menaruh item di kolom tertentu atau membuatnya melebar ke beberapa kolom.'),
    topic('grid-row', 'grid', { section: 24, heading: 'grid-row: span 2' }, ['item di dalam grid container'], ['grid row lines'], ['rentang item pada baris'], ['grid-column', 'grid-area'], 'grid-row menempatkan item relatif terhadap garis baris.', 'Item dapat melintasi satu atau lebih baris.', 'Mengatur grid-row tanpa grid container.', 'Gunakan untuk span atau lokasi baris tertentu.'),
    topic('grid-area', 'grid', { section: 25, heading: 'grid-template-areas' }, ['display: grid'], ['area bernama atau line placement valid'], ['penempatan item pada area/garis grid'], ['grid-template-areas', 'grid-column', 'grid-row'], 'grid-area adalah shorthand untuk penempatan area atau garis.', 'Item menempati area yang ditentukan.', 'Mengira grid-area membuat area bernama tanpa template yang sesuai.', 'Gunakan untuk menempatkan item pada area bernama.'),
    topic('grid-area shorthand lab', 'grid', { id: 'learn-grid-area-lab' }, ['display: grid', 'Garis baris dan kolom sudah tersedia'], ['Empat nilai ditulis berurutan: row-start / column-start / row-end / column-end'], ['Baris dan kolom yang ditempati item'], ['grid-row', 'grid-column', 'grid-template-areas'], 'Baca grid-area: 4 / 7 / 6 / 5 sebagai: mulai di garis baris 4, mulai di garis kolom 7, berakhir di garis baris 6, dan berakhir di garis kolom 5.', 'Item mengisi baris 4–5 dan kolom 5–6. Angka adalah garis pembatas, bukan nomor kotak.', 'Mengira angka menunjukkan nomor kotak, atau mengira urutannya kolom dulu baru baris.', 'Gunakan angka untuk memilih batas area dengan tepat. Jika lebih mudah dibaca, beri nama area dengan grid-template-areas.'),
    topic('justify-self', 'grid', { section: 19 }, ['item di dalam grid container'], ['ruang bebas dalam cell pada inline axis'], ['alignment inline satu item'], ['justify-items'], 'justify-self mengatur satu grid item secara inline-axis.', 'Satu item dapat berbeda dari alignment default grid.', 'Menggunakan justify-self pada flex item dan mengharapkan efek yang sama.', 'Gunakan untuk pengecualian alignment satu item.'),
    topic('align-self (Flexbox)', 'flexbox', { section: 17, heading: 'align-self' }, ['item di dalam flex container'], ['ruang cross-axis pada line'], ['alignment cross-axis satu item'], ['align-items'], 'align-self menimpa align-items pada satu flex item.', 'Satu item dapat berbeda dari alignment teman satu line.', 'Menggunakan align-content untuk memindahkan satu item.', 'Gunakan untuk pengecualian alignment item.'),
    topic('align-self (Grid)', 'grid', { section: 20, heading: 'center' }, ['item di dalam grid container'], ['ruang block-axis dalam cell'], ['alignment block-axis satu item'], ['align-items'], 'align-self menimpa align-items untuk satu grid item.', 'Satu item berbeda posisi di cell-nya.', 'Menggunakan align-self pada element yang bukan grid item.', 'Gunakan untuk pengecualian alignment satu grid item.'),
    topic('grid-auto-flow & template areas', 'grid', { section: 25, heading: 'grid-template-areas' }, ['display: grid'], ['auto-placement dan nama area konsisten'], ['urutan pengisian dan peta penempatan item'], ['grid-area', 'grid-template-columns'], 'Auto-placement mengisi sel; template areas memberi nama struktur layout.', 'Item mengisi row/column atau area bernama.', 'Mengira grid-auto-flow mengubah urutan DOM.', 'Gunakan untuk auto-placement atau layout bernama yang mudah dibaca.'),
    topic('responsive design', 'responsive', { section: 26, heading: 'Breakpoint' }, ['viewport atau container yang dapat berubah ukuran'], ['media condition cocok atau clamp range aktif'], ['layout dan ukuran berdasarkan ruang tersedia'], ['min()', 'max()', 'clamp()', '@media'], 'Breakpoint adalah kondisi desain, bukan ukuran perangkat yang universal.', 'Komponen dapat berubah layout atau ukuran pada rentang tertentu.', 'Memilih breakpoint hanya berdasarkan model perangkat tertentu.', 'Gunakan untuk menjaga konten tetap terbaca pada ruang berbeda.'),
    topic('transform', 'advanced', { section: 27, heading: 'translate' }, ['elemen yang akan ditransformasi'], ['fungsi transform dan transform-origin'], ['rendering visual tanpa mengubah alur normal'], ['position', 'transition'], 'Transform mengubah koordinat tampilan setelah layout normal.', 'Elemen bergeser, berputar, membesar, atau miring.', 'Mengira transform otomatis mengubah ruang layout yang dipesan.', 'Gunakan untuk perubahan visual, terutama animasi.'),
    topic('filter & gradient', 'advanced', { section: 28, heading: 'filter' }, ['elemen atau background'], ['fungsi filter/gradient didukung dan valid'], ['pixel hasil render atau warna latar'], ['backdrop-filter', 'opacity'], 'Filter memproses tampilan elemen; gradient menghasilkan image CSS.', 'Tampilan mendapat blur, perubahan warna, atau gradasi.', 'Menggunakan filter untuk konten yang butuh keterbacaan tanpa mengecek kontras.', 'Gunakan untuk efek visual non-semantik.'),
    topic('transition & animation', 'advanced', { section: 29, heading: 'transition' }, ['perubahan style atau keyframes'], ['durasi, timing, dan state pemicu'], ['nilai visual sepanjang waktu'], ['transform', 'prefers-reduced-motion'], 'Transition menginterpolasi perubahan; animation mengatur rangkaian keyframe.', 'Perubahan berlangsung bertahap atau berulang.', 'Menganimasikan terlalu banyak properti atau mengabaikan reduced motion.', 'Gunakan untuk memberi umpan balik gerak yang singkat dan bermakna.', 'Animasi berjalan sesuai dukungan property dan dapat dibatasi oleh preferensi sistem.'),
    topic('custom properties & interaction', 'advanced', { section: 30, heading: 'Custom properties' }, ['custom property pada scope yang dapat mewariskan nilainya'], ['var() dan selector state seperti hover/focus'], ['nilai token visual dan state interaktif'], ['cascade', 'inheritance', ':focus-visible'], 'Custom properties mengikuti cascade dan scope; pseudo-class mencerminkan state.', 'Nilai dapat dipakai ulang dan komponen merespons interaksi.', 'Mengira custom property yang tidak terdefinisi memiliki nilai otomatis tanpa fallback.', 'Gunakan untuk token desain dan state interaksi konsisten.'),
    topic('cascade layers & global keywords', 'fundamental', { section: 31, heading: '@layer' }, ['aturan CSS pada layer atau cascade biasa'], ['origin, importance, layer order, specificity'], ['prioritas dan reset nilai properti'], ['specificity', 'inheritance'], 'Cascade layer menjadi salah satu tahap resolusi prioritas deklarasi.', 'Nilai terpilih atau diwariskan/di-reset sesuai keyword.', 'Menganggap layer terakhir selalu menang; importance dan origin juga memengaruhi urutan.', 'Gunakan untuk mengatur prioritas stylesheet besar.'),
    topic('advanced selectors & state', 'fundamental', { section: 32, heading: ':nth-child(), :not() & :is()' }, ['struktur DOM dan state elemen'], ['selector cocok pada relasi/keadaan yang dimaksud'], ['elemen yang ikut aturan'], [':checked', ':has()', ':focus-visible'], 'Pseudo-class dan combinator memilih elemen berdasarkan struktur atau state.', 'Gaya dapat mengikuti posisi dan perubahan state.', 'Memakai selector kompleks tanpa mempertimbangkan dukungan browser yang ditargetkan.', 'Gunakan untuk state UI tanpa JavaScript ketika selector cukup.', ':has() didukung browser modern, tetapi verifikasi target browser lama.'),
    topic('logical properties & writing mode', 'layout', { section: 33, heading: 'margin-inline & padding-block' }, ['writing direction dan mode dokumen'], ['inline/block axis saat ini'], ['spacing atau border pada arah logis'], ['direction', 'writing-mode'], 'Properti logical merujuk ke sumbu inline/block, bukan sisi fisik tetap.', 'Margin, padding, dan border mengikuti orientasi teks.', 'Menyamakan inline-start dengan kiri pada semua direction.', 'Gunakan untuk layout yang mendukung RTL atau mode tulisan berbeda.'),
    topic('multi-column layout', 'layout', { section: 34, heading: 'columns, column-gap & column-rule' }, ['teks di dalam container'], ['jumlah/lebar kolom dan tinggi tersedia'], ['aliran teks ke beberapa kolom'], ['column-gap', 'column-span'], 'Multi-column memecah aliran konten ke kolom seperti layout editorial.', 'Teks mengalir dari satu kolom ke kolom berikutnya.', 'Menggunakan multi-column untuk kartu independen yang urutannya harus eksplisit.', 'Gunakan untuk teks panjang yang beraliran editorial.'),
    topic('table, list & generated content', 'advanced', { section: 35, heading: 'border-collapse & table layout' }, ['elemen tabel/list/teks'], ['formatting table dan pseudo-element yang sesuai'], ['border tabel, marker, counter, atau kutipan visual'], ['::marker', '::before', '::after'], 'Browser memberi formatting khusus pada table dan pseudo-element.', 'Konten dan marker dapat memperoleh presentasi terkontrol.', 'Memakai generated content untuk informasi penting yang tidak tersedia di DOM.', 'Gunakan untuk dekorasi; pertahankan informasi inti sebagai konten semantik.'),
    topic('form controls & user interface', 'advanced', { section: 36, heading: ':focus-visible, :valid & :disabled' }, ['kontrol form semantik'], ['constraint validation, focus, disabled state'], ['tampilan kontrol sesuai state'], ['accent-color', 'caret-color', 'cursor'], 'Browser menyediakan state validasi dan fokus pada kontrol form.', 'Kontrol menunjukkan state interaktif dan validasi.', 'Menghilangkan indikator focus tanpa pengganti keyboard yang jelas.', 'Gunakan untuk feedback input dan aksesibilitas form.', 'Tampilan kontrol native berbeda menurut browser dan sistem operasi.'),
    topic('object-fit & object-position', 'layout', { section: 37, heading: 'object-fit: cover' }, ['img atau replaced element dengan frame'], ['rasio konten dan ukuran kotak'], ['crop, letterbox, dan titik fokus gambar'], ['aspect-ratio', 'overflow'], 'object-fit mengatur cara konten replaced mengisi kotaknya.', 'Gambar dapat mengisi frame atau tetap utuh.', 'Mengira cover mempertahankan seluruh tepi gambar.', 'Gunakan untuk thumbnail dan media dalam frame berukuran tetap.'),
    topic('scroll behavior & snap', 'advanced', { section: 38, heading: 'scroll-snap-type: x mandatory' }, ['scroll container'], ['snap point dan gesture scroll'], ['posisi akhir scroll dan overscroll'], ['scroll-padding', 'scroll-margin'], 'Scroll snap memberi target berhenti pada scroll container.', 'Scroll dapat berhenti dekat snap point yang ditentukan.', 'Mengunci snap terlalu ketat untuk konten atau input pengguna.', 'Gunakan untuk galeri/daftar horizontal dengan perpindahan jelas.', 'Rasa scroll dan tampilan scrollbar dipengaruhi browser, OS, dan perangkat input.'),
    topic('clip-path, mask & blend mode', 'advanced', { section: 39, heading: 'clip-path: polygon()' }, ['elemen yang dirender'], ['path/mask dan stacking/compositing'], ['area terlihat atau cara warna bercampur'], ['overflow', 'filter'], 'Clip, mask, dan blend bekerja pada tahap visual yang berbeda.', 'Bentuk terlihat dipotong, transparan bertahap, atau bercampur.', 'Mengandalkan mask/blend untuk menyampaikan informasi tanpa fallback.', 'Gunakan untuk dekorasi dan sediakan fallback visual.', 'Dukungan prefix dan detail compositing dapat berbeda pada browser lama.'),
    topic('container queries', 'responsive', { section: 40, heading: '@container' }, ['container dengan container-type yang sesuai'], ['ukuran container memenuhi query'], ['layout komponen berdasarkan ruang parent'], ['@media', 'grid'], 'Container query membaca ukuran container, bukan viewport.', 'Komponen menyesuaikan diri ketika parent berubah ukuran.', 'Lupa membuat query container sebelum memakai @container.', 'Gunakan untuk komponen reusable dalam parent dengan lebar berbeda.', 'Verifikasi dukungan browser bila target mencakup browser lama.'),
    topic('color scheme & color mix', 'advanced', { section: 41, heading: 'color-mix()' }, ['warna dan color space valid'], ['preferensi scheme atau color-mix context'], ['warna native control dan hasil warna campuran'], ['currentColor', 'prefers-color-scheme'], 'color-scheme memengaruhi kontrol native; color-mix menghasilkan warna terhitung.', 'Warna komponen menyesuaikan mode atau dicampur.', 'Menganggap hasil warna identik lintas gamut, display, dan browser.', 'Gunakan untuk tema dan variasi warna dengan fallback yang sesuai.', 'color-mix() dan color space modern perlu fallback untuk browser lama.'),
    topic('feature queries & @property', 'advanced', { section: 42, heading: '@supports' }, ['browser mem-parsing fitur CSS terkait'], ['@supports condition atau registered property'], ['fallback yang dipilih atau interpolasi custom property'], ['var()', 'conic-gradient'], 'Feature query mengecek dukungan deklarasi; @property memberi tipe custom property.', 'Aturan progresif dapat aktif hanya saat fitur didukung.', 'Menganggap @supports menjamin kesamaan hasil visual pada setiap browser.', 'Gunakan progressive enhancement dan sediakan tampilan dasar.', '@property belum tersedia di semua browser lama.'),
    topic('accessibility preferences & print', 'responsive', { section: 43, heading: 'prefers-reduced-motion' }, ['preferensi pengguna atau print context'], ['media feature cocok'], ['animasi, warna, atau tampilan cetak'], ['animation', 'prefers-color-scheme'], 'Media query memungkinkan gaya menyesuaikan preferensi dan medium.', 'Gerak dapat dikurangi dan halaman dapat ditata untuk cetak.', 'Memperlakukan prefers-reduced-motion sebagai pengganti pengujian aksesibilitas.', 'Gunakan untuk menghormati preferensi dan menyiapkan output cetak.'),
    topic('text wrapping & numeric typography', 'typography', { section: 44, heading: 'text-wrap: balance' }, ['teks dan font yang dirender'], ['ruang line, bahasa, serta fitur font tersedia'], ['pembagian baris dan bentuk angka'], ['hyphens', 'overflow-wrap'], 'Pembungkusan teks dipengaruhi ukuran, bahasa, dan shaping font.', 'Baris dapat seimbang atau kata panjang terpecah.', 'Menganggap browser memecah baris identik pada semua font dan engine.', 'Gunakan untuk heading, angka tabel, dan teks panjang.', 'text-wrap: balance dan pemenggalan kata dapat berbeda menurut dukungan/browser/bahasa.'),
    topic('3D transforms & perspective', 'advanced', { section: 45, heading: 'perspective & rotateY()' }, ['transform pada elemen'], ['perspective, transform-style, dan urutan transform'], ['koordinat proyeksi 3D dan sisi yang terlihat'], ['transform-origin', 'backface-visibility'], 'Perspective menentukan proyeksi; transform menyusun transformasi 3D.', 'Elemen memperoleh kesan kedalaman dan rotasi.', 'Mengharapkan efek 3D tanpa perspektif atau tanpa preserve-3d saat diperlukan.', 'Gunakan untuk efek visual terbatas dan tetap pertahankan alternatif konten.'),
    topic('containment & rendering', 'advanced', { section: 46, heading: 'contain: layout paint' }, ['elemen container'], ['jenis containment dan ukuran intrinsik fallback'], ['batas layout/paint atau waktu rendering'], ['content-visibility', 'will-change'], 'Containment membatasi sebagian pengaruh rendering pada subtree.', 'Browser dapat mengisolasi layout/paint atau menunda konten.', 'Menggunakan will-change terus-menerus tanpa pengukuran.', 'Gunakan untuk optimasi setelah mengukur biaya render.', 'Efek optimasi dan timing rendering ditentukan browser dan tidak dijamin identik.'),
    topic('pointer, touch & scrollbar', 'advanced', { section: 47, heading: 'user-select & touch-action' }, ['perangkat input dan area interaksi'], ['pointer capability dan gesture browser'], ['seleksi teks, gesture, serta gutter scrollbar'], ['hover media', 'scrollbar-gutter'], 'Media feature menjelaskan kemampuan input; touch-action mempengaruhi gesture.', 'Interaksi dapat menyesuaikan pointer dan scroll.', 'Mengasumsikan semua pengguna punya hover atau pointer presisi.', 'Gunakan untuk menyesuaikan affordance tanpa menghapus akses input.', 'Scrollbar overlay/klasik dan kemampuan pointer bergantung browser, OS, dan perangkat.'),
    topic('CSS nesting & @scope', 'advanced', { section: 48, heading: 'Nested rules' }, ['selector dan aturan CSS valid'], ['nesting/scope didukung serta scope root cocok'], ['jangkauan selector dan batas style'], ['cascade', 'specificity'], 'Nesting merangkum selector terkait; @scope membatasi jangkauan aturan.', 'Style dapat dikelompokkan atau dibatasi pada subtree.', 'Menganggap scope menghentikan inheritance atau cascade.', 'Gunakan untuk organisasi stylesheet dan komponen terisolasi.', 'Dukungan @scope bergantung versi browser; sediakan aturan fallback bila perlu.'),
    topic('grid subgrid', 'grid', { section: 49, heading: 'grid-template-columns: subgrid' }, ['grid container induk dengan track eksplisit'], ['anak grid merentang track induk'], ['alignment track grid bersarang'], ['grid-template-columns', 'grid-column'], 'subgrid mewarisi track pada sumbu yang dipilih dari grid induk.', 'Konten grid bersarang dapat sejajar dengan track induk.', 'Mengira subgrid membuat track independen baru.', 'Gunakan saat baris/kolom komponen anak harus sejajar dengan grid induk.', 'Pastikan target browser mendukung subgrid pada sumbu yang diperlukan.')
  ];

  const labTopics = [
    topic('cause-and-effect labs', 'advanced', { id: 'learn-labs' }, ['prerequisite khusus tiap eksperimen'], ['konteks layout dan kondisi property yang diuji'], ['perbandingan live sebelum dan sesudah prerequisite'], ['display', 'position', 'overflow'], 'Setiap eksperimen mengisolasi satu prasyarat agar sebab-akibat terlihat.', 'Toggle mengubah konteks layout dan memperbarui visual serta keterangan.', 'Membaca satu hasil lab sebagai aturan mutlak untuk semua variasi layout.', 'Gunakan untuk menguji intuisi lalu bandingkan dengan dependency map.'),
    topic('flex-wrap lab', 'flexbox', { id: 'learn-lab-wrap' }, ['display: flex'], ['ruang main axis tidak cukup'], ['pembentukan flex line'], ['align-content', 'flex-direction'], 'flex-wrap hanya mengubah pembungkusan item flex.', 'Item berpindah ke line baru setelah Flexbox aktif.', 'Mengharapkan wrap pada block container.', 'Gunakan saat item perlu membungkus pada ruang sempit.'),
    topic('justify-content lab', 'flexbox', { id: 'learn-lab-justify' }, ['display: flex atau grid'], ['ada ruang bebas pada sumbu alignment'], ['posisi/distribusi item atau track'], ['flex-direction', 'gap'], 'Alignment membutuhkan formatting context yang mendukungnya.', 'Item dapat dipusatkan setelah context dan ruang tersedia.', 'Menguji property tanpa mengaktifkan context yang tepat.', 'Gunakan setelah memastikan jenis container.'),
    topic('align-content lab', 'flexbox', { id: 'learn-lab-content' }, ['display: flex', 'flex-wrap: wrap'], ['lebih dari satu flex line dan ruang cross-axis'], ['posisi kumpulan line'], ['align-items', 'flex-wrap'], 'align-content mengatur kumpulan line, bukan item satu per satu.', 'Beberapa line berpindah sebagai satu kumpulan.', 'Menguji satu line saja.', 'Gunakan saat layout benar-benar memiliki beberapa line.'),
    topic('absolute positioning lab', 'position', { id: 'learn-lab-absolute' }, ['containing block yang sesuai'], ['ancestor pembentuk containing block'], ['acuan perhitungan inset'], ['position: relative', 'transform'], 'Elemen absolute mencari containing block terdekat sesuai aturan CSS.', 'Inset dihitung dari ancestor yang menjadi containing block.', 'Menganggap ancestor DOM langsung selalu menjadi acuan.', 'Gunakan dengan menetapkan container acuan secara eksplisit.'),
    topic('z-index lab', 'position', { id: 'learn-lab-z-index' }, ['positioning atau konteks flex/grid yang sesuai'], ['stacking context dan stack level'], ['urutan lukisan elemen'], ['position', 'isolation'], 'z-index dibandingkan dalam konteks stacking yang relevan.', 'Elemen dapat berada di depan elemen lain pada konteks yang sama.', 'Mengira angka besar dapat keluar dari stacking context ancestor.', 'Gunakan setelah menelusuri stacking context.'),
    topic('text-overflow lab', 'typography', { id: 'learn-lab-text-overflow' }, ['overflow yang dibatasi', 'white-space: nowrap untuk satu baris'], ['teks melampaui inline area'], ['tanda pemotongan seperti ellipsis'], ['overflow', 'white-space'], 'text-overflow menandai konten inline yang ter-overflow; ia tidak memotong sendiri.', 'Ellipsis dapat muncul saat konten benar-benar terpotong.', 'Mengatur ellipsis tanpa overflow yang memotong.', 'Gunakan untuk label satu baris yang ruangnya terbatas.'),
    topic('grid-column lab', 'grid', { id: 'learn-lab-grid-column' }, ['display: grid'], ['grid tracks'], ['penempatan item pada kolom'], ['grid-row', 'grid-template-columns'], 'grid-column merujuk ke grid line dari grid container.', 'Item dapat menjangkau track setelah Grid aktif.', 'Mengatur grid-column pada item di block layout biasa.', 'Gunakan untuk span atau posisi kolom eksplisit.'),
    topic('flex-direction axis lab', 'flexbox', { id: 'learn-lab-axis' }, ['display: flex'], ['flex-direction'], ['orientasi main/cross axis'], ['justify-content', 'align-items'], 'Sumbu Flexbox berasal dari flex-direction dan writing mode.', 'Perubahan arah menukar orientasi main dan cross axis.', 'Menghafal bahwa justify selalu horizontal.', 'Gunakan untuk membaca arah alignment sebelum memilih property.'),
    topic('containing block lab', 'position', { id: 'learn-lab-containing-block' }, ['ancestor pembentuk containing block'], ['positioned ancestor atau ancestor dengan properti pembentuk containing block'], ['ancestor acuan elemen absolute'], ['position', 'transform'], 'Containing block tidak selalu sama dengan parent DOM langsung.', 'Mengubah ancestor yang diposisikan mengubah acuan inset child.', 'Menganggap absolute selalu diukur dari viewport atau parent langsung.', 'Gunakan saat overlay perlu terikat pada komponen tertentu.')
  ];
  LEARNING_DATA.push(...labTopics);

  const levelLabels = {
    fundamental: 'Fondasi',
    layout: 'Layout',
    flexbox: 'Flexbox',
    grid: 'Grid',
    position: 'Posisi',
    typography: 'Teks',
    responsive: 'Responsif',
    advanced: 'Lanjutan'
  };
  const levelOrder = ['fundamental', 'layout', 'flexbox', 'grid', 'position', 'typography', 'responsive', 'advanced'];
  const levels = levelOrder
    .filter((level) => LEARNING_DATA.some((item) => item.level === level))
    .map((level) => [level, levelLabels[level]]);
  const sectionByIndex = originalSections;
  const topicForSection = (index) => LEARNING_DATA.find((item) => item.target.section === index);
  const topicByProperty = (property) => LEARNING_DATA.find((item) => item.property === property);

  function targetFor(item) {
    if (item.target.id) return document.getElementById(item.target.id);
    const section = sectionByIndex[item.target.section];
    if (!section) return null;
    if (!item.target.heading) return $('h2', section) || section;
    const expected = item.target.heading.toLowerCase();
    return $$('h3', section).find((heading) => heading.textContent.trim().toLowerCase() === expected) ||
      $$('h3', section).find((heading) => heading.textContent.trim().toLowerCase().includes(expected)) ||
      $('h2', section);
  }

  let lastMapButton = null;
  let highlightTimer = 0;
  function navigateTo(item, mapButton) {
    const target = targetFor(item);
    if (!target) return;
    if (highlightTimer) window.clearTimeout(highlightTimer);
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'center'
    });
    target.classList.remove('learn-highlight');
    void target.offsetWidth;
    target.classList.add('learn-highlight');
    highlightTimer = window.setTimeout(() => target.classList.remove('learn-highlight'), 2200);
    if (mapButton) showPanel(item, mapButton);
  }

  const panel = make('aside', 'learn-panel');
  panel.hidden = true;
  panel.setAttribute('aria-label', 'Penjelasan dependency property');
  panel.setAttribute('aria-live', 'polite');
  document.body.append(panel);

  function addDescription(parent, label, value) {
    if (!value || !value.length) return;
    const line = make('p', 'learn-panel-line');
    const strong = make('strong', '', `${label}: `);
    const text = Array.isArray(value) ? value.map(mentorText).join(' · ') : mentorText(value);
    line.append(strong, document.createTextNode(text));
    parent.append(line);
  }

  function showPanel(item, trigger) {
    $$('.learn-is-selected').forEach((node) => node.classList.remove('learn-is-selected'));
    trigger.classList.add('learn-is-selected');
    lastMapButton = trigger;
    panel.replaceChildren();
    const close = make('button', 'learn-panel-close', 'Tutup');
    close.type = 'button';
    close.setAttribute('aria-label', 'Tutup panel property');
    const title = make('h3', '', item.property);
    panel.append(close, title);

    const relations = [
      ['REQUIRES', item.requires],
      ['DEPENDS ON', item.dependsOn],
      ['CHANGES', item.changes],
      ['RELATED', item.related]
    ];
    relations.forEach(([label, values]) => {
      if (!values || !values.length) return;
      const row = make('div', 'learn-relation-row');
      const relationLabels = { REQUIRES: 'BUTUH DULU', 'DEPENDS ON': 'PERLU KONDISI', CHANGES: 'MENGUBAH', RELATED: 'TERKAIT' };
      row.append(make('span', `learn-relation learn-relation-${label.toLowerCase().replace(/ /g, '-')}`, relationLabels[label]));
      const content = make('div', 'learn-relation-values');
      values.forEach((value, index) => {
        if (index) content.append(document.createTextNode(' · '));
        const linked = topicByProperty(value);
        if (linked && linked !== item) {
          const link = make('button', 'learn-relation-link', value);
          link.type = 'button';
          link.addEventListener('click', () => {
            navigateTo(linked);
            showPanel(linked, trigger);
          });
          content.append(link);
        } else {
          content.append(document.createTextNode(mentorText(value)));
        }
      });
      row.append(content);
      panel.append(row);
    });

    addDescription(panel, 'Kenapa bisa begitu', item.why);
    addDescription(panel, 'Hasil yang terlihat', item.effect);
    addDescription(panel, 'Yang sering keliru', item.commonMistake);
    addDescription(panel, 'Kapan berguna', item.whenToUse);
    if (item.browserNote) {
      const note = make('p', 'learn-browser-note');
      note.append(make('strong', '', 'Catatan browser: '), document.createTextNode(mentorText(item.browserNote)));
      panel.append(note);
    }
    close.addEventListener('click', closePanel);
    panel.hidden = false;
    close.focus();
  }

  function closePanel() {
    panel.hidden = true;
    if (lastMapButton) lastMapButton.classList.remove('learn-is-selected');
    if (lastMapButton && lastMapButton.isConnected) lastMapButton.focus();
  }
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) closePanel();
  });

  function legacyTopicFor(node) {
    const name = node.textContent.trim().toLowerCase().replace(/^display:\s*/, '');
    const tree = node.closest('.tree-card');
    const context = tree ? (/flex/i.test($('h3', tree).textContent) ? 'flex' : 'grid') : '';
    let property = name;
    if (name === 'display' || name === 'flex' || name === 'grid') property = 'display';
    else if (name === 'justify-content') property = context === 'grid' ? 'justify-content (Grid)' : 'justify-content (Flexbox)';
    else if (name === 'align-items') property = context === 'grid' ? 'align-items (Grid)' : 'align-items (Flexbox)';
    else if (name === 'align-content') property = context === 'grid' ? 'align-content (Grid)' : 'align-content (Flexbox)';
    else if (name === 'gap') property = context === 'grid' ? 'grid-template-columns' : 'flex item properties';
    else if (name === 'align-self') property = context === 'grid' ? 'align-items (Grid)' : 'flex item properties';
    else if (name === 'order' || name === 'flex-grow' || name === 'flex-shrink' || name === 'flex-basis') property = 'flex item properties';
    else if (name === 'grid-area') property = 'grid-auto-flow & template areas';
    else if (name === 'justify-self') property = 'justify-items';
    return LEARNING_DATA.find((item) => item.property === property) || null;
  }

  $$('.flow-root, .flow-node, .tree-node').forEach((node) => {
    const item = legacyTopicFor(node);
    if (!item) return;
    node.classList.add('learn-is-clickable');
    node.tabIndex = 0;
    node.setAttribute('role', 'button');
    node.addEventListener('click', () => navigateTo(item, node));
    node.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        navigateTo(item, node);
      }
    });
  });

  function appendRequiresBadge(parent, item, extraClass = '') {
    const badge = make('div', `learn-requires-badge${extraClass ? ` ${extraClass}` : ''}`);
    badge.append(make('strong', '', 'Butuh dulu'));
    badge.append(make('span', '', item.requires.map(mentorText).join(' · ') || 'Belum ada syarat khusus'));
    if (parent.matches('section')) {
      const heading = $('h2', parent);
      if (heading) heading.after(badge);
      else parent.append(badge);
    } else {
      parent.append(badge);
    }
    return badge;
  }

  function renderStartPath() {
    const path = make('section', 'learn-start');
    path.setAttribute('aria-labelledby', 'learn-start-title');
    path.append(
      make('p', 'learn-start-kicker', 'JALUR PEMULA · MULAI DI SINI'),
      make('h2', '', 'Belajar CSS selangkah demi selangkah'),
      make('p', 'learn-start-intro', 'Ikuti urutan ini dulu. Buka materi, coba demonya, lalu lanjut ke langkah berikutnya. Tidak perlu menghafal semuanya sekaligus.')
    );
    path.querySelector('h2').id = 'learn-start-title';

    const steps = [
      {
        property: 'selector & cascade',
        title: 'Pilih elemen yang ingin diubah',
        description: 'Selector adalah cara menunjuk elemen HTML. Coba ubah warna satu elemen, lalu lihat aturan mana yang dipakai.'
      },
      {
        property: 'box model',
        title: 'Pahami ukuran dan jarak',
        description: 'Setiap elemen punya isi, ruang di dalam, garis tepi, dan jarak di luar. Ini membantu menjawab “kenapa ukurannya jadi segini?”'
      },
      {
        property: 'display: flex',
        title: 'Susun elemen dengan Flexbox',
        description: 'Mulai dengan display: flex. Setelah itu, baru atur arah, jarak, dan posisi item.'
      },
      {
        property: 'flex-wrap lab',
        title: 'Coba sebab dan akibat',
        description: 'Tebak dulu apa yang terjadi tanpa display: flex, lalu aktifkan syaratnya dan bandingkan.'
      },
      {
        property: 'grid-area shorthand lab',
        title: 'Baca angka Grid tanpa menebak',
        description: 'Lihat bagaimana empat angka grid-area menunjuk garis dan menentukan kotak yang ditempati.'
      }
    ];
    const list = make('ol', 'learn-start-steps');
    steps.forEach((step, index) => {
      const item = topicByProperty(step.property);
      const row = make('li', 'learn-start-step');
      row.dataset.level = item.level;
      const number = make('span', 'learn-start-number', String(index + 1));
      number.setAttribute('aria-hidden', 'true');
      const content = make('div', 'learn-start-content');
      content.append(make('h3', '', step.title), make('p', '', step.description));
      const button = make('button', 'learn-start-button', `Buka langkah ${index + 1}`);
      button.type = 'button';
      button.addEventListener('click', () => navigateTo(item));
      row.append(number, content, button);
      list.append(row);
    });
    path.append(list);
    const vocabulary = make('details', 'learn-start-vocabulary');
    vocabulary.append(
      make('summary', '', 'Istilah dasar yang sering muncul'),
      make('p', '', 'Elemen: bagian pada halaman, misalnya judul atau tombol.'),
      make('p', '', 'Elemen induk: pembungkus yang berisi elemen lain.'),
      make('p', '', 'Properti: aturan CSS yang ingin diubah, misalnya color atau display.'),
      make('p', '', 'Nilai: pilihan untuk properti, misalnya display: flex.')
    );
    path.append(vocabulary);
    main.insertBefore(path, dependencySection);
  }

  function renderLearningCard(section, item) {
    const details = make('details', 'learn-card');
    const summary = make('summary', 'learn-card-summary');
    summary.append(make('strong', '', `Sebab-akibat: ${item.property}`));
    summary.append(make('span', '', 'Lihat penjelasan'));
    details.append(summary);
    appendRequiresBadge(details, item, 'learn-card-requires');
    addDescription(details, 'Hasil yang terlihat', item.effect);
    addDescription(details, 'Yang sering keliru', item.commonMistake);
    addDescription(details, 'Kapan berguna', item.whenToUse);
    const open = make('button', 'learn-open-panel', 'Buka peta dan penjelasan');
    open.type = 'button';
    open.addEventListener('click', () => {
      const button = $$('.learn-map-node').find((node) => node.dataset.property === item.property);
      if (button) navigateTo(item, button);
    });
    details.append(open);
    const badge = $('.learn-requires-badge', section);
    const heading = $('h2', section);
    (badge || heading).after(details);
  }

  function renderMap() {
    const map = make('div', 'learn-map');
    const heading = make('h3', '', 'Mind map: dari dasar sampai efek');
    const intro = make('p', 'learn-map-intro', 'Mulai dari kotak paling atas, lalu ikuti cabangnya. Setiap kartu menunjukkan apa yang perlu disiapkan dan apa yang berubah. Garis menghubungkan hal yang perlu dipelajari lebih dulu. Klik kartu untuk melihat alasan dan mencoba demonya.');
    const legend = make('div', 'learn-map-legend');
    [
      ['learn-relation-requires', 'BUTUH DULU'],
      ['learn-relation-depends-on', 'PERLU KONDISI'],
      ['learn-relation-changes', 'MENGUBAH'],
      ['learn-relation-related', 'TERKAIT']
    ].forEach(([className, label]) => {
      const item = make('span', `learn-relation ${className}`, label);
      legend.append(item);
    });
    const routes = make('div', 'learn-map-routes');
    const root = make('div', 'learn-map-root');
    appendMapNode(root, topicByProperty('display'));
    routes.append(root);

    const branches = make('div', 'learn-map-branches');
    const flexRoute = [
      ['display: flex'],
      ['flex-direction', 'flex-wrap', 'justify-content (Flexbox)', 'align-items (Flexbox)', 'gap (Flexbox)', 'flex item properties'],
      ['align-content (Flexbox)']
    ];
    const gridRoute = [
      ['display: grid'],
      ['grid-template-columns', 'grid-template-rows', 'gap (Grid)'],
      ['justify-content (Grid)', 'align-content (Grid)', 'justify-items', 'align-items (Grid)'],
      ['grid-column', 'grid-row', 'grid-area']
    ];
    const routesByContext = [
      { title: 'FLEXBOX', context: 'display: flex', rows: flexRoute, note: 'Mulai dengan display: flex. Setelah item membentuk beberapa baris, align-content bisa mengatur posisi atau jarak antarbaris.' },
      { title: 'GRID', context: 'display: grid', rows: gridRoute, note: 'Mulai dengan display: grid. Tentukan kolom atau baris, lalu gunakan grid-column dan grid-row untuk memilih bagian yang ditempati item.' }
    ];
    routesByContext.forEach((route) => {
      const branch = make('article', 'learn-map-branch');
      const title = make('h4', '', route.title);
      const context = make('div', 'learn-map-context');
      appendMapNode(context, topicByProperty(route.context));
      branch.append(title, context);
      route.rows.slice(1).forEach((properties, index) => {
        const row = make('div', `learn-map-row${index > 0 ? ' learn-map-row-nested' : ''}`);
        row.append(make('span', 'learn-map-arrow', index === 0 ? '↓ setelah konteks aktif' : '↓ property lanjutan'));
        const nodes = make('div', 'learn-map-nodes');
        properties.forEach((property) => {
          const item = topicByProperty(property);
          if (item) appendMapNode(nodes, item);
        });
        row.append(nodes);
        branch.append(row);
      });
      branch.append(make('p', 'learn-map-note', route.note));
      branches.append(branch);
    });

    const positioning = make('article', 'learn-map-branch learn-map-position');
    positioning.append(make('h4', '', 'POSITION & STACKING'));
    appendMapNode(positioning, topicByProperty('position'));
    const positionArrow = make('span', 'learn-map-arrow', '↓ tentukan kotak acuan dan urutan depan-belakang');
    positioning.append(positionArrow);
    const positionNodes = make('div', 'learn-map-nodes');
    appendMapNode(positionNodes, topicByProperty('containing block lab'));
    appendMapNode(positionNodes, topicByProperty('z-index lab'));
    positioning.append(positionNodes, make('p', 'learn-map-note', 'position: absolute perlu kotak acuan untuk menghitung letaknya. z-index mengatur elemen mana yang terlihat di depan; angka besar tidak selalu menang jika elemen berada dalam kelompok lapisan yang berbeda.'));
    branches.append(positioning);

    const areaBranch = make('article', 'learn-map-branch learn-map-grid-area');
    areaBranch.append(make('h4', '', 'DETAIL GRID-AREA'));
    appendMapNode(areaBranch, topicByProperty('grid-area shorthand lab'));
    areaBranch.append(make('p', 'learn-map-note', 'Empat angka bukan nomor cell. Urutannya: row-start / column-start / row-end / column-end. Contoh 4 / 7 / 6 / 5 menempati baris 4–5 dan kolom 5–6.'));
    branches.append(areaBranch);
    routes.append(branches);

    const catalog = make('details', 'learn-map-catalog');
    const summary = make('summary', '', 'Peta semua materi lainnya (dikelompokkan per level)');
    const grid = make('div', 'learn-map-grid');
    catalog.append(summary, grid);
    LEARNING_DATA.forEach((item) => {
      const routed = ['display', 'display: flex', 'display: grid', 'flex-direction', 'flex-wrap', 'justify-content (Flexbox)', 'align-items (Flexbox)', 'align-content (Flexbox)', 'gap (Flexbox)', 'flex item properties', 'grid-template-columns', 'grid-template-rows', 'gap (Grid)', 'justify-content (Grid)', 'align-content (Grid)', 'justify-items', 'align-items (Grid)', 'grid-column', 'grid-row', 'grid-area', 'grid-area shorthand lab', 'position', 'containing block lab', 'z-index lab'].includes(item.property);
      if (routed) return;
      const button = make('button', 'learn-map-node');
      button.type = 'button';
      button.dataset.property = item.property;
      button.dataset.level = item.level;
      const label = make('strong', '', item.property);
      const target = targetFor(item);
      const sectionName = item.target.id
        ? 'Lab interaktif'
        : (target && target.closest('section') ? $('h2', target.closest('section')).textContent.replace(/^\d+\.\s*/, '') : 'Peta dependency');
      button.append(label, make('span', '', `Butuh dulu: ${item.requires.map(mentorText).join(' · ')}`), make('small', 'learn-level', levels.find(([key]) => key === item.level)[1]), make('span', 'learn-map-effect', `Hasil: ${mentorText(item.effect)}`));
      button.addEventListener('click', () => navigateTo(item, button));
      grid.append(button);
    });
    map.append(heading, intro, legend, routes, catalog);
    const flow = $('.dependency-flow', dependencySection);
    (flow || $('h2', dependencySection)).after(map);
  }

  function appendMapNode(parent, item) {
    if (!item) return;
    const button = make('button', 'learn-map-node');
    button.type = 'button';
    button.dataset.property = item.property;
    button.dataset.level = item.level;
    button.append(
      make('strong', '', item.property),
      make('span', 'learn-map-requires', `Butuh dulu: ${item.requires.map(mentorText).join(' · ')}`),
      make('small', 'learn-level', levels.find(([key]) => key === item.level)[1]),
      make('span', 'learn-map-effect', `Hasil: ${mentorText(item.effect)}`)
    );
    button.addEventListener('click', () => navigateTo(item, button));
    parent.append(button);
  }

  function renderFilter() {
    const nav = make('nav', 'learn-filter');
    nav.setAttribute('aria-label', 'Filter materi berdasarkan level');
    const options = [['all', 'Semua'], ...levels];
    options.forEach(([key, label], index) => {
      const button = make('button', 'learn-filter-button', label);
      button.type = 'button';
      button.dataset.level = key;
      button.setAttribute('aria-pressed', String(index === 0));
      nav.append(button);
    });
    main.insertBefore(nav, dependencySection);
    nav.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-level]');
      if (!button) return;
      const selected = button.dataset.level;
      $$('.learn-filter-button', nav).forEach((option) => {
        option.setAttribute('aria-pressed', String(option === button));
      });
      $$('.learn-map-node').forEach((node) => {
        node.classList.toggle('learn-is-dimmed', selected !== 'all' && node.dataset.level !== selected);
      });
      originalSections.forEach((section, index) => {
        if (index === 0) return;
        const item = topicForSection(index);
        section.classList.toggle('learn-is-dimmed', selected !== 'all' && item.level !== selected);
      });
      $$('.learn-lab-card, .learn-axis-card, .learn-containing-card, .learn-grid-area-card').forEach((card) => {
        card.classList.toggle('learn-is-dimmed', selected !== 'all' && card.dataset.level !== selected);
      });
      $$('.learn-start-step').forEach((step) => {
        step.classList.toggle('learn-is-dimmed', selected !== 'all' && step.dataset.level !== selected);
      });
    });
  }

  function buildLabCase(spec) {
    const item = topicByProperty(spec.property);
    const card = make('article', 'learn-lab-card');
    card.id = item.target.id;
    card.dataset.level = item.level;
    card.append(make('h3', '', mentorText(spec.title)));
    appendRequiresBadge(card, item);
    const status = make('p', 'learn-lab-status');
    status.setAttribute('aria-live', 'polite');
    const demo = make('div', `learn-lab-demo learn-lab-demo-${spec.id}`);
    demo.innerHTML = spec.markup;
    const code = make('pre', 'learn-lab-code');
    const prediction = make('fieldset', 'learn-prediction');
    prediction.append(make('legend', '', 'Tebak dulu: apa yang terjadi sekarang?'));
    const predictionFeedback = make('p', 'learn-prediction-feedback', 'Pilih jawaban untuk membuka percobaan.');
    predictionFeedback.setAttribute('aria-live', 'polite');
    const predictions = make('div', 'learn-prediction-options');
    const predictionButtons = [
      make('button', 'learn-prediction-button', 'Belum bekerja sesuai harapan'),
      make('button', 'learn-prediction-button', 'Efeknya sudah terlihat')
    ];
    predictionButtons.forEach((button, index) => {
      button.type = 'button';
      button.dataset.prediction = index === 0 ? 'not-working' : 'working';
      predictions.append(button);
    });
    prediction.append(predictions, predictionFeedback);
    const toggle = make('button', 'learn-lab-toggle', 'Aktifkan syarat awal');
    toggle.type = 'button';
    toggle.disabled = true;
    let predictionResult = '';
    const paint = () => {
      const active = card.classList.contains('learn-is-fixed');
      status.textContent = active ? mentorText(spec.working) : (predictionResult || 'Tebak dulu, lalu aktifkan syarat untuk melihat perbedaannya.');
      predictionFeedback.textContent = active
        ? 'Bandingkan hasil ini dengan tebakanmu.'
        : (predictionResult ? 'Tebakanmu sudah dicatat. Aktifkan syarat untuk membandingkan.' : 'Pilih jawaban untuk membuka percobaan.');
      code.textContent = active ? spec.fixedCode : spec.baseCode;
      toggle.textContent = active ? 'Matikan syarat awal' : 'Aktifkan syarat yang dibutuhkan';
      toggle.setAttribute('aria-pressed', String(active));
    };
    predictionButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const correct = button.dataset.prediction === 'not-working';
        predictionResult = `${correct ? 'Tebakan tepat.' : 'Belum tepat.'} ${mentorText(spec.notWorking)} Sekarang aktifkan syaratnya untuk membandingkan.`;
        predictionButtons.forEach((option) => option.setAttribute('aria-pressed', String(option === button)));
        toggle.disabled = false;
        paint();
      });
    });
    toggle.addEventListener('click', () => {
      card.classList.toggle('learn-is-fixed');
      paint();
    });
    card.append(status, demo, code, prediction, toggle);
    paint();
    return card;
  }

  function buildAxisLab(section) {
    const item = topicByProperty('flex-direction axis lab');
    const card = make('article', 'learn-axis-card');
    card.id = item.target.id;
    card.dataset.level = item.level;
    card.append(make('h3', '', 'Lab arah sumbu Flexbox'));
    appendRequiresBadge(card, item);
    const controls = make('div', 'learn-axis-controls');
    const direction = make('select', 'learn-axis-direction');
    [['row', 'row'], ['row-reverse', 'row-reverse'], ['column', 'column'], ['column-reverse', 'column-reverse']].forEach(([value, label]) => {
      const option = make('option', '', label);
      option.value = value;
      direction.append(option);
    });
    const justify = make('select', 'learn-axis-justify');
    ['flex-start', 'center', 'flex-end', 'space-between'].forEach((value) => {
      const option = make('option', '', value);
      option.value = value;
      justify.append(option);
    });
    const align = make('select', 'learn-axis-align');
    ['flex-start', 'center', 'flex-end'].forEach((value) => {
      const option = make('option', '', value);
      option.value = value;
      align.append(option);
    });
    [[direction, 'flex-direction'], [justify, 'justify-content'], [align, 'align-items']].forEach(([control, label]) => {
      const wrapper = make('label', 'learn-axis-label', label);
      wrapper.append(control);
      controls.append(wrapper);
    });
    const stage = make('div', 'learn-axis-stage');
    const mainAxis = make('span', 'learn-axis-main');
    const crossAxis = make('span', 'learn-axis-cross');
    stage.append(mainAxis, crossAxis, ...['A', 'B', 'C'].map((letter) => make('i', '', letter)));
    const note = make('p', 'learn-axis-note');
    const update = () => {
      stage.style.flexDirection = direction.value;
      stage.style.justifyContent = justify.value;
      stage.style.alignItems = align.value;
      const column = direction.value.startsWith('column');
      const reverse = direction.value.endsWith('reverse');
      mainAxis.textContent = `SUMBU UTAMA ${column ? (reverse ? '↑' : '↓') : (reverse ? '←' : '→')}`;
      crossAxis.textContent = `SUMBU SILANG ${column ? '→' : '↓'}`;
      note.textContent = `justify-content mengatur posisi di sumbu utama (${column ? 'vertikal' : 'horizontal'} pada halaman ini). align-items mengatur posisi di sumbu silang. Coba ubah flex-direction untuk melihat arah sumbunya ikut berubah.`;
    };
    [direction, justify, align].forEach((control) => control.addEventListener('change', update));
    update();
    card.append(controls, stage, note);
    return card;
  }

  function buildContainingBlockLab(section) {
    const item = topicByProperty('containing block lab');
    const card = make('article', 'learn-containing-card');
    card.id = item.target.id;
    card.dataset.level = item.level;
    card.append(make('h3', '', 'Lab: kotak acuan untuk position: absolute'));
    appendRequiresBadge(card, item);
    const note = make('p', 'learn-containing-note', 'Kotak acuan adalah kotak yang dipakai browser untuk menghitung posisi elemen absolute. Di contoh ini, elemen anak awalnya memakai bingkai luar. Aktifkan position: relative pada elemen pembungkus agar pembungkus menjadi patokan.');
    const frame = make('div', 'learn-containing-frame');
    frame.append(make('span', 'learn-containing-label', 'FRAME LUAR · position: relative'));
    const parent = make('div', 'learn-containing-parent');
    parent.append(make('span', '', 'PEMBUNGKUS'), make('i', 'learn-containing-child', 'absolute child'));
    frame.append(parent);
    const status = make('p', 'learn-lab-status');
    status.setAttribute('aria-live', 'polite');
    const toggle = make('button', 'learn-lab-toggle', 'Jadikan elemen induk kotak acuan');
    toggle.type = 'button';
    toggle.setAttribute('aria-pressed', 'false');
    toggle.addEventListener('click', () => {
      const active = parent.classList.toggle('learn-parent-positioned');
      toggle.setAttribute('aria-pressed', String(active));
      toggle.textContent = active ? 'Kembalikan elemen induk ke static' : 'Jadikan elemen induk kotak acuan';
      status.textContent = active
        ? 'Sekarang elemen induk menjadi kotak acuan. Posisi elemen anak dihitung dari tepi elemen induk.'
        : 'Elemen induk masih static, jadi belum menjadi kotak acuan. Elemen anak memakai bingkai luar yang punya position: relative.';
    });
    status.textContent = 'Elemen induk masih static, jadi belum menjadi kotak acuan. Elemen anak memakai bingkai luar yang punya position: relative.';
    card.append(note, frame, status, toggle);
    return card;
  }

  function buildGridAreaLab() {
    const item = topicByProperty('grid-area shorthand lab');
    const card = make('article', 'learn-grid-area-card');
    card.id = item.target.id;
    card.dataset.level = item.level;
    card.append(
      make('h3', '', 'Lab: membaca grid-area: 4 / 7 / 6 / 5'),
      make('p', 'learn-grid-area-intro', 'Bayangkan garis seperti pagar, dan kotak Grid adalah ruang di antara pagar. Angka di kiri menunjukkan garis baris (mendatar); angka di atas menunjukkan garis kolom (tegak). Urutannya: row-start / column-start / row-end / column-end. Dua angka pertama menentukan titik mulai, dua angka terakhir menentukan batas akhir.')
    );
    appendRequiresBadge(card, item);

    const order = make('ol', 'learn-grid-area-order');
    [
      ['4', 'row-start', 'Pilih garis mendatar tempat area mulai.'],
      ['7', 'column-start', 'Pilih garis tegak tempat area mulai.'],
      ['6', 'row-end', 'Pilih garis mendatar sebagai batas akhir area.'],
      ['5', 'column-end', 'Pilih garis tegak sebagai batas akhir area.']
    ].forEach(([number, name, description]) => {
      const step = make('li', 'learn-grid-area-step');
      step.append(make('code', '', number), make('strong', '', name), make('span', '', description));
      order.append(step);
    });
    card.append(order);

    const controls = make('div', 'learn-grid-area-controls');
    const fields = [
      ['rowStart', 'Garis baris mulai (angka di kiri)', 4],
      ['columnStart', 'Garis kolom mulai (angka di atas)', 7],
      ['rowEnd', 'Garis baris akhir (angka di kiri)', 6],
      ['columnEnd', 'Garis kolom akhir (angka di atas)', 5]
    ].map(([key, label, value]) => {
      const wrapper = make('label', 'learn-grid-area-field', label);
      const input = make('input', '');
      input.type = 'number';
      input.min = '1';
      input.max = '11';
      input.step = '1';
      input.value = String(value);
      input.dataset.line = key;
      input.setAttribute('aria-label', `${label}, nomor garis grid`);
      wrapper.append(input);
      controls.append(wrapper);
      return input;
    });

    const figure = make('figure', 'learn-grid-area-figure');
    const colAxis = make('div', 'learn-grid-area-col-lines');
    colAxis.setAttribute('aria-label', 'Garis kolom');
    const rowAxis = make('div', 'learn-grid-area-row-lines');
    rowAxis.setAttribute('aria-label', 'Garis baris');
    const board = make('div', 'learn-grid-area-board');
    const placement = make('div', 'learn-grid-area-placement', 'AREA');
    placement.setAttribute('aria-label', 'Area yang ditempati item Grid');
    board.append(placement);
    figure.append(colAxis, rowAxis, board);
    const code = make('code', 'learn-grid-area-code');
    const explanation = make('p', 'learn-grid-area-explanation');
    explanation.setAttribute('aria-live', 'polite');
    const caption = make('figcaption', '', 'Nomor di kiri menunjukkan baris; nomor di atas menunjukkan kolom. Garis mendatar membatasi baris, garis tegak membatasi kolom. Area ungu mengisi kotak-kotak di antara garis awal dan akhir.');
    figure.append(caption);

    const update = () => {
      const [rowStart, columnStart, rowEnd, columnEnd] = fields.map((field) => Number(field.value));
      const values = [rowStart, columnStart, rowEnd, columnEnd];
      const valid = values.every((value) => Number.isInteger(value) && value >= 1 && value <= 11) &&
        rowStart !== rowEnd && columnStart !== columnEnd;
      order.querySelectorAll('code').forEach((number, index) => {
        number.textContent = String(values[index]);
      });
      fields.forEach((field) => field.setAttribute('aria-invalid', String(!valid)));
      if (!valid) {
        explanation.textContent = 'Masukkan angka garis bulat dari 1 sampai 11. Untuk setiap arah, garis mulai dan garis akhir harus berbeda.';
        return;
      }

      const rowTracks = Math.max(rowStart, rowEnd) - 1;
      const columnTracks = Math.max(columnStart, columnEnd) - 1;
      board.style.gridTemplateRows = `repeat(${rowTracks}, minmax(42px, 1fr))`;
      board.style.gridTemplateColumns = `repeat(${columnTracks}, minmax(42px, 1fr))`;
      board.style.minWidth = `${columnTracks * 52}px`;
      rowAxis.style.minHeight = `${rowTracks * 52}px`;
      colAxis.replaceChildren();
      rowAxis.replaceChildren();
      for (let line = 1; line <= columnTracks + 1; line += 1) {
        const label = make('span', '', String(line));
        label.style.left = `${((line - 1) / columnTracks) * 100}%`;
        colAxis.append(label);
      }
      for (let line = 1; line <= rowTracks + 1; line += 1) {
        const label = make('span', '', String(line));
        label.style.top = `${((line - 1) / rowTracks) * 100}%`;
        rowAxis.append(label);
      }
      board.querySelectorAll('.learn-grid-area-cell').forEach((cell) => cell.remove());
      for (let row = 1; row <= rowTracks; row += 1) {
        for (let column = 1; column <= columnTracks; column += 1) {
          const cell = make('span', 'learn-grid-area-cell', `${row}, ${column}`);
          cell.style.gridRow = String(row);
          cell.style.gridColumn = String(column);
          cell.setAttribute('aria-hidden', 'true');
          board.insertBefore(cell, placement);
        }
      }
      placement.style.gridArea = `${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`;
      code.textContent = `grid-area: ${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd};`;
      const firstRow = Math.min(rowStart, rowEnd);
      const lastRow = Math.max(rowStart, rowEnd);
      const firstColumn = Math.min(columnStart, columnEnd);
      const lastColumn = Math.max(columnStart, columnEnd);
      const rowOrder = rowStart > rowEnd ? 'Angka batas akhir baris lebih kecil dari angka mulai, jadi arah batasnya berbalik. ' : '';
      const columnOrder = columnStart > columnEnd ? 'Angka batas akhir kolom lebih kecil dari angka mulai, jadi arah batasnya berbalik. ' : '';
      explanation.textContent = `grid-area: ${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}. Dua angka pertama adalah titik mulai: garis baris ${rowStart} di kiri dan garis kolom ${columnStart} di atas. Dua angka terakhir adalah batas akhir: garis baris ${rowEnd} dan garis kolom ${columnEnd}. ${rowOrder}${columnOrder}Hasilnya, area menutupi kotak pada baris ${firstRow}–${lastRow - 1} dan kolom ${firstColumn}–${lastColumn - 1}. Garis akhir hanya batas; kotak di seberangnya tidak ikut terisi.`;
    };

    fields.forEach((field) => field.addEventListener('input', update));
    card.append(controls, figure, code, explanation);
    update();
    return card;
  }

  function buildColorVisualizer(section) {
    const card = make('article', 'learn-rgb-card');
    card.setAttribute('aria-labelledby', 'learn-rgb-title');
    card.append(
      make('h3', '', 'Coba ubah warna dengan RGB, HSL, dan HEXA'),
      make('p', 'learn-rgb-intro', 'Pilih cara melihat warnanya. Apa pun yang kamu ubah, kotak pratinjau dan dua format lainnya ikut diperbarui.')
    );
    card.querySelector('h3').id = 'learn-rgb-title';

    const modes = make('div', 'learn-color-modes');
    modes.setAttribute('role', 'group');
    modes.setAttribute('aria-label', 'Pilih format warna');
    const controls = make('div', 'learn-rgb-controls');
    const visual = make('div', 'learn-rgb-visual');
    const swatchFrame = make('div', 'learn-rgb-swatch-frame');
    const swatch = make('div', 'learn-rgb-swatch', 'Pratinjau warna');
    swatch.style.setProperty('transition', 'none', 'important');
    swatch.setAttribute('aria-label', 'Pratinjau warna');
    swatchFrame.append(swatch);
    visual.append(swatchFrame);
    const outputList = make('div', 'learn-color-outputs');
    outputList.setAttribute('aria-label', 'Nilai warna dalam setiap format');
    const outputs = {};
    ['RGB', 'HSL', 'HEXA'].forEach((format) => {
      const row = make('div', 'learn-color-output-row');
      row.append(make('strong', '', format));
      const code = make('code', 'learn-rgb-output');
      code.setAttribute('aria-live', 'polite');
      row.append(code);
      outputList.append(row);
      outputs[format] = code;
    });
    visual.append(outputList);

    const state = { red: 33, green: 150, blue: 120, alpha: 100 };
    let activeMode = 'RGB';
    const modeButtons = {};
    let colorControlValues = {};

    const componentSpecs = {
      RGB: [
      { key: 'red', label: 'Merah (Red)', min: 0, max: 255, unit: '', color: '#d9485f' },
      { key: 'green', label: 'Hijau (Green)', min: 0, max: 255, unit: '', color: '#218c62' },
      { key: 'blue', label: 'Biru (Blue)', min: 0, max: 255, unit: '', color: '#356bd1' }
      ],
      HSL: [
      { key: 'hue', label: 'Warna dasar (Hue)', min: 0, max: 360, unit: '°', color: '#7950b8' },
      { key: 'saturation', label: 'Kuat warna (Saturation)', min: 0, max: 100, unit: '%', color: '#218c62' },
      { key: 'lightness', label: 'Terang/gelap (Lightness)', min: 0, max: 100, unit: '%', color: '#356bd1' }
      ]
    };

    function rgbToHsl(red, green, blue) {
      const r = red / 255;
      const g = green / 255;
      const b = blue / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const delta = max - min;
      let hue = 0;
      let saturation = 0;
      const lightness = (max + min) / 2;

      if (delta !== 0) {
      saturation = delta / (1 - Math.abs(2 * lightness - 1));
      if (max === r) hue = ((g - b) / delta) % 6;
      else if (max === g) hue = (b - r) / delta + 2;
      else hue = (r - g) / delta + 4;
      hue *= 60;
      if (hue < 0) hue += 360;
      }
      return {
      hue: Math.round(hue),
      saturation: Math.round(saturation * 100),
      lightness: Math.round(lightness * 100)
      };
    }

    function hslToRgb(hue, saturation, lightness) {
      const h = hue / 360;
      const s = saturation / 100;
      const l = lightness / 100;
      const chroma = (1 - Math.abs(2 * l - 1)) * s;
      const section = h * 6;
      const x = chroma * (1 - Math.abs(section % 2 - 1));
      let rgb;

      if (section < 1) rgb = [chroma, x, 0];
      else if (section < 2) rgb = [x, chroma, 0];
      else if (section < 3) rgb = [0, chroma, x];
      else if (section < 4) rgb = [0, x, chroma];
      else if (section < 5) rgb = [x, 0, chroma];
      else rgb = [chroma, 0, x];

      const offset = l - chroma / 2;
      return {
      red: Math.round((rgb[0] + offset) * 255),
      green: Math.round((rgb[1] + offset) * 255),
      blue: Math.round((rgb[2] + offset) * 255)
      };
    }

    function currentHex() {
      return `#${[state.red, state.green, state.blue, Math.round(state.alpha * 255 / 100)]
      .map((value) => value.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()}`;
    }

    function updateOutputs() {
      const { red, green, blue, alpha } = state;
      const hsl = rgbToHsl(red, green, blue);
      const alphaValue = (alpha / 100).toFixed(3).replace(/0+$/, '').replace(/\.$/, '') || '0';
      const rgbValue = `${alpha === 100 ? 'rgb' : 'rgba'}(${red}, ${green}, ${blue}${alpha === 100 ? '' : `, ${alphaValue}`})`;
      const hslValue = `${alpha === 100 ? 'hsl' : 'hsla'}(${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}%${alpha === 100 ? '' : `, ${alphaValue}`})`;
      const hexaValue = currentHex();
      outputs.RGB.textContent = `background-color: ${rgbValue};`;
      outputs.HSL.textContent = `background-color: ${hslValue};`;
      outputs.HEXA.textContent = `background-color: ${hexaValue};`;
      swatch.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha / 100})`;
      swatch.style.color = red * 0.299 + green * 0.587 + blue * 0.114 > 150 ? '#172033' : '#fff';
      swatch.setAttribute('aria-label', `Pratinjau warna ${hexaValue}`);
      if (colorControlValues.hexaInput && document.activeElement !== colorControlValues.hexaInput) {
        colorControlValues.hexaInput.value = hexaValue;
      }
      if (colorControlValues.colorPicker) {
        colorControlValues.colorPicker.value = `#${[red, green, blue]
          .map((value) => value.toString(16).padStart(2, '0'))
          .join('')}`;
      }
    }

    function setComponents(mode) {
      controls.replaceChildren();
      colorControlValues = {};
      const hsl = rgbToHsl(state.red, state.green, state.blue);
      if (mode === 'HEXA') {
        const hexRow = make('div', 'learn-rgb-channel learn-hexa-entry');
        const hexLabel = make('label', 'learn-rgb-label', 'Kode warna HEXA');
        const hexInput = make('input', 'learn-hexa-input');
        hexInput.type = 'text';
        hexInput.value = currentHex();
        hexInput.maxLength = 9;
        hexInput.spellcheck = false;
        hexInput.autocomplete = 'off';
        hexInput.setAttribute('aria-describedby', 'learn-hexa-help learn-hexa-status');
        hexInput.setAttribute('aria-label', 'Masukkan warna HEXA dalam format #RRGGBB atau #RRGGBBAA');
        hexLabel.htmlFor = 'learn-hexa-input';
        hexInput.id = 'learn-hexa-input';
        const hexHelp = make('p', 'learn-hexa-help', 'Ubah digit RRGGBB untuk mengganti warna. Dua digit terakhir (AA) mengatur transparansi: 00 tembus, FF pekat.');
        hexHelp.id = 'learn-hexa-help';
        const hexStatus = make('p', 'learn-hexa-status', 'Ketik kode enam digit (#RRGGBB), atau tambahkan dua digit Alpha di belakang (#RRGGBBAA).');
        hexStatus.id = 'learn-hexa-status';
        hexStatus.setAttribute('aria-live', 'polite');
        hexRow.append(hexLabel, hexInput);

        const pickerRow = make('div', 'learn-hexa-picker-row');
        const pickerLabel = make('label', 'learn-rgb-label', 'Pilih warna dengan alat warna');
        const picker = make('input', 'learn-hexa-picker');
        picker.type = 'color';
        picker.value = `#${[state.red, state.green, state.blue]
          .map((value) => value.toString(16).padStart(2, '0'))
          .join('')}`;
        picker.id = 'learn-hexa-picker';
        pickerLabel.htmlFor = picker.id;
        const pickerHelp = make('span', 'learn-hexa-picker-help', 'Alat ini mengubah warna; transparansi tetap mengikuti Alpha pada kode HEXA.');
        pickerRow.append(pickerLabel, picker, pickerHelp);

        hexInput.addEventListener('input', () => {
          const match = hexInput.value.trim().match(/^#?([0-9a-f]{6})([0-9a-f]{2})?$/i);
          const valid = Boolean(match);
          hexInput.setAttribute('aria-invalid', String(!valid));
          if (!valid) {
            hexStatus.textContent = 'Kode belum lengkap atau formatnya keliru. Gunakan #RRGGBB atau #RRGGBBAA; pratinjau menunggu kode yang valid.';
            return;
          }

          state.red = parseInt(match[1].slice(0, 2), 16);
          state.green = parseInt(match[1].slice(2, 4), 16);
          state.blue = parseInt(match[1].slice(4, 6), 16);
          state.alpha = match[2] ? parseInt(match[2], 16) * 100 / 255 : 100;
          hexInput.value = currentHex();
          hexStatus.textContent = 'Kode valid. Pratinjau dan nilai RGB serta HSL sudah diperbarui.';
          updateOutputs();
        });

        picker.addEventListener('input', () => {
          const value = picker.value.slice(1);
          state.red = parseInt(value.slice(0, 2), 16);
          state.green = parseInt(value.slice(2, 4), 16);
          state.blue = parseInt(value.slice(4, 6), 16);
          hexStatus.textContent = 'Warna dari alat warna sudah diterapkan. Alpha tidak berubah.';
          updateOutputs();
          hexInput.value = currentHex();
        });

        controls.append(hexRow, hexHelp, hexStatus, pickerRow);
        colorControlValues.hexaInput = hexInput;
        colorControlValues.colorPicker = picker;
        updateOutputs();
        return;
      }

      const specs = componentSpecs[mode];

      specs.forEach((spec) => {
        const row = make('div', 'learn-rgb-channel');
        const label = make('label', 'learn-rgb-label', spec.label);
        const input = make('input', 'learn-rgb-slider');
        input.type = 'range';
        input.min = String(spec.min);
        input.max = String(spec.max);
        input.step = '1';
        const current = spec.key === 'hue' ? hsl.hue
          : spec.key === 'saturation' ? hsl.saturation
            : spec.key === 'lightness' ? hsl.lightness
              : state[spec.key];
        input.value = String(current);
        input.id = `learn-color-${mode.toLowerCase()}-${spec.key}`;
        input.setAttribute('aria-label', `${spec.label}, nilai ${spec.min} sampai ${spec.max}`);
        input.style.setProperty('--learn-rgb-channel', spec.color);
        label.htmlFor = input.id;
        const value = make('output', 'learn-rgb-value', `${current}${spec.unit}`);
        value.setAttribute('aria-live', 'polite');
        row.append(label, input, value);
        controls.append(row);
        colorControlValues[spec.key] = { input, value, unit: spec.unit };
        input.addEventListener('input', () => {
          const nextValue = Number(input.value);
          if (mode === 'RGB') state[spec.key] = nextValue;
          else {
            const nextHsl = {
              hue: Number(colorControlValues.hue.input.value),
              saturation: Number(colorControlValues.saturation.input.value),
              lightness: Number(colorControlValues.lightness.input.value),
              [spec.key]: nextValue
            };
            Object.assign(state, hslToRgb(nextHsl.hue, nextHsl.saturation, nextHsl.lightness));
          }
          value.textContent = `${nextValue}${spec.unit}`;
          updateOutputs();
        });
      });
    }

    [
      ['RGB', 'Campur merah, hijau, dan biru'],
      ['HSL', 'Atur warna, kuat warna, dan terang'],
      ['HEXA', 'Atur transparansi dan lihat kode HEXA']
    ].forEach(([mode, description]) => {
      const button = make('button', 'learn-color-mode', mode);
      button.type = 'button';
      button.dataset.mode = mode;
      button.setAttribute('aria-pressed', String(mode === activeMode));
      button.title = description;
      button.addEventListener('click', () => {
      activeMode = mode;
      Object.entries(modeButtons).forEach(([key, modeButton]) => {
        modeButton.setAttribute('aria-pressed', String(key === activeMode));
      });
      setComponents(activeMode);
      });
      modeButtons[mode] = button;
      modes.append(button);
    });

    updateOutputs();
    setComponents(activeMode);
    card.append(modes, make('p', 'learn-rgb-mode-help', 'RGB: geser nilai merah, hijau, dan biru. HSL: geser warna dasar, kekuatan warna, dan terang/gelap. HEXA: ketik kode warna sendiri atau pilih warna dengan alat warna. Semua cara mengubah pratinjau yang sama.'), visual, controls, make('p', 'learn-rgb-note', 'Nilai RGB, HSL, dan HEXA di atas selalu menunjukkan warna yang sama dalam tiga cara penulisan.'));
    const existingExamples = $('.value-grid', section);
    if (existingExamples) existingExamples.after(card);
    else section.append(card);
    return card;
  }

  function addSidebarLinks(labSection) {
    const list = $('.topic-list');
    if (!list) return;
    const item = make('li');
    const link = make('a', '', 'Lab sebab-akibat interaktif');
    link.href = `#${labSection.id}`;
    item.append(link);
    list.append(item);
    const areaItem = make('li');
    const areaLink = make('a', '', 'Lab grid-area: angka garis');
    areaLink.href = '#learn-grid-area-lab';
    areaItem.append(areaLink);
    list.append(areaItem);
  }

  renderStartPath();
  renderFilter();
  renderMap();
  originalSections.forEach((section, index) => {
    const item = topicForSection(index);
    if (!item) return;
    appendRequiresBadge(section, item);
    if (index !== 0) renderLearningCard(section, item);
  });
  if (originalSections[4]) buildColorVisualizer(originalSections[4]);

  const labSection = make('section', 'learn-labs');
  labSection.id = 'learn-labs';
  labSection.append(
    make('h2', '', 'LAB SEBAB-AKIBAT INTERAKTIF'),
    make('p', 'learn-labs-intro', 'Pilih tombol untuk menyalakan atau mematikan syarat yang dibutuhkan, lalu bandingkan hasilnya. Ini menunjukkan pola umum; beberapa detail bisa berbeda antar-browser.')
  );
  const labGrid = make('div', 'learn-lab-grid');
  const cases = [
    {
      id: 'wrap', property: 'flex-wrap lab', title: '1. flex-wrap tanpa display: flex',
      markup: '<i>A</i><i>B</i><i>C</i><i>D</i><i>E</i>',
      baseCode: '.container {\n  /* display: flex belum ada */\n  flex-wrap: wrap;\n}',
      fixedCode: '.container {\n  display: flex;\n  flex-wrap: wrap;\n}',
      notWorking: 'Tanpa display: flex, item belum menjadi bagian dari Flexbox, jadi flex-wrap belum bisa membungkusnya ke baris baru.',
      working: 'Setelah display: flex aktif, item menjadi bagian dari Flexbox dan bisa pindah ke baris berikutnya.'
    },
    {
      id: 'justify', property: 'justify-content lab', title: '2. justify-content tanpa flex/grid',
      markup: '<i>A</i><i>B</i><i>C</i>',
      baseCode: '.container {\n  justify-content: center;\n}',
      fixedCode: '.container {\n  display: flex;\n  justify-content: center;\n}',
      notWorking: 'Pada block container biasa, justify-content tidak menyusun anak seperti flex/grid.',
      working: 'Setelah display: flex aktif, justify-content dapat memosisikan item. Pada contoh ini, item berada di tengah.'
    },
    {
      id: 'content', property: 'align-content lab', title: '3. align-content pada satu flex line',
      markup: '<i>A</i><i>B</i><i>C</i><i>D</i>',
      baseCode: '.container {\n  display: flex;\n  height: 160px;\n  align-content: center;\n}',
      fixedCode: '.container {\n  display: flex;\n  flex-wrap: wrap;\n  height: 160px;\n  align-content: center;\n}',
      notWorking: 'Semua item masih muat dalam satu baris. align-content mengatur jarak antarbaris, jadi belum ada baris yang bisa dipindahkan.',
      working: 'Saat flex-wrap membuat lebih dari satu baris, align-content bisa mengatur posisi kumpulan baris itu.'
    },
    {
      id: 'absolute', property: 'absolute positioning lab', title: '4. absolute dan containing block',
      markup: '<span class="learn-lab-frame-label">frame luar · position: relative</span><div class="learn-lab-parent">.parent<i>absolute child</i></div>',
      baseCode: '.parent { position: static; }\n.child { position: absolute; top: 6px; right: 6px; }',
      fixedCode: '.parent { position: relative; }\n.child { position: absolute; top: 6px; right: 6px; }',
      notWorking: 'Parent dengan position: static belum menjadi kotak acuan. Child memakai elemen pembungkus lain yang punya position: relative.',
      working: 'Parent dengan position: relative menjadi kotak acuan child pada demo ini.'
    },
    {
      id: 'z-index', property: 'z-index lab', title: '5. z-index dan stacking',
      markup: '<i class="learn-z-a">A · z-index: 5</i><i class="learn-z-b">B · z-index: 1</i>',
      baseCode: '.a { z-index: 5; }\n.b { z-index: 1; }',
      fixedCode: '.a { position: relative; z-index: 5; }\n.b { position: relative; z-index: 1; }',
      notWorking: 'Di demo ini, kedua elemen masih static. Karena itu z-index belum mengatur mana yang tampil di depan.',
      working: 'Setelah position ditambahkan, z-index dapat mengatur urutan depan-belakang kedua elemen ini.'
    },
    {
      id: 'text-overflow', property: 'text-overflow lab', title: '6. text-overflow tanpa overflow',
      markup: '<div class="learn-lab-text">Teks ini jauh lebih panjang dari kotaknya.</div>',
      baseCode: '.text { white-space: nowrap; text-overflow: ellipsis; }',
      fixedCode: '.text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      notWorking: 'Tanpa clipping overflow, teks masih dapat meluber; ellipsis tidak memotongnya sendiri.',
      working: 'overflow: hidden membatasi teks; text-overflow kemudian bisa menampilkan tanda ...'
    },
    {
      id: 'grid-column', property: 'grid-column lab', title: '7. grid-column tanpa grid context',
      markup: '<i class="learn-grid-a">A · span 2</i><i>B</i><i>C</i><i>D</i>',
      baseCode: '.container { }\n.a { grid-column: span 2; }',
      fixedCode: '.container { display: grid; grid-template-columns: repeat(3, 1fr); }\n.a { grid-column: span 2; }',
      notWorking: 'Wadah ini belum memakai display: grid, jadi grid-column belum punya garis kolom untuk dijadikan acuan.',
      working: 'Setelah display: grid aktif, grid-column bisa membuat item A membentang dua kolom.'
    }
  ];
  cases.forEach((spec) => labGrid.append(buildLabCase(spec)));
  labGrid.append(buildAxisLab(labSection), buildContainingBlockLab(labSection), buildGridAreaLab());
  labSection.append(labGrid);
  main.append(labSection);
  appendRequiresBadge(labSection, topicByProperty('cause-and-effect labs'));
  addSidebarLinks(labSection);
})();
