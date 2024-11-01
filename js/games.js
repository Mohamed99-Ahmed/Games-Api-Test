// options of api
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'a154be7c05msh82aa036e7debe18p1035a4jsnb6baa41aa515',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};
// class games export to index.js file
export class Games{
    constructor(category){
        this.category = category;
    }
    async getGamesCateg(){
        let games = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.category}&sort-by=release-date`,options);
        let res = await games.json();
        console.log(games)
        return res;
    }
}



