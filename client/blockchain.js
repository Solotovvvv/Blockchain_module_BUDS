let contract;
let currentAccount;

document.addEventListener('DOMContentLoaded', async () => {
    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');

    if (typeof window.ethereum !== 'undefined') {
 
        const web3 = new Web3(window.ethereum);

        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            currentAccount = accounts[0]; // Assign to the higher-scoped variable
            
            console.log('Current Ethereum address:', currentAccount);

            const contractAddress = '0x299352C5AAB104362dEB8fF4544e64848CfFbfeB';
            const contractAbi =  [
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "dataHash",
                    "type": "bytes32"
                  }
                ],
                "name": "DataStored",
                "type": "event"
              },
              {
                "inputs": [
                  {
                    "internalType": "string",
                    "name": "newName",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "newNumber",
                    "type": "uint256"
                  }
                ],
                "name": "storeData",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                  }
                ],
                "name": "getData",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              }
            ];

            contract = new web3.eth.Contract(contractAbi, contractAddress);

            ethereum.on('accountsChanged', newAccounts => {
                console.log('Accounts changed:', newAccounts);
                currentAccount = newAccounts[0]; // Update the higher-scoped variable
                console.log('Updated Ethereum address:', currentAccount);
            });

            ethereum.on('chainChanged', chainId => {
                console.log('Network changed:', chainId);
            });

            // DataTable initialization
            $('#approvedDepartment').DataTable({
                'serverSide': true,
                'processing': true,
                'paging': true,
                "columnDefs": [
                    { "className": "dt-center", "targets": "_all" },
                ],
                'ajax': {
                    'url': 'approvedtbl.php',
                    'type': 'post',
                },
                'fnCreateRow': function (nRow, aData, iDataIndex) {
                    $(nRow).attr('id', aData[0]);
                },
            });
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    } else {
        console.log('MetaMask or an Ethereum-compatible wallet is not installed.');
    }
});
async function getDataFromContract(userAddress) {
  try {
    const result = await contract.methods.getData(userAddress).call();
    console.log('Data from contract:', result);

    const name = result[0];
    const number = result[1];
    const timestamp = result[2];
    const dataHash = result[3];

    console.log('Name:', name);
    console.log('Number:', number);
    console.log('Timestamp:', timestamp);
    console.log('Data Hash:', dataHash);

    $.post("update_data.php", {
      name: name,
      duration: number,
      dataHash: dataHash
  }, function (data, status) {
      console.log('Data upadated into database:', status);
  });
  } catch (error) {
    console.error('Error:', error);
  }


  
}


function Edit2(update) {
    $('#hiddendata2').val(update);
    $.post("update_blockchain.php", { update: update }, function (data, status) {
        var userid1 = JSON.parse(data);
        $('#Update_Name').val(userid1.name);
    });
    $('#update_department').modal("show");
}



async function update2() {
  try {
    const updateData = {
      name: $('#Update_Name').val(),
      duration: parseInt($('#Update_Duration').val()),
    };

    const gasEstimate = await contract.methods.storeData(updateData.name, updateData.duration)
      .estimateGas({ from: currentAccount });

    const gasLimit = gasEstimate + 10000;

    const tx = await contract.methods.storeData(updateData.name, updateData.duration)
      .send({ from: currentAccount, gas: gasLimit });

    console.log('Transaction Result:', tx);

     // Retrieve data after updating
     const userAddress = currentAccount; // Replace with the appropriate user address
     await getDataFromContract(userAddress);
    

    $('#update_department').modal('hide');
  } catch (error) {
    console.error('Error:', error);
  }
}

