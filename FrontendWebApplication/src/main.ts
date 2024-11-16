import { initFederation } from '@angular-architects/native-federation';
import { environment } from './environments/environment';

const federationManifest = environment.federationManifest;

initFederation(federationManifest)
  .catch((err) => console.error(err))
  .then(() => import('./bootstrap'))
  .catch((err) => console.error(err));