import { useState } from "react";
import {
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} from "../../data/employee-detailApi";
import type { Employee, EmployeeFormData } from "../../domain/employee-detail.types";
import EmployeeDetailForm from "../components/EmployeeDetailForm";

interface EmployeeDetailDetailPageProps {
  employeeId: number;
  onBack?: () => void;
}

export default function EmployeeDetailDetailPage({
  employeeId,
  onBack,
}: EmployeeDetailDetailPageProps) {
  const { data: employee, isLoading, error } = useGetEmployeeByIdQuery(employeeId);
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteEmployeeMutation();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (data: EmployeeFormData) => {
    await updateEmployee({ id: employeeId, data });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteEmployee(employeeId);
    onBack?.();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="mx-8 mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Failed to load employee details. Make sure the mock API is running.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-8 py-10">
      <div className="mb-8">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-4 text-sm text-blue-600 hover:text-blue-800"
          >
            &larr; Back to list
          </button>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700">
              {employee.firstName[0]}
              {employee.lastName[0]}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {employee.firstName} {employee.lastName}
              </h2>
              <p className="text-sm text-gray-500">{employee.position}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                Edit
              </button>
            )}
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>

      {isEditing ? (
        <EmployeeDetailForm
          employee={employee}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          isSubmitting={isUpdating}
        />
      ) : (
        <EmployeeInfoCard employee={employee} />
      )}
    </div>
  );
}

function EmployeeInfoCard({ employee }: { employee: Employee }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium text-gray-500 uppercase">Email</dt>
          <dd className="mt-1 text-sm text-gray-900">{employee.email}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-gray-500 uppercase">Position</dt>
          <dd className="mt-1 text-sm text-gray-900">{employee.position}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-gray-500 uppercase">Department</dt>
          <dd className="mt-1">
            <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
              {employee.department}
            </span>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-gray-500 uppercase">Start Date</dt>
          <dd className="mt-1 text-sm text-gray-900">{employee.startDate}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-gray-500 uppercase">Status</dt>
          <dd className="mt-1">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                employee.status === "active"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  employee.status === "active"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />
              {employee.status}
            </span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
