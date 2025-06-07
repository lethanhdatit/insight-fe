"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function TestPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testAPI = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/theology", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: "Đạt",
          middleName: "Thành",
          lastName: "Lê",
          dreaming:
            "Tôi mơ thấy mình quay lại không gian sân trường cấp 1, lúc mọi người đang chuẩn bị chào cờ đầu tuần.",
          dob: "1997-09-18",
          gender: 1, // Male enum value
          location: "Bình Thạnh, HCM, Việt Nam",
          religion: 1, // Buddhism enum value
        }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error:", error)
      setResult({ error: "Failed to fetch data" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">API Test Page</h1>

        <div className="text-center mb-8">
          <Button
            onClick={testAPI}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4"
          >
            {loading ? "Testing..." : "Test API with Correct Enum Values"}
          </Button>
        </div>

        {result && (
          <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 text-white">
            <h2 className="text-xl font-bold mb-4">API Response:</h2>
            <pre className="whitespace-pre-wrap text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}

        <div className="mt-8 bg-black/40 backdrop-blur-md rounded-lg p-6 text-white">
          <h2 className="text-xl font-bold mb-4">Enum Values Being Sent:</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Gender:</strong> 1 (Male - Nam)
            </p>
            <p>
              <strong>Religion:</strong> 1 (Buddhism - Phật giáo)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
