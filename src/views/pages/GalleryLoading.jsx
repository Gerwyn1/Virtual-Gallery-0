import "@src/index.css";
import React, { useEffect } from "react";


const Loading = () => {
  useEffect(() => {

    const script = document.createElement("script");
    script.src = "http://localhost:5173/src/three.js";
    script.async = true;
    script.defer = true;
    script.type='module'
    document.body.append(script);
     }, []);
  return (
    <>
      <div className="preloader-overlay">
        <h1 className="load-h1">Virtual Gallery POC</h1>
        <h4 className="load-h4">Stay Tuned! Loading assets...</h4>
        <div className="demo-container">
          <div className="progress-bar">
            <div className="progress-bar-value"></div>
          </div>
        </div>

        <div className="tips-overlay">
          <div className="tips-item">
            <div className="tips-img">
              <img src="./src/assets/images/floor-icon.webp" />
            </div>
            <h5>Click the floor to navigate</h5>
          </div>
          <div className="tips-item">
            <div className="tips-img">
              <img src="./src/assets/images/wall-icon.webp" />
            </div>
            <h5>Hold click and drag to move view</h5>
          </div>
          <div className="tips-item">
            <div className="tips-img">
              <img src="./src/assets/images/zoom-icon.webp" />
            </div>
            <h5>Click description to enlarge</h5>
          </div>
        </div>
      </div>

      <div className="annotation artwork-1">
        <div className="annotation-exit">X</div>
        <div className="artistName">Raphael</div>
        <div className="artName">
          The School of Athens,<span>1784</span>
        </div>
        <div className="artTech">Fresco</div>
        <div className="artDesc">
          The School of Athens (Italian: Scuola di Atene) is a fresco by the
          Italian Renaissance artist Raphael. The fresco was painted between
          1509 and 1511 as a part of Raphael&apos;s commission to decorate the
          rooms now known as the Stanze di Raffaello, in the Apostolic Palace in
          the Vatican. It depicts a congregation of philosophers,
          mathematicians, and scientists from Ancient Greece, including Plato,
          Aristotle, Pythagoras, Archimedes, and Heraclitus.
        </div>
      </div>
      <div className="annotation artwork-2">
        <div className="annotation-exit">X</div>
        <div className="artistName">Rembrandt</div>
        <div className="artName">
          The Return of the Prodigal Son,<span>1661-1669</span>
        </div>
        <div className="artTech">Oil on canvas</div>
        <div className="artDesc">
          The Return of the Prodigal Son (Dutch: De terugkeer van de verloren
          zoon) is an oil painting by Rembrandt, part of the collection of the
          Hermitage Museum in St. Petersburg. It is among the Dutch
          master&apos;s final works, likely completed within two years of his
          death in 1669.
        </div>
      </div>
      <div className="annotation artwork-3">
        <div className="annotation-exit">X</div>
        <div className="artistName">Johannes Vermeer</div>
        <div className="artName">
          Girl with a Pearl Earring,<span>c. 1665</span>
        </div>
        <div className="artTech">Oil on canvas</div>
        <div className="artDesc">
          Girl With A Pearl Earring (Dutch: Meisje met de parel) is an oil
          painting by Dutch Golden Age painter Johannes Vermeer, dated c. 1665.
          Going by various names over the centuries, it became known by its
          present title towards the end of the 20th century after the earring
          worn by the girl portrayed there. The work has been in the collection
          of the Mauritshuis in The Hague since 1902 and has been the subject of
          various literary and cinematic treatments.
        </div>
      </div>
      <div className="annotation artwork-4">
        <div className="annotation-exit">X</div>
        <div className="artistName">Jacques-Louis David</div>
        <div className="artName">
          Oath of the Horatii,<span>1784</span>
        </div>
        <div className="artTech">Oil on canvas</div>
        <div className="artDesc">
          Oath of the Horatii (French: Le Serment des Horaces), is a large
          painting by the French artist Jacques-Louis David painted in 1784 and
          1785 and now on display in the Louvre in Paris. The painting
          immediately became a huge success with critics and the public, and
          remains one of the best known paintings in the NeoclassNameical style.
        </div>
      </div>
      <div className="annotation artwork-5">
        <div className="annotation-exit">X</div>
        <div className="artistName">John Ritto Penniman</div>
        <div className="artName">
          ClassNameical Landscape,<span>1822-1826</span>
        </div>
        <div className="artTech">Oil on wood</div>
        <div className="artDesc">
          John Ritto Penniman, Moses A. Swett, Joseph Vernet, ClassNameical
          Landscape, 1822-1826, oil on wood, 17 1/4 x 31 1/2 in. (43.9 x
          80.1cm), Smithsonian American Art Museum, Gift of Mrs. George Viault,
          1970.185
        </div>
      </div>
      <div className="annotation artwork-6">
        <div className="annotation-exit">X</div>
        <div className="artistName">Andy Warhol</div>
        <div className="artName">
          Shot Marilyns,<span>1964</span>
        </div>
        <div className="artTech">Silkscreen</div>
        <div className="artDesc">
          Shot Marilyns is a series of silkscreen paintings produced in 1964 by
          Andy Warhol, each canvas measuring 40 inches square, and each a
          portrait of Marilyn Monroe. In 1964, Warhol created portraits of
          Monroe based on a publicity photo for her 1953 film Niagara. He
          painted five Marilyn silkscreen portraits with different colored
          backgrounds: red, orange, light blue, sage blue, and turquoise, and
          stored them at The Factory, his studio on East 47th Street in
          Manhattan.
        </div>
      </div>
      <div className="annotation artwork-7">
        <div className="annotation-exit">X</div>
        <div className="artistName">Roy Lichtenstein</div>
        <div className="artName">
          Whaam!,<span>1963</span>
        </div>
        <div className="artTech">Magna acrylic and oil on canvas</div>
        <div className="artDesc">
          Whaam! is a 1963 diptych painting by the American artist Roy
          Lichtenstein. It is one of the best-known works of pop art, and among
          Lichtenstein&apos;s most important paintings. Whaam! was first
          exhibited at the Leo Castelli Gallery in New York City in 1963, and
          purchased by the Tate Gallery, London, in 1966. It has been on
          permanent display at Tate Modern since 2006.
        </div>
      </div>
      <div className="annotation artwork-8">
        <div className="annotation-exit">X</div>
        <div className="artistName">David Hockney</div>
        <div className="artName">
          The Splash,<span>1966</span>
        </div>
        <div className="artTech">Acrylic on canvas</div>
        <div className="artDesc">
          The Splash is a 1966 pop art painting by the British artist David
          Hockney. It depicts a swimming pool beside a pavilion, disturbed by a
          splash of water created by an unseen figure who has apparently just
          jumped in from a diving board. It is made in acrylic on a 72 in (180
          cm) square canvas, and is titled, signed and dated 1966 on the
          reverse.
        </div>
      </div>
      <div className="annotation artwork-9">
        <div className="annotation-exit">X</div>
        <div className="artistName">David Hockney</div>
        <div className="artName">
          A Bigger Splash,<span>1967</span>
        </div>
        <div className="artTech">Acrylic on canvas</div>
        <div className="artDesc">
          A Bigger Splash is a 1967 large pop art painting by British artist
          David Hockney. Measuring 242.5 centimetres (95.5 in) by 243.9
          centimetres (96.0 in), it depicts a swimming pool beside a modern
          house, disturbed by a large splash of water created by an unseen
          figure who has apparently just jumped in from a diving board. It was
          painted in California between April and June 1967, when Hockney was
          teaching at the University of California, Berkeley.
        </div>
      </div>
      <div className="annotation artwork-10">
        <div className="annotation-exit">X</div>
        <div className="artistName">Deslancer</div>
        <div className="artName">
          Cube,<span>2018</span>
        </div>
        <div className="artTech">Abstract art on cinema4d</div>
        <div className="artDesc">
          Infinity cube to an edge of edgeless infinity. Look, observe and stare
          while being mesmerized by the endless spiral into the infinity of the
          infinity cube.
        </div>
      </div>
      <div className="annotation artwork-11">
        <div className="annotation-exit">X</div>
        <div className="artistName">Miao Lai Lai</div>
        <div className="artName">
          Deer Sculpture,<span>2022</span>
        </div>
        <div className="artTech">3D Model</div>
        <div className="artDesc">
          Beautiful 3D Deer Sculpture! Made in my spare time between projects. I
          modeled this deer in hopes to use it for a study in painting textures,
          but I have yet to have enough time to dig into that. I figured
          I&apos;d upload it now with its rigging, sculpting, and modeling
          finished, and when I finish the texturing I&apos;d replace or
          separately upload that version.
        </div>
      </div>
      <div className="annotation artwork-12">
        <div className="annotation-exit">X</div>
        <div className="artistName">Daniel Chapelle</div>
        <div className="artName">
          Abstract animal Statue,<span>2021</span>
        </div>
        <div className="artTech">Abstract art on blender3D</div>
        <div className="artDesc">From Antwerp Belgium</div>
      </div>
      <div className="annotation artwork-13">
        <div className="annotation-exit">X</div>
        <div className="artistName">Sciroccorics</div>
        <div className="artName">
          Twisted Icosahedron,<span>2020</span>
        </div>
        <div className="artTech">Stereolithography</div>
        <div className="artDesc">
          Abstract model composed of two concentric icosahedric shapes, with
          twisted edges linking inner and outer shapes. This piece is part of a
          series of abstract shapes.
        </div>
      </div>
      <div className="annotation artwork-14">
        <div className="annotation-exit">X</div>
        <div className="artistName">Jimmy Gunawan</div>
        <div className="artName">
          Bsvgman Icosphere,<span>2021</span>
        </div>
        <div className="artTech">Stereolithography</div>
        <div className="artDesc">
          Abstract model composed of two concentric icosahedric shapes, with
          twisted edges linking inner and outer shapes. This piece is part of a
          series of abstract shapes.
        </div>
      </div>
      <div className="annotation artwork-15">
        <div className="annotation-exit">X</div>
        <div className="artistName">mbz_music</div>
        <div className="artName">
          Sv Icosphere Fun,<span>2021</span>
        </div>
        <div className="artTech">Blender3D</div>
        <div className="artDesc">
          A little fun project i made with Sverchok/Nortikin. This piece is part
          of a series of abstract shapes
        </div>
      </div>

      <div className="empty-annotation"></div>
      {/* <script type='module' src='../three.js'></script> */}
    </>
  );
};

export default Loading;
