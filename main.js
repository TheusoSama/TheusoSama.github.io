const apiKey = 'fe6129bad157b982541b0fea3e97772e';
var dadosApi;

function carregarFilmesDestaque(genero=''){
    parouEm = 0;
    let requisicao = new XMLHttpRequest;
    requisicao.open('GET', `https://api.themoviedb.org/3/discover/movie?api_key=fe6129bad157b982541b0fea3e97772e&language=pt-BR&region=BR&include_adult=true&page=1&with_genres=${genero}`);
    requisicao.onload = () => {
        setTimeout(()=>{
            posts = JSON.parse(requisicao.responseText)["results"];
        
            
            for(let i=0; i<4; i++){

                let mobile = '';
                if(i<2){
                    mobile = 'mobile-hide medium-hide';
                }

                let id = posts[i]["id"];
                let titulo = posts[i]["title"];
                let foto = posts[i]["poster_path"];

                let filmeAdicionado = document.getElementById("filmeAdicionado");

                if (parouEm==0){
                    filmeAdicionado.innerHTML = `
                    <div align="center" class="col-sm-12 col-md-6 col-lg-3 detalhesFilme ${mobile}">
                        <div ><a href="https://www.themoviedb.org/movie/${id}" target="_blank"><img  src="https://image.tmdb.org/t/p/w300/${foto}" alt=""></a><h6 class="texto">${titulo}</h6></div>
                    </div>`;
                }
                else{
                    filmeAdicionado.innerHTML += `
                    <div align="center" class="col-sm-12 col-md-6 col-lg-3 detalhesFilme ${mobile}">
                        <div><a href="https://www.themoviedb.org/movie/${id}" target="_blank"><img src="https://image.tmdb.org/t/p/w300/${foto}" alt=""></a><h6 class="texto">${titulo}</h6></div>
                    </div>`;
                }
                

                parouEm++;
            }
            
        },200);
    };
    requisicao.send();
    

}

carregarFilmesDestaque();

function carregarMaisFilmes(){
    let continua = parouEm;
    let pare = parouEm+3;

    if(parouEm==20){
        alert("Limite máximo de filmes alcançado");
    }

    for(let i=continua; i<(pare+1); i++){

        let mobile = '';
        if(i%2==0){
            mobile = 'mobile-hide medium-hide';
        }

        let id = posts[i]["id"];
        let title = posts[i]["title"];
        let foto = posts[i]["poster_path"];

        let filmeAdicionado = document.getElementById("filmeAdicionado");
        filmeAdicionado.innerHTML += `
        <div align="center" class="col-sm-12 col-md-6 col-lg-3 detalhesFilme ${mobile}">
            <div><a href="https://www.themoviedb.org/movie/${id}" target="_blank"><img src="https://image.tmdb.org/t/p/w300/${foto}" alt=""></a><h6 class="texto">${title}</h6></div>
        </div>`;
        console.log("imprime posts");

        parouEm++;
    }
    console.log("Carregou ", parouEm, " posters");
}

function carregaPrincipal(){
    let xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://api.themoviedb.org/3/trending/movie/day?api_key=fe6129bad157b982541b0fea3e97772e&language=pt-BR');
    xhr.onload = () => {
        if(xhr.status != 200){
            alert("Falha ao Carregar Conteudo Principal, Por favor recarregue");
        }

        let item = JSON.parse(xhr.responseText)["results"];
        console.log(item);
        let i = 0;

        if (i==0){
            let addItem = document.getElementById("addItem");
                    addItem.innerHTML = '';
        }
        var loop = setInterval(()=>{

            let ativo = '';
            if (i == 0){
                ativo = 'active';
            }

            let id = item[i]["id"];
            console.log(id, i);
            let titulo = item[i]["title"];
            let sinopse = item[i]["overview"];
            let estrela = item[i]["vote_average"]/2;
            let lancamento = item[i]["release_date"].replaceAll('-', '/');
            let popularidade = item[i]["popularity"];
            let nota = parseInt(estrela);
            let votos = item[i]["vote_count"];
            console.log(estrela)

            if (sinopse.length == 0){
                sinopse = 'Sinopse não encontrada'
            }

            xhr.open('GET', `https://api.themoviedb.org/3/movie/${id}/videos?api_key=fe6129bad157b982541b0fea3e97772e&language=pt-BR`);
            xhr.onload = ()=> {
                console.log("pega video principal")
                setTimeout(()=>{
                    let lista = ['pera', 'mamão', 'limão']
                    let chave = JSON.parse(xhr.response)["results"][0]["key"];
                    console.log(chave, i);
                    let addItem = document.getElementById("addItem");
                    addItem.innerHTML += `
                    <div class="carousel-item  ${ativo}">
                        <div class="row lancamento-conteudo">
                            <div class="col-sm-12 col-md-6 trailer">
                                <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/${chave}" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <div class="col-sm-11 col-md-6 lancamento-text rainbow">
                                <div>
                                    <h2>${titulo}</h2>      
                                    <div class="sinopse">                       
                                    <strong>Sinopse:</strong>
                                    ${sinopse}
                                    </div>
                                    <br><strong>Popularidade no TMDB: </strong>${popularidade}<strong>
                                    <br><strong>Estreia: </strong> ${lancamento}
                                    <br><Strong>Avaliação:</Strong>
                                    <span class="estrelas"><i class="fas fa-star"></i> ${estrela} <span class="notaAvaliacao"></span></span>
                                    <br><Strong>votos: </Strong><span class="estrelas">${votos}</span>
                                    <br><a href="https://www.themoviedb.org/movie/${id}" target="_blank"><button type="button" class="btn btn-dark detalhesFilme">Mais Info</button></a>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    console.log("imprime principal")
                }, 25);
                i++;
                if(i == 20){
                    clearInterval(loop);
                    console.log("para setInterval")
                }
            };
            xhr.onerror = ()=> {
                alert("deu ruim");
            }
            xhr.send();
        }, 100);
    };
    xhr.send();
    console.log("pega principal")
    
}
carregaPrincipal();