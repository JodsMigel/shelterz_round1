import '@nomiclabs/hardhat-ethers';
import './type-extensions';
import { silenceWarnings } from '@openzeppelin/upgrades-core';
import type { DeployFunction } from './deploy-proxy';
import type { PrepareUpgradeFunction } from './prepare-upgrade';
import type { UpgradeFunction } from './upgrade-proxy';
import type { DeployBeaconFunction } from './deploy-beacon';
import type { DeployBeaconProxyFunction } from './deploy-beacon-proxy';
import type { UpgradeBeaconFunction } from './upgrade-beacon';
import type { ForceImportFunction } from './force-import';
import type { ChangeAdminFunction, TransferProxyAdminOwnershipFunction, GetInstanceFunction } from './admin';
export interface HardhatUpgrades {
    deployProxy: DeployFunction;
    upgradeProxy: UpgradeFunction;
    prepareUpgrade: PrepareUpgradeFunction;
    deployBeacon: DeployBeaconFunction;
    deployBeaconProxy: DeployBeaconProxyFunction;
    upgradeBeacon: UpgradeBeaconFunction;
    forceImport: ForceImportFunction;
    silenceWarnings: typeof silenceWarnings;
    admin: {
        getInstance: GetInstanceFunction;
        changeProxyAdmin: ChangeAdminFunction;
        transferProxyAdminOwnership: TransferProxyAdminOwnershipFunction;
    };
    erc1967: {
        getAdminAddress: (proxyAdress: string) => Promise<string>;
        getImplementationAddress: (proxyAdress: string) => Promise<string>;
        getBeaconAddress: (proxyAdress: string) => Promise<string>;
    };
    beacon: {
        getImplementationAddress: (beaconAddress: string) => Promise<string>;
    };
}
//# sourceMappingURL=index.d.ts.map