
//getting the contract json representation
const VotingContract = artifacts.require('./VotingContract');
const BN = web3.utils.BN;

let instance;
let accounts;
let owner;
let id = 0;
let candidate1 = 'Candidate1';
let candidate2 = 'Candidate2';
let voter = 'voter1';
let voteCount = 0;
contract('VotingContract', async(accs) => {
    accounts = accs;
    moderator = accounts[0];
})

it('Can add a candidate', async() => {
    let instance = await VotingContract.deployed();
    await instance.addCandidate(candidate1, {from: moderator});
    let request = await instance.candidateLookup.call(id);
    assert.equal(request[0], id);
    assert.equal(request[1], candidate1);
    assert.equal(request[2], voteCount);
});

it('can get candidate', async() => {
    let instance = await VotingContract.deployed();
    let getCandidate = await instance.getCandidate(id);
    let getCandidateName = getCandidate[0].toString();
    let getCandidateVoteCount = getCandidate[1].toNumber();
    assert.equal(getCandidateName, candidate1); //name
    assert.equal(getCandidateVoteCount, voteCount); //vote count
})

it('can get all candidates', async() => {
    let instance = await VotingContract.deployed();
    await instance.addCandidate(candidate2, {from: moderator});
    let getCandidates = await instance.getCandidates();
    assert.equal(getCandidates[0][0], candidate1); // candidate1 -name
    assert.equal(getCandidates[1][0], 0);          // candidate1 -number of votes   
    assert.equal(getCandidates[0][1], candidate2); // candidate2 -name
    assert.equal(getCandidates[1][1], 0)           // candidate2 -number of votes 
})

it('can vote', async() => {
    let instance = await VotingContract.deployed();
    await instance.vote(id, voter, {from: accounts[1]});
    
})