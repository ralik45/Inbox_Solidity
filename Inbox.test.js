// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const  {abi, evm} = require('../compile');

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Halo';

beforeEach(async () => {
    // Get a list of accounts
    accounts = await web3.eth.getAccounts();

    // Use one of the account to deploy contract
    inbox = await new web3.eth.Contract(abi)
    .deploy({
        data: evm.bytecode.object,
        arguments: [INITIAL_MESSAGE]
    })
    .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
    it('deploy contract', () => {
        assert.ok(inbox.options.address);
    })

    it('has initial message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MESSAGE);
    });

    it('can change message value', async () => {
        await inbox.methods.setMessage('Hai').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hai');
    })
})