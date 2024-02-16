'use client';
import React, { useState, useEffect } from 'react';

import { FormData, PayRate } from '../../service/dto';
import { useGlobalContext } from '../../context/store';
import { formatDate, getPreviousDay } from '../../utils/generalUtils';

const PayrollForm = () => {
  const { session } = useGlobalContext();
  const currentDate = new Date();
  const [formData, setFormData] = useState<FormData>({
    employeeName: session ? `${session.first_name} ${session.last_name}` : '',
    userId: session ? session.id : '',
    payType: 'hourly',
    hours: '1',
    weeksReporting: '1',
    startDate: formatDate(currentDate),
    finalDate: formatDate(currentDate),
    note: '',
    grossWage: 0,
    payRate: PayRate.hourly,
  });

  useEffect(() => {
    if (session) {
      setFormData({
        ...formData,
        userId: session.id,
        employeeName: `${session.first_name} ${session.last_name}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    // console.log({ name, value, formData });
    if (formData.payType === 'salary') {
      if (name === 'weeksReporting') {
        // console.log('case1');
        const startDate = new Date(formData.startDate);
        const daysToAdd = 7 * parseInt(value); // Assuming 'value' is the number of weeks to add

        const finalDate = new Date(startDate);

        finalDate.setDate(startDate.getDate() + daysToAdd);

        const grossWage: number = parseInt(value) * formData.payRate;

        setFormData({
          ...formData,
          finalDate: formatDate(finalDate),
          grossWage,
          [name]: value,
        });
      } else if (name === 'startDate') {
        // console.log('case2');
        const startDate = getPreviousDay(value);
        console.log(startDate);
        let daysToAdd = 0;
        if (formData.weeksReporting) {
          daysToAdd = 7 * parseInt(formData.weeksReporting); // Assuming 'value' is the number of weeks to add
        }

        const finalDate = new Date(startDate);

        finalDate.setDate(parseInt(startDate) + daysToAdd);

        const weeksReportingNumber: number = parseInt(
          formData.weeksReporting || '1',
          10
        ); // Ensure weeksReporting is a number
        const grossWage: number = weeksReportingNumber * formData.payRate;

        setFormData({
          ...formData,
          finalDate: formatDate(finalDate),
          grossWage,
          [name]: startDate,
        });
      } else if (name === 'payType') {
        // console.log('case4');
        const grossWage: number =
          parseInt(formData.hours || '0') *
          (value === 'salary' ? PayRate.salary : PayRate.hourly);
        setFormData({
          ...formData,
          [name]: value,
          payRate: value === 'salary' ? PayRate.salary : PayRate.hourly,
          grossWage,
        });
      } else {
        // console.log('case5');
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      if (name === 'payType') {
        // console.log('case6');
        const grossWage: number =
          parseInt(formData.weeksReporting || '0') * PayRate.salary;
        setFormData({
          ...formData,
          grossWage,
          payRate: value === 'salary' ? PayRate.salary : PayRate.hourly,
          payType: value,
        });
      } else {
        // console.log('case7', name, value);
        const grossWage: number = parseInt(value || '0') * formData.payRate;
        setFormData({
          ...formData,
          grossWage,
          [name]: value,
        });
      }
    }
  };

  return (
    <div className=" max-w-[1000px]  mx-auto mt-24 p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Payroll Generator</h2>
      <div className="flex gap-32">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="employeeName">
                Employee Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md capitalize"
                type="text"
                id="employeeName"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                readOnly={true}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="payType">
                Pay Type
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                id="payType"
                name="payType"
                value={formData.payType}
                onChange={handleChange}
              >
                <option value="hourly">Hourly</option>
                <option value="salary">Salary</option>
              </select>
            </div>
            {formData.payType === 'hourly' && (
              <div className="mb-4">
                <label className="block mb-1" htmlFor="hours">
                  Hours
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md"
                  type="number"
                  id="hours"
                  name="hours"
                  value={formData.hours}
                  onChange={handleChange}
                />
              </div>
            )}
            {formData.payType === 'salary' && (
              <div className="mb-4">
                <label className="block mb-1" htmlFor="weeksReporting">
                  Weeks Reporting
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md"
                  type="number"
                  id="weeksReporting"
                  name="weeksReporting"
                  value={formData.weeksReporting}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="flex gap-4 space-between">
              <div className="mb-4">
                <label className=" mb-1" htmlFor="dateFrame">
                  Start Date
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md"
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="mb-1" htmlFor="dateFrame">
                  Final Date
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md"
                  type="date"
                  id="finalDate"
                  name="finalDate"
                  value={formData.finalDate}
                  onChange={handleChange}
                  readOnly={formData.payType === 'salary'}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="note">
                Note (optional)
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
              />
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              type="submit"
            >
              Generate Payroll
            </button>
          </form>
        </div>
        <div>
          <h2>Preview</h2>
          {
            <div className="mt-4 border rounded-md p-4 bg-white shadow-md">
              <h3 className="text-lg font-semibold mb-2">Payroll Details</h3>
              <p>
                <strong>Employee Name:</strong> {formData.employeeName}
              </p>
              <p>
                <strong>Pay Type:</strong> {formData.payType}
              </p>
              {formData.payType === 'hourly' && (
                <>
                  <p>
                    <strong>Hours:</strong> {formData.hours}
                  </p>
                </>
              )}
              {formData.payType === 'salary' && (
                <p>
                  <strong>Weeks Reporting:</strong> {formData.weeksReporting}
                </p>
              )}

              <p>
                <strong>Pay Rate:</strong> $ {formData.payRate}
              </p>
              <p>
                <strong>Start Date:</strong> {formData.startDate}
              </p>
              <p>
                <strong>Final Date:</strong> {formData.finalDate}
              </p>
              <p>
                <strong>Notes:</strong> {formData.note}
              </p>
              <p>
                <strong>Total:</strong> $ {formData.grossWage}
              </p>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default PayrollForm;
