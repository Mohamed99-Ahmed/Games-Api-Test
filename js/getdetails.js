//opition of api (method and headers)
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'a154be7c05msh82aa036e7debe18p1035a4jsnb6baa41aa515',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};
// make class from game details that you can take object from it
export class GameDetails{
    constructor(id){
        this.id = id
    }
    async getGameDetails(){
        let game = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.id}`,options);
        let res = await game.json();
        return res;
    }
}




