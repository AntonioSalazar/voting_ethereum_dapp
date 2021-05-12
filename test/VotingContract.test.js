
//getting the contract json representation
const VotingContract = artifacts.require('./VotingContract');
const BN = web3.utils.BN;

let instance;
let accounts;
let owner;
let id = 0;
let newCandidateName = 'Candidate1';
let voteCount = 0;
contract('VotingContract', async(accs) => {
    accounts = accs;
    moderator = accounts[0];
})

it('Can add a candidate', async() => {
    let instance = await VotingContract.deployed();
    await instance.addCandidate(newCandidateName, {from: moderator});
    let request = await instance.candidateLookup.call(id);
    assert.equal(request[0], id);
    assert.equal(request[1], newCandidateName);
    assert.equal(request[2], voteCount);
});

it('can get candidate', async() => {
    let instance = await VotingContract.deployed();
    await instance.addCandidate(newCandidateName, {from: moderator});
    let getCandidate = await instance.getCandidate(id);
    let getCandidateName = getCandidate[0].toString();
    let getCandidateVoteCount = getCandidate[1].toNumber();
    assert.equal(getCandidateName, newCandidateName); //name
    assert.equal(getCandidateVoteCount, voteCount); //vote count
})