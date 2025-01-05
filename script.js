window.onload = () => {


    //!Aici vom creea piesele
    class Piese{
        pioni = new Array();
        ture = new Array();
        cai = new Array();
        nebuni = new Array();
        regina;
        rege;
    }

    var pieseAlb = new Piese();
    var pieseNegru = new Piese();

    class Piesa{
        //?Piesele vor fi format "caracter caracter"(tip: p, c, t, r(rege), n, k(regina))
        constructor(tip, culoare, pozitie){
            this.tip = tip;
            this.culoare = culoare;
            this.pozitie = pozitie;
            poz = this.pozitie[0].concat(" ").concat(this.pozitie[1]);
        }
        mutare;
        piesa = document.getElementsByClassName(poz)[0];
    }

    //! Aici facem tabla
    var tabla = document.getElementById("tabla");
    var counter = 0;
    for (var i = 0; i < 9; i++){
        var a = 65;
        for(var j = 0; j < 9; j++){
            let celula = document.createElement("div");
            tabla.appendChild(celula);  
            celula.classList.add(String.fromCharCode(a-1))
            celula.classList.add(9-i);
            celula.style.boxSizing = "border-box";
            if(i == 0 && j != 0){
                celula.innerHTML = String.fromCharCode(a-1);
                celula.style.backgroundColor = "#0e0d26";j
            }
            if(j == 0 && i!=0){
                celula.innerHTML = 9-i;
                celula.style.backgroundColor = "#0e0d26";j
            }
            if(j == 0 && i == 0){
                celula.style.backgroundColor = "#0e0d26";
            }
            if(i!=0 && j!=0){
                if(counter%2 ==0){
                    celula.style.backgroundColor = "#cce8e8";
                }else{
                    celula.style.backgroundColor = "#112e2e";
                }
            }

            //?Aici o sa adaug piesele
            if((i == 1 || i == 2 || i == 7 || i == 8) && j != 0){
                var piesa = document.createElement("img");
                piesa.classList.add(String.fromCharCode(a-1))
                piesa.classList.add(9-i);
                piesa.style.width = "6vw";
                piesa.style.height = "6vw";
                celula.appendChild(piesa);
                var poz = celula.classList;
            }

            //!Pioni 
            if((i == 2 || i ==7) && j != 0){
                if(i == 2){
                    piesa.src = "pieseSah/pN.svg"
                    let pion = new Piesa("p", "n", poz);
                    pieseNegru.pioni.push(pion);
                    
                }else{
                    piesa.src = "pieseSah/pA.svg"
                    let pion = new Piesa("p", "a", poz);
                    pieseAlb.pioni.push(pion);
                }
            }

            //!Rege si regina
            if(j == 4 && i == 1){
                piesa.src = "pieseSah/kN.svg"
                let regina = new Piesa("k", "n", poz)
                pieseNegru.regina = regina;
            }
            if(j == 5 && i == 1){
                piesa.src = "pieseSah/rN.svg"
                let rege = new Piesa("r", "n", poz);
                pieseNegru.rege = rege;
            }
            
            if(j == 5 && i == 8){
                piesa.src = "pieseSah/rA.svg"
                let rege = new Piesa("r", "a", poz);
                pieseAlb.rege = rege;
            }
            if(j == 4 && i == 8){
                piesa.src = "pieseSah/kA.svg"
                let regina = new Piesa("k", "a", poz);
                pieseAlb.regina = regina;
            }

            //!Ture
            if((j == 1 || j == 8) && i == 1){
                piesa.src = "pieseSah/tN.svg"
                let tura = new Piesa("t", "n", poz);
                pieseNegru.ture.push(tura);
            }
            if((j == 1 || j == 8) && i == 8){
                piesa.src = "pieseSah/tA.svg"
                let tura = new Piesa("t", "a", poz);
                pieseAlb.ture.push(tura);
            }

            //!Cai
            if((j == 2 || j == 7) && i==1){
                piesa.src = "pieseSah/cN.svg"
                let cal = new Piesa("c", "n", poz);
                pieseNegru.cai.push(cal);
            }
            if((j == 2 || j == 7) && i==8){
                piesa.src = "pieseSah/cA.svg"
                let cal = new Piesa("c", "a", poz);
                pieseAlb.cai.push(cal);
            }

            //!Nebuni
            if((j == 3 || j == 6) && i == 1){
                piesa.src = "pieseSah/nN.svg"
                let nebun = new Piesa("n", "n", poz)
                pieseNegru.nebuni.push(nebun);
            }
            if((j == 3 || j == 6) && i == 8){
                piesa.src = "pieseSah/nA.svg"
                let nebun = new Piesa("n", "a", poz)
                pieseAlb.nebuni.push(nebun);
            }

            counter++;
            a++;
        }
    }

    //!Aici vom face functionalitatea


    function afisareMutariPosibile(){
        var mutariPosibile = document.getElementsByClassName("mutarePosibila");
        for (let i = 0; i < mutariPosibile.length; i++){
            var cerc = document.createElement("div");
            cerc.classList.add("cerc");
            cerc.style.width = "3vw";
            cerc.style.height = "3vw";
            mutariPosibile[i].appendChild(cerc);
        }
        }
    
    function removeMutariAnterioare(){
        var mutari = document.getElementsByClassName("mutarePosibila");
        while(mutari.length > 0){
            var copii = Array.from(mutari[0].childNodes);
            mutari[0].removeChild(copii[0]);
            mutari[0].classList.remove("mutarePosibila");
        }
        var capturari = document.getElementsByClassName("capture");
        while(capturari.length > 0){
            capturari[0].classList.remove("capture");
        }

    }

    //?Pozitia va fi lista de clase html a piesei, de forma A 9
    function miscarePion(piesa){
        
        //? Dacac pionul este alb vom lasa cul = 1, daca nu fa vi -1
        var cul = 1;
        if(piesa.culoare ==  "n"){
            cul = -1;
        }
        var mutari = new Array();
        var pozitie = piesa.pozitie;
        var rand = parseInt(pozitie[1]);
        var coloana = pozitie[0];
        let patrat = coloana.concat(" ").concat((rand+cul).toString());
        let mutare = document.getElementsByClassName(patrat);
        console.log(patrat);
        mutari.push(mutare[0]);
        //?Aici trebuie sa verificam daca are ceva in fata
        if (mutare[0].childNodes.length == 0){
            mutare[0].classList.add("mutarePosibila");
        }
        //?Aici ferific daca a facut deja o miscare sau nu
        if(rand == 2 || rand == 7){
            let patrat = coloana.concat(" ").concat((rand+2*cul).toString());
            let mutare = document.getElementsByClassName(patrat);
            mutari.push(mutare[0]);
            //?Aici se verifica daca este ceva deja pe acel patrtat
            if (mutare[0].childNodes.length == 0){
                mutare[0].classList.add("mutarePosibila");
            }
        }
        //?Aici se va verifica daca este ceva de capturat
        var capturare = new Array();
        let colNumar = coloana.charCodeAt(0);
        colNumar++;
        colNumar = String.fromCharCode(colNumar);
        capturare[0] = colNumar.concat(" ").concat((rand+cul).toString());
        colNumar = coloana.charCodeAt(0);
        colNumar--;
        colNumar = String.fromCharCode(colNumar);
        capturare[1] = colNumar.concat(" ").concat((rand+cul).toString());
        var index = 0;
        while(index < capturare.length){
            if(capturare[index][0] > "A" && capturare[index][0] < "I"){
                let patratActual = document.getElementsByClassName(capturare[index])
                if(patratActual[0].childNodes.length != 0){
                    patratActual[0].classList.add("capture");
                }
            }
            index++;
        }
    }

    function miscareNebun(){
         
    }
    
    
    //! Trebuie sa tin cont de randul jucatorului
    var rand = 0;
    let toatePiesele = document.querySelectorAll("div img");
    var listaMutari;
    toatePiesele.forEach(piesa => {
        piesa.addEventListener("click", (e) => { 
            let parinte = e.target.parentElement;
            removeMutariAnterioare();
            let x = piesa.src.lastIndexOf("/");
            let y = piesa.src.lastIndexOf(".");
            var nume = piesa.src.slice(x+1, y);
            var piesaSelectata = document.getElementById("selected");
            if(piesaSelectata != null){
                piesaSelectata.removeAttribute("id");
            }
            if(rand % 2 == 0 && nume[1] == "A"){
                piesa.id = "selected";
                var pozitieActuala = Array.from(parinte.classList).slice(0, 2);
                var piesaActuala = new Piesa(nume[0], nume[1].toLowerCase(), pozitieActuala);
                if(nume[0] == "p"){
                    miscarePion(piesaActuala);
                }
            }
            if(rand % 2 == 1 && nume[1] == "N"){
                piesa.id = "selected";
                var pozitieActuala = Array.from(parinte.classList).slice(0, 2);
                var piesaActuala = new Piesa(nume[0], nume[1].toLowerCase(), pozitieActuala);
                if(nume[0] == "p"){
                    miscarePion(piesaActuala);
                }
            }
            afisareMutariPosibile();
        })
    })
    var celula = Array.from(document.querySelectorAll("#tabla div"));
    celula.forEach(element => {
        element.addEventListener("click", e => {
            if(e.target.classList.contains("cerc")){
                var piesa = document.getElementById("selected");
                e.target.parentElement.appendChild(piesa);
                removeMutariAnterioare();
                rand++;
            }
            if(e.currentTarget.classList.contains("capture")){
                console.log(e.target);
                var piesa = document.getElementById("selected");
                var piesaCapturata = e.target.childNodes[0];
                e.target.removeChild(piesaCapturata);
                e.target.appendChild(piesa);
                e.target.classList.remove("capture");
                removeMutariAnterioare();
                rand++;
            }

        })
    });
}