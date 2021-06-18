function exibePesquisa(response){
    let divTela = document.getElementById('tela');
    let texto = '';
    //let data = new Date (filme.release_date);

    console.log(response);
    let dados = JSON.parse(response)["results"];
    console.log(dados)
    for(i=0;i< dados.length; i++){
        let filme = dados[i];
        texto = texto + `
        <div class="news rounded mx-auto d-block" style="margin-left: 20px"; "margin-top: 20px"; "margin-bottom: 20px;display: flex" ;>
        <div>
            <img style="width:170; height:310px; margin-right: 30px; "
                src=https://image.tmdb.org/t/p/w500/${filme.poster_path}
                alt="">
        </div>
        <div style="width: 300px;">
            <a href="https://www.themoviedb.org/movie/${filme.id}" style="text-decoration:none; color: rgb(33, 37, 41)">
                <h5>
                    <b>${filme.title}</b>
                </h5>
            </a>
            <p>
                ${filme.overview}
            </p>
            <span class="badge rounded-pill bg-dark">${filme.release_date}</span> 
        </div>
    </div>`;
    } 

    divTela.innerHTML = texto
}

function executaPesquisa(){
    
    console.log(document)
    
    
    let xhr = new XMLHttpRequest ();
    xhr.open('GET', `https://api.themoviedb.org/3/search/movie?api_key=fe6129bad157b982541b0fea3e97772e&language=pt-BR&query=${filmePesquisa}&page=1&include_adult=true`)
    xhr.onload = () => { exibePesquisa (xhr.response);}
    xhr.send();
    console.log(`https://api.themoviedb.org/3/search/movie?api_key=fe6129bad157b982541b0fea3e97772e&language=pt-BR&query=${filmePesquisa}&page=1&include_adult=true`);
    console.log(xhr.response);
    

    
}

var filmePesquisa;

function valorCampo(value){
    this.filmePesquisa = value;
    console.log(filmePesquisa);
}