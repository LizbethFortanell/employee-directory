import { useState } from "react";
import { useGetEmployeesQuery } from "../../data/employeesApi";
import EmployeesTable from "../components/EmployeesTable";
import EmployeeCreateForm from "../components/EmployeeCreateForm";

export default function EmployeesPage() {
  const { data: employees, isLoading, error } = useGetEmployeesQuery();
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-8 mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Failed to load employees. Make sure the mock API is running.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-8 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Employees</h2>
          <p className="mt-1 text-sm text-gray-500">
            {employees?.length ?? 0} team members
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          {showCreateForm ? "Cancel" : "Add Employee"}
        </button>
      </div>
      {showCreateForm && (
        <div className="mb-8">
          <EmployeeCreateForm
            onSuccess={() => setShowCreateForm(false)}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}
      <EmployeesTable employees={employees ?? []} />
    </div>
  );
}
