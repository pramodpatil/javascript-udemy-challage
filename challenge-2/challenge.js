
var teamJohnAvg, teamMikeAvg, teamMerryAvg;
var teamJohnPlay1 = 100, teamJohnPlay2 = 100, teamJohnPlay3 = 100;
var teamMikePlay1 = 100, teamMikePlay2 = 100, teamMikePlay3 = 100;

teamJohnAvg = teamJohnPlay1 + teamJohnPlay2 + teamJohnPlay3 / 3;
teamMikeAvg = teamMikePlay1 + teamMikePlay2 + teamMikePlay3 / 3;

console.log(teamMikeAvg, teamJohnAvg);
if(teamJohnAvg === teamMikeAvg) {
    console.log('The match finished up with draw and score of both team is ' + teamMikeAvg);
} else if(teamJohnAvg > teamMikeAvg) {
    console.log('The match is woned by John\'s team and it\'s score is ' + teamJohnAvg);
} else {
    console.log('The match is woned by Mike\'s team and it\'s score is ' + teamMikeAvg);
}

var teamMerryPlay1 = 100, teamMerryPlay2 = 100, teamMerryPlay3 = 100;

teamMerryAvg = teamMerryPlay1 + teamMerryPlay2 + teamMerryPlay3 / 3;

switch(true) {
    case teamJohnAvg > teamMikeAvg &&  teamJohnAvg > teamMerryAvg : 
        console.log('The match is woned by John\'s team and it\'s score is ' + teamJohnAvg);
        break;
    case teamMikeAvg > teamJohnAvg &&  teamMikeAvg > teamMerryAvg : 
        console.log('The match is woned by Mike\'s team and it\'s score is ' + teamMikeAvg);
        break;  
    case teamMerryAvg > teamJohnAvg &&  teamMerryAvg > teamMikeAvg : 
        console.log('The match is woned by Merry\'s team and it\'s score is ' + teamMerryAvg);
        break;  
    default:    
        console.log('The match is drawn and team\'s score are  ' + teamJohnAvg, teamMikeAvg, teamMerryAvg);   
}
