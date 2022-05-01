var partyCount;
$(document).ready(() => {});

var apiKey = 'w08wk66j63i-lqsbdqbwns';

function getDropper() {
    getPartyCount();
    for (let i = 1; i <= partyCount; i++) {
        $("#partyNamed").html("");
        VoteTrackerContract.methods.getNames(i)
            .call((error, response) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(response[1]);
                    let additive = '<option value="' + response[1] + '"> ' + response[1] + ' </option>';
                    $("#partyNamed").append(additive);
                }
            });
    }
}

function createParty() {
    var partyName = document.getElementById("partyName").value;
    VoteTrackerContract.methods.createParty(partyName)
        .send()
        .then(result => {
            if (result.status === true) {
                alert("Success");
                console.log(result);
            }
        });
}

function generateNewVote() {
    var partyNamed = document.getElementById("partyNamed").value;
    var see = confirm("Confirm you want to vote for: " + partyNamed);
    if (see) {
        generateVote();
    } else {
        location.reload();
    }

}

function generateVote() {
    var partyNamed = document.getElementById("partyNamed").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    VoteTrackerContract.methods.generateVote(partyNamed, email, password, "USA")
        .send()
        .then(result => {
            if (result.status === true) {
                alert("Success, you have voted.");
                console.log(result);
                window.location.href = "./VoterLogin.html";
            }
        }).catch(err => {
            alert("Failure. You have already voted or your login information is incorrect.");
        });
}

function getCount() {
    getPartyCount();
    for (let i = 1; i <= partyCount; i++) {
        $("#counts").html("");
        VoteTrackerContract.methods.getNames(i)
            .call((error, response) => {
                if (error) {
                    console.log(error);
                } else {
                    let additive = "<h1>" + response[0] + " " + response[1] + "</h1>";
                    $("#counts").append(additive);
                }
            });
    }
}

function getPartyCount() {
    VoteTrackerContract.methods.getPartyCount()
        .call((error, response) => {
            if (error) {
                console.log(error);
            } else {
                partyCount = response;
            }
        });
}

function verify() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    VoteTrackerContract.methods.verifyUser(email, password)
        .send()
        .then(result => {
            if (result.status === true) {
                window.location.href = "./VotingPortal.html";
            } else {
                alert("Failure to log in. Please try again.")
            }
        }).catch(err => {
            alert("Failure to log in. Please try again.");
            console.log(err);
        });
}

function register() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var birthdate = document.getElementById("birthdate").value;
    var gender = document.getElementById("gender").value;
    var affiliation = document.getElementById("affiliation").value;
    var state = document.getElementById("state").value;

    VoteTrackerContract.methods.registerUser(email, password, birthdate, gender, affiliation, state)
        .send()
        .then(result => {
            if (result.status === true) {
                alert("Success! Please verify to log-in.");
                console.log(result);
            } else {
                alert("Failure. This account may already exist.");
                console.log(result);
            }
        }).catch(err => {
            alert("Failure. This account may already exist.");
            console.log(err);
        });
}

function adminLogin() {
    var key = document.getElementById("password").value;

    VoteTrackerContract.methods.verifyAdminKey(key)
    .send()
    .then(result => {
        if (result.status === true) {
            window.location.href = "./PartyRegistration.html";
        } else {
            alert("Incorrect admin key.");
        }
    }).catch(err => {
        alert("Incorrect admin key.");
    });
}