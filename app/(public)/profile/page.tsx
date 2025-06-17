import { Card } from "../../../components/ui/card";

export default async function ProfilePage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/profile`, { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch");

  const profile = await res.json();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg p-8 shadow-xl bg-white rounded-2xl">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl">
            {profile.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">{profile.name}</h1>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Phone:</span>
            <span>{profile.phone}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Location:</span>
            <span>{profile.location}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600 mb-1">Bio:</span>
            <span className="text-gray-800">{profile.bio}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
