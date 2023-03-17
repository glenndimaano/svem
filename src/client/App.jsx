import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";
import { PolarisProvider } from "./providers/PolarisProvider";
import { AppBridgeProvider } from "./providers/AppBridgeProvider"
import { QueryProvider } from "./providers/QueryProviders"

import Routes from "./Routes"

function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  // const [count, setCount] = useState(0);

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <NavigationMenu
              navigationLinks={[
                {
                  label: "Page name",
                  destination: "/pagename",
                },
              ]}
            />
            <Routes pages={pages} />
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}

export default App;
