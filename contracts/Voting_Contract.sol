//SPDX-License-Identifier: GPL-3.0
 
pragma solidity >=0.5.0 <0.9.0;

contract Voting{
    address public moderator;
    
    struct Candidate {
        uint256 id;
        string  name;
        uint256 voteCount;
    }
    
    struct Voter {
        string name;
        mapping(address => bool)  hasVoted;
    }
    
    mapping(address => Voter) public votes;
    mapping(uint256 => Candidate) public candidateLookup; //candidates will be identified with an unique ID
    uint256 public candidateCount; //Will be used to track the number of candidates
    
    enum State {beforeStart, running, afterEnd, halted} 
    event AddedCandidate(string _name);
    event Voted( uint256 id, string _name);
    
    State public electionState;
    
    constructor () {
        moderator = msg.sender;
        electionState = State.beforeStart;
        candidateCount = 0; //Not really necesary to initalize to zero as per solidity documentation -> A variable which is declared will have an initial default value whose byte-representation is all zeros. The “default values” of variables are the typical “zero-state” of whatever the type is. For example, the default value for a bool is false. The default value for the uint or int types is 0
    }
    
    
    modifier onlyModerator{
        require(msg.sender == moderator, 'Only the moderator of the election can use this function');
        _;
    }
    
    
    function addCandidate(string memory _name) public onlyModerator returns(bool){
        Candidate storage newCandidate = candidateLookup[candidateCount];
        newCandidate.id = candidateCount;
        newCandidate.name = _name;
        newCandidate.voteCount = 0;
        candidateCount++;
        emit AddedCandidate(_name);
        return true;
    }
    
    function getCandidate(uint256 _id) public view returns(uint256, string memory){
       string memory name = candidateLookup[_id].name;
       uint256 voteCount = candidateLookup[_id].voteCount;
       return (voteCount, name);
    }
    
    function getCandidates() external view returns(string[] memory, uint256[] memory){
        string [] memory names = new string[](candidateCount);
        uint256[] memory voteCounts = new uint[](candidateCount);
        for (uint256 i = 0; i < candidateCount; i++) {
            names[i] = candidateLookup[i].name;
            voteCounts[i] = candidateLookup[i].voteCount;
        }
        return (names, voteCounts);

    }
    
    function vote(uint256 _id, string memory _name) public returns(bool){
        Voter storage newVoter = votes[msg.sender];
        require(_id >= 0 && _id <= candidateCount, 'There is no candidate with the specified ID');
        require(newVoter.hasVoted[msg.sender] == false, 'You can only vote one time!');
        candidateLookup[_id].voteCount++;
        newVoter.name = _name;
        newVoter.hasVoted[msg.sender] = true;
        emit Voted(_id, _name);
        return true;
    }
}