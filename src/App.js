/* 
  Buradan başlayın ve iç içe geçmiş bileşenlere doğru ilerleyin.
  Projedeki tüm dosyalara kod eklenmesi gerekmez.
  Nerelerde değişiklik yapmanız gerektiğini anlamak için her dosyayı inceleyin.
*/

// State hook u import edin

import React, { useState } from "react";
import Gonderiler from "./bilesenler/Gonderiler/Gonderiler";
import AramaCubugu from "./bilesenler/AramaCubugu/AramaCubugu";
import sahteVeri from "./sahte-veri";
// Gönderiler (çoğul!) ve AramaÇubuğu bileşenlerini import edin, çünkü bunlar App bileşeni içinde kullanılacak
// sahteVeri'yi import edin
import "./App.css";

const App = () => {
  const [gonderiler, setGonderiler] = useState(sahteVeri);
  const [arama, setArama] = useState("");
  const [begendiklerim, setBegendiklerim] = useState([]);
  // Gönderi nesneleri dizisini tutmak için "gonderiler" adlı bir state oluşturun, **sahteVeri'yi yükleyin**.
  // Artık sahteVeri'ye ihtiyacınız olmayacak.
  // Arama çubuğunun çalışması için , arama kriterini tutacak başka bir state'e ihtiyacımız olacak.

  const gonderiyiBegen = gonderiID => {
    const guncellenmisGonderiler = gonderiler.map(post => {
      if (gonderiID === post.id && !begendiklerim.includes(gonderiID)) {
        post.likes++;
        begendiklerim.push(gonderiID);
        setBegendiklerim(begendiklerim);
      }
      return post;
    });
    setGonderiler(guncellenmisGonderiler);
    /*
      Bu fonksiyon, belirli bir id ile gönderinin beğeni sayısını bir artırma amacına hizmet eder.

      Uygulamanın durumu, React ağacının en üstünde bulunur, ancak iç içe geçmiş bileşenlerin stateleri değiştirememesi adil olmaz!
      Bu fonksiyon, belirli bir gönderinin beğeni sayısını artırılmasına olanak sağlamak amacıyla iç içe geçmiş bileşenlere aktarılır.

	  "setGonderi" yi çağırın ve state ine "posts.map" çağrısını iletin.
      `map` içine iletilen callback aşağıdaki mantığı gerçekleştirir:
        - gönderinin idsi "gonderiID" ile eşleşirse, istenen değerlerle yeni bir gönderi nesnesi döndürün.
        - aksi takdirde, sadece gönderi nesnesini değiştirmeden döndürün.
     */
  };
  const changeHandler = event => {
    setArama(event.target.value);
    const filterGonderiler = sahteVeri.filter(item => {
      return item.username.includes(event.target.value);
    });
    setGonderiler(filterGonderiler);
  };
  return (
    <div className="App">
      {/* Yukarıdaki metni projeye başladığınızda silin*/}
      <AramaCubugu
        arama={arama}
        setArama={setArama}
        changeHandler={changeHandler}
      />
      <Gonderiler gonderiler={gonderiler} gonderiyiBegen={gonderiyiBegen} />
    </div>
  );
};

export default App;
