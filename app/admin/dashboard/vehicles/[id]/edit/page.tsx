import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditVehiclePage(props: Props) {
  // Await params for Next.js 15+
  const params = await props.params;
  
  // Simple test - just return the ID
  if (!params || !params.id) {
    notFound();
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Edit Vehicle</h1>
      <p>Vehicle ID: {params.id}</p>
      <p>This is a test page to verify params are working.</p>
    </div>
  );
}
