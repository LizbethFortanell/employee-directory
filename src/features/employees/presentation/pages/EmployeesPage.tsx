import { useGetEmployeesQuery } from "../../data/employeesApi";
import EmployeesTable from "../components/EmployeesTable";

export default function EmployeesPage() {
  const { data: employees, isLoading, error } = useGetEmployeesQuery();

  if (isLoading) {
    return <p className="p-8 text-gray-500">Loading employees...</p>;
  }

  if (error) {
    return <p className="p-8 text-red-600">Failed to load employees.</p>;
  }

  return (
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Employees</h2>
      <EmployeesTable employees={employees ?? []} />
    </div>
  );
}
