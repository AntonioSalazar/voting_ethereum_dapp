
//getting the contract json representation
const VotingContract = artifacts.require('./VotingContract');
const BN = web3.utils.BN;

let instance;
let accounts;
let owner;

contract('VotingContract', async(accs) => {
    accounts = accs;
    moderator = accounts[0];
})

it('Can add a candidate', async() => {
    let instance = await VotingContract.deployed();
    let id = 0;
    let newCandidateName = 'Candidate1'
    let voteCount = 0;
    await instance.addCandidate(newCandidateName, {from: moderator});
    let request = await instance.candidateLookup.call(id);
    console.log(request.toString());
});