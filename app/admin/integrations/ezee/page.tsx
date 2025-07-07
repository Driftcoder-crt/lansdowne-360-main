import { useEffect, useState } from 'react'

interface Config {
  baseUrl: string
  hotelCode: string
  username: string
  password: string
  webhookSecret: string
}

export default function EZeeIntegrationPage() {
  const [config, setConfig] = useState<Partial<Config>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/admin/integrations/ezee/config')
      .then((r) => r.json())
      .then((data) => {
        const cfg: Record<string, string> = {}
        data.config?.forEach((c: any) => (cfg[c.key] = c.value))
        setConfig(cfg)
        setLoading(false)
      })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [e.target.name]: e.target.value })
  }

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/integrations/ezee/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    })
    setSaving(false)
    setMessage('Saved!')
  }

  const testConnection = async () => {
    setMessage('Testing...')
    const res = await fetch('/api/admin/integrations/ezee/test', { method: 'POST' })
    const data = await res.json()
    setMessage(data.ok ? 'Connection successful' : `Failed: ${data.error}`)
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">eZee PMS Integration</h1>

      <div className="space-y-4">
        {['baseUrl', 'hotelCode', 'username', 'password', 'webhookSecret'].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize mb-1" htmlFor={field}>
              {field}
            </label>
            <input
              id={field}
              name={field}
              type="text"
              value={(config as any)[field] || ''}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={save}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={testConnection}
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Test Connection
        </button>
      </div>

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  )
}