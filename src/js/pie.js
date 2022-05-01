var partyCount;
var voterCount;
var data = [];
var genderData = [];
var MaleCount = 0;
var FemaleCount = 0;

document.getElementById("button2").disabled = true;
document.getElementById("button3").disabled = true;

function loadChart() {
    var chart = anychart.pie();
    chart.title("RESULTS");
    console.log(data);
    chart.data(data);
    chart.container('container');
    chart.draw();

    var genderChart = anychart.pie();
    genderChart.title("Voters By Gender");

    console.log("Loading Gender Data Male Count:" + MaleCount + " Female Count:" + FemaleCount);
    genderData.push({ x: "Male", value: MaleCount.toString(), normal: {fill: "#059BE6" } });
    genderData.push({ x: "Female", value: FemaleCount.toString(), normal: {fill: "#E16BCF" }});

    console.log(genderData);
    genderChart.data(genderData);
    genderChart.container('container2');
    genderChart.draw();

    document.getElementById("button3").disabled = true;
}

function getData() {
    //gets voting results for parties
    for (let i = 1; i <= partyCount; i++) {
        VoteTrackerContract.methods.getNames(i)
            .call((error, response) => {
                document.getElementById("button3").disabled = false;
                data.push({ x: response[1], value: response[0] });
            });
    }
    console.log(data);
    
    //gets data for Voters By Gender piechart
    for (let i = 1; i <= voterCount; i++) {
        VoteTrackerContract.methods.getGenders(i).call((error, response) => {
            if (error) {
                console.log(error);
            } else {
                const gender = response;
                if (gender === "M"){
                    MaleCount++;
                }
                if (gender === "F"){
                    FemaleCount++;
                }
                //console.log("genders:" + gender);
                console.log("Male Count:" + MaleCount + " Female Count:" + FemaleCount);
            }
        });
    }

    document.getElementById("button2").disabled = true;
    document.getElementById("button3").disabled = false;

}

function getPartyCount() {
    VoteTrackerContract.methods.getPartyCount()
        .call((error, response) => {
            if (error) {
                console.log(error);
            } else {
                partyCount = response;
                console.log("Party count:" + partyCount);
            }
        });

    VoteTrackerContract.methods.getVoterCount()
    .call((error, response) => {
        if (error) {
            console.log(error);
        } else {
            voterCount = response;
            console.log("Voter count:" + voterCount);
        }
    });
    
    document.getElementById("button1").disabled = true;
    document.getElementById("button2").disabled = false;
}