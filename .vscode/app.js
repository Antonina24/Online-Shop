
fetch("products.json")
    .then(response => response.json())
    .then(data => {
        const products = data.products.data.items;
        const proizvodi = document.getElementById("products");
        const ProizvodiUKorpi = document.getElementById("korpaItems");
        const ukupnaCenaEl = document.getElementById("ukupnaCena");
        const korpa= [];

        function prikazProizvoda() {
            proizvodi.innerHTML = "";

            data.products.data.items.forEach(product => {
                const productEl = kreiranjeProizvoda(product);

                const dodajUKorpuBtn = document.createElement("button");
                dodajUKorpuBtn.textContent = "Dodaj u korpu";
                dodajUKorpuBtn.addEventListener("click", function() {
                    dodajUKorpu(product);
                });
                productEl.appendChild(dodajUKorpuBtn);

                proizvodi.appendChild(productEl);
            });
        }
        function kreiranjeProizvoda(product) {
            const productEl = document.createElement("div");
            productEl.className = "product";

            const ime = document.createElement("h3");
            ime.textContent = product.name;
            productEl.appendChild(ime);

            const cena = document.createElement("p");
            cena.textContent = "Cena: $" + product.price.toFixed(2);
            productEl.appendChild(cena);

            const opis = document.createElement("p");
            opis.textContent = product.description;
            productEl.appendChild(opis);

            const featuresEl = document.createElement("p");
            featuresEl.textContent = product.features;
            productEl.appendChild(featuresEl);

            const keywordsEl = document.createElement("p");
            keywordsEl.textContent = product.keywords;
            productEl.appendChild(keywordsEl);

            const urlEl = document.createElement("p");
            urlEl.textContent = product.url;
            productEl.appendChild(urlEl);

            const categoryEL = document.createElement("p");
            categoryEL.textContent = product.category;
            productEl.appendChild(categoryEL);

            const subcategoryEl = document.createElement("p");
            subcategoryEl.textContent = product.subcategory;
            productEl.appendChild(subcategoryEl);

            const imagesEl = document.createElement("img");
            imagesEl.src= product.images[0];
            productEl.appendChild(imagesEl);

            return productEl;
        }


        function pretrazivanjeProizvoda(keyword) {
            const filteredProducts = products.filter(product => {
                const ime = product.name.toLowerCase();
                return ime.includes(keyword.toLowerCase());
            });

            prikazFiltriranihProizvoda(filteredProducts);
        }

        function prikazFiltriranihProizvoda(filteredProducts) {
            proizvodi.innerHTML = "";

            if (filteredProducts.length === 0) {
                const nemaRezultata = document.createElement("p");
                nemaRezultata.textContent = "Nisu nadjeni proizvodi";
                proizvodi.appendChild(noResultsElement);
            } else {
                filteredProducts.forEach(product => {
                    const productEl = document.createElement("div");
                    productEl.className = "product";

                    const ime = document.createElement("h3");
                    ime.textContent = product.name;
                    productEl.appendChild(ime);

                    const cena = document.createElement("p");
                    cena.textContent = "Cena: $" + product.price.toFixed(2);
                    productEl.appendChild(cena);

                    const opis = document.createElement("p");
                    opis.textContent = product.description;
                    productEl.appendChild(opis);

                    proizvodi.appendChild(productEl);
                });
            }
        }
        function dodajUKorpu(product) {
            korpa.push(product);
            prikaziProizvodeUKorpi();
            prikazUkupneCene();

        }

        function izbrisiIzKorpe(product) {
            const index = korpa.findIndex(item => item.id === product.id);
            if (index !== -1) {
                korpa.splice(index, 1);
                prikaziProizvodeUKorpi();
                prikazUkupneCene();

            }
        }
        function prikaziProizvodeUKorpi() {
            ProizvodiUKorpi.innerHTML = "";

            if (korpa.length === 0) {
                const emptyCart = document.createElement("p");
                emptyCart.textContent = "Vasa korpa je prazna";
                ProizvodiUKorpi.appendChild(emptyCart);
            } else {
                korpa.forEach(product => {
                    const productEl = kreiranjeProizvoda(product);

                    const izbrisiIzKorpeBtn = document.createElement("button");
                    izbrisiIzKorpeBtn.textContent = "Ukloni";
                    izbrisiIzKorpeBtn.addEventListener("click", function() {
                        izbrisiIzKorpe(product);
                    });
                    productEl.appendChild(izbrisiIzKorpeBtn);

                    ProizvodiUKorpi.appendChild(productEl);
                });
            }
        }
        function prikazUkupneCene() {
            const ukupnaCena = korpa.reduce((sum, product) => sum + product.price, 0);
            ukupnaCenaEl.textContent = "Ukupna cena: $" + ukupnaCena.toFixed(2);
        }


        prikazProizvoda();
        prikaziProizvodeUKorpi();
        prikazUkupneCene();

        const searchInput = document.getElementById("searchInput");
        searchInput.addEventListener("input", function() {
            const keyword = searchInput.value;
            pretrazivanjeProizvoda(keyword);
        });
       
    });
