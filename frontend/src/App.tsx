import { Route, Routes } from "react-router";

import { AppShell } from "./app/AppShell";
import { HealthPage } from "./features/health/HealthPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HealthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
