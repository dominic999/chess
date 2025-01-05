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
        mutari.push(mutare[0]);
        mutare[0].classList.add("mutarePosibila");
        //?Aici ferific daca a facut deja o miscare sau nu
        if(rand == 2 || rand == 7){
            let patrat = coloana.concat(" ").concat((rand+2*cul).toString());
            let mutare = document.getElementsByClassName(patrat);
            mutari.push(mutare[0]);
            mutare[0].classList.add("mutarePosibila");
        }
        }
    
    
    // toatePiesele.forEach((piesa) => {
    //     piesa.addEventListener("click", () =>{
    //         //! Deselectez piesa anterioare si o selectez pe cea curenta
    //         var selectie = document.getElementsByClassName("selected");
    //         if(selectie[0] != null){
    //             selectie[0].classList.remove("selected");
    //         }
    //         var mutariPosibile = document.getElementsByClassName("mutarePosibila");
    //         while(mutariPosibile.length > 0){
    //             let cerc = document.getElementsByClassName("cerc");
    //             // mutariPosibile[0].removeChild(cerc[0]);
    //             mutariPosibile[0].classList.remove("mutarePosibila");
    //         }
    //         piesa.classList.add("selected");
    //         let i = piesa.src.lastIndexOf("/");
    //         let j = piesa.src.lastIndexOf(".");
    //         var numePiesa = piesa.src.slice(i+1, j);
    //         var pozitieActuala = Array.from(piesa.classList).slice(0, 2);
    //         if(numePiesa[0] == "p"){
    //             let pionNou = new Piesa(numePiesa[0], numePiesa[1].toLowerCase(), pozitieActuala);
    //             miscarePion(pionNou);
    //         }
    //         var parinte = document.getElementsByClassName(pozitieActuala.join(" "))[0];
    //         console.log(parinte);
    //         afisareMutariPosibile();
    //         listaMutari = document.querySelectorAll(".mutarePosibila");
    //         //!Aici vom face functia pentru a muta o piesa efectiv
    //         listaMutari.forEach((mutare) => {
    //             mutare.addEventListener("click", (e)=>{
    //                 let pozActuala = Array.from(e.target.parentElement.classList);
    //                 pozActuala = pozActuala.slice(0,2);
    //                 //?O sa scoatem piesa de pe pozitia ei actual si o punem la pozitia curenta
    //                 let cerc = document.querySelectorAll(".cerc");
    //                 //!Aici scot toate cercurile
    //                 cerc.forEach((cercut)=> {
    //                     let parinte = cercut.parentElement;
    //                     parinte.removeChild(cercut);
    //                 })
    //                 //!Aici scot piesa de pe pozitia actuala si o mut pe cea noua
    //                 mutare.appendChild(piesa);
    //                 parinte.removeChild(piesa);
    //                 piesa.classList.remove("selected");
    //                 piesa.classList.remove(pozitieActuala[0]);
    //                 piesa.classList.remove(pozitieActuala[1]);
    //                 piesa.classList.add(pozActuala[0]);
    //                 piesa.classList.add(pozActuala[1]);
    //             })
    //         })
    //     })
    // })
     
    // let piesa_selectata = document.getElementsByClassName("selected");
    // piesa_selectata.forEach(piesa => {
        // piesa.addEventListener("click", () => {
        //     console.log("mergre");
        // })
    //}) 
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
            piesa.id = "selected";
            var pozitieActuala = Array.from(parinte.classList).slice(0, 2);
            console.log("poz" + pozitieActuala);
            var piesaActuala = new Piesa(nume[0], nume[1].toLowerCase(), pozitieActuala);
            if(nume[0] == "p"){
                console.log("pion");
                miscarePion(piesaActuala);
            }
            afisareMutariPosibile();
        })
    })
    var celula = Array.from(document.querySelectorAll("#tabla div"));
    celula.forEach(element => {
        element.addEventListener("click", e => {
            if(e.target.classList.contains("cerc")){
                var piesa = document.getElementById("selected");
                console.log(e.target.parentElement.childNodes);
                e.target.parentElement.appendChild(piesa);
                removeMutariAnterioare();
                let misc = document.getElementsByClassName("miscarePosibilla");
                console.log(misc);
            }

        })
    });
}