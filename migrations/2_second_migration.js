const Migrations = artifacts.require("smartapp");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
