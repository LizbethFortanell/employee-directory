import { useMemo, useState } from "react";
import { useGetEmployeeDetailsQuery, useCreateEmployeeMutation, useGetDetailDepartmentsQuery } from "../../data/employee-detailApi";
import type { Employee, EmployeeFormData } from "../../domain/employee-detail.types";
import EmployeeDetailTable from "../components/EmployeeDetailTable";
import EmployeeDetailForm from "../components/EmployeeDetailForm";
import DepartmentFilter from "../../../employees/presentation/components/DepartmentFilter";

interface EmployeeDetailPageProps {
  onSelect?: (employee: Employee) => void;
}

export default function EmployeeDetailPage({ onSelect }: EmployeeDetailPageProps) {
  const { data: employees, isLoading, error } = useGetEmployeeDetailsQuery();
  const { data: departments } = useGetDetailDepartmentsQuery();
  const [createEmployee, { isLoading: isCreating }] = useCreateEmployeeMutation();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const filteredEmployees = useMemo(() => {
    if (!employees) return [];
    if (!selectedDepartment) return employees;
    return employees.filter((e) => e.department === selectedDepartment);
  }, [employees, selectedDepartment]);

  const handleCreate = async (data: EmployeeFormData) => {
    await createEmployee(data).unwrap();
    setShowCreateForm(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
        <p className="text-sm text-gray-500">Loading employees...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-4 mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:mx-8">
        Failed to load employees. Make sure the mock API is running.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Directory</h1>
          <p className="mt-1 text-sm text-gray-500">
            {filteredEmployees.length} team member{filteredEmployees.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          {showCreateForm ? "Cancel" : "Add Employee"}
        </button>
      </div>
      {showCreateForm && (
        <div className="mb-8">
          <EmployeeDetailForm
            onSubmit={handleCreate}
            onCancel={() => setShowCreateForm(false)}
            isSubmitting={isCreating}
          />
        </div>
      )}
      {departments && departments.length > 0 && (
        <div className="mb-4">
          <DepartmentFilter
            departments={departments}
            selected={selectedDepartment}
            onChange={setSelectedDepartment}
          />
        </div>
      )}
      <EmployeeDetailTable employees={filteredEmployees} onSelect={onSelect} />
    </div>
  );
}
