"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployBeaconImpl = exports.deployProxyImpl = exports.getDeployData = void 0;
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const utils_1 = require("ethers/lib/utils");
const deploy_1 = require("./deploy");
const options_1 = require("./options");
const validations_1 = require("./validations");
async function getDeployData(hre, ImplFactory, opts) {
    const { provider } = hre.network;
    const validations = await (0, validations_1.readValidations)(hre);
    const unlinkedBytecode = (0, upgrades_core_1.getUnlinkedBytecode)(validations, ImplFactory.bytecode);
    const encodedArgs = ImplFactory.interface.encodeDeploy(opts.constructorArgs);
    const version = (0, upgrades_core_1.getVersion)(unlinkedBytecode, ImplFactory.bytecode, encodedArgs);
    const layout = (0, upgrades_core_1.getStorageLayout)(validations, version);
    const fullOpts = (0, options_1.withDefaults)(opts);
    return { provider, validations, unlinkedBytecode, encodedArgs, version, layout, fullOpts };
}
exports.getDeployData = getDeployData;
async function deployProxyImpl(hre, ImplFactory, opts, proxyAddress) {
    const deployData = await getDeployData(hre, ImplFactory, opts);
    await (0, upgrades_core_1.processProxyKind)(deployData.provider, proxyAddress, opts, deployData.validations, deployData.version);
    let currentImplAddress;
    if (proxyAddress !== undefined) {
        // upgrade scenario
        currentImplAddress = await (0, upgrades_core_1.getImplementationAddress)(deployData.provider, proxyAddress);
    }
    return deployImpl(deployData, ImplFactory, opts, currentImplAddress);
}
exports.deployProxyImpl = deployProxyImpl;
async function deployBeaconImpl(hre, ImplFactory, opts, beaconAddress) {
    const deployData = await getDeployData(hre, ImplFactory, opts);
    let currentImplAddress;
    if (beaconAddress !== undefined) {
        // upgrade scenario
        await (0, upgrades_core_1.assertNotProxy)(deployData.provider, beaconAddress);
        currentImplAddress = await (0, upgrades_core_1.getImplementationAddressFromBeacon)(deployData.provider, beaconAddress);
    }
    return deployImpl(deployData, ImplFactory, opts, currentImplAddress);
}
exports.deployBeaconImpl = deployBeaconImpl;
async function deployImpl(deployData, ImplFactory, opts, currentImplAddress) {
    (0, upgrades_core_1.assertUpgradeSafe)(deployData.validations, deployData.version, deployData.fullOpts);
    const layout = deployData.layout;
    if (currentImplAddress !== undefined) {
        const manifest = await upgrades_core_1.Manifest.forNetwork(deployData.provider);
        const currentLayout = await (0, upgrades_core_1.getStorageLayoutForAddress)(manifest, deployData.validations, currentImplAddress);
        if (opts.unsafeSkipStorageCheck !== true) {
            (0, upgrades_core_1.assertStorageUpgradeSafe)(currentLayout, deployData.layout, deployData.fullOpts);
        }
    }
    const impl = await (0, upgrades_core_1.fetchOrDeploy)(deployData.version, deployData.provider, async () => {
        const abi = ImplFactory.interface.format(utils_1.FormatTypes.minimal);
        const deployment = Object.assign({ abi }, await (0, deploy_1.deploy)(ImplFactory, ...deployData.fullOpts.constructorArgs));
        return { ...deployment, layout };
    }, opts);
    return { impl, kind: opts.kind };
}
//# sourceMappingURL=deploy-impl.js.map