import { useState } from "react";
import EmployeeDetailPage from "./features/employee-detail/presentation/pages/EmployeeDetailPage";
import EmployeeDetailDetailPage from "./features/employee-detail/presentation/pages/EmployeeDetailDetailPage";

function App() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {selectedEmployeeId !== null ? (
        <EmployeeDetailDetailPage
          employeeId={selectedEmployeeId}
          onBack={() => setSelectedEmployeeId(null)}
        />
      ) : (
        <EmployeeDetailPage
          onSelect={(employee) => setSelectedEmployeeId(employee.id)}
        />
      )}
    </div>
  );
}

export default App;
