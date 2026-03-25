import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, User, Lock } from 'lucide-react';

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-zinc-400 mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-white">Account Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-zinc-400">Name</label>
              <p className="text-white mt-1">{session.user?.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-400">Email</label>
              <p className="text-white mt-1">{session.user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-400">Role</label>
              <p className="text-white mt-1 capitalize">{session.user?.role}</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-white">Security</h2>
          </div>
          <div className="space-y-4">
            <p className="text-zinc-400 text-sm">
              Change your password to keep your account secure.
            </p>
            <Button variant="outline" className="w-full" disabled>
              Change Password (Coming Soon)
            </Button>
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-white">Website Settings</h2>
          </div>
          <div className="space-y-4">
            <p className="text-zinc-400 text-sm">
              Configure business information, contact details, and social media links.
            </p>
            <Button variant="outline" className="w-full" disabled>
              Edit Business Info (Coming Soon)
            </Button>
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600/10 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-white">Quick Links</h2>
          </div>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="/" target="_blank">
                View Public Website
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="/inventory" target="_blank">
                View Inventory Page
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
