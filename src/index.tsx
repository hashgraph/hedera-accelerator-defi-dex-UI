import { createRoot } from "react-dom/client";
import { DEX } from "./dex-ui";
import { DEXStoreProvider } from "./dex-ui/context";
import { initializeServices } from "./dex-ui/services";
import { DEFAULT_DEX_PROVIDER_PROPS } from "./dex-ui/store";

initializeServices().then(() => {
  const container = document.getElementById("root") as HTMLElement;
  const root = createRoot(container);
  root.render(
    <DEXStoreProvider {...DEFAULT_DEX_PROVIDER_PROPS}>
      <DEX />
    </DEXStoreProvider>
  );
});
