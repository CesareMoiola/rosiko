const setMatch = function(match){
    localStorage.setItem("match", JSON.stringify(match));
}

const getMatch = function(){
    let stringify = localStorage.getItem("match");
    return JSON.parse(stringify);
}

export default{
    setMatch,
    getMatch
};