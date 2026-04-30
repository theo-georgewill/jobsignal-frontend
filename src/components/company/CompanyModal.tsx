// src/components/company/CompanyModal.tsx

import React, {
  useEffect,
  useState,
} from 'react';

type Company = {
  id?: string;
  name: string;
  website?: string | null;
  careersUrl: string;
  atsType: string;
  enabled: boolean;
  priority: number;
};

type Props = {
  open: boolean;
  company?: Company | null;
  loading?: boolean;
  onClose: () => void;
  onSave: (
    data: Company
  ) => Promise<void> | void;
};

const ATS_OPTIONS = [
  'greenhouse',
  'lever',
  'ashby',
  'workday',
  'custom',
];

export default function CompanyModal({
  open,
  company,
  loading,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] =
    useState<Company>({
      name: '',
      website: '',
      careersUrl: '',
      atsType:
        'greenhouse',
      enabled: true,
      priority: 1,
    });

  useEffect(() => {
    if (company) {
      setForm({
        id: company.id,
        name:
          company.name ||
          '',
        website:
          company.website ||
          '',
        careersUrl:
          company.careersUrl ||
          '',
        atsType:
          company.atsType ||
          'greenhouse',
        enabled:
          company.enabled,
        priority:
          company.priority ||
          1,
      });
    } else {
      setForm({
        name: '',
        website: '',
        careersUrl: '',
        atsType:
          'greenhouse',
        enabled: true,
        priority: 1,
      });
    }
  }, [company, open]);

  function updateField(
    key: keyof Company,
    value: any
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function submit(
    e: React.FormEvent
  ) {
    e.preventDefault();
    await onSave(form);
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {company
                ? 'Edit Company'
                : 'Add Company'}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage career page monitoring settings.
            </p>
          </div>

          <button
            onClick={
              onClose
            }
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={
            submit
          }
          className="p-6 space-y-5"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>

            <input
              type="text"
              required
              value={
                form.name
              }
              onChange={(e) =>
                updateField(
                  'name',
                  e.target
                    .value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>

            <input
              type="text"
              value={
                form.website ||
                ''
              }
              onChange={(e) =>
                updateField(
                  'website',
                  e.target
                    .value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Careers URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Careers URL
            </label>

            <input
              type="text"
              required
              value={
                form.careersUrl
              }
              onChange={(e) =>
                updateField(
                  'careersUrl',
                  e.target
                    .value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* ATS */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ATS Type
              </label>

              <select
                value={
                  form.atsType
                }
                onChange={(e) =>
                  updateField(
                    'atsType',
                    e.target
                      .value
                  )
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {ATS_OPTIONS.map(
                  (
                    item
                  ) => (
                    <option
                      key={
                        item
                      }
                      value={
                        item
                      }
                    >
                      {
                        item
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>

              <input
                type="number"
                min={1}
                max={5}
                value={
                  form.priority
                }
                onChange={(e) =>
                  updateField(
                    'priority',
                    Number(
                      e.target
                        .value
                    )
                  )
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Enabled */}
            <div className="flex items-end">
              <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={
                    form.enabled
                  }
                  onChange={(
                    e
                  ) =>
                    updateField(
                      'enabled',
                      e
                        .target
                        .checked
                    )
                  }
                  className="rounded border-gray-300"
                />

                Enabled
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={
                onClose
              }
              className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading
              }
              className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
            >
              {loading
                ? 'Saving...'
                : company
                ? 'Save Changes'
                : 'Create Company'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}