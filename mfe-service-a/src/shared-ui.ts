// Utility to cleanly import parcels from @shared-ui/shared-ui
// This avoids repetitive System.import().then() patterns

// Cache the loading promise to avoid multiple imports
let loadingPromise: Promise<any> | null = null;

function getSharedUi(): Promise<any> {
  if (!loadingPromise) {
    loadingPromise = System.import("@shared-ui/shared-ui");
  }
  return loadingPromise;
}

// Export individual parcel loaders - clean and reusable
export const ButtonParcel = () => getSharedUi().then((m) => m.ButtonParcel);
export const FeeSummaryParcel = () =>
  getSharedUi().then((m) => m.FeeSummaryParcel);

// Add more parcels here as needed:
// export const ModalParcel = () => getSharedUi().then((m) => m.ModalParcel);
