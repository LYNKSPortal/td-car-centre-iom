import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { vehicles, enquiries } from '@/lib/db/schema';
import { eq, count } from 'drizzle-orm';
import Link from 'next/link';
import { Car, MessageSquare, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  // Get statistics
  const totalVehicles = await db.select({ count: count() }).from(vehicles);
  const availableVehicles = await db
    .select({ count: count() })
    .from(vehicles)
    .where(eq(vehicles.status, 'available'));
  const totalEnquiries = await db.select({ count: count() }).from(enquiries);
  const recentEnquiries = await db
    .select()
    .from(enquiries)
    .orderBy(enquiries.createdAt)
    .limit(5);

  const stats = [
    {
      title: 'Total Vehicles',
      value: totalVehicles[0].count,
      icon: Car,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Available',
      value: availableVehicles[0].count,
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Total Enquiries',
      value: totalEnquiries[0].count,
      icon: MessageSquare,
      color: 'text-red-600',
      bgColor: 'bg-red-600/10',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Welcome back, {session.user?.name}</p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-zinc-900 border border-white/10 p-6 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button variant="outline" asChild className="h-auto py-4">
            <Link href="/admin/dashboard/vehicles/new">
              <div className="text-center">
                <Car className="w-6 h-6 mx-auto mb-2" />
                <span>Add Vehicle</span>
              </div>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto py-4">
            <Link href="/admin/dashboard/vehicles">
              <div className="text-center">
                <Car className="w-6 h-6 mx-auto mb-2" />
                <span>Manage Vehicles</span>
              </div>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto py-4">
            <Link href="/admin/dashboard/enquiries">
              <div className="text-center">
                <MessageSquare className="w-6 h-6 mx-auto mb-2" />
                <span>View Enquiries</span>
              </div>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto py-4">
            <Link href="/admin/dashboard/settings">
              <div className="text-center">
                <DollarSign className="w-6 h-6 mx-auto mb-2" />
                <span>Settings</span>
              </div>
            </Link>
          </Button>
        </div>
      </div>

      {/* Recent Enquiries */}
      <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Recent Enquiries</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/dashboard/enquiries">View All</Link>
          </Button>
        </div>
        <div className="space-y-4">
          {recentEnquiries.length === 0 ? (
            <p className="text-zinc-400 text-center py-8">No enquiries yet</p>
          ) : (
            recentEnquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className="flex items-center justify-between p-4 bg-zinc-950 border border-white/5 rounded"
              >
                <div>
                  <p className="text-white font-medium">{enquiry.name}</p>
                  <p className="text-sm text-zinc-400">{enquiry.email}</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {enquiry.enquiryType} • {new Date(enquiry.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/dashboard/enquiries/${enquiry.id}`}>View</Link>
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
