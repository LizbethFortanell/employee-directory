import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Employee, EmployeeFormData, Department } from "../domain/employee-detail.types";

export const employeeDetailApi = createApi({
  reducerPath: "employeeDetailApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["EmployeeDetail", "Department"],
  endpoints: (builder) => ({
    getEmployeeDetails: builder.query<Employee[], void>({
      query: () => "/employees",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "EmployeeDetail" as const, id })),
              { type: "EmployeeDetail", id: "LIST" },
            ]
          : [{ type: "EmployeeDetail", id: "LIST" }],
    }),
    getEmployeeById: builder.query<Employee, number>({
      query: (id) => `/employees/${id}`,
      providesTags: (_result, _error, id) => [{ type: "EmployeeDetail", id }],
    }),
    createEmployee: builder.mutation<Employee, EmployeeFormData>({
      query: (body) => ({
        url: "/employees",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "EmployeeDetail", id: "LIST" }],
    }),
    updateEmployee: builder.mutation<Employee, { id: number; data: EmployeeFormData }>({
      query: ({ id, data }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "EmployeeDetail", id },
        { type: "EmployeeDetail", id: "LIST" },
      ],
    }),
    deleteEmployee: builder.mutation<void, number>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "EmployeeDetail", id: "LIST" }],
    }),
    getDetailDepartments: builder.query<Department[], void>({
      query: () => "/departments",
      providesTags: ["Department"],
    }),
  }),
});

export const {
  useGetEmployeeDetailsQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetDetailDepartmentsQuery,
} = employeeDetailApi;
