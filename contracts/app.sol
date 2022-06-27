// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract smartapp{


   struct patient
  {
  
      uint patientid;
      string fullname;
      string adds;
      string gender;
  
  }
  patient[] public patientarray;
  function addPatient(uint _patientid,string memory _fullname,string memory _adds,string memory _gender) public {
         patientarray.push(patient(_patientid,_fullname,_adds,_gender));
  } 
}
