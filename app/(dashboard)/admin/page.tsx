import { sanityFetch } from '@/lib/sanity/client'
import { LogoutButton } from '@/components/admin/LogoutButton'
import type { FormSubmission } from '@/types/sanity'

const submissionsQuery = `
  *[_type == "formSubmission"] | order(createdAt desc)[0...50] {
    _id, formType, name, email, phone, subject, message, createdAt, read
  }
`

export default async function AdminDashboardPage() {
  const submissions = await sanityFetch<FormSubmission[]>({
    query: submissionsQuery,
    tags: ['formSubmission'],
  })

  const unread = submissions.filter((s) => !s.read).length

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-zinc-600 mt-1">Overview of form submissions and site activity.</p>
        </div>
        <LogoutButton />
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-200">
          <div className="text-3xl font-bold">{submissions.length}</div>
          <div className="text-sm text-zinc-600">Total submissions</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-200">
          <div className="text-3xl font-bold">{unread}</div>
          <div className="text-sm text-zinc-600">Unread</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-200">
          <div className="text-3xl font-bold">—</div>
          <div className="text-sm text-zinc-600">Analytics (coming soon)</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        <h2 className="text-lg font-semibold px-6 py-4 border-b border-zinc-200">
          Recent Submissions
        </h2>
        {submissions.length === 0 ? (
          <div className="p-6 text-zinc-600">No submissions yet.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-700">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Subject</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {submissions.map((s) => (
                <tr key={s._id}>
                  <td className="px-6 py-3">{s.name}</td>
                  <td className="px-6 py-3 capitalize">{s.formType}</td>
                  <td className="px-6 py-3">{s.subject}</td>
                  <td className="px-6 py-3">{new Date(s.createdAt).toLocaleDateString('en-GB')}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        s.read ? 'bg-zinc-100 text-zinc-600' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {s.read ? 'Read' : 'New'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
